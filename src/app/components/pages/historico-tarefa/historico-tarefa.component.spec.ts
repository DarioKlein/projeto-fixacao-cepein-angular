import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoTarefaComponent } from './historico-tarefa.component';

describe('HistoricoTarefaComponent', () => {
  let component: HistoricoTarefaComponent;
  let fixture: ComponentFixture<HistoricoTarefaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricoTarefaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoTarefaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
