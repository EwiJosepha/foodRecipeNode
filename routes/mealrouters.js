'use strict'
const connection = require("../config/dbconnect")

var express = require('express')
let router = express.Router()

// var model = require('../model')

router.get('/', function (req, res, next) {
  const query =
    `select  meals.mealId, mealName, mealArea,mealYoutube, mealUrl, mealctegory.category, mealinstructions.instruction, mealinstructions.step from meals  join mealctegory on
  meals.categoryId = mealctegory.categoryId
  join mealinstructions on meals.mealId= mealinstructions.mealId
  ;`
  console.log(res.statusCode)
  connection.query(query, (err, data) => {
    if (err) {
      console.error(err)
      if (err.message === "not found") next()
      else next()
    } else {
      res.send(data)

    }
  })
});

router.get('/:id', function (req, res, next) {
  const id = req.params.id
  const query2 = `select  meals.mealId, mealName, mealArea,mealYoutube, mealUrl, mealctegory.category, mealinstructions.instruction, mealinstructions.step from meals  join mealctegory on
  meals.categoryId = mealctegory.categoryId
  join mealinstructions on meals.mealId= mealinstructions.mealId where meals.mealId = ${id};`
  connection.query(query2, (err, data) => {
    if (err) {
      next(err)
    } else {
      if ((data.length === 0)) {
        let error = new Error(`mealproject with mealId ${id} not found`)
        error.status = 404;
        res.status(404).send(error);
        next(error);
      } else {
        res.send(data[0])

      }
    }
  })
});

router.post('/', function (req, res, next) {
  // const { categoryId, category } = req.body
  const categoryquerry = `insert into mealcategory(categoryId, category)  values ("2", "${Dessert}")`

  const mealquerry = `insert into meals(mealId, mealName, mealArea, mealUrl,mealYoutube, categoryId)  values ("2", "${sandwish}", "${USA}", "${"https://images.unsplash.com/photo-1555554317-766200eb80d6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FuZHdpc2h8ZW58MHx8MHx8fDA%3D"}", "${null}, "${2}");`

  connection.query(mealquerry, (err, data) => {
    if (err) next(err)
    else res.status(201).send(data)
  })

  const instructionsquerry = `insert into mealInstructions(instructionId, mealId,stepCount, instruction, step)  values ("2", "${2}", "${2}", "${'[{"instruction": "follow the steps carefully"}]'}", "${'[{"step1": "SLICE tomatoes and other ingredients"},{"step2": "bake your flour"}, {"step3": "spread spices into the bread"}]'}" )
  ;`
  connection.query(instructionsquerry, (err, data) => {
    if (err) next(err)
    else res.status(201).send(data)
  })
})

router.delete("/:id", function (req, res, next) {
  const id = req.params.id
  const deletedquery = `delete from recipe where id = ${id}`
  connection.query(deletedquery, (err, data) => {
    if (err) {
      console.log(err);
      if (err.message === "not found") next()
      else {
        next()
      }
    } else {
      res.send(data)
    }
  })

})


module.exports = router