import {Component} from '@angular/core';
import {take} from 'rxjs/operators';
import {LibmapsBaseComponent} from './libmaps-base.component';

@Component({
    selector: 'libmaps-location',
    standalone: true,
    imports: [],
    templateUrl: './libmaps.component.html',
    styleUrl: './libmaps-location.component.scss'
})
export class LibmapsLocationComponent extends LibmapsBaseComponent {
    protected override get allowedStatuses(): Set<string> {
        return new Set(['available', 'check_holdings']);
    }

    private titleFromStore: string = '';

    override ngOnInit() {
        super.ngOnInit();

        // nde-location-bottom hosts don't carry searchResult; pull the title from the NgRx store instead
        this.hostComponent?.store?.pipe(take(1)).subscribe((state: any) => {
            const selectedId = state?.['full-display']?.selectedRecordId;
            const titles = state?.['Search']?.entities?.[selectedId]?.pnx?.display?.title || [];
            this.titleFromStore = titles.length > 0 ? titles[0] : '';
        });
    }

    public override get bookTitle(): string {
        return this.titleFromStore || '-';
    }
}
