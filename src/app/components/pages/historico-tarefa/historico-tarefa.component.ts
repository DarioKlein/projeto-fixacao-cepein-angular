import { Component, OnInit } from '@angular/core'
import { MessageService } from 'primeng/api'
import { Prioridade, Tarefa } from 'src/app/models/tarefa.model'
import { TarefaService } from 'src/app/services/tarefa.service'

@Component({
  selector: 'app-historico-tarefa',
  templateUrl: './historico-tarefa.component.html',
  styleUrls: ['./historico-tarefa.component.css'],
})
export class HistoricoTarefaComponent implements OnInit {
  tarefas: Tarefa[] = []
  tarefasFiltradas: Tarefa[] = []
  usuarioId!: number

  filtroPrioridade: string = 'todas'
  filtroAno: number | null = null
  filtroMes: number | null = null
  pesquisaTitulo: string = ''

  prioridadeOptions = [
    { label: 'Todas', value: 'todas' },
    { label: 'Alta', value: Prioridade.ALTA },
    { label: 'Média', value: Prioridade.MEDIA },
    { label: 'Baixa', value: Prioridade.BAIXA },
  ]

  anoOptions: { label: string; value: number | null }[] = []
  mesOptions = [
    { label: 'Todos os meses', value: null },
    { label: 'Janeiro', value: 1 },
    { label: 'Fevereiro', value: 2 },
    { label: 'Março', value: 3 },
    { label: 'Abril', value: 4 },
    { label: 'Maio', value: 5 },
    { label: 'Junho', value: 6 },
    { label: 'Julho', value: 7 },
    { label: 'Agosto', value: 8 },
    { label: 'Setembro', value: 9 },
    { label: 'Outubro', value: 10 },
    { label: 'Novembro', value: 11 },
    { label: 'Dezembro', value: 12 },
  ]

  constructor(
    private tarefaService: TarefaService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    const usuarioStorage = localStorage.getItem('usuarioLogado')
    if (usuarioStorage) {
      const usuario = JSON.parse(usuarioStorage)
      this.usuarioId = usuario.id
      this.carregarTarefas()
    }
  }

  carregarTarefas(): void {
    this.tarefas = this.tarefaService.listarConcluidasPorUsuario(this.usuarioId)
    this.extrairAnos()
    this.filtrarTarefas()
  }

  extrairAnos(): void {
    const anos = new Set<number>()
    anos.add(null as any)
    this.tarefas.forEach((t) => {
      const ano = new Date(t.dataLimite).getFullYear()
      if (!isNaN(ano)) anos.add(ano)
    })
    this.anoOptions = [
      { label: 'Todos os anos', value: null },
      ...Array.from(anos)
        .filter((a): a is number => a !== null)
        .sort((a, b) => b - a)
        .map((a) => ({ label: String(a), value: a })),
    ]
  }

  filtrarTarefas(): void {
    this.tarefasFiltradas = this.tarefas.filter((t) => {
      const matchTitulo =
        !this.pesquisaTitulo ||
        t.titulo.toLowerCase().includes(this.pesquisaTitulo.toLowerCase())

      const matchPrioridade =
        this.filtroPrioridade === 'todas' ||
        t.prioridade === this.filtroPrioridade

      const data = new Date(t.dataLimite)
      const matchAno = !this.filtroAno || data.getFullYear() === this.filtroAno
      const matchMes =
        this.filtroMes === null || data.getMonth() + 1 === this.filtroMes

      return matchTitulo && matchPrioridade && matchAno && matchMes
    })
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

  reabrirTarefa(tarefa: Tarefa): void {
    if (tarefa.id) {
      const response = this.tarefaService.toggleConcluida(tarefa.id)
      if (response) {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Tarefa reaberta com sucesso',
        })
        this.carregarTarefas()
      }
    }
  }
}
