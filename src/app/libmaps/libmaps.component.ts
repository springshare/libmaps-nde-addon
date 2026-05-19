import {Component} from '@angular/core';
import {LibmapsBaseComponent} from './libmaps-base.component';

@Component({
    selector: 'libmaps',
    standalone: true,
    imports: [],
    templateUrl: './libmaps.component.html',
    styleUrl: './libmaps.component.scss'
})
export class LibmapsComponent extends LibmapsBaseComponent {
    protected override get allowedStatuses(): Set<string> {
        return new Set(['available']);
    }
}
