import {Directive, Input, inject} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {LibmapsService} from './libmaps.service';
import {Configuration} from './configuration';
import {ButtonConfiguration} from './buttonConfiguration';
import {LibmapsModalComponent} from '../libmaps-modal/libmaps-modal.component';

@Directive()
export abstract class LibmapsBaseComponent {
    @Input() protected hostComponent!: any;

    public buttonConfiguration: ButtonConfiguration;
    public mapItQueryString: string;
    public callNumber: string;
    public bookTitle: string;

    protected libMapsService = inject(LibmapsService);
    protected dialog = inject(MatDialog);

    constructor() {
        this.buttonConfiguration = new ButtonConfiguration('', '', '', '', '', 0, false);
        this.mapItQueryString = '';
        this.callNumber = '';
        this.bookTitle = '';
    }

    async ngOnInit() {
        const bestLocation = this.hostComponent?.delivery?.bestlocation || this.hostComponent?.location;
        if (!bestLocation) {
            return;
        }

        const availabilityStatus = bestLocation.availabilityStatus;
        if (availabilityStatus !== 'available') {
            return;
        }

        const bookTitles = this.hostComponent?.searchResult?.pnx?.display?.title || [];
        const bookTitle = bookTitles.length > 0 ? bookTitles[0] : '-';

        this.libMapsService.getConfigurationData()
            .subscribe(configuration => {
                this.buttonConfiguration = configuration.button;
                this.callNumber = bestLocation.callNumber;
                this.bookTitle = bookTitle;
                this.mapItQueryString = this.createMapItQueryString(
                    configuration,
                    bestLocation.callNumber,
                    bestLocation.mainLocation,
                    bestLocation.subLocation,
                    this.bookTitle
                );
            });
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
