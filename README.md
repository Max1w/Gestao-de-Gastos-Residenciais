# Gestao-de-Gastos-Residenciais



Tabelas

CREATE TABLE Usuario (
    Id INT PRIMARY KEY,
    Username VARCHAR(100) NOT NULL,
    SenhaHash VARCHAR(255) NOT NULL,
    TokenDeAtualizacao VARCHAR(500) NULL,
    ExpiracaoTokenAtualizacao DATETIME NULL
);


CREATE TABLE Pessoa (
    Id INT PRIMARY KEY,
    Nome VARCHAR(150) NOT NULL,
    DataNascimento DATE NULL
);


CREATE TABLE Categoria (
    Id INT PRIMARY KEY,
    Descricao VARCHAR(150) NOT NULL,
    Finalidade TINYINT NOT NULL
);


CREATE TABLE Transacao (
    Id INT PRIMARY KEY,
    Descricao VARCHAR(200) NOT NULL,
    Valor DECIMAL(18,2) NOT NULL,
    Tipo TINYINT NOT NULL,
    DataTransacao DATETIME NOT NULL DEFAULT GETDATE(),

    CategoriaId INT NOT NULL,
    PessoaId INT NOT NULL,

    CONSTRAINT FK_TransacaoCategoria
        FOREIGN KEY (CategoriaId) REFERENCES Categoria(Id),

    CONSTRAINT FK_TransacaoPessoa
        FOREIGN KEY (PessoaId) REFERENCES Pessoa(Id)
);

CREATE INDEX IX_TransacaoCategoriaId ON Transacao(CategoriaId);
CREATE INDEX IX_TransacaoPessoaId ON Transacao(PessoaId);