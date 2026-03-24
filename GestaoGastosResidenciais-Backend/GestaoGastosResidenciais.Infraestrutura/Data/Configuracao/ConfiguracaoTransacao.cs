using GestaoGastosResidenciais.Domain.Entidades;
using GestaoGastosResidenciais.Infraestrutura.Data.Configuracao.Base;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GestaoGastosResidenciais.Infraestrutura.Data.Configuracao
{
	// ─── ConfiguracaoTransacao ───────────────────────────────────────────────────────────────────
	// Mapeamento da entidade Transacao para a tabela "transacoes"

	public class ConfiguracaoTransacao : ConfiguracaoBase<TransacaoEntity>
    {
        protected override void ConfigurarEntidades(
            EntityTypeBuilder<TransacaoEntity> builder)
        {
            builder.ToTable("transacoes");

            builder.Property(x => x.Descricao)
                .IsRequired()
                .HasMaxLength(400);
            builder.Property(x => x.Valor)
                .HasPrecision(18, 2)
                .IsRequired();
            builder.Property(x => x.Tipo)
                .IsRequired()
                .HasConversion<byte>()
                .HasColumnType("tinyint");
            builder.Property(x => x.DataTransacao)
				.HasDefaultValueSql("GETDATE()");

            builder.HasOne(x => x.Categoria)
                .WithMany(x => x.Transacoes)
                .HasForeignKey(x => x.CategoriaId);
            builder.HasOne(x => x.Pessoa)
				.WithMany(x => x.Transacoes)
			    .HasForeignKey(x => x.PessoaId);

			builder.HasIndex(x => x.CategoriaId);
			builder.HasIndex(x => x.PessoaId);
		}
    }
}
