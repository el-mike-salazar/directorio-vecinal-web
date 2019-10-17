import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaEditarPrestadorComponent } from './mapa-editar-prestador.component';

describe('MapaEditarPrestadorComponent', () => {
  let component: MapaEditarPrestadorComponent;
  let fixture: ComponentFixture<MapaEditarPrestadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapaEditarPrestadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaEditarPrestadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
