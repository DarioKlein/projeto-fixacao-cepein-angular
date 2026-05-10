import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { MessageService } from 'primeng/api'
import { Tarefa } from 'src/app/models/tarefa.model'
import { TarefaService } from 'src/app/services/tarefa.service'

@Component({
  selector: 'app-lista-tarefa',
  templateUrl: './lista-tarefa.component.html',
  styleUrls: ['./lista-tarefa.component.css'],
})
export class ListaTarefaComponent implements OnInit {
  tarefas: Tarefa[] = []
  usuarioId!: number
  showDeleteModal = false
  tarefaSelecionada!: Tarefa

  constructor(
    private tarefaService: TarefaService,
    private router: Router,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    const usuarioStorage = localStorage.getItem('usuarioLogado')
    if (usuarioStorage) {
      const usuario = JSON.parse(usuarioStorage)
      this.usuarioId = usuario.id
      this.carregarTarefas()
    } else {
      this.router.navigate(['/auth/login'])
    }
  }

  carregarTarefas(): void {
    this.tarefas = this.tarefaService.listarPorUsuario(this.usuarioId)
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'pendente':
        return 'far fa-circle'
      case 'em_andamento':
        return 'fas fa-adjust'
      case 'concluida':
        return 'fas fa-check-circle'
      default:
        return 'far fa-circle'
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'pendente':
        return 'status-pendente'
      case 'em_andamento':
        return 'status-andamento'
      case 'concluida':
        return 'status-concluida'
      default:
        return ''
    }
  }

  getPrioridadeClass(prioridade: string): string {
    switch (prioridade) {
      case 'alta':
        return 'prioridade-alta'
      case 'media':
        return 'prioridade-media'
      case 'baixa':
        return 'prioridade-baixa'
      default:
        return ''
    }
  }

  getPrioridadeLabel(prioridade: string): string {
    switch (prioridade) {
      case 'alta':
        return 'Alta'
      case 'media':
        return 'Média'
      case 'baixa':
        return 'Baixa'
      default:
        return ''
    }
  }

  formatarData(data: string): string {
    if (!data) return ''
    const date = new Date(data)
    return date.toLocaleDateString('pt-BR')
  }

  editar(tarefa: Tarefa): void {
    this.router.navigate(['/tarefa/editar', tarefa.id])
  }

  excluir(tarefa: Tarefa): void {
    this.tarefaSelecionada = tarefa
    this.showDeleteModal = true
  }

  confirmarExclusao(): void {
    if (this.tarefaSelecionada.id) {
      const response = this.tarefaService.excluir(this.tarefaSelecionada.id)

      if(typeof response === 'string') {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao excluir tarefa',
        })
        return
      }

      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'A tarefa foi excluida com sucesso',
      })

      this.showDeleteModal = false
      this.carregarTarefas()
    }
  }

  fecharModal(): void {
    this.showDeleteModal = false
  }

  alterarStatus(tarefa: Tarefa, novoStatus: string): void {
    if (tarefa.id) {
      const response = this.tarefaService.alterarStatus(tarefa.id, novoStatus)

      if (typeof response === 'string') {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao atualizar status',
        })
        return
      }

      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Status atualizado com sucesso',
      })
      this.carregarTarefas()
    }
  }
}
