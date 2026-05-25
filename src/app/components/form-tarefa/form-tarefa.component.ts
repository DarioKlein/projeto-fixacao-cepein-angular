import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { dataFutura } from 'src/app/validators/custom.validators'
import { ActivatedRoute, Router } from '@angular/router'
import { MessageService } from 'primeng/api'
import { Prioridade, Tarefa } from 'src/app/models/tarefa.model'
import { TarefaService } from 'src/app/services/tarefa.service'

@Component({
  selector: 'app-form-tarefa',
  templateUrl: './form-tarefa.component.html',
  styleUrls: ['./form-tarefa.component.css'],
})
export class FormTarefaComponent implements OnInit {
  form!: FormGroup
  submitted = false
  isEdicao = false
  tarefaId!: number
  usuarioId!: number
  tarefaCriada = false

  prioridadeBAIXA = Prioridade.BAIXA
  prioridadeMEDIA = Prioridade.MEDIA
  prioridadeALTA = Prioridade.ALTA

  constructor(
    private tarefaService: TarefaService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    const usuarioStorage = localStorage.getItem('usuarioLogado')
    if (usuarioStorage) {
      const usuario = JSON.parse(usuarioStorage)
      this.usuarioId = usuario.id
    } else {
      this.router.navigate(['/auth/login'])
      return
    }

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.tarefaId = params['id']
        this.isEdicao = true
      }
    })

    this.initForm()

    if (this.isEdicao) {
      this.carregarTarefa()
    }
  }

  initForm(): void {
    this.form = new FormGroup({
      titulo: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
      descricao: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(500),
      ]),
      prioridade: new FormControl(Prioridade.MEDIA, [Validators.required]),
      dataLimite: new FormControl('', [Validators.required, dataFutura()]),
    })
  }

  get titulo() {
    return this.form.get('titulo')
  }

  get descricao() {
    return this.form.get('descricao')
  }

  get prioridade() {
    return this.form.get('prioridade')
  }

  get dataLimite() {
    return this.form.get('dataLimite')
  }

  carregarTarefa(): void {
    const response = this.tarefaService.buscarPorId(Number(this.tarefaId))

    if (!response) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Tarefa não encontrada',
      })
      return
    }

    this.form.patchValue({
      titulo: response.titulo,
      descricao: response.descricao,
      prioridade: response.prioridade,
      dataLimite: response.dataLimite,
    })
  }

  onSubmit(): void {
    this.submitted = true
    if (this.form.invalid) {
      return
    }

    const tarefa: Tarefa = {
      ...this.form.value,
      concluida: false,
      usuarioId: this.usuarioId,
    }

    if (this.isEdicao && this.tarefaId) {
      const response = this.tarefaService.alterar(Number(this.tarefaId), tarefa)

      if (response == undefined) {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao atualizar tarefa',
        })
        return
      }

      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Tarefa atualizada com sucesso',
      })

      setTimeout(() => this.router.navigate(['/']), 500)
    } else {
      const response = this.tarefaService.cadastrar(tarefa)

      if (typeof response == undefined) {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao cadastrar tarefa',
        })
        return
      }

      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Tarefa cadastrada com sucesso',
      })

      this.tarefaCriada = true
      setTimeout(() => this.router.navigate(['/']), 500)
    }
  }

  onReset(): void {
    this.submitted = false
    this.form.reset()
  }

  cancelar(): void {
    this.router.navigate(['/'])
  }
}
