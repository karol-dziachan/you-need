# Wymagania Biznesowe Systemu Rezerwacji

## 1. Dostęp dla Gości (Niezalogowanych Użytkowników):
- Przeglądanie strony głównej
- Wyszukiwanie usług
- Przeglądanie profili firm
- Przeglądanie dostępnych terminów
- Przeglądanie opinii
- Dostęp do cenników
- Przeglądanie portfolio firm

## 2. System Logowania:
### Metody logowania:
- Email i hasło
- Konto Google
- Konto Facebook

### Wymagania dla hasła:
- Minimum 8 znaków
- Przynajmniej jedna duża litera
- Przynajmniej jedna cyfra
- Możliwość resetowania hasła
- Automatyczne wylogowanie po określonym czasie nieaktywności

## 3. Dostęp dla Zalogowanych Klientów:
- Wszystkie funkcje dostępne dla gości
- Możliwość dokonywania rezerwacji
- Zarządzanie własnym profilem
- Historia rezerwacji
- Zapisywanie ulubionych usługodawców
- Wystawianie opinii
- Dostęp do historii płatności
- Zarządzanie powiadomieniami

## 4. Bezpieczeństwo:
- Tokeny JWT do autoryzacji
- Automatyczne odświeżanie tokenów
- Szyfrowanie danych wrażliwych
- Zabezpieczenie przed atakami CSRF
- Limity prób logowania
- Weryfikacja dwuetapowa dla krytycznych operacji

## 5. Sesje i Autoryzacja:
- Możliwość jednoczesnego logowania na wielu urządzeniach
- Możliwość wylogowania ze wszystkich urządzeń
- Przechowywanie historii logowań
- Powiadomienia o nowych logowaniach
- Blokada konta po podejrzanych aktywnościach

## 6. Uprawnienia:
### Role systemowe:
- Gość (niezalogowany)
- Klient (zalogowany)
- Pracownik
- Manager
- Administrator firmy
- Administrator systemu

## 7. Proces Rejestracji:
### Dla klientów indywidualnych:
- Imię i nazwisko
- Adres email
- Numer telefonu
- Adres (opcjonalnie)

### Dla firm:
- Nazwa firmy
- NIP
- Adres firmy
- Dane kontaktowe
- Weryfikacja danych firmowych

- !WAŻNE - FIRMA MOŻE MIEĆ PRACOWNIKÓW!

## 8. Wymagania RODO:
- Zgoda na przetwarzanie danych osobowych
- Możliwość eksportu własnych danych
- Możliwość usunięcia konta
- Zarządzanie zgodami marketingowymi
- Polityka prywatności
- Regulamin usług

## 9. Zarządzanie Czasem Pracy:
### Konfiguracja czasu usług:
- Możliwość definiowania długości przerw między usłagami
  - 15 minut
  - 30 minut
  - 45 minut
  - 60 minut
- Możliwość personalizacji czasu trwania usługi
- Definiowanie dni i godzin pracy
- Zarządzanie dostępnością pracowników
- Możliwość definiowania w jakim przedziale pracujemy
- Mozżliwość definiowania ile trwa każda usługa

### Harmonogram:
- Wybór osoby, u której chcemy zarezerwować usługę
- Podgląd zajętych i wolnych terminów
- Informacja o czasie potrzebnym na wykonanie usługi
- Informacja o osobie wykonującej usługę

## 10. System Płatności:
### Metody płatności:
- Płatność jednorazowa:
  - Przelew tradycyjny
  - BLIK
  - Inne metody płatności online
- System subskrypcyjny:
  - Płatności cykliczne
  - Zarządzanie subskrypcjami
  - Automatyczne odnowienia

## 11. Zarządzanie Ofertą:
### Tworzenie własnej oferty:
- Przejście do kreatora oferty
- Wybór branży działalności
- Możliwość dodania opisu swojej oferty
- Dodawanie zdjęć do oferty
- Oznaczanie usług jako "stałych" lub "tymczasowych"

### Zarządzanie usługami:
- Wyświetlanie linijek z promocjami "stałych" usług
- Wyświetlanie linijek z promocjami "tymczasowymi"
- Możliwość dodawania nowych usług z określeniem:
  - Ceny
  - Czasu wykonania
  - Opisu
  - Kategorii
- Dodawanie notatek do usług (np. informacje o wymaganiach lub przeciwwskazaniach)
- Możliwość przekazania swoim klientom informacji o wykonaniu danej usługi

### Cennik i promocje:
- Definiowanie ceny za godzinę pracy
- Możliwość ustawiania różnych cen dla różnych pracowników
- Zarządzanie promocjami czasowymi
- Definiowanie warunków promocji

### Kategoryzacja usług:
- Przypisywanie usług do kategorii
- Dodawanie opisów do kategorii
- Możliwość dodania specjalizacji
- Zarządzanie hierarchią kategorii

## 12. Analityka i Raportowanie:
### Raporty biznesowe:
- Generowanie raportów w formacie PDF
- Różne zakresy czasowe (dzień/tydzień/miesiąc/rok)
- Typy raportów:
  - Przychody i trendy sprzedażowe
  - Statystyki rezerwacji
  - Popularność usług
  - Efektywność pracowników
  - Zadowolenie klientów
- Eksport danych do różnych formatów
- Wykresy i wizualizacje danych
- Możliwość tworzenia raportów niestandardowych

## 13. System Komunikacji:
### Chat i Powiadomienia:
- Wbudowany komunikator między usługodawcą a klientem
- Historia konwersacji
- Powiadomienia o nowych wiadomościach
- Możliwość wysyłania załączników
- Automatyczne powiadomienia o statusie rezerwacji

### Chatbot Asystent:
- Predefiniowane pytania i odpowiedzi
- Drzewo decyzyjne dla typowych zapytań
- Możliwość przekierowania do obsługi
- Personalizacja odpowiedzi
- Statystyki najczęstszych zapytań

## 14. Portfolio i Prezentacja:
### Profil Firmy:
- Galeria zdjęć z realizacji
- Możliwość kategoryzacji portfolio
- Opisy wykonanych usług
- Prezentacja zespołu
- Certyfikaty i wyróżnienia
- Integracja z mediami społecznościowymi

### Zarządzanie Treścią:
- Edytor tekstu dla opisów
- System tagowania zdjęć
- Zarządzanie kolejnością wyświetlania
- Możliwość ukrywania wybranych elementów

## 15. Zarządzanie Finansami:
### Saldo i Rozliczenia:
- Podgląd aktualnego salda
- Historia transakcji
- Możliwość wypłaty środków na konto bankowe
- Ustawianie automatycznych wypłat
- Generowanie dokumentów księgowych

## 16. Ustawienia Biznesowe:
### Informacje Podstawowe:
- Dane firmy
- Logo i identyfikacja wizualna
- Godziny otwarcia
- Lokalizacja i zasięg działania
- Usługi mobilne

### Konfiguracja Usług:
- Zarządzanie kategoriami usług
- Definiowanie udogodnień
- Formularze dla klientów
- Zasady bezpieczeństwa i regulaminy

### Zarządzanie Pracownikami:
- Jedno konto główne firmy
- Dodawanie wielu pracowników
- Zarządzanie uprawnieniami
- Profile pracowników
- Harmonogramy pracy

## 17. Kalendarz:
### Funkcjonalności:
- Nowoczesny, responsywny interfejs
- Widok dzienny/tygodniowy/miesięczny
- Kolorystyczne oznaczenie różnych typów wizyt
- Drag & drop dla zarządzania terminami
- Filtry i wyszukiwanie
- Synchronizacja z zewnętrznymi kalendarzami

### Zarządzanie Terminami:
- Blokowanie terminów
- Definiowanie przerw
- Zarządzanie dostępnością
- Automatyczne powiadomienia
- Historia zmian

## 18. Ustawienia Dodatkowe:
### Funkcje Specjalne:
- System kart podarunkowych
- Zarządzanie rezerwacjami online
- Konfiguracja subskrypcji
- Integracje z zewnętrznymi systemami
- Kopie zapasowe danych