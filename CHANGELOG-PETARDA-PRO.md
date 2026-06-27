# Quiz Angielski — Petarda Premium PRO (v7)

## 🔴 Krytyczne poprawki

1. **Mikrofon i wymowa w wersji APK nie działały poprawnie.**
   Plik `apk-fix.js` (który podmienia funkcje mikrofonu i TTS na wtyczki natywne
   Capacitor w aplikacji Android) **istniał w repozytorium, ale nigdy nie był
   wczytywany** w `index.html`. W praktyce aplikacja APK korzystała z Web Speech
   API z przeglądarki, którego w naturalnym WebView Capacitora zwykle nie ma —
   tryb „🗣 Powiedz" mógł więc nie działać albo działać niestabilnie na telefonie.
   **Naprawione:** dodano `<script src="./apk-fix.js?v=ppv7"></script>` po
   `skrypt.js` w `index.html` oraz w cache `service-worker.js`.

2. **Błędne wskazywanie słowa do uzupełnienia, gdy jedno słowo jest częścią innego**
   (np. „go” w „going”). Tryby „Uzupełnij” i „Napisz” podstawiały lukę metodą
   wyszukiwania tekstu w całym zdaniu (`string.replace`), co przy słowach-podciągach
   mogło trafić w złe miejsce. **Naprawione:** podstawianie luki działa teraz po
   indeksie konkretnego słowa w zdaniu, a nie po wyszukiwaniu tekstu globalnie.

## 🟢 Nowości Premium PRO

- **Przełącznik dźwięku 🔊/🔇** na ekranie startowym — wyłącza syntezator głosu
  (TTS) i sygnały dobrej/błędnej odpowiedzi, zapisywany w `localStorage`
  (`quiz_sound_enabled`). Respektowany również w wersji APK (apk-fix.js).
- Oznaczenie **PETARDA PREMIUM PRO** na ekranie startowym.
- Podbita i ujednolicona wersja cache/plików statycznych do `v7` we wszystkich
  miejscach (`index.html`, `service-worker.js`) — wymuszony świeży cache po
  aktualizacji zgodnie z dotychczasową praktyką.
- Nazwa i opis w `manifest.json` zaktualizowane.

## ✅ Co zostało bez zmian (świadomie)

- Cała logika gry, baza słówek/zdań, system XP/poziomów/odznak/streaków,
  lekcje, sprint, tryb współpracy „Graj razem” — bez zmian funkcjonalnych,
  żeby nie ryzykować regresji w działającej już logice.
- Warstwy stylów `start-screen-v2…v6` w `styl.css` zostały zachowane (kaskadowo
  się nadpisują i działają poprawnie) — uporządkowanie ich w jeden czysty zestaw
  klas to osobna, większa zmiana kosmetyczna, którą lepiej zrobić jako kolejny
  krok, gdy będzie pewność, że nic nie wymaga już warstwy v2-v5 (np. stary build
  APK, który mógłby trzymać się starszych klas w cache).

## Co warto rozważyć w następnej iteracji

- Scalenie `start-screen-v2…v6` w jedną, czystą wersję CSS (redukcja ~kilkuset
  linii powtórzeń).
- Osobny ekran „Statystyki / Mój postęp” z historią odznak i wykresem XP.
- Synchronizacja profili między urządzeniami (obecnie tylko `localStorage` na
  telefonie/przeglądarce — zgubiony telefon = zgubiony postęp).
