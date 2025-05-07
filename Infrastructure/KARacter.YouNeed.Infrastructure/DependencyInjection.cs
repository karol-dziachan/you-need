using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using KARacter.YouNeed.Application.Common.Interfaces;
using KARacter.YouNeed.Infrastructure.Services;
using Microsoft.AspNetCore.Builder;
using KARacter.YouNeed.Infrastructure.Middlewares;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Http;
using System.Text.Json;
using KARacter.YouNeed.Common.Options;
using System.Security.Claims;
using Microsoft.Extensions.Logging;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;

namespace KARacter.YouNeed.Infrastructure
{
    public static class DependencyInjection
    {
        private static readonly ILogger _logger;

        static DependencyInjection()
        {
            var loggerFactory = LoggerFactory.Create(builder =>
            {
                builder.AddConsole();
            });
            _logger = loggerFactory.CreateLogger(typeof(DependencyInjection));
        }

        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<EmailSettingsOptions>(configuration.GetSection("EmailSettings"));
            services.Configure<JwtOptions>(configuration.GetSection(JwtOptions.SectionName));
            services.AddTransient<IDateTime, DateTimeService>();
            services.AddScoped<IEmailService, EmailService>();
            services.AddScoped<IJWTService, JwtService>();

            return services;
        }

        public static void ConfigureMiddlewares(this IApplicationBuilder app)
        {
            app.UseMiddleware<ExceptionHandlingMiddleware>();
        }

        public static IServiceCollection AddCustomHealthChecks(this IServiceCollection services, IConfiguration configuration)
        {
           /*services.AddHealthChecks()
            .AddSqlServer(
                configuration.GetConnectionString("DefaultConnection"),
                name: "Połączenie z bazą danych",
                failureStatus: Microsoft.Extensions.Diagnostics.HealthChecks.HealthStatus.Degraded,
                tags: new[] { "db", "mysql" }
            );*/

            return services;
        }

        public static IServiceCollection AddJwtAuthorization(this IServiceCollection services, IConfiguration configuration)
        {
            var jwtOptions = configuration.GetSection(JwtOptions.SectionName).Get<JwtOptions>();
            if (jwtOptions is null)
            {
                throw new InvalidOperationException("Brak konfiguracji JWT w appsettings.json");
            }

            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ClockSkew = TimeSpan.Zero,
                ValidIssuer = jwtOptions.Issuer,
                ValidAudience = jwtOptions.Audience,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOptions.SecretKey)),
                RequireExpirationTime = true,
                ValidateTokenReplay = false
            };

            services.AddSingleton(tokenValidationParameters);

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = tokenValidationParameters;
                options.SaveToken = true;
                options.RequireHttpsMetadata = true;
                options.MapInboundClaims = false;
                options.IncludeErrorDetails = true;

                options.Events = new JwtBearerEvents
                {
                    OnAuthenticationFailed = context =>
                    {
                        if (context.Exception.GetType() == typeof(SecurityTokenExpiredException))
                        {
                            context.Response.Headers.Add("Token-Expired", "true");
                        }
                        return Task.CompletedTask;
                    },
                    OnChallenge = context =>
                    {
                        context.HandleResponse();
                        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                        context.Response.ContentType = "application/json";

                        var result = JsonSerializer.Serialize(new
                        {
                            error = "Brak autoryzacji",
                            message = "Nie masz uprawnień do tego zasobu"
                        });

                        return context.Response.WriteAsync(result);
                    },
                    OnForbidden = context =>
                    {
                        context.Response.StatusCode = StatusCodes.Status403Forbidden;
                        context.Response.ContentType = "application/json";

                        var result = JsonSerializer.Serialize(new
                        {
                            error = "Dostęp zabroniony",
                            message = "Nie masz wymaganych uprawnień"
                        });

                        return context.Response.WriteAsync(result);
                    }
                };
            });

            services.AddAuthorization(options =>
            {
                options.AddPolicy("RequireAdminRole", policy =>
                    policy.RequireRole("Admin"));

                options.AddPolicy("RequireCustomerRole", policy =>
                    policy.RequireRole("Customer"));

                options.AddPolicy("RequireCompanyEmployeeRole", policy =>
                    policy.RequireRole("CompanyEmployee"));

                options.AddPolicy("RequireCompanyAdminRole", policy =>
                    policy.RequireRole("CompanyAdmin"));
            });

            return services;
        }
    }
}
