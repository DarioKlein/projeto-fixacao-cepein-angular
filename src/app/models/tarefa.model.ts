export enum Prioridade {
  BAIXA = 'baixa',
  MEDIA = 'media',
  ALTA = 'alta',
}

export interface Tarefa {
  id?: number
  titulo: string
  descricao: string
  prioridade: Prioridade
  dataLimite: Date
  concluida: boolean
  usuarioId: number
}