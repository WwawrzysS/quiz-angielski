# Quiz Angielski PRO — Quiz v0.3

**Etap 2: ekran pytania bardziej jak gra + poprawki kafelków z v0.2.**
Baza: Quiz v0.2. Zmiany w `index.html`, `styl.css`, `service-worker.js`
(tylko cache). `skrypt.js` **bez zmian** — zweryfikowane sumą md5.

## 1. Poprawki z v0.2

### Bug: kafelek „Bombowy Sprint” był wyższy i miał rozjechaną ikonę/tekst

**Prawdziwa przyczyna:** `skrypt.js` (którego nie ruszamy) ustawia temu
konkretnemu przyciskowi inline `style.display = "block"` (żeby chować go
w trybie „Gramy razem”):

```js
document.getElementById("sprint-nav-btn").style.display = ... ? "none" : "block";
```

Inline style ustawiony przez JS ma wyższy priorytet niż klasa CSS — moja
reguła `.mode-tile { display: flex; }` z v0.2 była więc ignorowana właśnie
na tym jednym przycisku, ikona i tekst spadały do układu blokowego (jeden pod
drugim), stąd większa wysokość i zła pozycja ikony tylko na tym kafelku.

**Naprawione bez dotykania `skrypt.js`:** przeprojektowałem wnętrze kafelka —
sam przycisk (`<button>`) ma teraz `display: block` (czyli dokładnie to, co
i tak wymusza JS — zero konfliktu), a wyrównanie ikony+tekstu robi wewnętrzny
`<span class="mode-tile-row">` z układem tabelowym (`display: table` /
`table-cell`), który działa identycznie niezależnie od tego, jaki `display`
ma przycisk-rodzic. Gwiazdka w rogu przeniesiona na `position: absolute`
wycentrowaną w pionie — też niezależną od layoutu rodzica.
Efekt: wszystkie 6 kafelków mają teraz identyczną wysokość i wyrównanie.

### Krótszy przycisk powrotu
`⬅ Wróć do materiału` → **`⬅ Zmień poziom`** (dokładniejszy opis tego, co
robi przycisk — wraca do ekranu wyboru poziomu/materiału).

## 2. Ekran pytania jak gra (`#game-screen.game-screen-v2`)

Nowa, samodzielna sekcja CSS, zaczepiona o nową klasę `game-screen-v2` na
`#game-screen`. Nic z tego nie zmienia `display` elementów, które `skrypt.js`
przełącza inline'owo (`#options-container` zostaje `grid`/`none`,
`#stage-progress-card` zostaje `block`/`none` — dotykamy tylko wnętrza/wyglądu).

- **Większa karta pytania** — `.question-box`: większy padding, zaokrąglenie,
  delikatny gradient i głębszy cień.
- **Pytanie bardziej wyeksponowane** — `.main-question-text` większa
  czcionka (clamp 2.1–3.05rem) + miękki text-shadow.
- **Przycisk odsłuchu** (`.speaker-btn`) — większy, kolorowe kółko z gradientem
  i cieniem, łatwiejszy do trafienia kciukiem.
- **Odpowiedzi jako większe, „mięsiste” przyciski** — większy padding,
  zaokrąglenie, gradientowe tło, większy odstęp między przyciskami.
- **Dobra odpowiedź** — mocniejszy zielony gradient + glow + plakietka „✓”
  w rogu (czysto wizualna, `::before`, nie wpływa na logikę).
- **Błędna odpowiedź** — pozostawiony **delikatny shake** (animacja
  `wrongShakeV1` już istniała i była odpowiednio stonowana — nie zmieniana),
  czerwony gradient + plakietka „✕” w rogu.
- **Lepsze przejście po kliknięciu** — płynniejsza krzywa animacji (`ease-pop`)
  na hover/active przycisków odpowiedzi.
- **Bardziej widoczny pasek postępu** — wyższy `.progress-track` (16px),
  kolorowy gradient na `.progress-fill`, ikona 🏆 przy etykiecie „Postęp etapu”,
  mocniejszy cień karty.

## 3. Numer wersji
`🇬🇧 Angielski turystyczny PRO • Quiz v0.3` w karcie startowej (sam tekst —
bez zmiany wyglądu ekranu startowego).

## 4. Propozycja na potwierdzenie (NIE wdrożona w tej wersji)

Można zrobić **„+10 XP” jako czysto wizualny toast** po dobrej odpowiedzi
(bez zmiany realnej punktacji — punktacja i tak jest liczona na koniec etapu
w `skrypt.js`, ten toast wyświetlałby tylko wartość `xpPerCorrect`, którą
już dziś gra liczy). Wymagałoby to **jednego dopisania** (nie modyfikacji)
w `skrypt.js` — krótkiej funkcji pokazującej znikający napis przy poprawnej
odpowiedzi. Zgodnie z ustaleniami **nie wdrożyłem tego** — czekam na decyzję,
czy ma wejść w v0.4.

## Plik zmieniony, ale tylko w jednej linii (rutynowo)

`service-worker.js` — podbicie `CACHE_NAME` na `quiz-angielski-v0-3` i
aktualizacja `?v=` dla `styl.css` na liście app shell (skrypt.js/apk-fix.js
zostały przy `?v=quiz-v01`, bo ich treść się nie zmieniła).

## Czego NIE zmieniono (zweryfikowane sumą md5 względem v0.2)

- `skrypt.js` — **bitowo identyczny**.
- `apk-fix.js`, `manifest.json`, `pobierz.html`, `icon-192.png`,
  `icon-512.png` — bez zmian.
- Baza słów, losowanie odpowiedzi, punktacja XP, mikrofon, dialogi z lekcji,
  działanie wszystkich trybów — bez zmian (wszystko to żyje w `skrypt.js`).
- Branding, nazwa, ekran startowy V6 (poza numerem wersji) — bez zmian.

## Nowe klasy CSS (dla porządku)

`game-screen-v2`, oraz w category-screen: `.mode-tile-row` (nowy wrapper
naprawiający wyrównanie). Wszystkie reguły v0.3 zaczepione o
`#game-screen.game-screen-v2 ...` lub poprawiają istniejące selektory
`#category-screen.category-screen-v2 .mode-tile*` z v0.2 (bez ruszania
selektorów spoza tych dwóch ekranów).
