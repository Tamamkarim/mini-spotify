# Mini Spotify

Mini Spotify on full stack -verkkosovellus, jonka avulla käyttäjät voivat ladata, toistaa ja hallita kappaleita – yksinkertaistettu versio Spotifysta. Projekti on jaettu backend- (Node.js/Express/TypeScript) ja frontend-osaan (React/TypeScript + Vite).

## Ominaisuudet
- Käyttäjän todennus (rekisteröityminen, kirjautuminen, profiili)
- Kappaleiden lataus ja hallinta
- Musiikin toisto omalla soittimella
- Soittolistojen ja kappaleiden selaus
- Responsiivinen käyttöliittymä Tailwind CSS:llä

## Projektin rakenne

```
mini-spotify/
  backend/      # Express.js + TypeScript API
  frontend/     # React + Vite + Tailwind CSS
```

### Backend
- REST API käyttäjien ja kappaleiden hallintaan
- Tiedostojen lataustuki
- SQLite-tietokanta (katso `database/schema.sql`)
- Pääsisääntulo: `backend/src/server.ts`

### Frontend
- React-sovellus modernilla käyttöliittymällä
- Audiosoittimen ja soittolistan komponentit
- Sivut: Home, Login, Signup, Profile, Search, Upload, SongPage
- Pääsisääntulo: `frontend/src/main.tsx`

## Aloitusohjeet

### Esivaatimukset
- Node.js (v16+ suositeltu)
- npm tai yarn

### Backendin käyttöönotto
1. Asenna riippuvuudet:
   ```bash
   cd mini-spotify/backend
   npm install
   ```
2. Suorita tietokantamigraatiot (tarvittaessa):
   ```bash
   # Esimerkki: sqlite3 database/schema.sql
   ```
3. Käynnistä palvelin:
   ```bash
   npm run dev
   # tai
   node src/server.ts
   ```

### Frontendin käyttöönotto
1. Asenna riippuvuudet:
   ```bash
   cd mini-spotify/frontend
   npm install
   ```
2. Käynnistä kehityspalvelin:
   ```bash
   npm run dev
   ```
3. Avaa selaimessa [http://localhost:5173](http://localhost:5173).

## Testaus
- Backend: Jest-testit kansiossa `backend/tests/`
- Frontend: Jest/React Testing Library kansiossa `frontend/`

## Konfiguraatio
- Backendin tietokantamääritykset: `backend/src/config/db.ts`
- API-päätepisteet: `backend/src/routes/`
- Frontendin API-palvelu: `frontend/src/services/api.ts`

## Lisenssi
MIT

---

# Mini Spotify (suomeksi)

Täysi verkkosovellus, jonka avulla käyttäjät voivat ladata, toistaa ja hallita kappaleita – Spotify-tyylinen käyttöliittymä.

## Ominaisuudet
- Käyttäjien rekisteröinti ja kirjautuminen
- Kappaleiden lataus ja hallinta
- Mukautettu musiikkisoitin
- Kappaleiden ja soittolistojen selaus
- Moderni ja responsiivinen käyttöliittymä

## Käyttöönotto
1. Asenna vaaditut ohjelmistot (Node.js, npm)
2. Asenna paketit sekä backend- että frontend-kansioihin
3. Käynnistä ensin backend, sitten frontend

