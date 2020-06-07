import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const data = {status: 200, body: {Token: 'token'}};
  const authServiceSpy = {
    login: jasmine.createSpy('login').and.returnValue(of(data)),
    setToken: jasmine.createSpy('setToken').and.returnValue('')
  };
  let form;

  function updateForm(username, userPassword) {
    form = fixture.debugElement.nativeElement.querySelector('form');
    form.querySelector('#inputEmail').value = username;
    form.querySelector('#inputEmail').dispatchEvent(new Event('input'));
    form.querySelector('#inputPassword').value = userPassword;
    form.querySelector('#inputEmail').dispatchEvent(new Event('input'));
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ LoginComponent ],
      providers: [{provide: AuthService, useValue: authServiceSpy}, {provide: Router, useValue: routerSpy}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('username and password values should be demo1 and demo1', () => {
    updateForm('demo1', 'demo1');
    fixture.detectChanges();
    const usernameContainer = fixture.debugElement.nativeElement.querySelector('#inputEmail');
    const passwordContainer = fixture.debugElement.nativeElement.querySelector('#inputPassword');
    expect(usernameContainer.value).toBe('demo1');
    expect(passwordContainer.value).toBe('demo1');
  });

  it('created a form with username and password input and login button', () => {
    const usernameContainer = fixture.debugElement.nativeElement.querySelector('#inputEmail');
    const passwordContainer = fixture.debugElement.nativeElement.querySelector('#inputPassword');
    const loginBtnContainer = fixture.debugElement.nativeElement.querySelector('button');
    expect(usernameContainer).toBeDefined();
    expect(passwordContainer).toBeDefined();
    expect(loginBtnContainer).toBeDefined();
  });

  it('should call login method on calling signIn method', () => {
    component.signIn('demo1', 'demo1');
    expect(component.authService.login).toHaveBeenCalled();
    expect(component.authService.setToken).toHaveBeenCalled();
    expect(component.router.navigate).toHaveBeenCalled();
    expect(component.isInvalid).toBe(false);
  });

});
