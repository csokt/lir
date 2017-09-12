import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'
import { ReactiveVar } from 'meteor/reactive-var'
import Instascan from 'instascan'

import './components.html'
import '../stylesheets/table.css'
import '../stylesheets/override.css'

//############################################################################################################################  hello  ###
//#############################################################################  events  ###
Template.hello.events({
  'click #logout'(event, self) {
    window.location.reload()
//    Session.set('user', undefined)
  },
})

//############################################################################################################################  login  ###
Template.login.onCreated(function () {
  this.autorun(function() {

    function setUser(user){
      if (!user) {
        Session.set('scanmessage', 'Érvénytelen felhasználó kód!')
        return
      }
      GD.user = user
      Session.set('user', user)
      log('info', {}, 'login')

      if (user.role == 'kodolo') {
        GD.kodol = {
          szefo_muvelet_id:  undefined,
          hely_id         :  user.hely_id,
          hely            :  user.hely,
          szemely_id      :  undefined,
          mennyiseg       :  undefined,
          megjegyzes      :  'lir',
          nexon_azon      :  undefined,

        }
      } else {
        GD.kodol = undefined
      }
    }

    const scanresult = Session.get('scanresult')
    const qr = parseInt(scanresult)
    if (!qr) {
      log('warn', {}, 'login ParseInt failed on QR code '+scanresult)
      Session.set('scanmessage', 'Csak számot lehet megadni!')
      return
    }

    if (!Session.get('user')) {
      Meteor.call('getUser', qr, function(err, res){
        if (err) {console.log(err); return }
        setUser(res)
      })

    }
  })
})

//############################################################################################################################  dolgozo_scan  ###
Template.dolgozo_scan.onCreated(function () {
  this.autorun(function() {
    const scanresult = Session.get('scanresult')
    if (!scanresult) {return}
    const qr = parseInt(scanresult)
    Meteor.call('getDolgozo', qr, function(err, res){
      if (err) {console.log(err); return }
      if (res) {
        Session.set('dolgozo', res)
        GD.kodol.szemely_id = res.id
        GD.kodol.nexon_azon = res.SzemelyId
        GD.kodol.dolgozo    = res.name
      } else {
        Session.set('scanmessage', 'Érvénytelen dolgozó kód!')
      }
    })
  })
})

//############################################################################################################################  qr  ###
//#############################################################################  functions  ###
AutoForm.hooks({
  qrForm: {
    onSubmit: function (doc) {
      log('info', doc, 'manual qr')
      Session.set('scanresult', doc.code)
      this.done()
      return false
    }
  }
})

//#############################################################################  onCreated  ###
Template.qr.onCreated(function scanCodeOnCreated() {
  let self = this
  self.cameras = new ReactiveVar([])
  self.activeCameraIndex = Template.currentData().defaultCameraIndex
  Session.set('scanmessage', undefined)
})

//#############################################################################  onRendered  ###
Template.qr.onRendered(function scanCodeOnRendered() {
  let self = this
  self.scanner = new Instascan.Scanner({ video: self.find('#preview'), scanPeriod: 5 })

  self.scanner.addListener('scan', function (content) {
    console.log(content)
    Session.set('scanresult', content)
    Session.set('scanmessage', 'Kód beolvasva')
  })

  Instascan.Camera.getCameras().then(function (cameras) {
//    console.log(cameras)
    self.cameras.set(cameras)
    self.cameraCount = cameras.length
    if (self.activeCameraIndex >= self.cameraCount) {self.activeCameraIndex = self.cameraCount-1}
    if (self.cameraCount > 0) {
      self.scanner.start(cameras[self.activeCameraIndex])
    } else {
      console.error('No cameras found.')
    }
  }).catch(function (e) {
    console.error(e)
  })

})

//#############################################################################  onDestroyed  ###
Template.qr.onDestroyed(function scanCodeOnDestroyed() {
  this.scanner.stop()
  Session.set('scanresult', null)
})

//#############################################################################  helpers  ###
Template.qr.helpers({
  nextcamera() {
    return Template.instance().cameras.get().length > 1
  },

  scanmessage() {
    return Session.get('scanmessage')
  },

  doc: function () {
    return {}
  },
})



//#############################################################################  events  ###
Template.qr.events({
  'click #nextcamera'(event, self) {
    self.activeCameraIndex = (self.activeCameraIndex + 1) % self.cameraCount
    let camera = self.cameras.get()[self.activeCameraIndex]
//    console.log(camera)
    self.scanner.start(camera)
  },
})

//############################################################################################################################  table  ###
//#############################################################################  functions  ###
AutoForm.hooks({
  filterForm: {
    onSubmit: function (doc) {
//      log('info', doc, 'filter')
      GD.doc = doc
      this.done()
      return false
    }
  }
})

function selectCall(self){
  self.result.set(false)
  let param = {viewId: self.viewId, filter: self.filter}
  Meteor.call('select', param, function(err, res){
    self.waitForResult.set(false)
    if (err) {console.log(err); return }
    self.result.set(res)
  })
}


//#############################################################################  onCreated  ###
Template.table.onCreated(function () {
  var self = this
  self.viewId = FlowRouter.getParam('viewId')
  const view = _.findWhere(Config.views, {id: self.viewId})
  self.currView = view
  const user = Session.get('user')
  self.filter = {}

  for(let field of view.fields) {
    if (!field.default) { continue }
    self.filter[field.name] = user[field.default]
  }
  self.isFilter = new ReactiveVar(false)
  self.result = new ReactiveVar(false)
  self.waitForResult = new ReactiveVar(true)
  if (view.refresh) {
    self.myInterval = Meteor.setInterval(() => {
      selectCall(self)
    }, 1000*view.refresh)
  }
  selectCall(self)
})

//#############################################################################  onDestroyed  ###
Template.table.onDestroyed(function () {
  if (this.myInterval) {
    Meteor.clearInterval(this.myInterval)
  }
})

//#############################################################################  helpers  ###
Template.table.helpers({
  isInfo: function () {
    return Template.instance().currView.device != 'tv'
  },
  isFilter: function () {
    return Template.instance().isFilter.get()
  },
  schema: function () {
    return Template.instance().currView.schema
  },
  doc: function () {
    return Template.instance().filter
  },
  view: function () {
    return Template.instance().currView
  },
  result: function () {
    return Template.instance().result.get()
  },
  waitForResult: function () {
    return Template.instance().waitForResult.get()
  },
  inserthead: function (index) {
    return (index+1) % Template.instance().currView.head_after === 0
  },
})

//#############################################################################  events  ###
Template.table.events({
  'click #isFilter'(event, self) {
    self.isFilter.set(!self.isFilter.get())
  },

  'submit #filterForm'(event, self) {
    let doc = _.clone(GD.doc)
    doc.view = self.currView.name
    log('info', doc, 'filter')

    self.filter = GD.doc
    self.isFilter.set(false)
    self.waitForResult.set(true)
    selectCall(self)
  },
})

//############################################################################################################################  view_list  ###
Template.view_list.helpers({
  views() {
    const device = Template.currentData().device
//    let views = _.filter(Config.views, function(x) { return x.hasOwnProperty(device) })
//    let views = _.filter(Config.views, function(x) { return x.devices.includes(device) })
    let views = _.filter(Config.views, function(x) { return x.device == device })
    if (device != 'tv') {
      role = Session.get('user').role
      views = _.filter(views, function(x) { return x.roles.includes(role) })
    }
    return views
  },

  path: function(view) {
    const params = {
      viewId: view.id
    }
    const queryParams = {}
    return FlowRouter.path('/'+view.device+'/:viewId', params, queryParams)
  },
})
