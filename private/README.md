**private folder**

All files inside a top-level directory called `private/` are only accessible from server code and can be loaded via the [`Assets`](http://docs.meteor.com/#/full/assets_getText) API. This can be used for private data files and any files that are in your project directory that you don't want to be accessible from the outside.

**Dokumentáció**

*Session változók*

user          GD.user-rel azonos
scanresult    A kódolvasó vagy kézi adatbevitel eredménye
scanmessage   A kódolvasó template-ben megjelenített válasz
dolgozokod    Bekerül a GD.kodol-ba
munkalap      Bekerül a GD.kodol-ba


*Globális változók (GD)*

GD.user     {qr: <num>, name: <str>, role: <str>, belepokod: <num>}

GD.doc      AutoForm beolvasott adatok átadása a Template-nek

GD.kodol    GD.user-ből {username: <str>, role: <str>, belepokod: <num>}
            {telephelykod: <num>, telephely: <str>, kodolokod: <num>, kodolo: <str>, dolgozokod: <num>, dolgozo: <str>, munkalap: <num>, muveletkod: <num>, mennyiseg: <num>}
            Megjelenítés: Schema.kodol
            method.pubKodolas() hozzáteszi még {createdAt: <Date>, id: <num>}

