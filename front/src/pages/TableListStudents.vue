<template>
    <div class="row">
      <div class="col-12">
        <card :title="table1.title">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h3 class="mb-0">Filtering:</h3>
                <p>Filter by gender: </p>
                  <div class="d-flex align-items-center mb-2">
                    <toggle-button class="mb-0" color="#82C7EB" :sync="true" v-model="maleGenderToggle" @change="onChangeGenderToggle(1)"/>
                    <p class="mb-0 ml-2"> Show only male students </p>
                  </div>
                  <div class="d-flex align-items-center">
                    <toggle-button class="mb-0" color="#fa8cab" :sync="true" v-model="femaleGenderToggle" @change="onChangeGenderToggle(1)"/>
                    <p class="mb-0 ml-2"> Show only female students </p>
                  </div>
            </div>
            <base-button @click="modals.modalCreate = true">Add Student</base-button>
          </div>
          <div class="table-responsive table-striped">
            <base-table :data="students" :columns="table1.columns">
              <template slot="columns">
                <th>#</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Status</th>
                <th>Level</th>
                <th>Teacher</th>
                <th>Actions</th>
              </template>
              <template slot-scope="{row}">
                <td>{{row.id}}</td>
                <td>
                  <router-link class="font-weight-bold text-muted" :to="{ name: 'profile', params: {id: row._id}}">{{row.name}}</router-link>
                </td>
                <td v-if="row.gender === 1">Male</td>
                <td v-if="row.gender === 0">Female</td>
                <td v-if="row.status === 1">School student</td>
                <td v-if="row.status === 2">College student</td>
                <td v-if="row.status === 3">University student</td>
                <td v-if="row.status === 4">Work</td>
                <td>{{row.level}}</td>
                <td>{{row.teacher === null ? 'No teacher info' : row.teacher.name}}</td>
                <td class="td-actions">
                  <base-button class="mr-3" type="info" size="sm" icon>
                    <i class="tim-icons icon-single-02"></i>
                  </base-button>
                  <base-button type="danger" @click="modals.modalDelete = true" size="sm" icon>
                    <i class="tim-icons icon-trash-simple"></i>
                  </base-button>
                  <modal :centered="false" :show.sync="modals.modalDelete">
                    <template slot="header">
                      <h5 class="modal-title" id="exampleModalLabel">Delete student</h5>
                    </template>
                    <div class="text-danger">
                      Are you sure?
                    </div>
                    <template slot="footer">
                      <base-button type="secondary" @click="modals.modalDelete = false">Cancel</base-button>
                      <base-button @click="deleteStudent(row._id)" type="primary">Delete</base-button>
                    </template>
                  </modal>
                </td>
              </template>
            </base-table>
          </div>
        </card>
      </div>
      <modal modalClasses="mt-0" :centered="false" :show.sync="modals.modalCreate">
        <template slot="header">
          <h5 class="modal-title" id="exampleModalLabel">Add student</h5>
        </template>
        <div>
          <div>
            <form @submit="addNewStudent">
              <div class="form-row">
                <base-input class="col-12" type="text" label="Name">
                  <input v-model="newStudent.name" type="text" class="form-control" placeholder="Full Name">
                </base-input>
              </div>
              <div>
                <p>Choose gender</p>
                <base-radio inline name="1" class="mb-3" value="1" v-model="newStudent.gender">
                  Male
                </base-radio>
                <base-radio inline name="0" class="mb-3" value="0" v-model="newStudent.gender">
                  Female
                </base-radio>
              </div>
              <div class="form-row">
                <base-input class="col-md-6" label="Status">
                  <select v-model="newStudent.status" id="inputState1" class="form-control">
                    <option value="1">Highschool student</option>
                    <option value="2">College student</option>
                    <option value="3">University student</option>
                    <option value="4">Work</option>
                  </select>
                </base-input>
                <base-input class="col-md-6" label="Level">
                  <select v-model="newStudent.level" id="inputState1" class="form-control">
                    <option value="1">Level 1</option>
                    <option value="2">Level 2</option>
                    <option value="3">Level 3</option>
                    <option value="4">Level 4</option>
                    <option value="5">Level 5</option>
                    <option value="6">Level 6</option>
                  </select>
                </base-input>
              </div>
              <div class="form-row">
                <base-input class="col-md-12" label="Teacher">
                  <select v-model="newStudent.teacher" id="inputState" class="form-control">
                    <option :value="teacher._id" v-for="teacher in teachers" :key="teacher.id">{{teacher.name}}</option>
                  </select>
                </base-input>
              </div>
              <base-button type="primary" native-type="Submit">Save</base-button>
            </form>
          </div>
        </div>
      </modal>
    </div>
</template>
<script>
import { BaseTable, BaseRadio, Modal } from "@/components";
import StudentDataService from '../services/StudentsDataService'
import TeacherDataService from '../services/TeachersDataService'
import { ToggleButton } from 'vue-js-toggle-button'

export default {
  components: {
    BaseTable,
    Modal,
    BaseRadio,
    ToggleButton
  },
  data() {
    return {
      students: [],
      teachers: [],
      maleGenderToggle: false,
      femaleGenderToggle: false,
      table1: {
        title: "Student List",
        columns: ["id", "name", "gender", "status", "level", "teacher", "actions"],
      },
      newStudent: {
        name: '',
        gender: null,
        teacher: null,
        status: null,
        level: null,
      },
      modals: {
        modalDelete: false,
        modalCreate: false
      },
      radio: {
        radio1: null,
      },
    };
  },
  methods: {
    async getAllStudents () {
      await StudentDataService.getAll()
        .then(response => {
          this.students = response.data
          console.log(response.data)
        })
        .catch(e => {
          console.log(e)
        })
    },
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
    addNewStudent() {
      console.log('submitted')
      const newStudent = {
        name: this.newStudent.name,
        gender: Number(this.newStudent.gender),
        status: Number(this.newStudent.status),
        teacher: this.newStudent.teacher,
        level: Number(this.newStudent.level),
        lessons: 0
      }
      console.log(this.newStudent)
      console.log(newStudent)
      StudentDataService.create(newStudent).then(response => {
        this.getAllStudents()
        this.modals.modalCreate = false
        this.newStudent.name = ''
        this.newStudent.gender = null
        this.newStudent.status = null
        this.newStudent.teacher = null
        this.newStudent.level = null
      }).catch(e => {console.log(e)})
    },
    async deleteStudent (id) {
      await StudentDataService.delete(id)
        .then(response => {
          console.log(response)
          this.getAllStudents()
          this.modals.modalDelete = false
        })
        .catch(error => {
          console.log(error)
        })
    },
    async onChangeGenderToggle (gender) {
      console.log(gender)
    }
  },
  mounted () {
    this.getAllStudents()
    this.getAllTeachers()
  }
};
</script>

<style lang="scss" scoped>
  td {
    font-size: 1rem;
    padding: 5px !important;
  }
</style>
