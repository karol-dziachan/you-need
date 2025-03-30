using System.Reflection;
using FluentValidation;
using KARacter.YouNeed.Application.Behaviours;
using Microsoft.Extensions.DependencyInjection;
using MediatR;

namespace KARacter.YouNeed.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            var assembly = Assembly.GetExecutingAssembly();
            
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(assembly));
            services.AddAutoMapper(assembly);
            services.AddValidatorsFromAssembly(assembly);
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehaviour<,>));

            return services;
        }
    }
}
