import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'libmaps-modal',
  standalone: true,
  imports: [],
  templateUrl: './libmaps-modal.component.html',
  styleUrl: './libmaps-modal.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LibmapsModalComponent {
    public libcalUrl: string;
    public mapItQueryString: string;
    public callNumber: string;
    public bookTitle: string;
    public iframeUrl: SafeResourceUrl;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<LibmapsModalComponent>,
        private domSanitizer: DomSanitizer
    ) {
        this.libcalUrl = data.libcalUrl;
        this.mapItQueryString = data.mapItQueryString;
        this.callNumber = data.callNumber;
        this.bookTitle = data.bookTitle;
        this.iframeUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.libcalUrl + '/libmaps/catalog?' + this.mapItQueryString);
    }

    public printMap() {
        window.open(
            this.libcalUrl + '/libmaps/call/print?' + this.mapItQueryString,
            this.callNumber,
            'height=860,width=630'
        );
    }

    public closeModal() {
        this.dialogRef.close();
    }
}
