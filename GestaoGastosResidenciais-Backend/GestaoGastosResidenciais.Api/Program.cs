using GestaoGastosResidenciais.Infraestrutura.Data.Contexto;
using GestaoGastosResidenciais.IoC;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddInjecaoDependencia(builder.Configuration);

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
	var db = scope.ServiceProvider.GetRequiredService<Contexto>();
	db.Database.Migrate();
}

//app.UseHttpsRedirection();

app.UseCors("GestaoGastosFront");

app.UseAuthorization();

app.MapControllers();

app.Run();
