import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatsCommandeComponent } from './plats-commande.component';

describe('PlatsCommandeComponent', () => {
  let component: PlatsCommandeComponent;
  let fixture: ComponentFixture<PlatsCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatsCommandeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatsCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
