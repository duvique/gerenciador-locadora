using locadora.Database;
using locadora.Servicos.Cliente;
using locadora.Servicos.Filme;
using locadora.Servicos.Locacao;
using locadora.Servicos.Relatorio;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Configuration;
using System.Diagnostics;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

var corsPolicy = "_policy";


builder.Services.AddCors(options =>
{
    options.AddPolicy(corsPolicy,
                          policy =>
                          {
                              policy.WithOrigins("*")
                                                  .AllowAnyHeader()
                                                  .AllowAnyMethod();
                          });
});



// Add services to the container.

//Add dbContext to application

var _config = builder.Configuration;
var dbHost = _config["DBHOST"] ?? "localhost";
var dbPort = _config["DBPORT"] ?? "3306";
var dbUser = _config["MYSQL_USER"] ?? _config.GetConnectionString("MYSQL_USER") ;
var dbPw = _config["MYSQL_PASSWORD"] ?? _config.GetConnectionString("MYSQL_PW");
var dbName = _config["MYSQL_DATABASE"] ?? _config.GetConnectionString("MYSQL_DATABASE");

string _cnString = $"server={dbHost}; Port={dbPort}; database={dbName}; Uid={dbUser}; Pwd={dbPw}";

builder.Services.AddDbContext<LocadoraContext>(
        opts => opts.UseMySql(
            _cnString,
            ServerVersion.AutoDetect(_cnString)
        )
);

// Cusom entities services

builder.Services.AddScoped<IServicoFilme, ServicoFilme>();
builder.Services.AddScoped<IServicoCliente, ServicoCliente>();
builder.Services.AddScoped<IServicoLocacao, ServicoLocacao>();
builder.Services.AddScoped<IServicoRelatorio, ServicoRelatorio>();

builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.SuppressModelStateInvalidFilter = true;
});

builder.Services.AddControllers()
    .AddNewtonsoftJson(options =>
    {
        options.SerializerSettings.NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore;
    });

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseExceptionHandler("/error");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    //app.UseExceptionHandler("/error");
    //app.UseDeveloperExceptionPage();
    app.UseMigrationsEndPoint();
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    //app.UseExceptionHandler("/error");
    app.UseHsts();
  
}


using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    var context = services.GetRequiredService<LocadoraContext>();
    context.Database.EnsureCreated();
    Initializer.Initialize(context);
}


app.UseHttpsRedirection();

app.UseCors(corsPolicy);


app.UseAuthorization();

app.MapControllers();

app.Run();
