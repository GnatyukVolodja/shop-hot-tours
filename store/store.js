const store = new Vuex.Store({
  state: {
    searchItem: ''
  },
  mutations: {
    searchData (state, data) {
      this.state.searchItem = data
    }
  }
})
