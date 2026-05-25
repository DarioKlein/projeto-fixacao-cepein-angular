import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTarefaComponent } from './card-tarefa.component';

describe('CardTarefaComponent', () => {
  let component: CardTarefaComponent;
  let fixture: ComponentFixture<CardTarefaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardTarefaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardTarefaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
