import { TestBed } from '@angular/core/testing';

import { TokenPasswordGuardService } from './token-password-guard.service';

describe('TokenPasswordGuardService', () => {
  let service: TokenPasswordGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenPasswordGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
