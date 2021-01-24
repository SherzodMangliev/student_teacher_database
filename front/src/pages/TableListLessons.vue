<template>
    <div class="row">
      <div class="col-12">
        <card v-for="level in 6" :key="level" :title="'Level ' + level">
          <div class="row">
            <div v-for="lesson in 10" :key="lesson" class="col-md-2">
              <base-button block type="success" class=" mb-3" @click="openLesson(level, lesson)">
                Lesson {{lesson}}
              </base-button>
            </div>
          </div>
        </card>
      </div>
      <modal :centered="false" bodyClasses="h-100" modalContentClasses="h-100" modal-classes="modal-lg h-75 mt-0" :show.sync="modalLesson">
        <h6 slot="header" class="modal-title" id="modal-title-default">Lesson {{lesson_number}}</h6>

        <base-input class="h-100" label="Example textarea">
          <textarea style="max-height: max-content" class="form-control" id="exampleFormControlTextarea1" v-model="content" rows="12"></textarea>
        </base-input>

        <template slot="footer">
          <base-button @click="saveLesson" type="primary">Save changes</base-button>
          <base-button type="secondary" class="ml-auto" @click="modalLesson = false">Close</base-button>
        </template>
      </modal>
    </div>
</template>
<script>
import { Modal } from "@/components";
import LessonDataService from "../services/LessonsDataService"

export default {
  components: {
    Modal,
  },
  data() {
    return {
      card1: {
        title: "Level 1",
      },
      modalLesson: false,
      lesson: {},
      content: '',
      level: null,
      lesson_number: null
    };
  },
  methods: {
    async openLesson (level, lesson) {
      console.log(level, lesson)
      await LessonDataService.getOne(level, lesson)
        .then(response => {
          console.log(response.data)
          this.lesson = response.data[0]
          this.content = response.data[0].content
          this.modalLesson = true
          this.level = level
          this.lesson_number = lesson
        })
    },
    async saveLesson () {
      console.log(this.lesson, this.level)
      console.log(this.content)
      console.log(this.lesson)
      const id = this.lesson._id
      const lessonData = {
        level: String(this.level),
        lesson_number: String(this.lesson_number),
        content: this.content
      }
      LessonDataService.update(id, lessonData).then(response => {
        console.log(response)
        this.modalLesson = false
        this.lesson_number = null,
        this.level = null,
        this.lesson = {},
        this.content = ''
      }).catch(err => console.log(err))
    }
  }
};
</script>
<style>
</style>
