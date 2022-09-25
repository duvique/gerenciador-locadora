#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 5000
EXPOSE 5001

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["locadora/locadora.csproj", "locadora/"]
RUN dotnet restore "locadora/locadora.csproj"
COPY . .
WORKDIR "/src/locadora"
RUN dotnet build "locadora.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "locadora.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "locadora.dll"]