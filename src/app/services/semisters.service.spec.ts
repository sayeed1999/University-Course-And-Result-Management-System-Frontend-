import { TestBed } from '@angular/core/testing';

import { SemistersService } from './semisters.service';

describe('SemistersService', () => {
  let service: SemistersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SemistersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
