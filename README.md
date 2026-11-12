# Inwentaryzacja energetyczna

Aplikacja w przeglądarce telefonu do zbierania danych w terenie do świadectw charakterystyki energetycznej i audytów
energetycznych: formularze, zdjęcia z naniesionymi wymiarami (okna, ściany), szkic rzutu, eksport pakietu, raportu
HTML i CSV.

Adres: https://tadeuszmederski-ux.github.io/inwentaryzacja/

## Prywatność

- Aplikacja **nie wysyła żadnych danych**: nie ma serwera, konta, analityki ani zewnętrznych skryptów i czcionek
  (nagłówek Content-Security-Policy pozwala tylko na pliki tej strony).
- Dane (budynki, zdjęcia, wymiary) są zapisywane **wyłącznie w pamięci przeglądarki telefonu** (IndexedDB) i opuszczają
  urządzenie tylko wtedy, gdy użytkownik sam wyeksportuje plik.
- Service worker przechowuje w pamięci podręcznej tylko pliki aplikacji z tej strony (praca bez internetu); danych
  użytkownika nie przechowuje.
- To repozytorium zawiera wyłącznie pustą aplikację i dane publiczne.

## Instalacja

Android (Chrome): otwórz adres → menu ⋮ → „Zainstaluj aplikację”. iPhone (Safari): Udostępnij → „Do ekranu
początkowego”.

## Licencja

Zob. [LICENCJA.txt](LICENCJA.txt).

Wersja 1.2 (2026-11-12). Format pakietu eksportu: „inwentaryzacja-energetyczna”, wersja formatu 2.
