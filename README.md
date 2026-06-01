# Čínština s Čendou

Veřejný mini web pro Čendu Zheng: čínština od základů — pinyin, znaky, slova a věty.

## Vytvořené stránky

- `index.html` — úvodní stránka s hero sekcí a odkazy na hlavní části webu.
- `fraze.html` — Dnešní čínština / fráze s hanzi, pinyinem, překladem a poslechem.
- `slova.html` — základ budoucího slovníčku.
- `pinyin.html` — Základy čínštiny.
- `mysleni.html` — Moudrost z Číny.
- `iching.html` — symbolická otázka pro Knihu proměn / I-ťing.
- `cenda.html` — Kdo je Čenda, Taiwan39 Food a Sledujte Čendu.

## Co se změnilo

- Web už není jedna dlouhá stránka, ale má samostatné sekce jako jednoduchý veřejný web.
- Positioning webu je sjednocený víc vzdělávacím směrem: `Čínština od základů — pinyin, znaky, slova a věty.`
- Úvodní hero nově říká: `Učte se čínsky jednoduše, krok za krokem — od pinyinu a znaků až po věty z reálného života.`
- Na hlavní stránku bylo přidáno osobní úvodní slovo od Čendy s povzbuzením ke studiu a mluvení.
- Opakované footery a slogany už nekladou jídlo a humor jako hlavní téma webu; Taiwan39 Food zůstává jako kontext Čendy a sociálních sítí.
- Horní navigace vede na `Úvod`, `Fráze`, `Slova`, `Základy`, `Moudrost`, `Kniha proměn` a `Čenda`.
- `Humor` už není samostatný veřejný oddíl v horní navigaci ani na úvodní stránce. Soubor `humor.html` zatím zůstává v projektu jako nepoužívaný obsah pro případné pozdější využití.
- Stránka `slova.html` obsahuje kompaktní frekvenční slovník `1–100 nejčastějších slov`; zatím je vyplněno 10 testovacích slov, detail s příklady se otevírá kliknutím na řádek a seznam má jednoduché vyhledávání podle znaku, pinyinu, češtiny i angličtiny.
- `Tahy znaku` jsou na stránce `Slova` připravené jako MVP přes knihovnu Hanzi Writer načítanou z CDN. Funkce potřebuje internet a později ji lze převést na lokální data nebo samostatný datový model.
- Slovník je zatím psaný přímo v HTML; při rozšíření na 100, 1000 nebo více slov dává smysl převést data do samostatného `words.js`.
- Položka `Pinyin` byla veřejně přejmenována na `Základy`; soubor zatím zůstává `pinyin.html`.
- Stránka `pinyin.html` obsahuje pinyin, tóny, stavbu slabiky, čínské znaky, základní tahy, pořadí tahů, radikály a ukázku vnitřní struktury znaku.
- Do stránky `Základy` byla přidána sekce `Jak se skládají čínská slova`, která vysvětluje rozdíl mezi slabikou, znakem a slovem.
- Do stránky `Základy` byla přidána kompaktní sekce `Základní gramatika` o slovních druzích, pořadí slov, částicích a měrových slovech.
- Sekce `Základní gramatika` byla upravena: přibyly čínské názvy slovních druhů a zmizelo zbytečné opakování `CZ` / `EN` štítků u příkladů.
- Blok o znacích a slovech byl přepracován pro lepší pochopení rozdílu mezi jedním znakem a celým slovem.
- Sekce `Přibližné čtení` byla ze stránky `Základy` odstraněna.
- Sekce `Základní tahy` má viditelné ukázky tahů a jejich běžných kombinací.
- Sekce `Radikály a klíče` byla rozšířena o dětsky jednoduché vysvětlení, proč se říká radikál a klíč, a o příklady významové a zvukové části znaku.
- V oddílu `Základy` zatím záměrně nejsou vložené audio ani video soubory; stránka jen odkazuje na obecné možnosti hledání ukázek výslovnosti na YouTube.
- Tlačítko `Začít frází` na úvodu vede na `fraze.html`.
- Tlačítko `Sledovat Čendu` vede na sociální blok v `cenda.html`.
- Blok `Sledujte Čendu` zůstává uvnitř stránky `cenda.html`, ale není samostatnou položkou v horním menu.
- V bloku `Sledujte Čendu` jsou doplněné reálné odkazy na TikTok, Instagram, YouTube a Facebook; otevírají se v nové kartě.
- Na úvodní stránku přibyl klidný informační blok `Volně dostupné učení`.
- Sekce s kulturními texty má veřejný název `Moudrost`; stránka má nadpis `Moudrost z Číny`.
- Přibyla stránka `Kniha proměn`, kde si návštěvník může položit otázku a vylosovat symbolickou odpověď z 8 testovacích hexagramů.
- Do webu jsou vložené skutečné obrázky z lokální složky `images`: `hero-cenda.png` v hero sekci, `cenda-photo.png` v profilu Čendy a `oracle-cenda.png` na stránce Knihy proměn.
- Blok `Taiwan39 Food` má adresu jen jednou v samostatném informačním boxu:
  `Milady Horákové 2903/1`, `České Budějovice`, stánek naproti Kauflandu.
- Do adresního boxu `Taiwan39 Food` byl přidán odkaz `Otevřít v Google Maps`, který se otevírá v nové kartě.
- Stávající obsah frází, vtipů a stratagemů zůstal zachovaný.
- Společný `script.js` je upravený tak, aby fungoval i na stránkách, kde není každý obsahový blok.
- Mobilní verze je upravená pro návštěvy z TikToku, Instagramu, YouTube a QR kódů: stránky mají viewport meta tag, kompaktnější navigaci, pohodlnější dotykové prvky, lepší skládání hero sekce, karet, audio tlačítek, sociálních odkazů a formuláře Knihy proměn.
- Hero sekce na úvodní stránce má méně dominantní tlačítko `Tmavý režim` a skutečnou fotku Čendy / Taiwan39 Food ve vyváženém obrazovém slotu.

## Upravené soubory

- `index.html`
- `fraze.html`
- `slova.html`
- `pinyin.html`
- `humor.html`
- `mysleni.html`
- `iching.html`
- `cenda.html`
- `style.css`
- `script.js`
- `README.md`

## Jak otevřít web

1. Otevřít složku projektu `~/Documents/Codex-test`.
2. Otevřít soubor `index.html` v prohlížeči.
3. Z úvodní stránky pokračovat přes horní navigaci nebo přes karty sekcí.

## Kontrola před publikací

- Zkontrolované veřejné stránky: `index.html`, `fraze.html`, `slova.html`, `pinyin.html`, `mysleni.html`, `iching.html`, `cenda.html`.
- Všechny veřejné stránky mají `viewport` meta tag, společnou navigaci se 7 položkami, připojený `style.css` a připojený `script.js`.
- Lokální odkazy mezi stránkami a kotva `cenda.html#socials` jsou v pořádku.
- Obrázky `images/hero-cenda.png`, `images/cenda-photo.png` a `images/oracle-cenda.png` existují a jsou připojené.
- Sociální odkazy TikTok, Instagram, YouTube a Facebook jsou v bloku `Sledujte Čendu`, otevírají se v nové kartě a mají `rel="noopener noreferrer"`.
- V HTML stránkách nejsou nalezené ruské veřejné texty ani staré texty typu `Budoucí foto`.
- `script.js` prošel syntaktickou kontrolou; audio ovládání a tlačítko `Vylosovat odpověď` mají v kódu navázané obsluhy.
- Vizuální kontrola ve vestavěném prohlížeči nebyla v této session dostupná, proto je vhodné ještě ručně projít mobilní šířku v běžném prohlížeči.

## Co zkontrolovat v prohlížeči

1. `index.html` — hero, osobní blok `Slovo od Čendy`, tlačítka `Začít frází` a `Sledovat Čendu`, menší tlačítko `Tmavý režim`, karty sekcí a fotku `hero-cenda.png`.
2. `index.html` — blok `Volně dostupné učení` pod hero sekcí.
3. `fraze.html` — poslech, pinyin, překlad a rozbor.
4. `slova.html` — kompaktní frekvenční seznam prvních 10 testovacích slov, vyhledávání, rozklikávací řádky, přesně 3 příklady u každého slova a MVP `Tahy znaku` přes Hanzi Writer CDN; bez audia.
5. `pinyin.html` — stránka `Základy čínštiny`: pinyin, tóny, slabiky, stavba čínských slov, základní gramatika, znaky, vizuální ukázky tahů, pořadí tahů a začátečnické vysvětlení radikálů s příklady; bez vloženého audia nebo videa.
6. `mysleni.html` — nadpis `Moudrost z Číny`, nový podtitulek a vykreslení stratagemů.
7. `iching.html` — pole pro otázku, tlačítko `Vylosovat odpověď`, náhodný výsledek, jemné upozornění a ilustraci `oracle-cenda.png`.
8. `cenda.html` — text o Čendovi, fotku `cenda-photo.png`, přesná adresa Taiwan39 Food, hashtagy a reálné odkazy na sociální sítě.
9. Horní navigaci mezi všemi veřejnými stránkami včetně položek `Slova`, `Základy` a `Kniha proměn`.
10. Mobilní zobrazení nebo zúžené okno: menu nesmí přetékat, karty mají jít pod sebe, audio tlačítka mají zůstat čitelná a všechny hlavní akce mají být pohodlné na klepnutí.
