import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ]
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
});
