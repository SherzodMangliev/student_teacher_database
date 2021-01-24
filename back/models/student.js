// module.exports = mongoose => {
//   const Student = mongoose.model(
//     'Student',
//     mongoose.Schema(
//       {
//         name: String,
//         level: {
//           type: Number,
//           min: 1,
//           max: 6
//         },
//         status: {
//           type: Number,
//           min: 1,
//           max: 4
//         },
//         gender: {
//           type: Number,
//           min: 0,
//           max: 1
//         },
//         teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }
//       }
//     )
//   )
//   return Student;
// }

const mongoose = require("mongoose");

const Student = mongoose.model(
"Student",
new mongoose.Schema({
    name: String,
    level: {
      type: Number,
      min: 1,
      max: 6
    },
    lessons: {
      type: Number,
      min: 0,
      max: 10
    },
    status: {
      type: Number,
      min: 1,
      max: 4
    },
    gender: {
      type: Number,
      min: 0,
      max: 1
    },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }
})
);

module.exports = Student;
