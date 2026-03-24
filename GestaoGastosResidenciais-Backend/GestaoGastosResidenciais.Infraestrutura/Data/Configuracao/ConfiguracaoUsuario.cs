using GestaoGastosResidenciais.Domain.Entidades;
using GestaoGastosResidenciais.Infraestrutura.Data.Configuracao.Base;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GestaoGastosResidenciais.Infraestrutura.Data.Configuracao
{
	// ─── ConfiguracaoUsuario ───────────────────────────────────────────────────────────────────
	// Mapeamento da entidade Usuario para a tabela "usuarios"

	public class ConfiguracaoUsuario : ConfiguracaoBase<UsuarioEntity>
    {
        protected override void ConfigurarEntidades(
            EntityTypeBuilder<UsuarioEntity> builder)
        {
            builder.ToTable("usuarios");

			builder.Property(x => x.Username)
				.IsRequired()
				.HasMaxLength(100);

			builder.HasIndex(x => x.Username)
				.IsUnique();

			builder.Property(x => x.SenhaHash)
				.IsRequired()
				.HasMaxLength(255);

			builder.Property(x => x.TokenDeAtualizacao)
				.HasMaxLength(500);

			builder.Property(x => x.ExpiracaoTokenAtualizacao);
		}
    }
}
