import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaPrestadorServiciosComponent } from './tabla-prestador-servicios.component';

describe('TablaPrestadorServiciosComponent', () => {
  let component: TablaPrestadorServiciosComponent;
  let fixture: ComponentFixture<TablaPrestadorServiciosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaPrestadorServiciosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaPrestadorServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
