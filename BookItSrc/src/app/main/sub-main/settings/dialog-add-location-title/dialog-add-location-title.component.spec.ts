import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddLocationTitleComponent } from './dialog-add-location-title.component';

describe('DialogAddLocationTitleComponent', () => {
  let component: DialogAddLocationTitleComponent;
  let fixture: ComponentFixture<DialogAddLocationTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddLocationTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddLocationTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
