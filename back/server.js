const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
db.mongoose
.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

  // simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to student_teacher_list application." });
});

require("./routes/student")(app);
require("./routes/teacher")(app);
require("./routes/lesson")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

// const Teacher = require("./models/teacher");
// const Student = require("./models/student");

// const createTeacher = function(name, ielts_score, gender) {
//     const teacher = new Teacher({
//     name,
//     ielts_score,
//     gender
//   });

//   return teacher.save();
// };

// const createStudent = function(name, level, status, gender, teacher) {
//   const student = new Student({
//     name,
//     level,
//     status,
//     gender,
//     teacher
//   });

//   return student.save();
// };

// createTeacher("Sherzod Mangliev", 6, 1)
//   .then(teacher => {
//     console.log("> Created new Teacher\n", teacher);
    
//     const teacherId = teacher._id.toString();
//     return createStudent("Falonchiyev", 4, 2, 1, teacherId);
//   })
//   .then(student => {
//     console.log("> Created new Student\n", student);
//   })
//   .catch(err => console.log(err));