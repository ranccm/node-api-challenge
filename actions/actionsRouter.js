const express = require("express");
const Actions = require("../data/helpers/actionModel");

const router = express.Router();

//get all actions
router.get("/", (req, res) => {
    Actions.get().then(actions => {
        res.status(200).json(actions)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ errorMessage: "error retreiving actions"})
    })
})

//create new action
router.post("/", (req, res) => {
    const data = req.body;
    if (data.project_id && data.description && data.notes) {
        Actions.insert(data).then((action) => {
            res.status(200).json(action);
        });
    } else {
        res.status(400).json({
            message: "id, description, and notes required"
        });
    }
});

//delete action
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    Actions.remove(id)
        .then(() => res.status(200).json({ message: "action deleted" }));
});

//update action
router.put('/:id', (req, res) => {
    Actions.update(req.params.id, req.body)
      .then(action => {
        if (action) {
          res.status(201).json(action)
        } else {
          res.status(400).json({message: "missing required field"})
        }
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({ message: "missing action data" })
      })
  })

module.exports = router;