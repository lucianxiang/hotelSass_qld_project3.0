// import Vue from 'vue'

Vue.use(Vuex)

import publicStore from './public'
import user from './user'
import getters from './getters'
import system from './system'





const store = new Vuex.Store({
  modules: {
    publicStore,
    user,
    system
  },
  getters
});

export default store
