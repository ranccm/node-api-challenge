const router = require("express").Router();
const Projects = require("../data/helpers/projectModel");

//get all projects
router.get("/", (req, res) => {
  Projects.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ errorMessage: "server failed to retrieve data" });
    });
});

//get specific project
router.get("/:id", (req, res) => {
  Projects.get(req.params.id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "server failed to retrieve data" });
    });
});


//get project actions 
router.get('/:id/actions', (req, res) => {
    Projects.getProjectActions(req.params.id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ errorMessage: "server error fetching actions"})
    })
})
//create a project
router.post("/", validateProject, (req, res) => {
  Projects.insert(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ errorMessage: "server failed to create new project" });
    });
});

//update a project
router.put("/:id", validateProject, (req, res) => {
  Projects.update(req.params.id, req.body)
    .then((update) => {
      res.status(201).json(update);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ errorMessage: "server error while updating project" });
    });
});

//delete project
router.delete("/:id", (req, res) => {
  Projects.remove(req.params.id)
    .then((deleted) => {
      if (deleted) {
        res.status(200).json(deleted);
      } else {
        res
          .status(404)
          .json({
            message: "the project with the specified id does not exist",
          });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ errorMessage: "unable to delete project" });
    });
});

//middleware
function validateProject(req, res, next) {
  if (req.body.name && req.body.description) {
    next();
  } else {
    res
      .status(400)
      .json({ errorMessage: "project name and description required" });
  }
}

module.exports = router;
