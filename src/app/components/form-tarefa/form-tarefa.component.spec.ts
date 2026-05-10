import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTarefaComponent } from './form-tarefa.component';

describe('FormTarefaComponent', () => {
  let component: FormTarefaComponent;
  let fixture: ComponentFixture<FormTarefaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTarefaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTarefaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
