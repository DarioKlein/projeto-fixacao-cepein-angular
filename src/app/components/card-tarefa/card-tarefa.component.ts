import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Prioridade, Tarefa } from 'src/app/models/tarefa.model'

@Component({
  selector: 'app-card-tarefa',
  templateUrl: './card-tarefa.component.html',
  styleUrls: ['./card-tarefa.component.css'],
})
export class CardTarefaComponent {
  @Input() tarefa!: Tarefa
  @Output() editar = new EventEmitter<Tarefa>()
  @Output() excluir = new EventEmitter<Tarefa>()
  @Output() toggleConcluida = new EventEmitter<Tarefa>()

  getStatusIcon(concluida: boolean): string {
    return concluida ? 'fas fa-check-circle' : 'far fa-circle'
  }

  getStatusClass(concluida: boolean): string {
    return concluida ? 'status-concluida' : 'status-pendente'
  }

  getPrioridadeClass(prioridade: string): string {
    switch (prioridade) {
      case Prioridade.ALTA:
        return 'prioridade-alta'
      case Prioridade.MEDIA:
        return 'prioridade-media'
      case Prioridade.BAIXA:
        return 'prioridade-baixa'
      default:
        return ''
    }
  }

  getPrioridadeLabel(prioridade: string): string {
    switch (prioridade) {
      case Prioridade.ALTA:
        return 'Alta'
      case Prioridade.MEDIA:
        return 'Média'
      case Prioridade.BAIXA:
        return 'Baixa'
      default:
        return ''
    }
  }

  formatarData(data: Date): string {
    if (!data) return ''
    const date = new Date(data)
    return date.toLocaleDateString('pt-BR')
  }
}
