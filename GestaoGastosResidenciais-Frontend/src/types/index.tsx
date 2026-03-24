// ─── Types ───────────────────────────────────────────────────────────────────────
// Centraliza todos os tipos e enums utilizados no sistema

// Dados do usuário cadastrado
export type Usuario = {
    id: number;
    nome: string;
    senha: string;
}

// Payload enviado no login
export type LoginRequest = {
  usuario: string;
  senha: string;
};

// Dados retornados após autenticação bem-sucedida
export type LoginResponse = {
  nomeDoUsuario: string;
  codigoDoUsuario: number;
  token: string;
  tokenDeAtualizacao: string;
};

// Dados de uma pessoa cadastrada no sistema
export type Pessoa = {
    id: number;
    nome: string;
    idade: number;
};

// Enum de finalidade da categoria (despesa, receita ou ambas)
export const FinalidadeCategoria = {
    Despesa: 1,
    Receita: 2,
    Ambas: 3,
} as const;

export type FinalidadeCategoria = typeof FinalidadeCategoria[keyof typeof FinalidadeCategoria];

// Dados de uma categoria cadastrada no sistema
export type Categoria = {
    id: number;
    descricao: string;
    finalidade: FinalidadeCategoria;
};

// Enum de tipo da transação (despesa ou receita)
export const TipoTransacao = {
    Despesa: 1,
    Receita: 2,
} as const;

export type TipoTransacao = typeof TipoTransacao[keyof typeof TipoTransacao];

// Dados de uma transação cadastrada no sistema
export type Transacao = {
    id: number;
    descricao: string;
    valor: number;
    tipo: TipoTransacao;
    categoriaId: number;
    pessoaId: number;
};

// Totais de receita, despesa e saldo líquido agrupados por categoria
export type TotalPorCategoria = {
  categoriaId: number;
  nomeCategoria: string;
  totalReceita: number;
  totalDespesa: number;
  saldoLiquido: number;
}

// Totais de receita, despesa e saldo líquido agrupados por pessoa
export type TotalPorPessoa = {
  pessoaId: number;
  nomePessoa: string;
  totalReceita: number;
  totalDespesa: number;
  saldoLiquido: number;
}