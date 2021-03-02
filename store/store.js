const myPlugin = store => {
  // вызывается после инициализации хранилища
  store.subscribe((mutation, state) => {
    console.log('mutation ===>>>', mutation, 'state ===>>>', state)
    // вызывается после каждой мутации
    // мутация передаётся в формате `{ type, payload }`.
  });
};


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
  },
  plugins: [myPlugin]
})
