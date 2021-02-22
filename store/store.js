const store = new Vuex.Store({
  state: {
    searchItem: '',
    dark: false
  },
  mutations: {
    searchData (state, data) {
      this.state.searchItem = data
    },
    darkTheme (state, data) {
      if (data) {
        this.state.dark = true
      } else {
        this.state.dark = false
      }
    }
  }
})
