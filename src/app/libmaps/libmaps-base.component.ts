import {Directive, inject, Input} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {LibmapsService} from './libmaps.service';
import {Configuration} from './configuration';
import {ButtonConfiguration} from './buttonConfiguration';
import {LibmapsModalComponent} from '../libmaps-modal/libmaps-modal.component';

@Directive()
export abstract class LibmapsBaseComponent {
    @Input() protected hostComponent!: any;

    private configuration: Configuration | null;
    public buttonConfiguration: ButtonConfiguration;

    protected libMapsService = inject(LibmapsService);
    protected dialog = inject(MatDialog);

    constructor() {
        this.configuration = null;
        this.buttonConfiguration = new ButtonConfiguration('', '', '', '', '', 0, false);
    }

    protected abstract get allowedStatuses(): Set<string>;

    ngOnInit() {
        this.libMapsService.getConfigurationData()
            .subscribe(configuration => {
                this.configuration = configuration;
                this.buttonConfiguration = configuration.button;
            });
    }

    public get bookTitle(): string {
        const titles = this.hostComponent?.searchResult?.pnx?.display?.title || [];

        return titles.length > 0 ? titles[0] : '-';
    }

    public get callNumber(): string {
        const bestLocation = this.hostComponent?.delivery?.bestlocation || this.hostComponent?.location;

        return bestLocation?.callNumber || '';
    }

    public get mapItQueryString(): string {
        // if we don't have the configuration yet - bail and this will be called again when we do
        if (!this.configuration) {
            return '';
        }

        // if we have a location and the book is available
        const bestLocation = this.hostComponent?.delivery?.bestlocation || this.hostComponent?.location;
        if (!bestLocation) {
            return '';
        }

        if (!this.allowedStatuses.has(bestLocation.availabilityStatus)) {
            return '';
        }

        // evaluate if the call-number / location / collection should show a map-it button
        return this.createMapItQueryString(
            this.configuration,
            bestLocation.callNumber,
            bestLocation.mainLocation,
            bestLocation.subLocation,
            this.bookTitle
        );
    }

    public showModal() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.panelClass = 'springy-dialog';
        dialogConfig.width = '80%';
        dialogConfig.maxWidth = '1200px';
        dialogConfig.height = '90vh';
        dialogConfig.data = {
            libcalUrl: this.libMapsService.libcalUrl,
            mapItQueryString: this.mapItQueryString,
            callNumber: this.callNumber,
            bookTitle: this.bookTitle,
        };

        this.dialog.open(LibmapsModalComponent, dialogConfig);
    }

    protected createMapItQueryString(
        configuration: Configuration,
        callNumber: string,
        locationName: string,
        collectionName: string,
        title: string
    ): string {
        if (callNumber.length === 0) {
            return '';
        }

        if (!configuration.validLocationNameMap.has(locationName.toLowerCase())) {
            return '';
        }

        if (!configuration.validCollectionNameMap.has(collectionName.toLowerCase())) {
            return '';
        }

        const queryParams = new HttpParams()
            .set('call', callNumber)
            .set('location', locationName)
            .set('collection', collectionName)
            .set('title', title);

        return queryParams.toString();
    }
}
