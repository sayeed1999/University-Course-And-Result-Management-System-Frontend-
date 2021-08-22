import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultSheetGenerationComponent } from './result-sheet-generation.component';

describe('ResultSheetGenerationComponent', () => {
  let component: ResultSheetGenerationComponent;
  let fixture: ComponentFixture<ResultSheetGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultSheetGenerationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultSheetGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
