# Pontonowy Spływ

Gra przeglądarkowa, którą można zainstalować na telefonie jako aplikację internetową (PWA).

## Publikacja na GitHub Pages

1. Rozpakuj ZIP. Przenieś jego zawartość do głównego folderu repozytorium, tak aby `index.html` był widoczny bez otwierania podfolderu.
2. Zapisz zmiany w gałęzi `main`. Dołącz też pusty plik `.nojekyll`. Jeśli GitHub nie pokazuje go przy przeciąganiu plików, utwórz go bezpośrednio w repozytorium przez **Add file → Create new file**.
3. W **Settings → Pages** wybierz **Deploy from a branch**, następnie **main**, **/(root)** i **Save**.
4. Otwórz na telefonie adres HTTPS podany w **Settings → Pages**. W standardowej konfiguracji strona jest publiczna.

## Instalacja na telefonie

- **Android, Chrome** — otwórz menu ⋮, wybierz **Zainstaluj i utwórz skrót**, a następnie **Zainstaluj**.
- **iPhone, Safari** — wybierz **Udostępnij → Dodaj do ekranu początkowego**, włącz **Otwórz jako aplikację internetową** i wybierz **Dodaj**.

Przy pierwszym otwarciu przez internet przeglądarka pobiera pliki gry do pamięci podręcznej. Po zakończeniu pobierania spływ można uruchomić bez połączenia.

## Edycja gry

Wygląd i mechanika są w `index.html`. Po zmianie gry lub ikon podnieś wartość `CACHE_VERSION` w `sw.js` (np. z `v1` na `v2`) w tym samym commicie, aby przy kolejnym połączeniu odświeżyć także wersję offline.
