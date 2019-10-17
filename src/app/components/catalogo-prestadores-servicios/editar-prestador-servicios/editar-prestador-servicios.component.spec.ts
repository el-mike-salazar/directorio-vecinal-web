import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPrestadorServiciosComponent } from './editar-prestador-servicios.component';

describe('EditarPrestadorServiciosComponent', () => {
  let component: EditarPrestadorServiciosComponent;
  let fixture: ComponentFixture<EditarPrestadorServiciosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarPrestadorServiciosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPrestadorServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
