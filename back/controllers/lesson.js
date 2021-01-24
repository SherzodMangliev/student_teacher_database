const db = require("../models");
const Lesson = db.lessons

// Create and Save a new Lesson
exports.create = (req, res) => {
  // Validate request
  if (!req.body.content) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  };
  if (!req.body.lesson_number) {
    res.status(400).send({ message: "Lesson number can not be empty!" });
    return;
  };
  if (!req.body.level) {
    res.status(400).send({ message: "Level can not be empty!" });
    return;
  };

  // Create a Lesson
  const lesson = new Lesson({
    lesson_number: req.body.lesson_number,
    content: req.body.content,
    level: req.body.level
  });

  // Save Lesson in the database
  lesson
    .save(lesson)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Lesson."
      });
    });

};

// Retrieve all Lessons from the database.
exports.findAll = (req, res) => {
  console.log(req.query.level)
  console.log(req.query)
  const level = req.query.level;
  const lesson_number = req.query.lesson_number;
  var condition = level && lesson_number ? { level: level, lesson_number: lesson_number } : {};
  console.log(condition)

  Lesson.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving lessons."
      });
    });
};

// Find a single Lesson with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  console.log(req)

  Lesson.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Lesson with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Lesson with id=" + id });
    });
};

// Update a Lesson by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;
    console.log(req.body);
    // const level = req.query.level;
    // const lesson_number = req.query.lesson_number;
    // var conditions = level && lesson_number ? { level: level, lesson_number: lesson_number } : {};

    Lesson.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Lesson. Maybe Lesson was not found!`
                });
            } else res.send({
                message: "Lesson was updated successfully."
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Lesson with id=" + id,
            });
            console.log(err)
        });
};

// Delete a Lesson with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Lesson.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Lesson with id=${id}. Maybe Lesson was not found!`
          });
        } else {
          res.send({
            message: "Lesson was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Lesson with id=" + id
        });
      });
};

// Delete all Lesson from the database.
exports.deleteAll = (req, res) => {
    Lesson.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Lesson were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all lessons."
      });
    });
};
