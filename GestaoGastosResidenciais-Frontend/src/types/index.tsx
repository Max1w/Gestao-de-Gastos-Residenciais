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
  nomeDoUsuario: string;
  codigoDoUsuario: number;
  token: string;
  tokenDeAtualizacao: string;
};

export type Pessoa = {
    id: number;
    nome: string;
    idade: number;
};

export const FinalidadeCategoria = {
    Despesa: 1,
    Receita: 2,
    Ambas: 3,
} as const;

export type FinalidadeCategoria = typeof FinalidadeCategoria[keyof typeof FinalidadeCategoria];

export type Categoria = {
    id: number;
    descricao: string;
    finalidade: FinalidadeCategoria;
};

export const TipoTransacao = {
    Despesa: 1,
    Receita: 2,
} as const;

export type TipoTransacao = typeof TipoTransacao[keyof typeof TipoTransacao];

export type Transacao = {
    id: number;
    descricao: string;
    valor: number;
    tipo: TipoTransacao;
    categoriaId: number;
    pessoaId: number;
};

export type TotalPorCategoria = {
  categoriaId: number;
  nomeCategoria: string;
  totalReceita: number;
  totalDespesa: number;
  saldoLiquido: number;
}

export type TotalPorPessoa = {
  pessoaId: number;
  nomePessoa: string;
  totalReceita: number;
  totalDespesa: number;
  saldoLiquido: number;
}