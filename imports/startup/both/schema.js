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
  hely: {
    type:  String,
    label: "Gyártási hely",
    optional: true,
    autoform : {disabled: true}
  },
  dolgozo: {
    type:  String,
    label: "Dolgozó",
    optional: true,
    autoform : {disabled: true}
  },
  gyartasi_lap_id: {
    type:  Number,
    label: "Gyártási lap",
  },
  szefo_muvelet_id: {
    type:  Number,
    label: "Műveletkód",
  },
  szefo_muvelet: {
    type:  String,
    label: "Művelet",
    optional: true,
    autoform : {disabled: true}
  },
  osszes_db: {
    type:  Number,
    label: "Összes db",
    optional: true,
    autoform : {disabled: true}
  },
  kesz_db: {
    type:  Number,
    label: "Kész db",
    optional: true,
    autoform : {disabled: true}
  },
  mennyiseg: {
    type:  Number,
    label: "Mennyiség",
  },
})
