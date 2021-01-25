const db = require("../models");
const Student = db.students
const Teacher = db.teachers

// Create and Save a new Student
exports.create = (req, res) => {
  // Validate request
  console.log(req.body)
  if (!req.body.name) {
    res.status(400).send({ message: "Name can not be empty!" });
    return;
  };
  if (!req.body.status) {
    res.status(400).send({ message: "Status can not be empty!" });
    return;
  };
  if (!req.body.level) {
    res.status(400).send({ message: "Level can not be empty!" });
    return;
  };
  if (!req.body.gender) {
    res.status(400).send({ message: "Gender can not be empty!" });
    return;
  };
  if (!req.body.teacher) {
    res.status(400).send({ message: "Teacher can not be empty!" });
    return;
  }

  // Create a Student
  const student = new Student({
    name: req.body.name,
    status: req.body.status,
    level: req.body.level,
    gender: req.body.gender,
    teacher: req.body.teacher,
    lessons: 0
  });

  // Save Student in the database
  student
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Student."
      });
    });

};

// Retrieve all Students from the database.
exports.findAll = (req, res) => {
  console.log(req)
  const gender = req.query.gender;
  const level = req.query.level;
  const teacher = req.query.teacher;
  const status = req.query.status;
  var condition = gender ? { gender: gender, level: level, teacher: teacher, status: status } : {};
  console.log(condition)
  
  Student.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving students."
      });
    });
};

// Retrieve all Students from the database.
exports.findAllMaleStudents = (req, res) => {
  const gender = req.query.gender;
  var condition = gender ? { 'gender': gender } : {};
  console.log(condition)

  Student.find({gender: 1})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving students."
      });
    });
};


exports.findAllStudentsWithTeacherNames = async (req, res) => {

  const students = await Student.find(req.query).populate("teacher").then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving students."
    })
  })

  console.log('all students', students)
}

// Find a single Student with teacher name by id
exports.findOneWithTeacherName = (req, res) => {
  const id = req.params.id;

  Student.findById(id).populate("teacher")
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Student with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Student with id=" + id });
    });
};

// Find a single Student with an id
exports.findOne = (req, res) => {
  const is = req.params.id;

  Student.findById(is)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Student with id " + is });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Student with id=" + is });
    });
};

// Update a Student by the id in the request
exports.update = (req, res) => {
  console.log(req.body)
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Student.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true })
      .then(data => {
        console.log(data)
          if (!data) {
              res.status(404).send({
                  message: `Cannot update Student with id=${id}. Maybe Student was not found!`
              });
          } else res.send({
              message: "Student was updated successfully."
          });
      })
      .catch(err => {
          res.status(500).send({
              message: "Error updating Student with id=" + id
          });
          console.log(err)
      });
};

// Delete a Student with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Student.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Student with id=${id}. Maybe Student was not found!`
          });
        } else {
          res.send({
            message: "Student was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Student with id=" + id
        });
        console.log(err)
      });
};

// Delete all Students from the database.
exports.deleteAll = (req, res) => {
    Student.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Student were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all students."
      });
    });
};

// // Find all published Students
// exports.findAllPublished = (req, res) => {
  
// };


