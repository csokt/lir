import yaml from 'js-yaml'
var configYaml = `

views:
###############################################################################  TV  ###
-
  id:         varrodaleadas_tv
  name:       monitor_szegedvarrodaleadas
  label:      Szeged varroda napi leadás
  device:     tv
  refresh:    300
  where:
  order:      '[Cikk/IT]'
  head_after: 15
  limit:      20
  sum:
  - Rendelt db
  - Előzőleg leadott db
  - Leadott db
  - Hibák száma
  - Hátralék
  fields:
  - name:     Cikk/IT
  - name:     Megnevezés
  - name:     Megrendelő
  - name:     Rendelt db
    label:    Rendelt
  - name:     Előzőleg leadott db
    label:    Előzőleg leadott
  - name:     Leadott db
    label:    Ma leadott
  - name:     Hibák száma
  - name:     Hátralék
    label:    Gyártandó
-
  id:         vasaloleadas_tv
  name:       monitor_szegedvasaloleadas
  label:      Szeged vasaló napi leadás
  device:     tv
  refresh:    300
  where:
  order:      '[Cikk/IT]'
  head_after: 40
  limit:      20
  sum:
  - Rendelt db
  - Előzőleg leadott db
  - Leadott db
  - Hibák száma
  - Hátralék
  fields:
  - name:     Cikk/IT
  - name:     Megnevezés
  - name:     Megrendelő
  - name:     Rendelt db
    label:    Rendelt
  - name:     Előzőleg leadott db
    label:    Előzőleg leadott
  - name:     Leadott db
    label:    Ma leadott
  - name:     Hibák száma
  - name:     Hátralék
    label:    Gyártandó
	
-
  id:         szabaszatleadas_tv
  name:       monitor_szegedszabaszatleadas
  label:      Szeged szabászat napi leadás
  device:     tv
  refresh:    300
  where:
  order:      '[Cikk/IT]'
  head_after: 40
  limit:      20
  sum:
  - Rendelt db
  - Előzőleg leadott db
  - Leadott db
  - Hibák száma
  - Hátralék
  fields:
  - name:     Cikk/IT
  - name:     Megnevezés
  - name:     Megrendelő
  - name:     Rendelt db
    label:    Rendelt
  - name:     Előzőleg leadott db
    label:    Előzőleg leadott
  - name:     Leadott db
    label:    Ma leadott
  - name:     Hibák száma
  - name:     Hátralék
    label:    Gyártandó

-
  id:         fonalstatusz
  name:       Monitor_FonalStatuszView
  label:      SZ.J. - Fonal státusz
  device:     tv
  refresh:    300
  order:      Partiszám
  head_after: 15
  limit:      20
  fields:
  - name:     Partiszám
  - name:     Szállítólevél
  - name:     Partner rend szám
  - name:     SZEFO rend szám
  - name:     Dátum
  - name:     Termék cikkszám
  - name:     Fonal cikkszám
  - name:     Olasz megnevezés
  - name:     Magyar megnevezés
  - name:     Méret
  - name:     Szín
  - name:     Mennyiség
  - name:     Szükséglet
  - name:     Gyártási ütem

###############################################################################  Tablet  ###
-
  id:         napikodolas
  name:       monitor_napikodolas
  label:      Mai napi kódolások
  device:     tablet
  roles:
  - varró
  - varrodavezető
#  refresh:    60
#  where:
  order:      '[Kódolás ideje] DESC'
  head_after: 15
  limit:      100
  fields:
  - name:     Dolgozó kód
    type:     number
    filter:   egyenlő
    default:  belepokod
    readonly: true
  - name:     Cikkszám
    filter:   egyenlő
  - name:     IT
    filter:   egyenlő
  - name:     Diszpó
  - name:     Szín
  - name:     csomag
    label:    Csom.
  - name:     Méret
  - name:     darab
  - name:     Művelet
  - name:     Művelet név
  - name:     Normaperc
    label:    Norma perc
  - name:     Megjegyzés
  - name:     Kódoló
  - name:     Kódolás ideje

-
  id:         havikodolas
  name:       monitor_havikodolas
  label:      Aktuális havi kódolások
  device:     tablet
  roles:
  - varró
  - varrodavezető
  order:      '[Kódolás ideje] DESC'
  head_after: 15
  limit:      1000
  fields:
  - name:     Dolgozó kód
    type:     number
    filter:   egyenlő
    default:  belepokod
    readonly: true
  - name:     Cikkszám
    filter:   egyenlő
  - name:     IT
    filter:   egyenlő
  - name:     Diszpó
  - name:     Szín
  - name:     csomag
    label:    Csom.
  - name:     Méret
  - name:     darab
  - name:     Művelet
  - name:     Művelet név
  - name:     Normaperc
    label:    Norma perc
  - name:     Megjegyzés
  - name:     Kódoló
  - name:     Kódolás ideje

-
  id:         becsultszazalek
  name:       monitor_becsultszazalek
  label:      Becsült teljesítmények %
  device:     tablet
  roles:
  - varró
  - varrodavezető
  order:      '[Dolgozó kód]'
  head_after: 15
  limit:      100
  fields:
  - name:     Dolgozó kód
    type:     number
    filter:   egyenlő
    default:  belepokod
    readonly: true
  - name:     Napi becs %
    label:    Mai becsült %
  - name:     1 napi becs %
    label:    1 nappal ezelőtti becsült %
  - name:     2 napi becs %
    label:    2 nappal ezelőtti becsült %
  - name:     3 napi becs %
    label:    3 nappal ezelőtti becsült %
  - name:     Havi becs %
    label:    Aktuális havi becsült %
  - name:     1 havi lezárt %
    label:    Előző havi lezárt %

-
  id:         cikknormai
  name:       monitor_cikknormai
  label:      Konfekció normalapok
  device:     tablet
  roles:
  - varró
  - kódoló
  - varrodavezető
  order:      Műveletkód
  head_after: 15
  limit:      500
  fields:
  - name:     Cikkszám
    filter:   egyenlő
  - name:     Műveletkód
    type:     number
    filter:   egyenlő
  - name:     Megnevezés
  - name:     Normaperc
    label:    Norma perc
  - name:     Előkészítő
  - name:     Normatípus
  - name:     Gép

-
  id:         varrodaleadas_tablet
  name:       monitor_szegedvarrodaleadas
  label:      Szeged varroda napi leadás
  device:     tablet
  roles:
  - varró
  - varrodavezető
  order:      '[Cikk/IT]'
  head_after: 15
  limit:      100
  sum:
  - Rendelt db
  - Előzőleg leadott db
  - Leadott db
  - Hibák száma
  - Hátralék
  fields:
  - name:     Cikk/IT
    filter:   egyenlő
  - name:     Megnevezés
  - name:     Megrendelő
  - name:     Rendelt db
    label:    Rendelt
  - name:     Előzőleg leadott db
    label:    Előzőleg leadott
  - name:     Leadott db
    label:    Ma leadott
  - name:     Hibák száma
  - name:     Hátralék
    label:    Gyártandó

-
  id:         varrodatermeles
  name:       monitor_szegedvarrodatermeles
  label:      Szeged varroda heti gyártási terve
  device:     tablet
  roles:
  - varró
  - varrodavezető
  order:      Rendelésszám
  head_after: 15
  limit:      100
  fields:
  - name:     Rendelésszám
    type:     number
    filter:   egyenlő
  - name:     IT
    filter:   egyenlő
  - name:     Cikkszám
    filter:   egyenlő
  - name:     Megnevezés
  - name:     Model
  - name:     Szín
  - name:     Gyártandó

-
  id:         mitkodoltamma
  name:       monitor_napikodolas
  label:      Mit kódoltam ma?
  device:     tablet
  roles:
  - kódoló
  order:      '[Kódolás ideje] DESC'
  head_after: 15
  limit:      100
  fields:
  - name:     Kódoló kód
    type:     number
    filter:   egyenlő
    default:  belepokod
    readonly: true
  - name:     Cikkszám
    filter:   egyenlő
  - name:     IT
    filter:   egyenlő
  - name:     Diszpó
  - name:     Szín
  - name:     csomag
    label:    Csom.
  - name:     Méret
  - name:     darab
  - name:     Művelet
  - name:     Művelet név
  - name:     Normaperc
    label:    Norma perc
  - name:     Megjegyzés
  - name:     Dolgozó
  - name:     Kódolás ideje

-
  id:         muveletosszegzese
  name:       monitor_muveletekosszegzese
  label:      Bekódolt műveletek összegzése
  device:     tablet
  roles:
  - varrodavezető
  order:      Művelet
  head_after: 15
  limit:      500
  fields:
  - name:     Cikkszám
    filter:   egyenlő
  - name:     IT
    filter:   egyenlő
  - name:     Művelet
    type:     number
    filter:   egyenlő
  - name:     Megnevezés
  - name:     darab
    label:    Összes bekódolt db.


users:
-
  qr:         15283
  name:       Csók Tibor
  role:       admin
-
  qr:         14683
  name:       Szeleczkei Zoltán
  role:       admin
-
  qr:         3829
  name:       Hortobágyi Andrásné
  role:       varrodavezető
-
  qr:         3339
  name:       Acsai Varga Sándorné
  role:       varró
  belepokod:  20051
-
  qr:         4211
  name:       Márta Norbert
  role:       kódoló
  belepokod:  50020
-
  qr:
  name:
  role:
  belepokod:


`

try {
  Config = yaml.safeLoad(configYaml)
  for (let view of Config.views) {
    let schema = {}
    for(let field of view.fields) {
      if (!field.label) {field.label = field.name}
      if (!field.filter) { continue }
      schema[field.name] = {
        type : field.type === 'number' ? Number : String,
        label: (field.label || field.name) + ' ' + field.filter,
        optional: true
      }
      if (field.readonly) {
        schema[field.name].autoform = {readonly: true}
      }
    }
    view.schema = new SimpleSchema(schema)
  }
} catch (err) {
  console.log(err)
}
