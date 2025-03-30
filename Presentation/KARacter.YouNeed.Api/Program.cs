using Microsoft.OpenApi.Models;
using KARacter.YouNeed.Application;
using KARacter.YouNeed.Infrastructure;
using KARacter.YouNeed.Persistence;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// Konfiguracja CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins(
            "http://localhost:3000",
            "http://localhost:3001",
            "http://youneed.com.pl",
            "https://youneed.com.pl"
        )
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
    });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDistributedMemoryCache();


builder.Services.AddHttpContextAccessor();
builder.Services.AddJwtAuthorization(builder.Configuration);
builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddPersistence(builder.Configuration);
builder.Services.AddApplication();

builder.Services.AddCustomHealthChecks(builder.Configuration);

builder.Services.AddSwaggerGen(
    options =>
    {
        options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo()
        {
            Title = "KARacter.YouNeed",
            Version = "v1",
            Description = "A simple web application",
            Contact = new OpenApiContact
            {
                Name = "KARacterType",
                Email = "karacter.type@gmail.com",
            },
        });

        options.CustomSchemaIds(type => type.ToString());

        options.CustomSchemaIds(type => type.ToString());
        var filePath = Path.Combine(AppContext.BaseDirectory, "KARacter.YouNeed.Api.xml");
        options.IncludeXmlComments(filePath);
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Dodanie CORS middleware przed innymi middleware'ami
app.UseCors();

app.ConfigureMiddlewares();

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapGet("/home", () => "/swagger/index.html");

app.Run();