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
    mealName,
    mealArea,
    mealUrl,
    mealYoutube,
    categoryId,
    category,
    instructionId,
    stepCount,
    instruction,
    step
  } = req.body;

  console.log("body", req.body);

  const categoryQuery = `INSERT INTO mealctegory (categoryId, category) VALUES (?, ?)`;
  const mealQuery = `INSERT INTO meals ( mealName, mealArea, mealUrl, mealYoutube) values (?, ?, ?, ?)`;
  const instructionsQuery = `INSERT INTO mealInstructions (instruction,step)
  values (?, ?)
  `;

  connection.beginTransaction(function (err) {
    if (err) {
      return next(err);
    }

    // Insert into mealcategory table
    connection.query(categoryQuery, [categoryId, category], function (error, results) {
      if (error) {
        return connection.rollback(function () {
          next(error);
        });
      }

      // const mealIdFromCategoryInsert = results.insertId;

      // Insert into meals table
      connection.query(mealQuery, [mealName, mealArea, mealUrl, mealYoutube], function (error, results) {
        if (error) {
          return connection.rollback(function () {
            next(error);
          });
        }
        const mealIdFromMealsInsert = results.insertId;

        // Insert into mealInstructions table
        connection.query(instructionsQuery, [JSON.stringify(instruction), JSON.stringify(step)], function (error, results) {
          console.log("instructions querry ", results);
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
            res.status(201).send(results);
          });
        });
      });
    });
  });
});


router.post('/:id/update', function (req, res, next) {

  const id = req.params.id
const {mealName, mealArea, mealUrl, mealId}= req.body
  const updatedata = `UPDATE meals  SET mealName=?, mealArea=?, mealUrl=?, mealId=? WHERE mealId=?;`
  const values = [mealName, mealArea, mealUrl, mealId, id];

  console.log("Query executed:", updatedata);
  console.log("Query values:", values);

  connection.query(updatedata, values, (err, data) => {
    if (err) {
      console.log(err);
      if (err.message === "not found") next()
      else {
        next()
      }
    } else {


      res.send({ data })
    }
  })

  console.log("querry executed", updatedata);

})

router.put("/", function (req, res, next) {
  // const id = req.params.id
  const querydata = `alter table meals add column (comments varchar(255))`
  console.log('querry executed', querydata);
  connection.query(querydata, (err, data) => {
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

router.delete("/:id", function (req, res, next) {
  const id = req.params.id
  const deletedquery = `delete from meals WHERE meals.mealId = ${id};`
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


// `UPDATE meals join mealctegory on
//    meals.categoryId = mealctegory.categoryId
//    join mealinstructions on meals.mealId = mealinstructions.mealId SET meals.mealName = ?, meals.mealArea = ?, meals.mealUrl = ?, meals.mealYoutube = ?, meals.categoryId = ?, mealctegory.category = ?, mealinstructions.instruction = ?, mealinstructions.step = ? WHERE meals.mealId = ?;`
