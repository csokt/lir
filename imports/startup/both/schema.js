import { Mongo } from 'meteor/mongo'

Kodolasok = new Mongo.Collection('kodolasok')
//Messages = new Mongo.Collection('messages')

Schema = {}

Schema.qr = new SimpleSchema({
  code: {
    type: Number,
    label: "Kézi adatbevitel:",
  },
})

Schema.scanner = new SimpleSchema({
  role: {
    type:  String,
    label: "Szerep",
    optional: true,
    autoform : {disabled: true}
  },
  request: {
    type:  String,
    label: "Kérdés",
    optional: true,
    autoform : {disabled: true}
  },
  response: {
    type:  String,
    label: "Válasz",
    optional: true,
    autoform : {disabled: true}
  },
  message: {
    type:  String,
    label: "Küld",
    autoform : {autofocus: true}
  },
})

Schema.kodol = new SimpleSchema({
  username: {
    type:  String,
    label: "Felhasználó",
    optional: true,
    autoform : {disabled: true}
  },
  telephely: {
    type:  String,
    label: "Telephely",
    optional: true,
    autoform : {disabled: true}
  },
  kodolo: {
    type:  String,
    label: "Kódoló",
    optional: true,
    autoform : {disabled: true}
  },
  dolgozo: {
    type:  String,
    label: "Dolgozó",
    optional: true,
    autoform : {disabled: true}
  },
  munkalap: {
    type:  Number,
    label: "Munkalap",
    optional: true,
    autoform : {disabled: true}
  },
  muveletkod: {
    type:  Number,
    label: "Műveletkód",
  },
  mennyiseg: {
    type:  Number,
    label: "Mennyiség",
  },
})
