export interface Usuario {
  id?: number
  nome: string
  telefone: string
  login: string
  senha: string
}

export interface UsuarioDTO {
  id?: number
  nome: string
  login: string
  telefone: string
}

export interface UsuarioUpdateDTO {
  login: string
  senha: string
}
