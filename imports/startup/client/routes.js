import { FlowRouter } from 'meteor/kadira:flow-router'
import { BlazeLayout } from 'meteor/kadira:blaze-layout'

// Import needed templates
import '../../ui/layouts/body/body.js'
import '../../ui/pages/pages.js'

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App.home',
  action() {
    log('info', {path: FlowRouter.current().path}, 'route')
    BlazeLayout.render('App_body', { main: 'App_home' })
  },
})

FlowRouter.notFound = {
  action() {
    log('info', {path: FlowRouter.current().path}, 'route')
    BlazeLayout.render('App_body', { main: 'App_notFound' })
  },
}

FlowRouter.route('/tv', {
  name: 'App.tv',
  action(params, queryParams) {
    log('info', {path: FlowRouter.current().path}, 'route')
    BlazeLayout.render('App_body', { main: 'App_tv' })
  },
})

FlowRouter.route('/tv/:viewId', {
  name: 'App.tv.view',
  action(params, queryParams) {
    log('info', {path: FlowRouter.current().path}, 'route')
    BlazeLayout.render('App_body', { main: 'App_tv_view' })
  },
})

FlowRouter.route('/tablet', {
  name: 'App.tablet',
  action(params, queryParams) {
    log('info', {path: FlowRouter.current().path}, 'route')
    BlazeLayout.render('App_body', { main: 'App_tablet' })
  },
})

FlowRouter.route('/tablet/:viewId', {
  name: 'App.tablet.view',
  action(params, queryParams) {
    log('info', {path: FlowRouter.current().path}, 'route')
    BlazeLayout.render('App_body', { main: 'App_tablet_view' })
  },
})

FlowRouter.route('/kodol', {
  name: 'App.kodol',
  action(params, queryParams) {
    log('info', {path: FlowRouter.current().path}, 'route')
    BlazeLayout.render('App_body', { main: 'App_kodol' })
  },
})

FlowRouter.route('/scanner/:role', {
  name: 'App.scanner',
  action(params, queryParams) {
    log('info', {path: FlowRouter.current().path}, 'route')
    BlazeLayout.render('App_body', { main: 'App_scanner' })
  },
})
