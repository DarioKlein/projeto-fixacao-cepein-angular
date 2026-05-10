import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { Tarefa } from '../models/tarefa.model'

@Injectable({
  providedIn: 'root',
})
export class TarefaService {
  constructor() {}

  listarPorUsuario(usuarioId: number): Tarefa[] {
    const data = localStorage.getItem('listaTarefas')
    if (data) {
      const tarefas = JSON.parse(data)
      return tarefas.filter((tarefa: Tarefa) => tarefa.usuarioId === usuarioId)
    }
    return []
  }

  cadastrar(tarefa: Tarefa): Tarefa | string {
    const data = localStorage.getItem('listaTarefas')
    if (data) {
      const tarefas = JSON.parse(data)
      let id = tarefas.length - 1
      tarefa.id = ++id
      tarefas.push(tarefa)
      localStorage.setItem('listaTarefas', JSON.stringify(tarefas))
      return this.buscarPorId(tarefa.id!)
    }
    tarefa.id = 1
    const tarefas = [tarefa]
    localStorage.setItem('listaTarefas', JSON.stringify(tarefas))
    return this.buscarPorId(tarefa.id!)
  }

  buscarPorId(id: number): Tarefa | string {
    const data = localStorage.getItem('listaTarefas')
    if (data) {
      const tarefas = JSON.parse(data)
      return tarefas.find((tarefa: Tarefa) => tarefa.id === id)
    }
    return 'Erro ao buscar tarefa'
  }

  alterar(id: number, tarefa: Tarefa): Tarefa | string {
    const data = localStorage.getItem('listaTarefas')
    if (data) {
      const tarefas = JSON.parse(data)
      const index = tarefas.findIndex((t: Tarefa) => t.id === id)
      if (index !== -1) {
        tarefas[index] = tarefa
        localStorage.setItem('listaTarefas', JSON.stringify(tarefas))
        return this.buscarPorId(id)
      }
    }
    return 'Erro ao alterar tarefa'
  }

  excluir(id: number): Tarefa | string {
    const data = localStorage.getItem('listaTarefas')
    if (data) {
      const tarefas = JSON.parse(data)
      const index = tarefas.findIndex((t: Tarefa) => t.id === id)
      if (index !== -1) {
        tarefas.splice(index, 1)
        localStorage.setItem('listaTarefas', JSON.stringify(tarefas))
        return this.buscarPorId(id)
      }
    }
    return 'Erro ao excluir tarefa'
  }

  alterarStatus(id: number, status: string): Tarefa | string {
    const data = localStorage.getItem('listaTarefas')
    if (data) {
      const tarefas = JSON.parse(data)
      const index = tarefas.findIndex((t: Tarefa) => t.id === id)
      if (index !== -1) {
        tarefas[index].status = status
        localStorage.setItem('listaTarefas', JSON.stringify(tarefas))
        return this.buscarPorId(id)
      }
    }
    return 'Erro ao alterar status'
  }
}
