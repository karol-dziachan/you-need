FROM mcr.microsoft.com/dotnet/sdk:8.0 AS development
WORKDIR /app
COPY . .
RUN dotnet restore

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS production
WORKDIR /app
COPY --from=development /app/Presentation/KARacter.YouNeed.Api/bin/Release/net8.0/publish .
ENTRYPOINT ["dotnet", "KARacter.YouNeed.Api.dll"] 