const { hash } = require("./utils")

exports.actions = {
    register_user: 'register_user',
}


exports.namespace = {
    vin: hash('admin').substring(0,2)
}

exports.family = {
    name: 'admision',
    namespace: hash('admin-saw').substring(0,6),
    version: '1.2'
}