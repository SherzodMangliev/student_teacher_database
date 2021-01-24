const mongoose = require("mongoose");

const Lesson = mongoose.model(
"Lesson",
new mongoose.Schema({
    content: String,
    lesson_number: { type: Number, min: 1, max: 10 },
    level: { type: Number, min: 1, max: 10 }
})
);

module.exports = Lesson;