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
  const {
    mealId,
    mealName,
    mealArea,
    mealUrl,
    mealYoutube,
    categoryId,
    instructionId,
    stepCount,
    instruction,
    step
  } = req.body;

  const categoryQuery = `INSERT INTO mealcategory (categoryId, category) VALUES (?, ?)`;
  const mealQuery = `INSERT INTO meals (mealId, mealName, mealArea, mealUrl, mealYoutube, categoryId) VALUES (?, ?, ?, ?, ?, ?)`;
  const instructionsQuery = `
    INSERT INTO mealInstructions (instructionId, mealId, stepCount, instruction, step)
    VALUES (?, ?, ?, ?, ?)
  `;

  connection.beginTransaction(function (err) {
    if (err) { 
      return next(err);
    }

    // Insert into mealcategory table
    connection.query(categoryQuery, [categoryId, mealName], function (error, results, fields) {
      if (error) {
        return connection.rollback(function () {
          next(error);
        });
      }

      const mealIdFromCategoryInsert = results.insertId;

      // Insert into meals table
      connection.query(mealQuery, [mealId, mealName, mealArea, mealUrl, mealYoutube, categoryId], function (error, results, fields) {
        if (error) {
          return connection.rollback(function () {
            next(error);
          });
        }

        const mealIdFromMealsInsert = results.insertId;

        // Insert into mealInstructions table
        connection.query(instructionsQuery, [instructionId, mealIdFromMealsInsert, stepCount, instruction, step], function (error, results, fields) {
          if (error) {
            return connection.rollback(function () {
              next(error);
            });
          }

          connection.commit(function (err) {
            if (err) {
              return connection.rollback(function () {
                next(err);
              });
            }
            console.log('Transaction Complete.');
            res.status(201).send('Transaction Complete.');
          });
        });
      });
    });
  });
});


router.post('/:id/update', function (req, res, next) {
  const id = req.params.id
  const { spaghetti } = req.body;
  const updatedata = `UPDATE meals SET mealName ="${spaghetti}" WHERE mealId = ${id};`
  console.log("querry executesd", updatedata);
  console.log(req.body)

  connection.query(updatedata, (err,data)=>{
    if (err) {
      console.log(err);
      if (err.message === "not found") next()
      else {
        next()
      }
    }else{
      res.send({data})
    }
  })
})



router.delete("/:id", function (req, res, next) {
  const id = req.params.id
  const deletedquery = `delete from meals where id = ${id}`
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