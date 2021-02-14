const ComponentModal = {
  name: 'ComponentModal',
  data () {
    return {
      checkRating (n, product) {
        return product.rating - n >= 0
      }
    }
  },
  computed: {
    productModal () { // ready
      return store.state.productModal
    }
  },
  methods: {
    removeModal () { // ready
      store.commit('removeModals')
      let el = document.querySelector('.modal-backdrop')
      el.remove()
    }
  },
  template: `<div class="modal fade" @click="removeModal()" id="modal" tabindex="-1"  aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" @click="removeModal()" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div v-for="(arr, index) in productModal" :key="arr.id" class="col-12">
                                <div class="card">
                                    <div class="scale">
                                        <img :src="arr.image" class="card-img-top" :alt="arr.country">
                                    </div>
                                    <div class="card-body">
                                        <span v-for="n in 5" :key="n">
                                           <i class="fas fa-star" style="font-size:12px"
                                              :class="{'rating-active': checkRating(n, arr)}"></i>
                                        </span>
                                        <div class="row">
                                            <p class="col-6 text-start card-text m-0"><b>{{ arr.country }}</b></p>
                                            <p class="col-6 text-end card-text m-0"><b>{{ arr.location }}</b></p>
                                        </div>
                                        <div class="row">
                                            <p class="text-start m-1">{{ arr.description }}</p>
                                        </div>
                                        <div class="row">
                                            <p class="col-6 text-start m-0"><b>{{ arr.price }}</b></p>
                                            <p class="col-6 text-end m-0">
                                                <img :src="arr.flag" class="card-img-top flag" :alt="arr.country">
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
}
