# Jak zbudować APK dla Quiz v0.1 — instrukcja do wykonania lokalnie

To środowisko (w którym pracuje Claude) **nie ma Android SDK, Gradle, JDK do
budowania Androida ani Android Studio**, a połączenia do repozytoriów Google
(`dl.google.com`, `maven.google.com`) są blokowane na poziomie sieci. Dlatego
realnego builda APK nie da się tu wykonać — musi to zrobić ktoś na komputerze
z zainstalowanym Android Studio / Capacitor (czyli tak jak dotychczas budowano
poprzednie wersje APK tej aplikacji).

Ta instrukcja prowadzi krok po kroku przez dokładnie to, co opisałeś.

## 0. Wymagania (jednorazowo, jeśli nie masz)

- Node.js + npm
- Android Studio + Android SDK
- JDK (Android Studio instaluje własne)
- Istniejący projekt Capacitor z folderem `android/` (ten sam, z którego
  powstał poprzedni `Quiz-Angielski-PRO-latest.apk`)

## 1. Rozpakuj `quiz-v0.1-web.zip`

Plik zawiera zweryfikowane, aktualne pliki web wersji **Quiz v0.1**:

```
index.html, styl.css, skrypt.js, apk-fix.js, manifest.json,
service-worker.js, pobierz.html, icon-192.png, icon-512.png,
README.md, CHANGELOG-QUIZ-v0.1.md
```

## 2. Skopiuj pliki do katalogu źródłowego WWW projektu Capacitor

W typowym projekcie Capacitor jest to katalog `www/` w korzeniu projektu
(ten, który w `capacitor.config.json`/`.ts` jest wskazany jako `webDir`).
Skopiuj **wszystkie** pliki z paczki do tego katalogu, zastępując istniejące.

```bash
# przykład — dopasuj ścieżkę do swojego projektu
cp -r quiz-v0.1-web/* /ścieżka/do/projektu/www/
```

## 3. Sprawdź wczytywanie plików w `index.html`

W skopiowanym pliku `index.html` powinny być (i są w tej paczce) dokładnie te
trzy linie:

```html
<link rel="stylesheet" href="./styl.css?v=quiz-v01">
<script src="./skrypt.js?v=quiz-v01"></script>
<script src="./apk-fix.js?v=quiz-v01"></script>
```

✅ Zweryfikowane w tej paczce — `grep` poniżej powinien zwrócić wszystkie trzy linie:

```bash
grep -n "quiz-v01" www/index.html
```

## 4. Zainstaluj zależności i zsynchronizuj Androida

W katalogu głównym projektu Capacitor:

```bash
npm install
npx cap sync android
```

`npx cap sync android` skopiuje pliki z `www/` do
`android/app/src/main/assets/public/` i zaktualizuje natywne zależności.

## 5. Otwórz projekt w Android Studio

```bash
npx cap open android
```

## 6. W Android Studio

1. **Build → Clean Project**
2. **Build → Rebuild Project**
3. **Build → Generate Signed Bundle / APK…** → wybierz **APK**
4. Wskaż swój istniejący keystore (ten sam, którym podpisywano poprzednie
   wersje — **ważne, żeby zachować ten sam keystore**, inaczej Android
   potraktuje to jako inną aplikację i użytkownicy nie zrobią "update in
   place", tylko będą musieli odinstalować starą wersję).
5. Wybierz wariant **release**.
6. Zaczekaj na build — Android Studio pokaże powiadomienie
   "APK(s) generated successfully" z linkiem **locate**.

## 7. Zmień nazwę i podmień plik

Znaleziony plik (typowo `android/app/release/app-release.apk`) zmień nazwę na:

```
Quiz-Angielski-PRO-latest.apk
```

i podmień nim plik w `apk/Quiz-Angielski-PRO-latest.apk` w repozytorium
projektu `quiz-angielski` (np. na GitHub Pages).

## 8. Sanity-check po zbudowaniu

- Zainstaluj APK na telefonie/emulatorze.
- Otwórz tryb **🗣 Powiedz** i sprawdź, czy mikrofon faktycznie pyta o
  uprawnienia i nasłuchuje (to jest dokładnie to, co naprawia `apk-fix.js`).
- W ustawieniach systemowych telefonu sprawdź, czy aplikacja w ogóle poprosiła
  o uprawnienie mikrofonu — jeśli `apk-fix.js` nie był wczytany, te uprawnienia
  nigdy się nie pojawiały.

## 9. Commit / publikacja

Wgraj nowy `apk/Quiz-Angielski-PRO-latest.apk` do repozytorium / GitHub Pages,
tak żeby `pobierz.html` (który linkuje właśnie do tej ścieżki) serwował nową
wersję.

---

### Dlaczego Claude nie zrobił tego sam

- Brak Android SDK / Gradle / JDK-dla-Androida w sandboksie.
- Brak Android Studio (to jest aplikacja z GUI — Claude ma tylko terminal
  i edytor plików, bez interfejsu graficznego).
- Sieć w sandboksie blokuje domeny Google potrzebne do pobrania zależności
  Androida (`dl.google.com`, `maven.google.com` → `403 host_not_allowed`).
- Paczka `quiz-v0.1.zip` zawierała tylko pliki web — nie zawierała folderu
  `android/` ani `capacitor.config`, więc nawet przy pełnym SDK nie byłoby
  z czego zbudować APK bez Twojego istniejącego projektu Capacitor.

Jeśli chcesz, mogę przygotować workflow GitHub Actions, który buduje APK
automatycznie w chmurze (CI) przy każdym push do repo — to jest realna,
darmowa opcja, bo serwery GitHub Actions mają pełny dostęp do Android SDK.
Daj znać, jeśli masz ten projekt na GitHubie i chcesz taki plik.
