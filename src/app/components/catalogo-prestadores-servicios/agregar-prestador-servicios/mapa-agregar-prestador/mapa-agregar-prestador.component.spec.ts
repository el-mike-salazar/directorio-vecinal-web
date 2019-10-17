import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaAgregarPrestadorComponent } from './mapa-agregar-prestador.component';

describe('MapaAgregarPrestadorComponent', () => {
  let component: MapaAgregarPrestadorComponent;
  let fixture: ComponentFixture<MapaAgregarPrestadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapaAgregarPrestadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaAgregarPrestadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
