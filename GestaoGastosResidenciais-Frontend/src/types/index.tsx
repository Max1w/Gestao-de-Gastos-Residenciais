export type Usuario = {
    id: number;
    nome: string;
    senha: string;
}

export type LoginRequest = {
  usuario: string;
  senha: string;
};

export type LoginResponse = {
  usuario: string;
};