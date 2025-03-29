#!/bin/bash

# Sprawdź czy baza danych jest uruchomiona
if ! docker-compose -f docker-compose.db.yml ps db | grep -q "Up"; then
    echo "Uruchamiam bazę danych..."
    docker-compose -f docker-compose.db.yml up -d
fi

# Czekaj na gotowość bazy danych
echo "Czekam na gotowość bazy danych..."
until docker-compose -f docker-compose.db.yml exec db pg_isready -U karakter -d youneed; do
    sleep 1
done

# Upewnij się, że katalog z pakietami NuGet istnieje
# mkdir -p ~/.nuget/packages

# Uruchom API w tle
echo "Uruchamiam API..."
dotnet watch --project Presentation/KARacter.YouNeed.Api run --urls="http://localhost:5000" &
API_PID=$!

# Uruchom frontend w tle
echo "Uruchamiam frontend..."
cd Presentation/KARacter.YouNeed.Web
npm start &
FRONTEND_PID=$!
cd ../..

# Funkcja do zatrzymania procesów
cleanup() {
    echo "Zatrzymuję procesy..."
    kill $API_PID
    kill $FRONTEND_PID
    exit 0
}

# Przechwyć sygnał SIGINT (Ctrl+C)
trap cleanup SIGINT SIGTERM

# Czekaj na zakończenie procesów
wait 