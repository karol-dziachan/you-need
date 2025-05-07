#!/bin/bash

echo "🔧 Naprawa zależności .NET dla Cursor..."

# Sprawdzenie czy dotnet jest zainstalowany
if ! command -v dotnet &> /dev/null; then
    echo "❌ .NET SDK nie jest zainstalowany. Instalowanie..."
    wget https://packages.microsoft.com/config/ubuntu/$(lsb_release -rs)/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
    sudo dpkg -i packages-microsoft-prod.deb
    rm packages-microsoft-prod.deb
    sudo apt-get update
    sudo apt-get install -y dotnet-sdk-8.0
fi

# Instalacja dodatkowych zależności systemowych
echo "📦 Instalacja zależności systemowych..."
sudo apt-get install -y \
    libicu-dev \
    libssl-dev \
    libkrb5-dev \
    liblttng-ust-dev \
    zlib1g-dev \
    libssl1.1 \
    libkrb5-3 \
    libicu70

# Konfiguracja NuGet
echo "⚙️  Konfiguracja NuGet..."
mkdir -p ~/.nuget/NuGet
cat > ~/.nuget/NuGet/NuGet.Config << EOL
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <add key="nuget.org" value="https://api.nuget.org/v3/index.json" protocolVersion="3" />
  </packageSources>
  <disabledPackageSources>
    <clear />
  </disabledPackageSources>
  <config>
    <add key="dependencyVersion" value="Highest" />
    <add key="globalPackagesFolder" value="~/.nuget/packages" />
  </config>
</configuration>
EOL

# Czyszczenie cache
echo "🧹 Czyszczenie cache .NET..."
dotnet nuget locals all --clear
rm -rf ~/.dotnet/tools
rm -rf ~/.dotnet/sdk
rm -rf ~/.dotnet/runtime
rm -rf ~/.dotnet/packs
rm -rf ~/.dotnet/shared
rm -rf ~/.nuget/packages
rm -rf ~/.nuget/plugins
rm -rf ~/.nuget/http-cache

# Restauracja pakietów
echo "📦 Restauracja pakietów NuGet..."
dotnet restore --force

# Rebuild rozwiązania
echo "🏗️  Rebuild rozwiązania..."
dotnet clean
dotnet build

# Generowanie plików projektów
echo "📄 Generowanie plików projektów..."
dotnet msbuild /t:GenerateProjectFiles

# Instalacja narzędzi .NET
echo "🛠️  Instalacja narzędzi .NET..."
dotnet tool install --global dotnet-ef
dotnet tool install --global dotnet-aspnet-codegenerator
dotnet tool install --global dotnet-watch
dotnet tool install --global dotnet-format
dotnet tool install --global dotnet-symbol
dotnet tool install --global dotnet-serve

# Aktualizacja narzędzi
echo "🔄 Aktualizacja narzędzi .NET..."
dotnet tool update --global dotnet-ef
dotnet tool update --global dotnet-aspnet-codegenerator
dotnet tool update --global dotnet-watch
dotnet tool update --global dotnet-format
dotnet tool update --global dotnet-symbol
dotnet tool update --global dotnet-serve

# Generowanie plików projektów dla Cursor
echo "🎯 Generowanie plików dla Cursor..."
for project in $(find . -name "*.csproj"); do
    echo "📝 Generowanie dla $project"
    dotnet msbuild "$project" /t:GenerateProjectFiles
done

# Czyszczenie katalogów VS Code
echo "🧹 Czyszczenie cache VS Code/Cursor..."
rm -rf ~/.vscode/extensions/ms-dotnettools.csharp-*
rm -rf ~/.vscode/extensions/ms-dotnettools.vscode-dotnet-runtime-*
rm -rf ~/.vscode/extensions/ms-dotnettools.vscodeintellicode-*

# Konfiguracja OmniSharp
echo "⚙️  Konfiguracja OmniSharp..."
mkdir -p ~/.omnisharp
cat > ~/.omnisharp/omnisharp.json << EOL
{
    "RoslynExtensionsOptions": {
        "enableAnalyzersSupport": true
    },
    "FormattingOptions": {
        "enableEditorConfigSupport": true
    },
    "RenameOptions": {
        "RenameInComments": true,
        "RenameInStrings": true
    }
}
EOL

echo "✨ Naprawa zakończona!"
echo "💡 Zrestartuj Cursor, aby zmiany zostały zastosowane." 