import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibmapsComponent } from './libmaps.component';

describe('LibmapsComponent', () => {
  let component: LibmapsComponent;
  let fixture: ComponentFixture<LibmapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibmapsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibmapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
