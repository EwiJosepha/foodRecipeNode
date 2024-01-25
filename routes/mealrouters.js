const connection = require("../config/dbconnect")
'use strict'

var express = require('express')
let router = express.Router()

// var model = require('../model')

router.get('/', function (req, res, next) {
  const id = req.params.id
  const query = `select * from recipe where id=${id}`
  connection.query(query, (err, data) => {
    if (err) {
      next(err)

    } else {
      if ((data.length = 0)) {
        let error = new Error(`recipe with id ${id} not found`)
        err.status = 404
        res.send(err)
        next(err)
      } else {
        res.send(data[0])

      }
    }
  })
});

module.exports = router