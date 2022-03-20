import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [ FormsModule, HttpClientModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show registration heading', () => {
    expect(fixture.nativeElement.querySelector('.heading')).toBeTruthy();
  });

  it('should show sign up form', () => {
    expect(fixture.nativeElement.querySelector('.sign-up')).toBeTruthy();
  });

  it('should show submit button', () => {
    expect(fixture.nativeElement.querySelector('.submit-btn')).toBeTruthy();
  });

  it('should show home button', () => {
    expect(fixture.nativeElement.querySelector('.home-btn')).toBeTruthy();
  });

  describe('registerNewUser', () => {
    describe('when user submits sign up form', () => {
      it('newUser should have a username, emailAddress, password', () => {
        component.userName = "Hanzo253";
        component.emailAddress = "hanzo253@yahoo.com";
        component.password = "apassword";
        component.registerNewUser();
        expect(component.newUser).toBeTruthy();
      });
    });
  });
});
