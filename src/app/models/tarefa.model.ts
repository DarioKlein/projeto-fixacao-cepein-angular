export interface Tarefa {
  id?: number
  titulo: string
  descricao: string
  prioridade: 'baixa' | 'media' | 'alta'
  dataLimite: string
  status: 'pendente' | 'em_andamento' | 'concluida'
  usuarioId: number
}