'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

VUE_APP_BASE_API  = 'http://localhost:8003'

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})



