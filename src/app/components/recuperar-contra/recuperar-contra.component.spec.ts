import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarContraComponent } from './recuperar-contra.component';

describe('RecuperarContraComponent', () => {
  let component: RecuperarContraComponent;
  let fixture: ComponentFixture<RecuperarContraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecuperarContraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperarContraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
