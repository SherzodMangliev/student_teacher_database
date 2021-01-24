module.exports = app => {
    const teachers = require("../controllers/teacher.js");
  
    var router = require("express").Router();
  
    // Create a new teacher
    router.post("/", teachers.create);
  
    // Retrieve all teachers
    router.get("/", teachers.findAll);
  
    // Retrieve all published teachers
    // router.get("/published", teachers.findAllPublished);
  
    // Retrieve a single teacher with id
    router.get("/:id", teachers.findOne);
  
    // Update a teacher with id
    router.put("/:id", teachers.update);
  
    // Delete a teacher with id
    router.delete("/:id", teachers.delete);
  
    // Create a new teacher
    router.delete("/", teachers.deleteAll);
  
    app.use('/api/teachers', router);
};