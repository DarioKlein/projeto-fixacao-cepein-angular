import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Usuario } from 'src/app/models/usuario.model'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  usuario!: Usuario
  constructor(private router: Router) {}

  ngOnInit(): void {
    const usuarioStorage = localStorage.getItem('usuarioLogado')
    if (usuarioStorage) {
      this.usuario = JSON.parse(usuarioStorage)
    } else {
      this.router.navigate(['/auth/login'])
      return
    }
  }
}
