import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { MessageService } from 'primeng/api'
import { Prioridade, Tarefa } from 'src/app/models/tarefa.model'
import { TarefaService } from 'src/app/services/tarefa.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  tarefas: Tarefa[] = []
  tarefasFiltradas: Tarefa[] = []
  usuarioId!: number
  showDeleteModal = false
  tarefaSelecionada!: Tarefa
  filtroPrioridade: string = 'todas'
  prioridadeOptions = [
    { label: 'Todas', value: 'todas' },
    { label: 'Alta', value: Prioridade.ALTA },
    { label: 'Média', value: Prioridade.MEDIA },
    { label: 'Baixa', value: Prioridade.BAIXA },
  ]

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
      setTimeout(() => this.verificarTarefasVencidas())
    } else {
      this.router.navigate(['/auth/login'])
    }
  }

  verificarTarefasVencidas(): void {
    const todas = this.tarefaService.listarPorUsuario(this.usuarioId)
    const hoje = new Date()
    hoje.setHours(0, 0, 0, 0)
    const vencidas = todas.filter(t => {
      if (t.concluida) return false
      const dataLimite = new Date(t.dataLimite)
      return dataLimite < hoje
    })
    if (vencidas.length > 0) {
      this.messageService.add({
        key: 'vencidas',
        severity: 'warn',
        summary: 'Tarefas Vencidas',
        detail: `Você tem ${vencidas.length} tarefa(s) vencida(s).`,
        closable: true,
      })
    }
  }

  carregarTarefas(): void {
    this.tarefas = this.tarefaService
      .listarPorUsuario(this.usuarioId)
      .filter(t => !t.concluida)
    this.filtrarTarefas()
  }

  filtrarTarefas(): void {
    if (this.filtroPrioridade === 'todas') {
      this.tarefasFiltradas = [...this.tarefas]
    } else {
      this.tarefasFiltradas = this.tarefas.filter(
        t => t.prioridade === this.filtroPrioridade,
      )
    }
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

      if (typeof response === undefined) {
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

  toggleConcluida(tarefa: Tarefa): void {
    if (tarefa.id) {
      const response = this.tarefaService.toggleConcluida(tarefa.id)

      if (typeof response === undefined) {
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
        detail: response!.concluida ? 'Tarefa concluída!' : 'Tarefa reaberta',
      })
      this.carregarTarefas()
    }
  }
}
