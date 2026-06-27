# Quiz Angielski PRO — Quiz v0.3.2 (hotfix #2)

**Hotfix: jeszcze mocniejsza kompresja ekranu pytania na telefonie.**
Baza: Quiz v0.3.1. Zmiany w CSS `#game-screen.game-screen-v2` (mobile) +
rutynowe podbicie wersji/cache. `skrypt.js` **bez zmian** — zweryfikowane md5.

## Prawdziwa przyczyna ucinania (techniczne wyjaśnienie)

Baza CSS ma na `.quiz-container` (a `#game-screen` jest też `.quiz-container`):

```css
.quiz-container {
    max-height: calc(100vh - 40px);
    overflow: hidden;
}
```

To **nie jest scroll** — to twarde przycinanie. Jeśli suma wysokości całej
zawartości ekranu przekracza ten limit, nadmiar po prostu **znika z widoku**,
bez paska przewijania. Dlatego mimo poprawek w v0.3.1 przycisk „⬅ Zmień tryb”
nadal był ucięty — suma wysokości wszystkich elementów wciąż przekraczała
limit. Ta reguła `.quiz-container` dotyczy wszystkich ekranów (nie tylko
pytania), więc **została nietknięta** — poprawka działa wyłącznie przez
zmniejszenie zawartości w obrębie `#game-screen.game-screen-v2`, żeby
zmieściła się pod tym istniejącym limitem.

## Co dodatkowo zmniejszono (`@media max-width: 520px`, zastępuje blok z v0.3.1)

| Element | v0.3.1 | v0.3.2 |
|---|---|---|
| Padding samego ekranu pytania (góra/dół) | 20px (z bazy) | **14px** |
| Pasek wyniku — padding / margin-bottom | 14px16px / 12px (z bazy) | **8px10px / 6px** |
| `.score-box` padding | 10px12px (z bazy) | **6px8px** |
| `.info-bar` margin-bottom | 16px (z bazy) | **8px** |
| Pasek postępu — padding / margin-bottom | 11px14px / 8px | **10px12px / 8px** |
| Pasek postępu — wysokość | 12px | **10px** |
| Karta pytania — padding | 18px16px20px | **14px góra/dół, 28px boki** (patrz uwaga niżej) |
| Karta pytania — margin-bottom | 8px | **10px** (i `#options-container margin-top` zmniejszony z 8px na **0** — łączny odstęp mniejszy niż wcześniej, mimo że ta jedna liczba wygląda większa) |
| Pytanie — font | clamp(≈26–37px) | **clamp(28–34px)** |
| Przycisk odsłuchu | 50px | **46px** |
| Odstęp między odpowiedziami | 12px | **10px** |
| Odpowiedź `.btn` — padding | 14px16px | **12px14px** |
| Przycisk powrotu — margin-top / padding | 8px / 10px16px | **6px / 12px** (jednolity) |

## ⚠️ Jedna decyzja interpretacyjna, o której musisz wiedzieć

Podałeś „karta pytania: padding max **28px 14px**”. W CSS zapis `padding: A B`
oznacza A = góra/dół, B = boki. Zastosowany literalnie (28px góra/dół, 14px
boki) **zwiększyłby** wysokość karty względem v0.3.1 (18–20px), co byłoby
sprzeczne z celem tego hotfixu. Założyłem, że chodziło Ci o odwrotną kolejność
— **14px góra/dół (żeby zmniejszyć wysokość), 28px boki** (gdzie miejsca jest
więcej) — i tak to wdrożyłem. Podobnie przy przycisku powrotu „padding: 12px”
zastosowałem jako jednolite 12px ze wszystkich stron (tu nie było dwóch liczb,
więc nie ma ambiguacji).

Jeśli o coś innego Ci chodziło — to dosłownie jedna linijka do zmiany
(`#game-screen.game-screen-v2 .question-box { padding: ... }`), daj znać.

## Czego NIE zmieniono

- `skrypt.js` — **bitowo identyczny** z v0.3.1 (zweryfikowane md5).
- Reguła `.quiz-container` (bazowa, dotyczy wszystkich ekranów) — nietknięta.
- `apk-fix.js`, `manifest.json`, `pobierz.html`, ikony — bez zmian.
- Desktop/tablet (>520px) — bez zmian, zostają wartości z v0.3.
- Logika gry, punktacja, mikrofon, dialogi, działanie trybów — bez zmian.

## Wersja i cache

- `🇬🇧 Angielski turystyczny PRO • Quiz v0.3.2`
- `styl.css?v=quiz-v032`
- `service-worker.js`: `CACHE_NAME = "quiz-angielski-v0-3-2"`
