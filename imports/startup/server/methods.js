// Methods

import { Meteor } from 'meteor/meteor'
import { mssql } from '../../startup/server/initdb.js'
import mqtt from 'mqtt'

const TopicBase = 'tir/dama/kodol/'
const client = mqtt.connect('mqtt://192.168.0.30', {username:'admin', password:'Szefo1953'})
client.subscribe(TopicBase+'response')
//client.subscribe('#')

client.on('message', function (topic, message) {
  try {
    const doc = JSON.parse(message.toString())
//    console.log(topic)
//    console.log(doc)
    Kodolasok.rawCollection().update({'_id':doc.id},{$set:{'eredmeny':doc.result}})
  } catch (err) {
    log.error(err)
  }
})

Meteor.methods({
  // param.viewId:      A lekérdezéshez használt view azonosítója
  // param.filter:      Szűrési feltételek, objektum
  select(param) {
    function convert(elem){
      if (typeof elem == 'string') {
        return elem.trim()
      } else if (elem === null) {
        return ''
      } else if (elem instanceof Date) {
//        return elem.toISOString().slice(0,10).replace(/-/g,'.')
        return elem.toISOString().slice(0,19).replace(/-/g,'.').replace(/T/g,' ')
      } else {
        return elem
      }
    }

    const view = _.findWhere(Config.views, {id: param.viewId})
    const fields = _.pluck(view.fields, 'name')
    let q = mssql.select(fields).from(view.name)
    if (view.order) { q = q.orderByRaw(view.order) }
    if (view.limit) { q = q.limit(view.limit) }
    if (view.where) { q = q.whereRaw(view.where) }
    if (!_.isEmpty(param.filter)) {
      _.each(param.filter, function(val,key){
        let field = _.find(view.fields, function(x) { return x.name == key })
        if (field.filter == 'tartalmazza') {
          q = q.where(key, 'like', '%'+val+'%')
        } else {
          q = q.where(key, val)
        }
      })
    }
    log.debug(q.toString())
    return q.then(data => {
      let stat = []
      if (view.sum) {
        let row
        let col
        let sums = _.object(fields, _.range(fields.length).map(() => '' ))
        for (col of view.sum) {
          sums[col] = 0
        }
        for (row of data) {
          for (col of view.sum) {
            sums[col] += row[col]
          }
        }
        sums[fields[0]] = 'Összesen'
        stat.push(_.values(sums))
      }
      rows = _.map(data, function(obj){ return _.map(_.values(obj), convert) })
      return {'rows': rows, 'rowcount': rows.length, 'stat': stat}
    }).catch(error => {
      log.error(error)
      throw new Meteor.Error('query error', q.toString(), error)
    })
  },

  getVarro(belepokod) {
    dolgozokod = belepokod-20000
    let q = mssql.select('dolgozokod', 'dolgozonev').from('dolgtr').where('dolgozokod', dolgozokod).where('aktiv', 'A')
    log.debug(q.toString())
    return q.then(data => {
      if (!data.length) {
        log.warn(dolgozokod, 'dolgozokod not found int table dolgtr')
        return undefined
      }
      const user = {name: data[0].dolgozonev.trim(), role: 'varró', belepokod: belepokod}
      return user
    }).catch(error => {
      log.error(error)
      throw new Meteor.Error('query error', q.toString(), error)
    })
  },

  getKodolo(belepokod) {
    userid = belepokod-50000
    let q = mssql.select('userid', 'fullname').from('users').where('userid', userid)
    log.debug(q.toString())
    return q.then(data => {
      if (!data.length) {
        log.warn(userid, 'userid not found int table users')
        return undefined
      }
      const user = {name: data[0].fullname.trim(), role: 'kódoló', belepokod: belepokod}
      return user
    }).catch(error => {
      log.error(error)
      throw new Meteor.Error('query error', q.toString(), error)
    })
  },

  pubKodolas(doc) {
    log.info(doc, 'kódol')
    doc.funkcio = 99994
    doc.createdAt = new Date()
    const id  = Kodolasok.insert(doc)
    doc.id    = id
    const msg = JSON.stringify(doc)
    client.publish(TopicBase+'request', msg)
//    Meteor.setTimeout(() => {
//      eredmeny = Math.random() > 0.3 ? 'OK' : 'Hiba'
//      Kodolasok.update({'_id':id},{$set:{'eredmeny':eredmeny}})
//    }, Math.random()*2000)
  },

  delKodolasok(belepokod) {
    Kodolasok.remove({ belepokod: { $eq: belepokod } })
  },

  log(level, fields, msg) {
    if (level == 'warn') {
      log.warn(fields, msg)
    } else if (level == 'info') {
      log.info(fields, msg)
    } else if (level == 'debug') {
      log.debug(fields, msg)
    }
  },

})
