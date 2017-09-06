import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'

log = function(level, fields, msg){
  let cloned = _.clone(fields)
  const user = Session.get('user')
  if (user) {
    _.extend(cloned, {source: 'client', user: user.name, role: user.role})
  }
  Meteor.call('log', level, cloned, msg)
}
