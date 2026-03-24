using GestaoGastosResidenciais.Domain.Entidades;
using GestaoGastosResidenciais.Infraestrutura.Data.Configuracao.Base;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GestaoGastosResidenciais.Infraestrutura.Data.Configuracao
{
	// ─── ConfiguracaoCategoria ───────────────────────────────────────────────────────────────────
	// Mapeamento da entidade Categoria para a tabela "categorias"

	public class ConfiguracaoCategoria : ConfiguracaoBase<CategoriaEntity>
    {
        protected override void ConfigurarEntidades(
            EntityTypeBuilder<CategoriaEntity> builder)
        {
            builder.ToTable("categorias");

            builder.Property(x => x.Descricao)
                .IsRequired()
                .HasMaxLength(400);
            builder.Property(x => x.Finalidade)
                .IsRequired()
                .HasConversion<byte>()
				.HasColumnType("tinyint");

            builder.HasMany(x => x.Transacoes)
                .WithOne(x => x.Categoria)
                .HasForeignKey(x => x.CategoriaId);
		}
    }
}
