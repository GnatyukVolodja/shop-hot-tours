const store = new Vuex.Store({
  state: {
    modals: false,
    productModal: [],
    searchItem: '',
  },
  mutations: {
    openModals (state, product) { // ready
      this.state.modals = true
      this.state.productModal = []
      this.state.productModal.push(product)
      new bootstrap.Modal(document.getElementById('modal'), {}).show()
      console.log('store openModals')
    },
    removeModals () { // ready
      this.state.modals = false
    },
    searchData (state, data) {
      this.state.searchItem = data
      this.state.cleanData = false
    },

  }
})
