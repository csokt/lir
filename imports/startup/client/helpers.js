import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'

Template.registerHelper('logged', function(){
  return !!Session.get('user')
})

Template.registerHelper('user', function(){
  return Session.get('user')
})

Template.registerHelper('kodolhat', function(){
  user = Session.get('user')
  return user && _.contains(['varró', 'kódoló'], user.role)
//  return user && _.contains(['varró'], user.role)
})

//Template.registerHelper('kodolo', function(){
//  user = Session.get('user')
//  return user && user.role == 'kódoló'
//})

Template.registerHelper('kodolo', function(){
  user = Session.get('user')
  return user && user.role == 'kódoló'
})

Template.registerHelper('dolgozo', function(){
  user = Session.get('user')
  return user && user.role != 'kódoló' || Session.get('dolgozokod')
})

Template.registerHelper('wait', function(){
  return Session.get('wait')
})

Template.registerHelper('Schema', function(){
  return Schema
})
