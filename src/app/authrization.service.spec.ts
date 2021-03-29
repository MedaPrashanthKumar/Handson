import { TestBed } from '@angular/core/testing';

import { AuthrizationService } from './authrization.service';

describe('AuthrizationService', () => {
  let service: AuthrizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthrizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
