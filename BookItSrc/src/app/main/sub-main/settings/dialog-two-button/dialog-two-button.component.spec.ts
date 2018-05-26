import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTwoButtonComponent } from './dialog-two-button.component';

describe('DialogTwoButtonComponent', () => {
  let component: DialogTwoButtonComponent;
  let fixture: ComponentFixture<DialogTwoButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogTwoButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTwoButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
