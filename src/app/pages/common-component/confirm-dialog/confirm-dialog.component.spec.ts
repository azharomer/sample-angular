import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatConfirmDialogComponent } from './confirm-dialog.component';

describe('MatConfirmDialogComponent', () => {
  let component: MatConfirmDialogComponent;
  let fixture: ComponentFixture<MatConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatConfirmDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
