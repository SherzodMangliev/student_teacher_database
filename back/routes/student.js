module.exports = app => {
    const students = require("../controllers/student.js");
  
    var router = require("express").Router();
  
    // Create a new student
    router.post("/", students.create);
  
    // Retrieve all students
    //router.get("/", students.findAll);

    router.get("/", students.findAllStudentsWithTeacherNames)
  
    // Retrieve all published students
    // router.get("/published", students.findAllPublished);
  
    // Retrieve a single student with id
    router.get("/:id", students.findOneWithTeacherName);

    // retrieve all students by gender
    router.get('/gender', students.findAllByGender)

    // Retrieve filtered students
    //router.get(`?teacher=` + ':teacherId', students.findByTeacherId)
  
    // Update a student with id
    router.patch("/:id", students.update);
  
    // Delete a student with id
    router.delete("/:id", students.delete);
  
    // Create a new student
    router.delete("/", students.deleteAll);
  
    app.use('/api/students', router);
};