// module.exports = mongoose => {
//   const Teacher = mongoose.model(
//     'Teacher',
//     mongoose.Schema(
//       {
//         name: String,
//         ielts_score: {
//           type: Number,
//           min: 1,
//           max: 9
//         },
//         gender: {
//           type: Number,
//           min: 0,
//           max: 1
//         }
//       }
//     )
//   )
//   return Teacher;
// }
// const mongoose = require("mongoose");

// const TeacherSchema = new mongoose.Schema({
//     name: String,
//     ielts_score: {
//       type: Number,
//       min: 1,
//       max: 9
//     },
//     gender: {
//       type: Number,
//       min: 0,
//       max: 1
//     }
// });
  
// const Teacher = mongoose.model("Teacher", TeacherSchema);
  
// module.exports = { Teacher, TeacherSchema };


const mongoose = require("mongoose");

const Teacher = mongoose.model(
"Teacher",
new mongoose.Schema({
    name: String,
    ielts_score: {
        type: Number,
        min: 1,
        max: 9
    },
    gender: {
        type: Number,
        min: 0,
        max: 1
    }
})
);

module.exports = Teacher;
