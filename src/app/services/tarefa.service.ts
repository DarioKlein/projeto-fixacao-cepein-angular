import { Injectable } from '@angular/core'
import { Tarefa } from '../models/tarefa.model'

@Injectable({
  providedIn: 'root',
})
export class TarefaService {
  constructor() {}

  listarConcluidasPorUsuario(usuarioId: number): Tarefa[] {
    const data = localStorage.getItem('listaTarefas')
    if (!data) return []

    const tarefas: Tarefa[] = JSON.parse(data)
    return tarefas
      .filter((tarefa: Tarefa) => tarefa.usuarioId === usuarioId && tarefa.concluida)
      .sort((a, b) => {
        const order: { [key: string]: number } = {
          alta: 0,
          media: 1,
          baixa: 2,
        }
        return order[a.prioridade] - order[b.prioridade]
      })
  }

  listarPorUsuario(usuarioId: number): Tarefa[] {
    const data = localStorage.getItem('listaTarefas')
    if (!data) return []

    const tarefas: Tarefa[] = JSON.parse(data)
    const filtered = tarefas
      .filter((tarefa: Tarefa) => tarefa.usuarioId === usuarioId)
      .sort((a, b) => {
        const order: { [key: string]: number } = {
          alta: 0,
          media: 1,
          baixa: 2,
        }
        return order[a.prioridade] - order[b.prioridade]
      })
    return filtered
  }

  cadastrar(tarefa: Tarefa): Tarefa {
    const data = localStorage.getItem('listaTarefas')
    const tarefas: Tarefa[] = data ? JSON.parse(data) : []

    const novoId =
      tarefas.length > 0 ? Math.max(...tarefas.map((t) => t.id || 0)) + 1 : 1

    const novaTarefa: Tarefa = {
      ...tarefa,
      id: novoId,
    }

    tarefas.push(novaTarefa)
    localStorage.setItem('listaTarefas', JSON.stringify(tarefas))

    return novaTarefa
  }

  buscarPorId(id: number): Tarefa | undefined {
    const data = localStorage.getItem('listaTarefas')
    if (!data) return undefined

    const tarefas = JSON.parse(data)
    return tarefas.find((tarefa: Tarefa) => tarefa.id === id)
  }

  alterar(id: number, tarefa: Tarefa): Tarefa | undefined {
    const data = localStorage.getItem('listaTarefas')
    if (!data) return undefined

    const tarefas = JSON.parse(data)

    const index = tarefas.findIndex((t: Tarefa) => t.id === id)
    if (index === -1) return undefined

    const tarefaAtualizada: Tarefa = {
      ...tarefas[index],
      ...tarefa,
      id,
    }

    tarefas[index] = tarefaAtualizada
    localStorage.setItem('listaTarefas', JSON.stringify(tarefas))

    return tarefaAtualizada
  }

  excluir(id: number): Tarefa | undefined {
    const data = localStorage.getItem('listaTarefas')
    if (!data) return undefined

    const tarefas = JSON.parse(data)

    const index = tarefas.findIndex((t: Tarefa) => t.id === id)
    if (index === -1) return undefined

    const removida = tarefas.splice(index, 1)[0]

    localStorage.setItem('listaTarefas', JSON.stringify(tarefas))

    return removida
  }

  toggleConcluida(id: number): Tarefa | undefined {
    const data = localStorage.getItem('listaTarefas')
    if (!data) return undefined

    const tarefas = JSON.parse(data)

    const index = tarefas.findIndex((t: Tarefa) => t.id === id)
    if (index === -1) return undefined

    tarefas[index].concluida = !tarefas[index].concluida

    localStorage.setItem('listaTarefas', JSON.stringify(tarefas))

    return tarefas[index]
  }
}