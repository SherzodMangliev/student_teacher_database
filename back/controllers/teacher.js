const db = require("../models");
const Teacher = db.teachers

// Create and Save a new Teacher
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Name can not be empty!" });
    return;
  };
  if (!req.body.ielts_score) {
    res.status(400).send({ message: "IELTS score can not be empty!" });
    return;
  };
  if (!req.body.gender) {
    res.status(400).send({ message: "Gender can not be empty!" });
    return;
  };

  // Create a Teacher
  const teacher = new Teacher({
    name: req.body.name,
    ielts_score: req.body.ielts_score,
    gender: req.body.gender
  });

  // Save Teacher in the database
  teacher
    .save(teacher)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Teacher."
      });
    });

};

// Retrieve all Teacher from the database.
exports.findAll = (req, res) => {
  const teacher = req.query.teacher;
  var condition = teacher ? { teacher: { $regex: new RegExp(teacher), $options: "i" } } : {};

  Teacher.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving teachers."
      });
    });
};

// Find a single Teacher with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Teacher.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Teacher with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Teacher with id=" + id });
    });
};

// Update a Teacher by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Teacher.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Teacher with id=${id}. Maybe Teacher was not found!`
                });
            } else res.send({
                message: "Teacher was updated successfully."
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Teacher with id=" + id
            });
        });
};

// Delete a Teacher with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Teacher.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Teacher with id=${id}. Maybe Teacher was not found!`
          });
        } else {
          res.send({
            message: "Teacher was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Teacher with id=" + id
        });
      });
};

// Delete all Teacher from the database.
exports.deleteAll = (req, res) => {
    Teacher.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} teachers were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all teachers."
      });
    });
};

// // Find all published Teacher
// exports.findAllPublished = (req, res) => {
  
// };