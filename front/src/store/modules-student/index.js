import axios from 'axios'
const state = {
  profiles: [],
  filteredProfiles: [],
  maleProfiles: [],
  femaleProfiles: []
}

const actions = {
  async fetchProfiles ({ commit }) {
    const url = await axios.get('http://localhost:8080/')
    commit('setProfiles', url.data)
  },
  async fetchFilteredProfiles ({ commit }, query) {
    console.log(query)
    let url = 'http://localhost:3000/staff?'
    url = url.concat(query)
    const data = await axios.get(url)
    console.log(data)
    commit('setFilteredProfiles', data.data)
  }
}

const mutations = {
  setProfiles: (state, profiles) => (state.profiles = profiles),
  setFilteredProfiles: (state, profiles) => (state.filteredProfiles = profiles)
}

const getters = {
  returnData: (state) => {
    return state.profiles
  },
  returnFilteredProfiles: (state) => {
    return state.filteredProfiles
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
