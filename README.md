# Quiz Angielski PRO — split-v1

To jest ta sama sprawdzona wersja quizu, tylko podzielona na mniejsze pliki:

- `index.html` — szkielet strony i podpięcia plików
- `style.css` — cały wygląd
- `skrypt.js` — logika gry + obecna baza danych
- `manifest.json` — PWA
- `service-worker.js` — bezpieczniejszy cache dla GitHub Pages
- `apk-fix.js` — plik pomocniczy dla APK
- `pobierz.html` — strona pobierania APK

Na tym etapie nie rozdzielałem jeszcze `baza.js`, żeby nie ryzykować błędów w działającej grze. Następny krok może być: wydzielić bazę danych ze `skrypt.js` do `baza.js`.
