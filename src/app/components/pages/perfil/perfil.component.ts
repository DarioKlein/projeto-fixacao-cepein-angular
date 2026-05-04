import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { MessageService } from 'primeng/api'
import { UsuarioService } from 'src/app/services/usuario.service'

interface Usuario {
  id?: number
  nome: string
  telefone: string
  login: string
  senha?: string
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  usuario!: Usuario
  form!: FormGroup
  submitted = false
  showPassword = false
  modoEdicao = false
  showDeleteModal = false

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    const usuarioStorage = localStorage.getItem('usuarioLogado')
    if (usuarioStorage) {
      this.usuario = JSON.parse(usuarioStorage)
    } else {
      this.router.navigate(['/auth/login'])
      return
    }

    this.form = new FormGroup({
      nome: new FormControl({ value: this.usuario.nome, disabled: true }),
      telefone: new FormControl({ value: this.usuario.telefone, disabled: true }),
      login: new FormControl(this.usuario.login, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      senha: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
      ]),
    })
  }

  get f() {
    return this.form.controls
  }

  togglePassword() {
    this.showPassword = !this.showPassword
  }

  habilitarEdicao() {
    this.modoEdicao = true
    this.showDeleteModal = false
  }

  cancelarEdicao() {
    this.modoEdicao = false
    this.submitted = false
    this.form.patchValue({
      login: this.usuario.login,
      senha: '',
    })
  }

  salvar() {
    this.submitted = true
    if (this.form.invalid) {
      return
    }

    const dadosAtualizados = {
      id: this.usuario.id,
      nome: this.usuario.nome,
      telefone: this.usuario.telefone,
      login: this.form.value.login,
      ...(this.form.value.senha && { senha: this.form.value.senha }),
    }

    if (this.usuario.id) {
      this.usuarioService.alterar(this.usuario.id, dadosAtualizados).subscribe(
        (usuarioAtualizado) => {
          localStorage.setItem('usuarioLogado', JSON.stringify(usuarioAtualizado))
          this.usuario = usuarioAtualizado
          this.modoEdicao = false
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Dados atualizados com sucesso',
          })
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao atualizar dados',
          })
        },
      )
    }
  }

  confirmarExclusao() {
    if (this.usuario.id) {
      this.usuarioService.excluir(this.usuario.id).subscribe(
        () => {
          localStorage.removeItem('usuarioLogado')
          this.router.navigate(['/auth/login'])
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Conta excluída com sucesso',
          })
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao excluir conta',
          })
        },
      )
    }
  }

  abrirModalExclusao() {
    this.showDeleteModal = true
    this.modoEdicao = false
  }

  fecharModalExclusao() {
    this.showDeleteModal = false
  }
}
