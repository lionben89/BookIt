import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOneButtonComponent } from './dialog-one-button.component';

describe('DialogOneButtonComponent', () => {
  let component: DialogOneButtonComponent;
  let fixture: ComponentFixture<DialogOneButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogOneButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogOneButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
