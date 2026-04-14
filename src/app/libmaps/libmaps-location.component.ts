import {Component} from '@angular/core';
import {LibmapsBaseComponent} from './libmaps-base.component';

@Component({
    selector: 'libmaps-location',
    standalone: true,
    imports: [],
    templateUrl: './libmaps.component.html',
    styleUrl: './libmaps-location.component.scss'
})
export class LibmapsLocationComponent extends LibmapsBaseComponent {}
