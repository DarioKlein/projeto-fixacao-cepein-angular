import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router, RouterLink } from '@angular/router'
import { MessageService } from 'primeng/api'
import { UsuarioService } from 'src/app/services/usuario.service'

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {
  form!: FormGroup
  submitted = false
  showPassword = false

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      nome: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      telefone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\(\d{2}\) \d{4,5}-\d{4}$/),
      ]),
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

  get nome() {
    return this.form.get('nome')
  }

  get telefone() {
    return this.form.get('telefone')
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

  onSubmit() {
    this.submitted = true
    if (this.form.invalid) {
      return
    }
    this.usuarioService.cadastrar(this.form.value).subscribe(
      () => {
        this.router.navigate(['/auth/login'])
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Usuário cadastrado com sucesso',
        })
      },
      (error) => {
        console.error(error)
      },
    )
  }

  onReset() {
    this.submitted = false
    this.form.reset()
  }
}
