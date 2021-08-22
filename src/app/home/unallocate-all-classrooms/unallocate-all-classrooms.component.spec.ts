import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnallocateAllClassroomsComponent } from './unallocate-all-classrooms.component';

describe('UnallocateAllClassroomsComponent', () => {
  let component: UnallocateAllClassroomsComponent;
  let fixture: ComponentFixture<UnallocateAllClassroomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnallocateAllClassroomsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnallocateAllClassroomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
