using GestaoGastosResidenciais.Domain.Entidades.Base;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GestaoGastosResidenciais.Infraestrutura.Data.Configuracao.Base
{
	// ─── ConfiguracaoBase ───────────────────────────────────────────────────────────────────
	// Classe base para todas as configurações do Entity Framework
	// Define a chave primária e o Id com geração automática para todas as entidades

	public abstract class ConfiguracaoBase<T>
        : IEntityTypeConfiguration<T> where T : EntidadeBase
    {
        public void Configure(
            EntityTypeBuilder<T> builder)
        {
			builder.HasKey(e => e.Id);

			builder.Property(x => x.Id)
				.ValueGeneratedOnAdd();

			ConfigurarEntidades(builder);
		}

		// Implementado em cada configuração específica para mapear as propriedades da entidade
		protected abstract void ConfigurarEntidades(
			EntityTypeBuilder<T> builder);
	}    
}
