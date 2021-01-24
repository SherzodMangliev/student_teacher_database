module.exports = app => {
    const lessons = require("../controllers/lesson.js");
  
    var router = require("express").Router();
  
    // Create a new lesson
    router.post("/", lessons.create);
  
    // Retrieve all lessons
    router.get("/", lessons.findAll);
  
    // Retrieve all published lessons
    // router.get("/published", lessons.findAllPublished);
  
    // Retrieve a single lesson with id
    router.get("/:id", lessons.findOne);

    router.get('level&lesson_number', lessons.findAll);
  
    // Update a lesson
    router.put("/:id", lessons.update);
  
    // Delete a lesson with id
    router.delete("/:id", lessons.delete);
  
    // Create a new lesson
    router.delete("/", lessons.deleteAll);
  
    app.use('/api/lessons', router);
};