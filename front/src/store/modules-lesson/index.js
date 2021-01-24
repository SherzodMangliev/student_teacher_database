import axios from 'axios'
const state = {
  lessons: [],
}

const actions = {
  async fetchProfiles ({ commit }) {
    const url = await axios.get('http://localhost:3000/staff')
    commit('setProfiles', url.data)
  },
}

const mutations = {
  setProfiles: (state, profiles) => (state.profiles = profiles),
  setFilteredProfiles: (state, profiles) => (state.filteredProfiles = profiles)
}

const getters = {
  returnData: (state) => {
    return state.profiles
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
