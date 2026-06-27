# Quiz Angielski PRO — Quiz v0.3.1 (hotfix)

**Hotfix: kompaktowy ekran pytania na telefonie.**
Baza: Quiz v0.3. Zmiany ograniczone do CSS ekranu pytania
(`#game-screen.game-screen-v2`) + rutynowe podbicie wersji/cache.
`skrypt.js` **bez zmian** — zweryfikowane sumą md5.

## Problem

Karta pytania, czcionka pytania i odstępy z v0.3 były za duże na telefonie —
4. odpowiedź i przycisk powrotu uciekały poza widoczny obszar ekranu.

## Co zmniejszono (nowy `@media (max-width: 520px)`, zastąpił poprzedni,
zbyt skromny blok `@media (max-width: 480px)` dla tego ekranu)

| Element | v0.3 (mobile) | v0.3.1 (≤520px) |
|---|---|---|
| `.question-box` padding | 22px 16px 24px | **18px 16px 20px** |
| `.question-box` min-height | 160px (wymuszony) | **auto** (dopasowuje się do treści) |
| `.question-box` margin | 8px 0 20px (z bazy) | **4px 0 8px** |
| `.main-question-text` font-size | clamp(2.1–3.05rem) ≈ 34–49px | **clamp(1.6–2.3rem) ≈ 26–37px** |
| `#options-container` margin-top | 12px (z bazy) | **8px** |
| `#options-container` gap (odstęp między odpowiedziami) | 14px | **12px** |
| `#options-container .btn` padding | 16px 16px | **14px 16px** |
| `.progress-card` padding / margin-bottom | 15px 18px / 14px | **11px 14px / 8px** |
| `.progress-track` wysokość | 16px | **12px** |
| `#stage-btn` margin-top | 20px (z bazy) | **10px** |
| `.back-btn` (w game-screen) margin-top / padding / font | 14px / 12px 18px / 0.95rem | **8px / 10px 16px / 0.88rem** |

Wszystkie wartości w zadeklarowanym zakresie z Twojej specyfikacji
(karta 18–20px padding, pytanie ≈26–37px, odpowiedzi 14–16px padding,
odstęp między odpowiedziami 12px).

## Co NIE się zmieniło

- **Desktop/tablet (>520px)** — zostają większe, „mięsiste” wartości z v0.3,
  zgodnie z Twoją uwagą „na desktopie może zostać większe”.
- `skrypt.js` — **bitowo identyczny** z v0.3 (zweryfikowane md5).
- `apk-fix.js`, `manifest.json`, `pobierz.html`, ikony — bez zmian.
- Logika gry, losowanie odpowiedzi, punktacja XP, mikrofon, dialogi,
  działanie trybów — bez zmian.
- Ekran startowy V6 i ekran wyboru trybu (`category-screen-v2`) — bez zmian
  (ten hotfix dotyczy wyłącznie ekranu pytania).

## Wersja i cache

- Widoczny numer wersji: `🇬🇧 Angielski turystyczny PRO • Quiz v0.3.1`.
- `styl.css?v=quiz-v031` (treść CSS się zmieniła).
- `service-worker.js`: `CACHE_NAME = "quiz-angielski-v0-3-1"`, lista app shell
  zaktualizowana do `styl.css?v=quiz-v031` (skrypt.js/apk-fix.js zostają przy
  `?v=quiz-v01`, bo ich treść się nie zmieniła).
