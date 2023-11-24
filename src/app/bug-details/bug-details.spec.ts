import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugDetails } from './bug-details';

describe('BugDetailsComponent', () => {
  let component: BugDetails;
  let fixture: ComponentFixture<BugDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BugDetails ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BugDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
