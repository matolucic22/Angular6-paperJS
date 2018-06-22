import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingplaceComponent } from './workingplace.component';

describe('WorkingplaceComponent', () => {
  let component: WorkingplaceComponent;
  let fixture: ComponentFixture<WorkingplaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkingplaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkingplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
