using GestaoGastosResidenciais.Domain.Entidades;
using GestaoGastosResidenciais.Infraestrutura.Data.Configuracao.Base;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace GestaoGastosResidenciais.Infraestrutura.Data.Configuracao
{
    public class ConfiguracaoPessoa : ConfiguracaoBase<Pessoa>
    {
        protected override void ConfigurarEntidades(EntityTypeBuilder<Pessoa> builder)
        {
            builder.ToTable("pessoas");

            builder.Property(x => x.Nome)
                .IsRequired()
                .HasMaxLength(200);
            builder.Property(x => x.Idade);

            builder.HasMany(x => x.Transacoes)
                .WithOne(x => x.Pessoa)
                .HasForeignKey(x => x.PessoaId);
        }
    }
}
