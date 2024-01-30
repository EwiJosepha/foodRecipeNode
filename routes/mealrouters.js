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
  // const createpostquerry = `insert into meals (  mealName,
  //   mealArea,
  //   mealUrl,
  //   mealYoutube,
  //   categoryId
  //   ) values ("shawama", "Spain","https://example.com/spaghetti.jpg","https://www.youtube.com/watch?v=spaghetti-video",2);
  //   insert into mealinstructions (
  //     mealinstructions.instruction,
  //     mealinstructions.step
  //   ) values (
  //     '[{"instruction": "follow steps for shawarma carefully"}]'
  //     '[{"instruction": "follow steps for shawarma carefully"}, {"step": "add tomatoes and}]'
  //   )`
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

  const categoryQuery = `INSERT INTO mealctegory (categoryId, category) VALUES (3,  "beef")`;
  const mealQuery = `INSERT INTO meals ( mealName, mealArea, mealUrl, mealYoutube, categoryId) values ("shawama", "Spain","https://example.com/spaghetti.jpg","https://www.youtube.com/watch?v=spaghetti-video",3)`;
  const instructionsQuery = `INSERT INTO mealInstructions (instructionId,instruction,step)
  values (3,
        '[{"instruction": "follow steps for shawarma carefully"}]',
         '[{"instruction": "follow steps for shawarma carefully"}, {"step": "add tomatoes and"}]'
       )
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
      connection.query(mealQuery, [mealName, mealArea, mealUrl, mealYoutube, categoryId], function (error, results) {
        if (error) {
          return connection.rollback(function () {
            next(error);
          });
        }
        const mealIdFromMealsInsert = results.insertId;

        // Insert into mealInstructions table
        connection.query(instructionsQuery, [instructionId,instruction, step], function (error, results) {
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
  const updatedata = `UPDATE meals join mealctegory on
   meals.categoryId = mealctegory.categoryId 
   join mealinstructions on meals.mealId= mealinstructions.mealId SET meals.mealName="spaghetti", meals.mealArea="Italian", meals.mealUrl="https://example.com/spaghetti.jpg", meals.mealYoutube="https://www.youtube.com/watch?v=spaghetti-video", meals.categoryId= 1, mealctegory.category = "super", mealinstructions.instruction = '[{"instruction":"follow steps for spaghetti carefully"}]'  WHERE meals.mealId = ${id};`

  console.log("querry executed", updatedata);
  connection.query(updatedata, (err, data) => {
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
  const deletedquery = `delete meals, mealctegory,mealInstructions    
   from meals join mealctegory on
  meals.categoryId = mealctegory.categoryId 
  join mealinstructions on meals.mealId= mealinstructions.mealId  WHERE meals.mealId = ${id};`
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