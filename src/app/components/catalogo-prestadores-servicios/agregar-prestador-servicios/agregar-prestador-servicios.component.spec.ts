import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPrestadorServiciosComponent } from './agregar-prestador-servicios.component';

describe('AgregarPrestadorServiciosComponent', () => {
  let component: AgregarPrestadorServiciosComponent;
  let fixture: ComponentFixture<AgregarPrestadorServiciosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarPrestadorServiciosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarPrestadorServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
