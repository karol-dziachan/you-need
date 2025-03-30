using KARacter.YouNeed.Application;
using KARacter.YouNeed.EventProcessor.Services;
using KARacter.YouNeed.EventProcessor.Services.Handlers;
using KARacter.YouNeed.EventProcessor.Services.Interfaces;
using KARacter.YouNeed.Infrastructure;
using KARacter.YouNeed.Persistence;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Serilog;

var builder = Host.CreateDefaultBuilder(args);

builder.ConfigureServices((hostContext, services) =>
{
    // Konfiguracja CORS
    services.AddCors(options =>
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

    // Konfiguracja logowania
    Log.Logger = new LoggerConfiguration()
        .MinimumLevel.Debug()
        .WriteTo.Console()
        .CreateLogger();

    services.AddLogging(loggingBuilder =>
        loggingBuilder.AddSerilog(dispose: true));

    // Dodanie warstw aplikacji
    services.AddApplication();
    services.AddPersistence(hostContext.Configuration);
    services.AddInfrastructure(hostContext.Configuration);

    // Rejestracja serwisów
    services.AddScoped<IEventHandlerFactory, EventHandlerFactory>();
    services.AddScoped<ServiceProviderRegisteredEventHandler>();
    services.AddHostedService<EventProcessorService>();
});

var host = builder.Build();

// Konfiguracja middleware'ów
if (host is IApplicationBuilder app)
{
    app.UseCors();
}

await host.RunAsync();