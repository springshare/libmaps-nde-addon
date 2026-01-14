import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibmapsModalComponent } from './libmaps-modal.component';

describe('LibmapsModalComponent', () => {
  let component: LibmapsModalComponent;
  let fixture: ComponentFixture<LibmapsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibmapsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibmapsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
