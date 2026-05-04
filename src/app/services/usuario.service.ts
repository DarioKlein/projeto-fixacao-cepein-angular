import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { environment } from '../../environments/environment'
import { Usuario, UsuarioDTO, UsuarioUpdateDTO } from '../models/usuario.model'

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) {}

  cadastrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/cadastrar`, usuario).pipe(
      catchError((error) => {
        console.error('Erro ao cadastrar usuário:', error)
        return throwError(() => new Error('Erro ao cadastrar usuário'))
      }),
    )
  }

  login(login: string): Observable<UsuarioDTO> {
    return this.http.get<any>(`${this.apiUrl}/login?login=${login}`).pipe(
      catchError((error) => {
        console.error('Erro ao fazer login:', error)
        return throwError(() => new Error('Erro ao fazer login'))
      }),
    )
  }

  alterar(id: number, usuario: UsuarioUpdateDTO): Observable<Usuario> {
    return this.http
      .put<Usuario>(`${this.apiUrl}/alterar-login/${id}`, usuario)
      .pipe(
        catchError((error) => {
          console.error('Erro ao alterar usuário:', error)
          return throwError(() => new Error('Erro ao alterar usuário'))
        }),
      )
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/excluir/${id}`).pipe(
      catchError((error) => {
        console.error('Erro ao excluir usuário:', error)
        return throwError(() => new Error('Erro ao excluir usuário'))
      }),
    )
  }
}
