# Quiz Angielski PRO — Quiz v0.2

**Etap 1: kolorowe kafelki menu trybów (`category-screen`).**
Baza: Quiz v0.1. Zmiany ograniczone wyłącznie do `index.html` i `styl.css`,
zgodnie z zatwierdzonym zakresem.

## Co się zmieniło

1. **`category-screen` przebudowany na kolorowe kafelki** (nowa klasa
   `category-screen-v2` na istniejącym `#category-screen` — stara klasa/ID
   zostały, więc to jest dodatkowa warstwa, nie zamiana).
2. **6 głównych kafelków „jak w grze”** — ikona, tytuł, krótki opis, gwiazdka,
   własny kolor gradientu dla każdego trybu:
   - 🎯 Dzisiejszy trening — Ćwicz każdego dnia
   - 💪 Trudne słowa — Podejmij wyzwanie
   - 🧱 Fundamenty — Zbuduj podstawy
   - 🗣 Powiedz — Mów śmiało
   - 🎭 Dialogi — Rozmawiaj jak podróżnik
   - 💣 Bombowy Sprint — Czasówka pełna emocji
3. **Mniejszy, drugi rząd „Więcej trybów”** — Uzupełnij / Napisz / Liczby,
   żeby nic nie zniknęło z aplikacji.
4. Numer wersji w karcie startowej zmieniony z `Quiz v0.1` na `Quiz v0.2`
   (sam tekst — bez zmiany wyglądu/CSS ekranu startowego).
5. Cache-busting `styl.css?v=quiz-v02` (bo treść CSS faktycznie się zmieniła).
   `skrypt.js` i `apk-fix.js` zostały przy `?v=quiz-v01`, bo ich treść się
   nie zmieniła — nie ma sensu wymuszać ponownego pobrania niezmienionego pliku.

## ⚠️ Ważna decyzja, którą podjąłem i o której musisz wiedzieć

W obecnej logice (`skrypt.js`) **nie istnieją** tryby `Fundamenty` ani `Dialogi`
— to nazwy z Twojego docelowego mockupu, ale w kodzie nie ma takich kategorii
(`selectCategory()` ich nie obsługuje). Żeby nie ruszać `skrypt.js` (zgodnie
z zakresem), zamiast wymyślać nową logikę **podpisałem nowymi nazwami istniejące,
najbliższe znaczeniowo tryby**:

| Kafelek (nazwa z mockupu) | Realnie woła | Co to dotychczas było |
|---|---|---|
| 🧱 Fundamenty | `selectCategory('slowa')` | dotychczasowy tryb „🔤 Słowa” |
| 🎭 Dialogi | `selectCategory('zdania')` | dotychczasowy tryb „💬 Zdania” |

Pozostałe 4 kafelki (`Dzisiejszy trening`, `Trudne słowa`, `Powiedz`,
`Bombowy Sprint`) wołają dokładnie te same funkcje co dotychczas — to czysty
restyling, bez reinterpretacji.

Jeśli to mapowanie Ci nie pasuje (np. wolisz, żeby „Fundamenty” faktycznie
uczyło czego innego niż „Słowa”), to jest do zmiany w jednej linijce
`onclick` w `index.html` — daj znać.

## Czego NIE zmieniono (potwierdzone porównaniem plików — patrz niżej)

- `skrypt.js` — **bitowo identyczny** z Quiz v0.1 (zweryfikowane sumą md5).
- `apk-fix.js`, `manifest.json`, `service-worker.js`, `pobierz.html`,
  `icon-192.png`, `icon-512.png` — bez zmian (zweryfikowane sumą md5).
- Baza słów, zdania, dialogi z lekcji, punktacja, system XP/odznak, mikrofon —
  bez zmian (bo to wszystko żyje w `skrypt.js`, którego nie dotknięto).
- Wygląd i CSS ekranu startowego V6 — bez zmian (tylko tekst wersji).
- Nazwy/branding — bez zmian, bez „Petarda”.

## Nowe klasy CSS (dla porządku, gdyby ktoś wracał do tego za miesiąc)

`category-screen-v2`, `.mode-tiles`, `.mode-tile`, `.mode-tile-icon`,
`.mode-tile-text`, `.mode-tile-title`, `.mode-tile-subtitle`,
`.mode-tile-star`, `.mode-tile-daily/-trudne/-funda/-powiedz/-dialogi/-sprint`,
`.mode-tiles-secondary-label`, `.mode-tiles-secondary`, `.mode-tile-secondary`.

Wszystkie reguły są zaczepione o `#category-screen.category-screen-v2 ...`
(ID + klasa), żeby na 100% nie wyciekły na inne ekrany i żeby wygrywały
specyficznością z istniejącymi regułami `.btn:hover` z poprzednich wersji.
