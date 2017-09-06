import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'
import { ReactiveVar } from 'meteor/reactive-var'

import '../components/components.js'
import './pages.html'

//############################################################################################################################  App_scanner  ###
const TopicBase = 'tir/dama/scanner/'

function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect")
  GD.scanner.client.subscribe(TopicBase+'+')
}

function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0)
  console.log("onConnectionLost:"+responseObject.errorMessage)
}

function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString)
  try {
    const doc = JSON.parse(message.payloadString)
    if (doc.from == 'client') {
      Session.set('request', doc.message)
      Session.set('response', undefined)
    } else {
      Session.set('response', doc.message)
    }
  } catch (err) {
    log.error(err)
  }
}

AutoForm.hooks({
  scannerForm: {
    onSubmit: function (doc) {
      doc.device = '12345678'
      doc.from = GD.scanner.role
      const msg = JSON.stringify(doc)
      if (doc.from == 'client') {
        GD.scanner.client.publish(TopicBase+'request', msg)
      } else {
        GD.scanner.client.publish(TopicBase+'response', msg)
      }
      this.done()
      return false
    }
  }
})

Template.App_scanner.onCreated(function () {
  GD.scanner.client = new Paho.MQTT.Client('192.168.0.8', Number(8083), Math.random().toString(36).substr(2, 10))
  GD.scanner.client.onConnectionLost = onConnectionLost
  GD.scanner.client.onMessageArrived = onMessageArrived
  GD.scanner.client.connect({onSuccess:onConnect})
  GD.scanner.role = FlowRouter.getParam('role')
  Session.set('scanner', {})
})

Template.App_scanner.onDestroyed(function () {
  console.log('Paho client disconnect')
  GD.scanner.client.disconnect()
})

Template.App_scanner.helpers({
  doc: function () {
    return {
      role:     GD.scanner.role,
      request:  Session.get('request'),
      response:  Session.get('response'),
    }
  },
})

//############################################################################################################################  App_kodol  ###
//#############################################################################  functions  ###
AutoForm.hooks({
  kodolForm: {
    onSubmit: function (doc) {
      _.extend(doc, GD.kodol)
      Meteor.call('pubKodolas', doc, function(err, res){
        if (err) {console.log(err); return }
      })
      this.done()
      return false
    }
  }
})

//#############################################################################  onCreated  ###
Template.App_kodol.onCreated(function () {
  var self = this
  const user = Session.get('user')
  Meteor.call('delKodolasok', user.belepokod, function(err, res){
    if (err) {console.log(err); return }
  })
  Session.set('dolgozokod', false)
  Session.set('munkalap', false)
  self.muveletkod = new ReactiveVar(false)
  self.mennyiseg  = new ReactiveVar(false)
})

//#############################################################################  helpers  ###
Template.App_kodol.helpers({
  munkalap: function () {
    return Session.get('munkalap')
  },

  doc: function () {
    return GD.kodol
  },

  ujKodolasok: function () {
    return Kodolasok.find({ belepokod: { $eq: Session.get('user').belepokod } }, {sort: {'createdAt': -1}})
  },
})

//#############################################################################  events  ###
Template.App_kodol.events({
  'click #ujMunkalap'(event, self) {
    Session.set('munkalap', false)
  },

  'click #ujDolgozo'(event, self) {
    Session.set('dolgozokod', false)
    Session.set('munkalap', false)
  },
})

