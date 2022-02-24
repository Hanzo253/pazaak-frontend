import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PazaakBoardComponent } from './pazaak-board.component';

describe('PazaakBoardComponent', () => {
  let component: PazaakBoardComponent;
  let fixture: ComponentFixture<PazaakBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PazaakBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PazaakBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
