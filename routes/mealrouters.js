'use strict'
const connection = require("../config/dbconnect")

var express = require('express')
let router = express.Router()

// var model = require('../model')

router.get('/', function (req, res, next) {
  const query = 
  `select  mealId, mealName, strArea,mealstrYoutube, mealInstructions, mealMeasurements, mealcategory.categoryName, mealIngredients.ingredients  from recipe  join mealcategory on
  recipe.mealCatId = mealcategory.categoryId join mealingredients;
  `
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
  const query2 = `select * from recipe where mealId = ${id};`
  connection.query(query2, (err, data) => {
    if (err) {
      next(err)
    } else {
      if ((data.length = 0)) {
        let error = new Error(`recipe with mealId ${id} not found`)
        err.status = 404
        res.send(err)
        next(err)
      } else {
        res.send(data[0])

      }
    }
  })
});

router.post('/', function (req, res, next) {
  const { mealId,mealName, strArea,mealstrYoutube,mealInstructions,mealmeasurements } = req.body;
  console.log(req.body);
  const creationQuery = `insert into recipe(   mealId, mealName, strArea,mealstrYoutube, mealInstructions, mealMeasurements, mealcategory.categoryName, mealIngredients.ingredients  from recipe  right join mealcategory on
  recipe.mealCatId = mealcategory.categoryId right join mealingredients on recipe.mealId) values ("${8}", "${eru}", "${Nigeria}", "${httphdhhdjjgdfees}", "${cookLeaves}","${pansofEru}", "${vegetables}","${cryfish}",)`;
  connection.query(creationQuery, (err, data) => {
    if (err) next(err)
    else res.status(201).send(data)
  })
})

router.delete("/:id", function (req, res, next) {
  const id = req.params.id
  const deletedquery = `delete from recipe where id = ${id}`
  connection.query(deletedquery, (err, data)=>{
    if (err) {
      console.log(err);
      if (err.message === "not found") next()
      else {
        next()
      }
    }else{
      res.send(data)
    }
  })

})


module.exports = router