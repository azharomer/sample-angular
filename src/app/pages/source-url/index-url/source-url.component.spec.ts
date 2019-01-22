import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceUrlComponent } from './source-url.component';

describe('SourceUrlComponent', () => {
  let component: SourceUrlComponent;
  let fixture: ComponentFixture<SourceUrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceUrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
