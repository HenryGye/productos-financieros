import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { validateIdGuard } from './validate-id.guard';

describe('validateIdGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => validateIdGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
