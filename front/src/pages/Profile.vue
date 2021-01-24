<template>
  <div class="row">
    <h3 class="col-12 my-1">Student's name: {{student.name}}</h3>
    <h3 class="col-12 my-1">Teacher: {{student.teacher === null ? 'No teacher info' : student.teacher.name}}</h3>
    <h3 class="col-12 my-1" v-if="student.status === 1">Status: Highschool Student</h3>
    <h3 class="col-12 my-1" v-if="student.status === 2">Status: College student</h3>
    <h3 class="col-12 my-1" v-if="student.status === 3">Status: University student</h3>
    <h3 class="col-12 my-1" v-if="student.status === 4">Status: Work</h3>
    <h3 class="col-12 my-1">Level: Level {{student.level}}</h3>
    <card v-for="level in student.level" :key="level" :title="'LEVEL ' + level + ' LESSONS'">
      <div class="row">
        <div v-for="lesson in 10" :key="lesson" class="col-md-2">
          <div class="mx-1 my-3">
            <div class="d-flex">
              <base-button class="px-1 w-75" block :type="student.lessons >= lesson && student.level === level ? 'success' : student.level > level ? 'success' : ''" @click="openLesson(level, lesson)">
                Lesson {{lesson}}
              </base-button>
              <base-button class="w-25 mt-1 px-0" block type="success" @click="lessonSuccess(lesson)">
                <i class="tim-icons icon-check-2"></i>
              </base-button>
            </div>
            <base-button class="px-2" block type="primary" @click="modalLesson = true">
              Feedback {{lesson}}
            </base-button>
          </div>
        </div>
      </div>
    </card>
    <modal :centered="false" modal-classes="modal-lg" :show.sync="modalLesson">
      <h6 slot="header" class="modal-title" id="modal-title-default">Lesson {{lessonNumber}}</h6>

      <base-input>
        <h4>Lesson content</h4>
        <p>
          {{lessonContent}}
        </p>
      </base-input>

      <template slot="footer">
        <base-button type="secondary" class="ml-auto" @click="modalLesson = false">Close
        </base-button>
      </template>
    </modal>
  </div>
</template>
<script>
import { Modal } from "@/components"
import StudentDataService from "../services/StudentsDataService"
import LessonDataService from "../services/LessonsDataService"

  export default {
    components: {
      Modal
    },
    data() {
      return {
        card1: {
          title: 'Lessons'
        },
        modalLesson: false,
        studentId: this.$route.params.id,
        student: null,
        lessonNumber: null,
        lessonContent: ''
      }
    },
    methods: {
      async lessonSuccess(lesson_number) {
        if  (lesson_number - 1 === this.student.lessons) {
          if (lesson_number === 10 && this.student.level < 6 && lesson_number - 1 === 9) {
          console.log(this.student.level)
          const updatedData = {
            lessons: "0",
            level: this.student.level + 1
          }
          await StudentDataService.update(this.studentId, updatedData)
            .then(response => {
            this.getStudent(this.studentId)
            })
            .catch(error => {console.log(error)})
          }
          else if (lesson_number - 1 === this.student.lessons && this.student.level <= 6) {
            console.log(this.student.level)
            const updatedData = {
              lessons: String(lesson_number)
            }
            await StudentDataService.update(this.studentId, updatedData)
              .then(response => {
                this.getStudent(this.studentId)
              })
              .catch(error => {console.log(error)})
          }
        }
        
      },
      async getStudent(id) {
        await StudentDataService.get(id)
          .then(response => {
            this.student = response.data
            console.log(response.data)
          })
      },
      
      async openLesson (level, lesson) {
        console.log(level, lesson)
        await LessonDataService.getOne(level, lesson)
          .then(response => {
            console.log(response.data)
            this.lessonContent = response.data[0].content
            this.modalLesson = true
            // this.level = level
            this.lessonNumber = lesson
          })
      },
    },
    mounted () {
      this.getStudent(this.studentId)
    }
  }
</script>
<style>
</style>
