const myPlugin = store => {
  store.subscribe((mutation, state) => {
    // console.log('mutation ===>>>', mutation, 'state ===>>>', state)
  });
};

const store = new Vuex.Store({
  state: {
    searchItem: '',
    dark: false,
    language: 'EN'
  },
  mutations: {
    lang (state, data) {
      this.state.language = data
    },
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
  },
  plugins: [myPlugin]
})
