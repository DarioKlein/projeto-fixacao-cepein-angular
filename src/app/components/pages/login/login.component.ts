import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router, RouterLink } from '@angular/router'
import { MessageService } from 'primeng/api'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { UsuarioService } from 'src/app/services/usuario.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  form!: FormGroup
  submitted = false
  showPassword = false
  loading = false
  private destroy$ = new Subject<void>()

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl('', [
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

  get login() {
    return this.form.get('login')
  }

  get senha() {
    return this.form.get('senha')
  }

  togglePassword() {
    this.showPassword = !this.showPassword
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  onSubmit() {
    this.submitted = true
    if (this.form.invalid || this.loading) {
      return
    }
    this.loading = true
    const loginValue = this.form.value.login
    const senhaValue = this.form.value.senha
    this.usuarioService.login(loginValue).pipe(
      takeUntil(this.destroy$),
    ).subscribe(
      (user) => {
        this.loading = false
        if (user && senhaValue === '123456') {
          localStorage.setItem('usuarioLogado', JSON.stringify(user))
          this.router.navigate(['/'])
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Login realizado com sucesso',
          })
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Login ou senha inválidos',
          })
        }
      },
      (error) => {
        this.loading = false
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Login ou senha inválidos',
        })
      },
    )
  }

  onReset() {
    this.submitted = false
    this.form.reset()
  }
}
