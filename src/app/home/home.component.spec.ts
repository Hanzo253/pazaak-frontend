import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show homepage heading', () => {
    expect(fixture.nativeElement.querySelector('.heading')).toBeTruthy();
  });

  it('should show register button', () => {
    expect(fixture.nativeElement.querySelector('.register')).toBeTruthy();
  });

  it('should show login button', () => {
    expect(fixture.nativeElement.querySelector('.login')).toBeTruthy();
  });
});
