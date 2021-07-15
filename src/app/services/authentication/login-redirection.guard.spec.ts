import { TestBed } from '@angular/core/testing';

import { LoginRedirectionGuard } from './login-redirection.guard';

describe('LoginRedirectionGuard', () => {
  let guard: LoginRedirectionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoginRedirectionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
