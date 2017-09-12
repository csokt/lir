import bunyan from 'bunyan'

log = bunyan.createLogger({
    name: 'LIR',
//    level: 'info',
    level: 'debug',
    streams: [{
        type: 'rotating-file',
        path: '/home/administrator/lir.log',
        period: '1d',
        count: 3
    }]
})

log.info('Program started.')
