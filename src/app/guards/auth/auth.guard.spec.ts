import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  const routerSpy = jasmine.createSpyObj('Router', ['navigateTo']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, {provide: Router, useValue: Router}],
      imports: [HttpClientModule]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
