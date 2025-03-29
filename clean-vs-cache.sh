#!/bin/bash

echo "🧹 Czyszczenie cache Visual Studio..."

# Katalogi do wyczyszczenia
VS_CACHE_DIRS=(
    "$HOME/.vs"
    "$HOME/.local/share/Microsoft/VisualStudio"
    "$HOME/.local/share/Microsoft/VisualStudioServices"
    "$HOME/.config/Microsoft/VisualStudio"
    "$HOME/.config/Microsoft/VisualStudioServices"
    "$HOME/.cache/Microsoft/VisualStudio"
    "$HOME/.cache/Microsoft/VisualStudioServices"
)

# Katalogi rozwiązania do wyczyszczenia
SOLUTION_DIRS=(
    "bin"
    "obj"
    ".vs"
    "Debug"
    "Release"
    "x64"
    "x86"
    "AnyCPU"
)

# Czyszczenie katalogów cache VS
for dir in "${VS_CACHE_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        echo "🗑️  Usuwanie $dir"
        rm -rf "$dir"
    fi
done

# Czyszczenie katalogów rozwiązania
find . -type d \( \
    -name "bin" -o \
    -name "obj" -o \
    -name ".vs" -o \
    -name "Debug" -o \
    -name "Release" -o \
    -name "x64" -o \
    -name "x86" -o \
    -name "AnyCPU" \
\) -exec rm -rf {} +

# Czyszczenie plików tymczasowych
echo "🧹 Czyszczenie plików tymczasowych..."
find . -type f \( \
    -name "*.user" -o \
    -name "*.suo" -o \
    -name "*.cache" -o \
    -name "*.dll" -o \
    -name "*.pdb" -o \
    -name "*.exe" -o \
    -name "*.cache" -o \
    -name "*.tmp" -o \
    -name "*.temp" \
\) -delete

# Czyszczenie pakietów NuGet
echo "🧹 Czyszczenie cache NuGet..."
# sudo rm -rf "$HOME/.nuget/packages"
# sudo rm -rf "$HOME/.nuget/plugins"
# sudo rm -rf "$HOME/.nuget/http-cache"

echo "✨ Czyszczenie zakończone!"
echo "💡 Pamiętaj o ponownym uruchomieniu Visual Studio." 