const machines = [
  {
    name: "Eletta Ultra",
    model: "ECAM 470.85.MB",
    type: "automatický",
    tier: "Premium vlajková loď",
    tags: ["50+ nápojů", "Silent Tech", "Cold Brew 5 min", "Wi-Fi", "Bean Adapt"],
    specs: ["19 bar tlak", "1450 W", "280 g zásobník", "1,8 l voda", "Displej 4,3\" TFT"],
    highlights: [
      "Více než 50 předprogramovaných receptů vč. Cold Brew a MugToGo",
      "Silent Technology – až 65 % tišší než předchozí modely",
      "Dvě karafy LatteCrema: Hot (teplé nápoje) + Cool (studené nápoje)",
      "Bean Adapt – automaticky přizpůsobuje mletí a extrakci zvoleným zrnům",
      "Wi-Fi připojení a aplikace My Coffee Lounge (120 receptů)",
      "Dotykový barevný displej 4,3\" TFT, kovový design",
      "Rychlá příprava Cold Brew za 5 minut",
      "5 uživatelských profilů, 5 intenzit, 4 velikosti, 3 teploty"
    ],
    specs_detail: ["19 bar tlak", "1450 W výkon", "280 g zásobník zrn", "1,8 l zásobník vody", "4,3\" TFT dotykový displej", "Rozměry: 23,5 × 45,5 × 38 cm"],
    promo: "Nejuniverzálnější model v portfoliu – ideální pro zákazníky, kteří chtějí kavárnu doma bez kompromisů.",
    cold: true, milk: true, milkAuto: true,
    quiz: [
      { q: "Kolik receptů Eletta Ultra nabízí a jaký je klíčový prodejní argument oproti jiným modelům?", a: "<strong>50+ receptů</strong> včetně Cold Brew za 5 minut, teplých i studených mléčných nápojů. Klíčový argument: je to nejuniverzálnější model – pokryje celý den od ranního espressa po odpolední ledový latte. Žádný jiný model v portfoliu nemá takovou šíři." },
      { q: "Co je Silent Technology a proč je to prodejní argument?", a: "<strong>Silent Technology</strong> snižuje hluk o až 65 % oproti předchozím modelům. Argument pro zákazníka: můžeš si udělat kávu brzy ráno nebo pozdě večer bez probuzení domácnosti. Ideální pro byty, kde záleží na klidu." },
      { q: "Jaký je rozdíl mezi karafou LatteCrema Hot a LatteCrema Cool?", a: "<strong>Hot karafa</strong> napěňuje mléko na ~65°C pro teplé nápoje (cappuccino, latte). <strong>Cool karafa</strong> vytváří studenou pěnu pro ledové nápoje a Cold Brew recepty. Eletta Ultra je jediný model v tomto portfoliu, který má obě karafy v základní výbavě." },
      { q: "Co je Bean Adapt Technology a proč to zákazníka zajímá?", a: "<strong>Bean Adapt</strong> automaticky přizpůsobí nastavení mletí, teplotu a extrakci podle toho, jaká zrna vložíte. Zákazník nemusí nic nastavovat – stroj si poradí s arabicou i robustou, světlou i tmavou pražbou. Výsledek: perfektní káva z jakýchkoliv zrn." },
      { q: "Zákazník říká: 'Za tu cenu si koupím kávovar s kapsulemi.' Jak reaguješ?", a: "Poukáži na celkové náklady: kapsule vychází 8–15 Kč/kus, kvalitní zrna 2–5 Kč/šálek. Při 2 kávách denně ušetří stovky Kč měsíčně. Navíc čerstvě mletá zrna = výrazně bohatší chuť a vůně. A Eletta Ultra umí přes 50 různých nápojů, kapslový stroj jen jeden typ extrakce." }
    ]
  },
  {
    name: "Magnifica Evo Next",
    model: "ECAM 310.80.SB",
    type: "automatický",
    tier: "Střední třída+",
    tags: ["13 nápojů", "LatteCrema Hot", "TFT displej", "Kompaktní"],
    specs: ["15 bar tlak", "1450 W", "250 g zásobník", "1,8 l voda", "Displej 2,4\" TFT"],
    highlights: [
      "13 nápojů včetně 4 mléčných (cappuccino, latte macchiato, flat white…)",
      "LatteCrema Hot – automatické pěnění mléka, karafa v balení",
      "Barevný dotykový displej 2,4\" TFT s 8 soft-touch tlačítky",
      "5 velikostí, 4 intenzity, 3 teploty – vysoká personalizace",
      "Moderní redesignovaný vzhled, stříbrno-černá kombinace",
      "Součásti do myčky – snadná údržba",
      "Kompaktní: 24 × 44 × 36 cm, 12 kg"
    ],
    specs_detail: ["15 bar tlak", "1450 W výkon", "250 g zásobník zrn", "1,8 l zásobník vody", "2,4\" TFT displej", "Rozměry: 24 × 44 × 36 cm, 12 kg"],
    promo: "Nejlepší vstup do světa automatů s mléčným systémem. Vhodné pro rodiny a milovníky kapučína.",
    cold: false, milk: true, milkAuto: true,
    quiz: [
      { q: "Kolik nápojů Magnifica Evo Next nabízí a které jsou mléčné?", a: "<strong>13 nápojů</strong> celkem, z toho 4 mléčné: cappuccino, latte macchiato, flat white a café au lait. Automatické napěnění mléka zajišťuje karafa LatteCrema Hot, která je součástí balení." },
      { q: "Co odlišuje Evo Next od starší Evo (bez 'Next')?", a: "Evo Next má <strong>kompletně přepracovaný design</strong> a chassis, nový dotykový ovládací panel s barevnými ikonami a TFT displejem. Je to modernější a vizuálně atraktivnější verze – to je klíčový argument při prodeji." },
      { q: "Zákazník se ptá, proč má stroj 'jen' 15 barů, když viděl jinde 20 barů. Co odpovíš?", a: "<strong>Skutečná extrakce espressa probíhá při 9 barech</strong> – to je kafedůmový standard. 19–20 barů jsou marketingové číslo udávající maximální tlak čerpadla, nikoliv tlak při extrakci. DeLonghi na 15 barech dodává identickou kvalitu šálku." },
      { q: "Jaká je výhoda systému LatteCrema Hot oproti běžné parní trysce?", a: "<strong>LatteCrema Hot</strong> napěňuje mléko automaticky – zákazník připraví cappuccino jedním dotykem bez jakékoliv techniky. Karafa se navíc sama propláchne po každém použití. Parní tryska vyžaduje manuální napěňování a čištění." },
      { q: "Pro koho je Evo Next ideální a proč?", a: "Pro <strong>rodiny nebo páry</strong>, kde každý pije jiný nápoj – jeden espresso, druhý cappuccino. Automát s LatteCrema Hot umí vše jedním dotykem. Cena je dostupnější než PrimaDonna nebo Eletta Ultra, ale funkce jsou plnohodnotné." }
    ]
  },
  {
    name: "Magnifica Plus",
    model: "ECAM 320.70.TB",
    type: "automatický",
    tier: "Střední třída+",
    tags: ["18 nápojů", "LatteCrema Hot", "Full-touch panel", "1,9 l voda"],
    specs: ["15 bar tlak", "1450 W", "250 g zásobník", "1,9 l voda", "Full-touch displej"],
    highlights: [
      "18 receptů – o 5 více než Evo Next",
      "Full-touch ovládací panel (bez mechanických tlačítek)",
      "Větší zásobník vody 1,9 l",
      "LatteCrema Hot – automatické napěnění mléka",
      "Espresso, lungo, ristretto, americano, cappuccino, latte macchiato…",
      "Personalizace: 5 intenzit, 5 velikostí, 3 teploty",
      "Grafitová/titanová varianta (.TB)"
    ],
    specs_detail: ["15 bar tlak", "1450 W výkon", "250 g zásobník zrn", "1,9 l zásobník vody", "Full-touch displej", "Titanová/grafitová barva"],
    promo: "Krok výše oproti Evo Next – více receptů a plně dotykové ovládání. Pro náročnější zákazníky.",
    cold: false, milk: true, milkAuto: true,
    quiz: [
      { q: "Jaký je hlavní rozdíl mezi Magnifica Plus a Magnifica Evo Next?", a: "<strong>Magnifica Plus</strong> nabízí 18 receptů (o 5 více), větší zásobník vody 1,9 l vs 1,8 l, a plně dotykový full-touch panel bez fyzických tlačítek. Je to prémiovější vzhled i výbava." },
      { q: "Zákazník stojí mezi Evo Next a Plus a neví. Na co se ho zeptáš?", a: "Zeptám se: 'Jak důležitý je pro vás výběr různých nápojů? Máte doma více lidí s různými preferencemi?' Pokud ano → Plus s 18 recepty. Pokud chtějí základní věci → Evo Next ušetří peníze." },
      { q: "Co znamená 'full-touch panel' a proč to zákazníka zaujme?", a: "Žádná fyzická tlačítka – celý panel je dotykový. Výhoda: čistší design, jednodušší čištění povrchu, modernější vzhled. Zákazníci, kteří dbají na estetiku kuchyně, to ocení." },
      { q: "Jakou kávu Magnifica Plus neumí a zákazník to neočekáváne?", a: "<strong>Cold Brew</strong> – Magnifica Plus nemá technologii studené extrakce. Pokud zákazník chce ledové kávové nápoje připravené přímo strojem, potřebuje Eletta Ultra nebo PrimaDonna Aromatic." },
      { q: "Uveď 3 konkrétní recepty, které Magnifica Plus umí a zákazníka překvapí.", a: "Espresso, lungo, ristretto, americano, cappuccino, latte macchiato, flat white, café au lait, café crème a další. Mnoho zákazníků neví, že automat zvládne i <strong>flat white nebo ristretto</strong> – to jsou kavárnovské nápoje přímo z domova." }
    ]
  },
  {
    name: "Magnifica S",
    model: "ECAM 22.112.B",
    type: "automatický",
    tier: "Vstupní třída",
    tags: ["Espresso/lungo", "Ruční napěňovač", "Kompaktní", "Jednoduchá obsluha"],
    specs: ["15 bar tlak", "1450 W", "250 g zásobník", "1,8 l voda", "Otočný ovladač"],
    highlights: [
      "Nejdostupnější automatický model s výborným poměrem cena/výkon",
      "Espresso, double espresso, lungo",
      "Manuální parní tryska – cappuccino systém",
      "13 stupňů hrubosti mletí",
      "Aroma Saving Cover – víčko zásobníku zachovává aroma zrn",
      "Kompaktní a lehký – vhodný do menších kuchyní",
      "Intuitivní ovládání tlačítky + otočný knoflík intenzity"
    ],
    specs_detail: ["15 bar tlak", "1450 W výkon", "250 g zásobník zrn", "1,8 l zásobník vody", "13 stupňů mletí", "Kompaktní rozměry"],
    promo: "Ideální volba pro zákazníky, kteří začínají s automatem nebo preferují jednoduchost a nízkou cenu.",
    cold: false, milk: false, milkAuto: false,
    quiz: [
      { q: "Zákazník chce cappuccino. Jak mu Magnifica S cappuccino připraví?", a: "<strong>Ruční parní tryska</strong> – zákazník si napění mléko sám. Stroj nemá automatický napěňovač. Je to manuálnější přístup, ale zákazník má plnou kontrolu nad hustotou pěny – jako barista." },
      { q: "Kolik stupňů hrubosti mletí Magnifica S nabízí?", a: "<strong>13 stupňů</strong> – to je nadstandardní pro tuto cenovou kategorii. Zákazník může optimalizovat chuť pro různé druhy zrn a svůj vkus." },
      { q: "Jak vysvětlíš zákazníkovi Aroma Saving Cover?", a: "Zásobník na zrna má <strong>hermetické víčko</strong>, které minimalizuje přístup vzduchu a vlhkosti ke zrnům. Výsledek: zrna déle zachovávají svěží aroma a chuť. Zákazník nemusí přesypávat zbytky do jiné nádoby." },
      { q: "Proč je Magnifica S lepší než kapslový stroj ve stejné cenové kategorii?", a: "Magnifica S mele zrna čerstvě před každým šálkem = výrazně bohatší chuť. Náklady na zrna jsou 2–5 Kč/šálek vs 8–15 Kč za kapsli. A zákazník si může vybrat libovolná zrna ze světa." },
      { q: "Pro koho Magnifica S není vhodná a komu bys doporučil jiný model?", a: "Zákazníkovi, který chce cappuccino <strong>jedním dotykem bez práce</strong> → Evo Next s LatteCrema Hot. Zákazníkovi, který chce Cold Brew → Eletta Ultra. Magnifica S je pro ty, kdo chtějí jednoduchou, spolehlivou kávu a nevadí jim ruční napěňování." }
    ]
  },
  {
    name: "Magnifica Start",
    model: "ECAM 220.21.BG",
    type: "automatický",
    tier: "Vstupní třída",
    tags: ["3 recepty", "Nejdostupnější", "Velmi jednoduché", "Ruční tryska"],
    specs: ["15 bar tlak", "1450 W", "1,8 l voda", "Soft-touch tlačítka", "Béžová/šedá"],
    highlights: [
      "Absolutně nejdostupnější automat v portfoliu",
      "3 recepty: espresso, double espresso, lungo",
      "Ruční parní tryska pro cappuccino",
      "Rychlé a intuitivní ovládání pro naprosté začátečníky",
      "Kompaktní design, béžová/šedá varianta",
      "Snadná údržba a čištění",
      "Vhodné pro jednočlenné domácnosti nebo jako první automat"
    ],
    specs_detail: ["15 bar tlak", "1450 W výkon", "1,8 l zásobník vody", "Soft-touch tlačítka", "Barva: béžová/šedá (BG)", "Minimalistické ovládání"],
    promo: "Nejlepší volba pro zákazníky, kteří chtějí automat poprvé a nepotřebují složité funkce.",
    cold: false, milk: false, milkAuto: false,
    quiz: [
      { q: "Zákazník se ptá: 'To je málo, jen 3 nápoje.' Jak reaguješ?", a: "'Právě proto je to výhoda – žádné zbytečné komplikace, zapnete a za pár vteřin máte perfektní espresso z čerstvě mletých zrn. Většina lidí stejně pije espresso nebo lungo každý den. Pokud ale chcete více možností, ukážu vám Magnifica S nebo Evo Next.'" },
      { q: "Pro koho je Magnifica Start ideální zákazník?", a: "Někdo, kdo <strong>kupuje svůj první automat</strong> a nechce být zahlcen funkcemi. Může to být student v prvním bytě, senior, který chce jednoduchý stroj, nebo rodič hledající kávovar pro chatu. Klíčové: cena hraje roli." },
      { q: "Jaký je rozdíl mezi Magnifica Start a Magnifica S?", a: "Start je <strong>ještě jednodušší a dostupnější</strong> – 3 recepty vs více u S, základnější ovládání bez otočného knoflíku. Magnifica S přidává 13 stupňů mletí a větší flexibilitu nastavení." },
      { q: "Zákazník chce cappuccino – jak mu ho Magnifica Start připraví?", a: "<strong>Ruční parní tryska</strong> – zákazník napění mléko sám. Automatické napěnění (LatteCrema) tato verze nemá. Pokud zákazník chce jedním dotykem → doporučíme Magnifica Evo Next." },
      { q: "Uveď 2 situace, kdy Magnifica Start doporučíš a 1 situaci, kdy ne.", a: "<strong>Doporučím:</strong> zákazník hledá nejlevnější DeLonghi automat; zákazník, který nemá zkušenosti s automaty a chce jednoduché ovládání. <strong>Nedoporučím:</strong> zákazník chce automatické napěnění mléka nebo více než 3 recepty → nabídnu Evo Next." }
    ]
  },
  {
    name: "PrimaDonna Aromatic",
    model: "ECAM 630.75.TSM",
    type: "automatický",
    tier: "Top tier – vlajková loď",
    tags: ["35+ nápojů", "Bean Adapt", "Cold Brew", "5\" displej", "Red Dot 2025"],
    specs: ["19 bar tlak", "1450 W", "500 g zásobník", "2,2 l voda", "Displej 5\" TFT"],
    highlights: [
      "Nová vlajková loď (jaro 2025) – Red Dot Design Award Winner 2025",
      "Bean Adapt Technology s elektronickým mlýnkem",
      "35+ receptů: teplé, ledové i Cold Brew (za 5 min)",
      "Duální LatteCrema: Hot karafa + Cool karafa",
      "5\" full-touch barevný displej – největší v portfoliu",
      "4 uživatelské profily + Coffee Moments",
      "Velký zásobník 500 g zrn a 2,2 l vody",
      "My Coffee Lounge aplikace, kovové tělo"
    ],
    specs_detail: ["19 bar tlak", "1450 W výkon", "500 g zásobník zrn", "2,2 l zásobník vody", "5\" full-touch TFT displej", "Rozměry: 32,6 × 52,7 × 48,2 cm, 13 kg"],
    promo: "Pro zákazníky, kteří chtějí absolutní špičku. Srovnatelné s Jura GIGA za třetinovou cenu.",
    cold: true, milk: true, milkAuto: true,
    quiz: [
      { q: "PrimaDonna Aromatic je v sérii vlajkovou lodí od roku 2025. Jaké ocenění získala?", a: "<strong>Red Dot Design Award Winner 2025</strong> – jedno z nejprestižnějších světových designových ocenění. Skvělý argument pro zákazníky, kteří dbají na estetiku." },
      { q: "Jaká je klíčová technologie, která odlišuje PrimaDonna Aromatic od jiných modelů?", a: "<strong>Bean Adapt Technology s elektronickým mlýnkem</strong> – automaticky nastaví hrubost mletí, dávku a teplotu extrakce na základě zadaného typu zrna (arabica/robusta, stupeň pražení). Stroj se sám doladí pro každou kávu." },
      { q: "Zákazník porovnává PrimaDonna Aromatic s Jura Z10 za 100 000 Kč. Co říkáš?", a: "PrimaDonna Aromatic nabízí <strong>srovnatelné funkce za přibližně třetinovou cenu</strong>. Má Bean Adapt, Cold Brew, duální LatteCrema Hot & Cool, 5\" displej a 35+ receptů. Jura má výhodu švýcarské spolehlivosti, ale cenový rozdíl je obrovský." },
      { q: "Co je Coffee Moments a jak to zákazníkovi vysvětlíš?", a: "<strong>Coffee Moments</strong> je funkce, která se naučí tvůj denní rytmus a navrhne ti oblíbený nápoj ve správnou denní dobu. Ráno se zobrazí espresso, odpoledne cappuccino – přesně tak, jak to obvykle piješ. Stroj se přizpůsobí tobě." },
      { q: "Proč má PrimaDonna Aromatic zásobník 500 g a 2,2 l vody? Pro koho je to argument?", a: "Pro <strong>vícečlenné rodiny nebo malé kanceláře</strong> – nemusejí doplňovat zrna ani vodu tak často. 500 g zrn vystačí přibližně na 50–70 šálků, 2,2 l vody na desítky příprav bez doplňování." }
    ]
  },
  {
    name: "Rivelia",
    model: "EXAM 440.55.G",
    type: "automatický",
    tier: "Prémiová střední třída",
    tags: ["Bean Switch", "2 zásobníky", "16 nápojů", "Bean Adapt", "iF Design Award"],
    specs: ["15 bar tlak", "1450 W", "2× 250 g zásobník", "Kompaktní", "Displej 3,5\" TFT"],
    highlights: [
      "Jediný model se dvěma vyměnitelnými zásobníky na zrna (Bean Switch System)",
      "Snadné přepínání: arabica ↔ bezkofeinová bez přesypávání",
      "Bean Adapt Technology – automatická kalibrace pro každý typ zrna",
      "16 předprogramovaných receptů vč. flat white, cortado",
      "3,5\" full-touch barevný displej s animacemi",
      "4 uživatelské profily s Coffee Routines",
      "3× iF Design Award (produkt, UX, UI)"
    ],
    specs_detail: ["15 bar tlak", "1450 W výkon", "2× 250 g zásobníky zrn", "1,3 l zásobník vody", "3,5\" full-touch TFT displej", "3× iF Design Award"],
    promo: "Hvězda pro rodiny nebo kanceláře s různými preferencemi – každý má své oblíbené zrno.",
    cold: false, milk: true, milkAuto: true,
    quiz: [
      { q: "Jaká je unikátní vlastnost Rivelia, kterou nemá žádný jiný model v portfoliu?", a: "<strong>Bean Switch System</strong> – dva vyměnitelné zásobníky na zrna (každý 250 g). Unikátní v celém DeLonghi portfoliu. Zákazník může mít ráno tmavou arabicu a odpoledne světlou nebo bezkofeinovou bez přesypávání." },
      { q: "Zákazník říká: 'Ale já vždy piji jen jednu kávu, proč bych potřeboval dva zásobníky?' Co odpovíš?", a: "Argument pro domácnost: partner/ka může pít jiný typ. Argument pro jednoho: ráno silná, večer bezkofeinová. A Bean Adapt Technology automaticky přenastaví stroj pro každé zrno – zákazník nic nemusí řešit." },
      { q: "Jaká designová ocenění Rivelia získala?", a: "<strong>3× iF Design Award</strong> – v kategoriích Product Design, User Experience a User Interface. Je to jeden z nejlépe designovaných kávovarů v portfoliu a tato ocenění jsou silný prodejní argument pro zákazníky dbající na estetiku." },
      { q: "Co jsou Coffee Routines a jak fungují v praxi?", a: "<strong>Coffee Routines</strong> jsou 4 osobní uživatelské profily, které se naučí, jaký nápoj kdo pije a kdy. Stroj pak dynamicky mění nabídku podle denní doby a uživatele. Ráno nabídne espresso, odpoledne flat white – automaticky." },
      { q: "Cold Brew nebo ne? A jak zákazníkovi doporučíš, pokud ho zajímá?", a: "Rivelia <strong>základně Cold Brew nemá</strong>. Lze dokoupit LatteCrema Cool příslušenství pro studené mléčné nápoje, ale Cold Brew extrakci stroj nepodporuje. Pokud zákazník chce Cold Brew → Eletta Ultra nebo PrimaDonna Aromatic." }
    ]
  },
  {
    name: "Dedica Duo",
    model: "EC 890.M",
    type: "pákový",
    tier: "Pákový – vstupní/střední",
    tags: ["Šířka 15 cm", "Manuální", "My Latte Art", "Cold Brew", "15 bar"],
    specs: ["15 bar tlak", "1450 W", "1,1 l voda", "Šířka 15 cm", "Dotykové ikony"],
    highlights: [
      "JEDINÝ pákový kávovar v tomto portfoliu",
      "Extrémně kompaktní: šířka pouhých 15 cm",
      "Připravuje espresso z mleté kávy (mlýnek není součástí!)",
      "3 recepty: espresso, double espresso, Cold Brew (za 5 min)",
      "Parní tryska My Latte Art pro ruční tvorbu mikropěny",
      "Nahřátí za 40 sekund",
      "Velkokapacitní filtrační koše pro intenzivnější espresso",
      "Vhodný i pro ESE pody"
    ],
    specs_detail: ["15 bar tlak", "1450 W výkon", "1,1 l zásobník vody", "Šířka pouze 15 cm", "Nahřátí za 40 sekund", "Kompatibilní s ESE pody"],
    promo: "Pro zákazníky s baristickými ambicemi nebo malou kuchyní. Nutno zdůraznit, že potřebuje mlýnek.",
    cold: true, milk: false, milkAuto: false,
    quiz: [
      { q: "Jaký je ZÁSADNÍ rozdíl Dedica Duo oproti všem ostatním modelům v portfoliu?", a: "<strong>Je to pákový kávovar</strong> – kávu nenamele sám. Zákazník potřebuje předmletou kávu nebo samostatný mlýnek. Všechny ostatní modely jsou plně automatické s integrovaným mlýnkem. Toto musíš zákazníkovi vždy sdělit!" },
      { q: "Zákazník se ptá proč je Dedica Duo tak úzká. Co to znamená v praxi?", a: "Šířka <strong>pouhých 15 cm</strong> – vejde se i do nejmenší kuchyňské linky, na okraj pultu, do hotelového pokoje nebo kanceláře. Je to nejkompaktnější espresso stroj v portfoliu." },
      { q: "Co je tryska My Latte Art a jak se liší od LatteCrema systému?", a: "<strong>My Latte Art</strong> je ruční parní tryska – zákazník napění mléko sám, jako barista. LatteCrema je automatický systém (v jiných modelech), kde stroj napění za zákazníka. My Latte Art dává větší kontrolu a baristický zážitek, ale vyžaduje trochu praxe." },
      { q: "Dedica Duo umí Cold Brew – jak to funguje a jak rychle?", a: "Cold Brew za <strong>5 minut</strong> – stroj má speciální recept pro studenou extrakci přes led. To je výjimečné, protože tradiční Cold Brew trvá 12–24 hodin. Skvělý argument pro léto a zákazníky, kteří pijí ledové kávové nápoje." },
      { q: "Zákazník chce koupit Dedica Duo, ale nemá mlýnek. Co doporučíš?", a: "Nabídnu mu <strong>ke koupi také mlýnek</strong> (DeLonghi má v portfoliu mlýnky jako KG 200, KG 521 apod.) nebo mu vysvětlím, že může používat čerstvě předmletou kávu z pražírny. Zdůrazním výhody čerstvě mleté kávy vs. kapsle." }
    ]
  }
];
