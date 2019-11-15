import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarRolComponent } from './actualizar-rol.component';

describe('ActualizarRolComponent', () => {
  let component: ActualizarRolComponent;
  let fixture: ComponentFixture<ActualizarRolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarRolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
