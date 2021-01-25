<template>
    <div class="row">
      <div class="col-12">
        <card :title="table1.title">
          <h3 class="mb-0">Filtering:</h3>
          <div class="d-flex">
            <div>
              <p>Filter by gender: </p>
              <div class="d-flex align-items-center mb-2">
                <toggle-button class="mb-0" color="#82C7EB" :sync="true" v-model="maleGenderToggle"
                  @change="onChangeGenderToggle(1)" />
                <p class="mb-0 ml-2"> Show only male teachers </p>
              </div>
              <div class="d-flex align-items-center">
                <toggle-button class="mb-0" color="#fa8cab" :sync="true" v-model="femaleGenderToggle"
                  @change="onChangeGenderToggle(0)" />
                <p class="mb-0 ml-2"> Show only female teachers </p>
              </div>
            </div>
            <div class="mx-3">
              <p>Filter by IELTS score: </p>
              <div>
                <multiselect v-model="scoreValue" tag-placeholder="Add this as new tag" placeholder="Search or select"
                  label="name" track-by="value" :options="scoreOptions" :multiple="true" :taggable="true" @input="onChangeScore">
                </multiselect>
              </div>
            </div>
          </div>
          <base-button @click="modals.modalCreate = true">Add Teacher</base-button>
          <modal modalClasses="mt-0" :centered="false" :show.sync="modals.modalCreate">
            <template slot="header">
              <h5 class="modal-title" id="exampleModalLabel">Add teacher</h5>
            </template>
            <div>
              <div>
                <form @submit="addNewTeacher">
                  <div class="form-row">
                    <base-input class="col-12" type="text" label="Name">
                      <input type="text" v-model="newTeacher.name" class="form-control" placeholder="Full Name">
                    </base-input>
                  </div>
                  <div>
                    <p>Choose gender</p>
                    <base-radio checked inline name="1" class="mb-3" v-model="newTeacher.gender">
                      Male
                    </base-radio>
                    <base-radio inline name="0" class="mb-3" v-model="newTeacher.gender">
                      Female
                    </base-radio>
                  </div>
                  <div class="form-row">
                    <base-input class="col-md-12" label="IELTS Score">
                      <input type="number" v-model="newTeacher.ielts_score" min="1" max="9" step="0.5" class="form-control" placeholder="IELTS score">
                    </base-input>
                  </div>
                  <base-button type="primary" native-type="Submit">Save</base-button>
                </form>
              </div>
            </div>
          </modal>
          <div class="table-responsive table-striped">
            <base-table :data="teachers" :columns="table1.columns">
              <template slot="columns">
                <th>#</th>
                <th>Name</th>
                <th>IELTS score</th>
                <th>Gender</th>
                <th>Actions</th>
              </template>
              <template slot-scope="{row}">
                <td>{{row.id}}</td>
                <td>
                  <router-link to="/profile">{{row.name}}</router-link>
                </td>
                <td>{{row.ielts_score}}</td>
                <td v-if="row.gender === 1">Male</td>
                <td v-if="row.gender === 0">Female</td>
                <td class="td-actions">
                  <base-button class="mr-3" type="info" size="sm" icon>
                    <i class="tim-icons icon-single-02"></i>
                  </base-button>
                  <base-button type="danger" @click="modals.modalDelete = true" size="sm" icon>
                    <i class="tim-icons icon-trash-simple"></i>
                  </base-button>
                  <modal :centered="false" :show.sync="modals.modalDelete">
                    <template slot="header">
                      <h5 class="modal-title" id="exampleModalLabel">Delete teacher</h5>
                    </template>
                    <div class="text-danger">
                      Are you sure?
                    </div>
                    <template slot="footer">
                      <base-button type="secondary" @click="modals.modalDelete = false">Cancel</base-button>
                      <base-button @click="deleteTeacher(row._id)" type="primary">Delete</base-button>
                    </template>
                  </modal>
                </td>
              </template>
            </base-table>
          </div>
        </card>
      </div>
    </div>
</template>
<script>
import { BaseTable, BaseRadio, Modal } from "@/components";
import TeacherDataService from "../services/TeachersDataService"
import { ToggleButton } from 'vue-js-toggle-button'
import Multiselect from 'vue-multiselect'

export default {
  components: {
    BaseTable,
    Modal,
    BaseRadio,
    ToggleButton,
    Multiselect
  },
  data() {
    return {
      table1: {
        title: "Teacher List",
        columns: ["id", "name", "IELTS score", "teacher", "actions"],
      },
      modals: {
        modalDelete: false,
        modalCreate: false
      },
      maleGenderToggle: false,
      femaleGenderToggle: false,
      teachers: [],
      newTeacher: {
        name: '',
        gender: null,
        ielts_score: null
      },
      scoreValue: [],
      scoreOptions: [
        { name: 'Band Score 1', value: 1 },
        { name: 'Band Score 2', value: 2 },
        { name: 'Band Score 3', value: 3 },
        { name: 'Band Score 4', value: 4 },
        { name: 'Band Score 5', value: 5 },
        { name: 'Band Score 6', value: 6 },
        { name: 'Band Score 7', value: 7 },
        { name: 'Band Score 8', value: 8 },
        { name: 'Band Score 9', value: 9 },
      ],
      queryUrl: ''
    };
  },
  methods: {
    async getAllTeachers () {
      await TeacherDataService.getAll()
        .then(response => {
          this.teachers = response.data
          console.log(response.data)
        })
        .catch(e => {
          console.log(e)
        })
    },
    async addNewTeacher () {
      const newTeacher = {
        name: this.newTeacher.name,
        gender: Number(this.newTeacher.gender),
        ielts_score: Number(this.newTeacher.ielts_score)
      }
      console.log(newTeacher)
      TeacherDataService.create(newTeacher).then(response => {
        this.getAllTeachers()
        this.modals.modalCreate = false
        this.newTeacher.name = ''
        this.newTeacher.gender = null
        this.newTeacher.ielts_score = null
      }).catch(e => {console.log(e)})
    },
    async deleteTeacher (id) {
      await TeacherDataService.delete(id)
        .then(response => {
          console.log(response)
          this.getAllTeachers()
          this.modals.modalDelete = false
        })
        .catch(error => {
          console.log(error)
        })
    },
    async onChangeGenderToggle (gender) {
      if (gender == 1) {
        const newQueryUrl = this.queryUrl.replace('&gender=0', '').concat('&gender=1')
        await TeacherDataService.getAllFiltered(newQueryUrl).then(response => {
          this.teachers = response.data
          console.log(response.data)
          this.femaleGenderToggle = false
        }).catch(error => {
          console.log(error)
        })
      } else if (gender == 0) {
          const newQueryUrl = this.queryUrl.replace('&gender=1', '').concat('&gender=0')
          await TeacherDataService.getAllFiltered(newQueryUrl).then(response => {
            this.teachers = response.data
            console.log(response.data)
            this.maleGenderToggle = false
          }).catch(error => {
            console.log(error)
          })
      }

    },
    async onChangeScore() {
      let newQueryUrl = ''
      this.scoreValue.forEach(element => {
        newQueryUrl = newQueryUrl.concat('&ielts_score=', element.value)
      })
      console.log(newQueryUrl)
      await TeacherDataService.getAllFiltered(newQueryUrl).then(response => {
        this.teachers = response.data
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
  },
  mounted () {
    this.getAllTeachers()
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss" scoped>
  td {
    font-size: 1rem;
    padding: 5px !important;
  }
</style>
