import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ FormsModule, HttpClientModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show login heading', () => {
    expect(fixture.nativeElement.querySelector('.heading')).toBeTruthy();
  });

  it('should show login form', () => {
    expect(fixture.nativeElement.querySelector('.login')).toBeTruthy();
  });

  it('should show login button', () => {
    expect(fixture.nativeElement.querySelector('.login-btn')).toBeTruthy();
  });

  it('should show home button', () => {
    expect(fixture.nativeElement.querySelector('.home-btn')).toBeTruthy();
  });

   describe('loginUser', () => {
    describe('when user submits sign up form', () => {
      it('loggedInUser should have an email and password', () => {
        component.email = "hanzo253@yahoo.com";
        component.password = "apassword";
        component.loginUser();
        expect(component.user).toBeTruthy();
      });
    });
  });
});
