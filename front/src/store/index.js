import Vue from 'vue'
import Vuex from 'vuex'

import profiles from './modules-profile'

Vue.use(Vuex)

export default function () {
  const Store = new Vuex.Store({
    modules: {
      profiles
    },

    strict: process.env.DEV
  })

  return Store
}
