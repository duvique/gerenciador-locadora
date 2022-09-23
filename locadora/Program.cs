using locadora.Database;
using Microsoft.EntityFrameworkCore;
using System.Configuration;
using System.Diagnostics;

var builder = WebApplication.CreateBuilder(args);



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
builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseMigrationsEndPoint();
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseExceptionHandler("/Error");
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

app.UseAuthorization();

app.MapControllers();

app.Run();
