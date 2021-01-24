const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.students = require("./student.js");
db.teachers = require("./teacher.js");
db.lessons = require("./lesson.js");

module.exports = db;
