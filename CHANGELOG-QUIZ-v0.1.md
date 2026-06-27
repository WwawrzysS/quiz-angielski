# Quiz Angielski PRO — Quiz v0.1

Baza: aktualna działająca wersja po ekranie startowym **V6** (bez zmian wyglądu,
CSS startu i brandingu).

## Co dodano / naprawiono

1. **Numer wersji w karcie startowej.**
   Dopisano `• Quiz v0.1` do istniejącego napisu „🇬🇧 Angielski turystyczny PRO”
   w `index.html`. Sama karta, jej CSS i layout — bez zmian.

2. **Dodano/naprawiono wczytywanie `apk-fix.js` w `index.html`.**
   Plik `apk-fix.js` (podmienia mikrofon i TTS na wtyczki natywne Capacitor
   w wersji APK) istniał w repo, ale nie był wczytywany w `index.html`. Dodano:
   ```html
   <script src="./skrypt.js?v=quiz-v01"></script>
   <script src="./apk-fix.js?v=quiz-v01"></script>
   ```
   `apk-fix.js` ma wbudowane zabezpieczenie `isNativeApp()` — w wersji
   WWW/PWA (poza aplikacją Capacitor) plik kończy działanie natychmiast
   i nic nie nadpisuje, więc mikrofon przeglądarki w wersji web działa
   tak jak dotychczas. W APK zacznie poprawnie podmieniać mikrofon/TTS na
   wersję natywną.

3. **Poprawiony cache PWA / GitHub Pages (`service-worker.js`).**
   * Nazwa cache podbita do `quiz-angielski-v0-1` — stary cache (`...-start-v6`)
     zostanie automatycznie usunięty przy aktywacji nowego service workera.
   * Strategia cache **nie zmieniła się** i pozostaje nieagresywna: HTML/CSS/JS
     są nadal pobierane najpierw z sieci (network-first) z fallbackiem do
     cache offline — dzięki temu aktualizacje na GitHub Pages wchodzą szybko,
     a PWA nie „zamraża" starej wersji.
   * `apk-fix.js?v=quiz-v01` dodany do listy plików wstępnie cache'owanych
     (app shell), tak jak `skrypt.js` i `styl.css`.

4. **Poprawka luk w trybach „Uzupełnij” i „Napisz”.**
   Podstawianie brakującego słowa w zdaniu działało wcześniej przez
   wyszukiwanie tekstu w całym zdaniu (`sentence.replace(slowo, "____")`),
   co przy słowach-podciągach (np. „go” będące częścią „going”) mogło
   trafić w złe miejsce. Teraz luka jest wstawiana po indeksie konkretnego
   słowa w zdaniu. Zmiana jest izolowana do tworzenia luki w
   `prepareClozeTest()` i `prepareWriteTest()` — nie dotyka sprawdzania
   odpowiedzi, punktacji ani żadnego innego trybu.

## Co NIE zostało zmienione (świadomie)

- Wygląd i CSS ekranu startowego V6.
- Branding — bez zmiany nazw, bez „Petarda Premium PRO”.
- Logika gry, baza słów i zdań, lekcje, dialogi, punktacja, system XP/odznak/streaków.
- Tryb mikrofonu w wersji web (Web Speech API) — działa jak dotychczas.
- `manifest.json` — treść bez zmian.
- Plik `apk/Quiz-Angielski-PRO-latest.apk` — **nie podmieniony**, bo nie był
  świeżo zbudowany z tych źródeł. Folder `apk/` zostaje z dotychczasową
  zawartością.

## Co przejęto z paczki „Petarda Premium PRO”, a czego nie

**Przejęto (tylko te konkretne poprawki techniczne):**
- ładowanie `apk-fix.js` w `index.html` z cache-bustingiem,
- podbicie/uporządkowanie cache w `service-worker.js`,
- poprawkę luk w „Uzupełnij”/„Napisz”.

**Nie przejęto (świadomie odrzucone z tamtej paczki):**
- rebrandingu „PETARDA PREMIUM PRO” i znaczka PRO na starcie,
- przełącznika dźwięku 🔊/🔇,
- zmian w CSS ekranu startowego,
- zmiany `manifest.json` (nazwa/opis aplikacji).

Fallback dla `confetti` (`if (window.confetti) confetti(...)`) **już istniał
w wersji V6** i jest bezpieczny — nie wymagał żadnej poprawki.
