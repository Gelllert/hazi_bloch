# Bloch Gömb szimulátor

(2.) feladat – Kvantuminformatikai alapok – Bloch-gömb szimulátor

A felület elrendezéséhez a [JustQLabs Simulator](https://www.justqlabs.com/simulator) szolgált inspirációul amit előadáson mutattak. A funkciók ezekhez hasonlóak (amatőrebb megvalósítással) kiegészítve párhuzamos állapotpályák (trackek) kezelésével.

## Főbb funkciók

* **Interaktív 3D Bloch-gömb:** Szabadon forgatható és nagyítható WebGL nézet a kitüntetett pólusokkal ($|0\rangle, |1\rangle, |+\rangle, |-\rangle, |+i\rangle, |-i\rangle$).
* **Tetszőleges kezdőállapot:** Választható a 6 nevezetes bázisállapot közül, vagy egyedi $(\theta, \phi)$ gömbi szögek adhatók meg.
* **Egybites kvantumkapuk és forgatások:** Pauli-kapuk ($I, X, Y, Z$), Hadamard ($H$), fáziskapuk ($S, S^\dagger, T, T^\dagger$), valamint folytonos tengely körüli forgatások ($R_x, R_y, R_z$) $-360^\circ$ és $+360^\circ$ között.
* **Művelettörténet (History):** Minden lépés logolt, és bármelyik korábbi állapotra egy kattintással vissza lehet állni.
* **Párhuzamos állapotok (Trackek):** Több független kvantumállapot és saját történetük egyszerre megjeleníthető és összehasonlítható a gömbön.
* **Offline működés (PWA):** A kód letölthető alkalmazásként is (bár specifikációban böngészővel rendelkezik a gép, de a futtatható-t is kéri szóval ez is megvalósított).

---

## Használat

1. **Kamera vezérlése:** A 3D nézetben bal egérgombos húzással forgathatod a gömböt, az egérgörgővel pedig nagyíthatsz.
2. **Kezdőállapot beállítása:** A jobb oldali *Kezdőállapot* panelen válassz egy előre definiált állapotot, vagy nyisd le az *Egyedi kezdőállapot ($\theta, \phi$)* részt a pontos szögek megadásához. Kezdő állapot nullázza a logokat.
3. **Kapuk és forgatások alkalmazása:** Kattints a kvantumkapura, vagy állíts be egy forgatási szöget az $R_x, R_y, R_z$ csúszkákkal, majd a *Forgat* gombbal alkalmazhatod.
4. **Előzmények kezelése:** A bal oldali *Műveletek* listában bármelyik lépésnél a *Vissza ide* gombbal visszaugorhatsz az adott állapotba.
5. **Több állapot összehasonlítása:** A felső sávban a **+ Új állapot** gombbal létrehozhatsz egy új, külön színnel jelölt állapotpályát, és kattintással válthatsz közöttük. Az állapot lemásolja az éppen aktuális vektort kezdő állapotnak.
6. **Környezet független eléréshez rendelkezésre áll egy `dist-standalone/bloch_szimulator.html`, amit egy böngészővel rendelkező windowsos gép, bármilyen függőség nélkül elérhet.**

---

## Technológiák

* **React + TypeScript + Vite**
* **Three.js / `@react-three/fiber` / `@react-three/drei`** (3D megjelenítés)
* **Tailwind CSS** (felhasználói felület)
* **`vite-plugin-pwa`** (Progressive Web App és offline támogatás)
* **A specifikáció kérte, hogy környezet független futtatható fájlként legyen a program, erre a vite plugin singlefile-t használva egyettlen html-be lett csomagolva a program, a `bloch_szimulator.html` néven.**

---

## Helyi futtatás és publikálás

```bash
# Függőségek telepítése
npm install

# Fejlesztői szerver indítása
npm run dev

# Produkciós build készítése
npm run build

# Publikálás GitHub Pages-re
npm run deploy
