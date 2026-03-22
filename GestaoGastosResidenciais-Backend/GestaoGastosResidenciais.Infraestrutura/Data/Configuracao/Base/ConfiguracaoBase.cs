using GestaoGastosResidenciais.Domain.Entidades.Base;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GestaoGastosResidenciais.Infraestrutura.Data.Configuracao.Base
{
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

		protected abstract void ConfigurarEntidades(
			EntityTypeBuilder<T> builder);
	}    
}
