const ComponentMain = {
  props: {
    add_new_item: {
      type: Array,
      required: true
    }
  },
  name: 'ComponentMain',
  template: `<div class="container main">
                    <div v-show="spinner" class="spinner flex">
                        <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                    </div>
                    <div class="row py-1 px-1 my-1 d-flex align-items-center justify-content-center search  bg-light text-dark">
                        <div class="col-12 col-sm-6 col-md-3 col-lg-3 mb-1 px-1">
                            <fieldset class="form-group d-flex align-items-center justify-content-center flex-column">
                                <label class="mx-0 mb-1">country</label>
                                <select v-model="selectedCountry" id="country" class="form-control" @click="selectCountry()">
                                    <option v-for="array in filterCountrys" :value="array.country">{{ array.country }}</option>
                                </select>
                            </fieldset>
                        </div>
                        <div class="col-12 col-sm-6 col-md-3 col-lg-3 mb-1 px-1">
                            <fieldset class="form-group d-flex align-items-center justify-content-center flex-column">
                                <label class="mx-0 mb-1">min price</label>
                                <input v-model.number="min" id="min" class="form-control" type="text" placeholder="Price from (USD)"/>
                            </fieldset>
                        </div>
                        <div class="col-12 col-sm-6 col-md-3 col-lg-3 mb-1 px-1">
                            <fieldset class="form-group d-flex align-items-center justify-content-center flex-column">
                                <label class="mx-0 mb-1">max price</label>
                                <input v-model.number="max" id="max" class="form-control" type="text" placeholder="Price to (USD)"/>
                            </fieldset>
                        </div>
                        <div class="col-12 col-sm-6 col-md-3 col-lg-3 mt-4 d-flex align-items-center justify-content-center px-1">
                            <a v-if="hide_clear_filters"
                               class="close form-control d-flex align-items-center justify-content-center w-100 py-1"
                               href="javascript:void(0);" aria-label="Close" @click="clearFilters()">
                                <span class="clear-filters mx-2">clear filters</span><span class="mx-2" aria-hidden="true">&times;</span>
                            </a>
                        </div>
                    </div>
                   
                    <div class="row px-3 p-sm-0  p-2 d-flex align-items-center justify-content-center search">
                        <div v-for="(arr, index) in dataProduct" :key="arr.id" :id="arr.id" :data-index="index + 1"
                             class="col-12 col-sm-6 col-md-4 col-lg-3 p-0">
                            <div class="card m-1 ">
                                <div class="scale">
                                    <img :src="arr.image" @click="modal(arr)" :id="'product_' + arr.id" class="card-img-top cursor" :alt="arr.country">
                                <span>замовити тур</span>
                                </div>
                                <div class="card-body">
                                            <span v-for="n in 5" :key="n" class="">
                                               <i class="fas fa-star" style="font-size:12px"
                                                  :class="{'rating-active': checkRating(n, arr)}"></i>
                                           </span>
                                    <div class="heart">
                                        <i @click="addToFavoriteProduct(arr, $event, arr.id)" :data-id="arr.id" class='far fa-heart'></i>
                                    </div>
                                    <div class="row">
                                        <p class="col-6 text-start card-text m-0"><b>{{ arr.country }}</b></p>
                                        <p class="col-6 text-end card-text m-0"><b>{{ arr.location }}</b></p>
                                    </div>
                                    <div class="row">
                                        <p class="col-6 text-start m-0"><b>$ {{ arr.price }}</b></p>
                                        <p class="col-6 text-end m-0">
                                            <img :src="arr.flag" class="card-img-top flag" :alt="arr.country">
                                        </p>
                                    </div>
                                    <div class="row">
                                        <button
                                        @click="addToCartProduct(arr, $event)"
                                        :data-id="arr.id" class="btn btn-light btn-sm addToCartBtn">book a tour
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`,
  data () {
    return {
      spinner: true,
      min: '',
      max: '',
      data: [],
      originData: [],
      filterProduct: [],
      hide_clear_filters: false,
      selectedCountry: '',
      filterCountrys: '',
      favorite_main: false,
      countrys: [],
      searchCountry: '',
      searchLocation: ''
    }
  },
  computed: {
    searchItems () {
      return store.state.searchItem
    },
    dataProduct () {
      this.searchCountry = this.searchItems.country
      this.searchLocation = this.searchItems.location
      if (this.searchCountry && this.searchLocation) {
        function filterByCity (arr, city, location) {
          return arr.filter(function (item, i, arr) {
            if (item.country.includes(city) && item.location.includes(location)) {
              return item
            }
          })
        }
        this.data = filterByCity(this.originData, this.searchCountry, this.searchLocation)
        return this.data
      } else if (this.searchCountry || this.searchLocation) {
        function filterByCity (arr, city, location) {
          return arr.filter(function (item, i, arr) {
            if (item.country.includes(city) || item.location.includes(location)) {
              return item
            }
          })
        }
        this.data = filterByCity(this.originData, this.searchCountry, this.searchLocation)
        return this.data
      }
      if (this.add_new_item.length > 0) {
        this.originData.push(this.add_new_item)
        this.originData = this.originData.flat(Infinity)
        this.data = this.originData
        this.clearFilters()
        return this.originData
      }
      if (this.selectedCountry.length > 0) {
        this.data = this.originData
        this.hide_clear_filters = true
        this.set_min_max(this.countrys)
        return this.countrys
      }
      if (this.min === '' && this.max === '' && this.selectedCountry === '') {
        this.hide_clear_filters = false
        this.data = this.originData
        this.countrys = []
        this.filterProduct = []
        return this.originData
      } else {
        this.data = this.originData
        this.hide_clear_filters = true
        let filterProduct = []
        const sortArray = this.data.map(num => {
          if (num.price >= this.min && num.price <= this.max) return num
        })
        for (let i = 0; i < sortArray.length; i++) {
          if (sortArray[i]) {
            filterProduct.push(sortArray[i])
          }
        }
        this.filterProduct = filterProduct
        return this.filterProduct
      }
    }
  },
  methods: {
    modal (product) {
      store.commit('openModals', product)
    },
    clearFilters () {
      this.min = ''
      this.max = ''
      this.hide_clear_filters = false
      this.selectedCountry = ''
      this.data = this.originData
      this.countrys = []
      this.filterProduct = []
    },
    set_min_max (min_max) {
      let n = []
      min_max.forEach((e) => {
        n.push(e.price)
      })
      this.min = Math.min(...n)
      this.max = Math.max(...n)
    },
    selectCountry () {
      this.countrys = []
      this.filterCountrys = this.data.reduce((acc, cur) => [...acc.filter((obj) => obj.country !== cur.country), cur], []) // unic count
      this.data.filter((item) => {
        if (item.country === this.selectedCountry) {
          this.countrys.push(item)
        }
      })
    },
    checkRating (n, product) {
      return product.rating - n >= 0
    },
    getData () {
      axios.get('./data.json')
        .then((response) => {
          this.data = response.data
          this.originData = response.data
          this.set_min_max(response.data)
          this.selectCountry()
          setTimeout(() => this.getDataFromLocal(), 0)
          this.spinner = false
        })
        .catch(() => {
        })
        .then(() => {
        })
    },
    addToFavoriteProduct (product, e) {
      let el = e.target
      // setItemFavorite
      if (!localStorage.getItem('favorite')) {
        let favorite = []
        localStorage.setItem('favorite', JSON.stringify(favorite))
        favorite.push(product)
        localStorage.setItem('favorite', JSON.stringify(favorite))
        this.$emit('favorite_count', favorite.length)
      } else if (el.classList.contains('far')) {
        let favorite = JSON.parse(localStorage.getItem('favorite'))
        favorite.push(product)
        localStorage.setItem('favorite', JSON.stringify(favorite))
        this.$emit('favorite_count', favorite.length)
      } else if (el.classList.contains('fas')) {
        localStorage.setItem('favorite', JSON.stringify(JSON.parse(localStorage.getItem('favorite')).filter(n => n.id !== product.id)))
        this.$emit('favorite_count', JSON.parse(localStorage.getItem('favorite')).length)
      }
      el.classList.toggle('far')
      el.classList.toggle('fas')
    },// setItemFavorite
    addToCartProduct (product, e) {
      let el = e.target
      // setItemCart
      if (!localStorage.getItem('cart')) {
        let cart = []
        localStorage.setItem('cart', JSON.stringify(cart))
        cart.push(product)
        localStorage.setItem('cart', JSON.stringify(cart))
        this.$emit('cart_count', cart.length)
      } else if (el.classList.contains('btn-light')) {
        let cart = JSON.parse(localStorage.getItem('cart'))
        cart.push(product)
        localStorage.setItem('cart', JSON.stringify(cart))
        this.$emit('cart_count', cart.length)
      } else if (el.classList.contains('btn-success')) {
        localStorage.setItem('cart', JSON.stringify(JSON.parse(localStorage.getItem('cart')).filter(n => n.id !== product.id)))
        this.$emit('cart_count', JSON.parse(localStorage.getItem('cart')).length)
      }
      el.classList.toggle('btn-light')
      el.classList.toggle('btn-success')
      el.classList.toggle('text-white')
      if (el.classList.contains('btn-success')) {
        this.$emit('show_cart_component')
      }
    },// setItemFavorite
    // getItem
    getDataFromLocal () {
      if (JSON.parse(localStorage.getItem('favorite')) != null) {
        JSON.parse(localStorage.getItem('favorite')).forEach((element, index, array) => {
          for (let i = 0; i < this.data.length; i++) {
            if (+document.querySelectorAll('.heart i')[i].getAttribute('data-id') === +element.id) {
              document.querySelectorAll('.heart i')[i].classList.toggle('far')
              document.querySelectorAll('.heart i')[i].classList.toggle('fas')
            }
          }
        })
        this.$emit('favorite_count', JSON.parse(localStorage.getItem('favorite')).length)
      }
      if (JSON.parse(localStorage.getItem('cart')) != null) {
        JSON.parse(localStorage.getItem('cart')).forEach((element, index, array) => {
          for (let i = 0; i < this.data.length; i++) {
            if (+document.querySelectorAll('.addToCartBtn')[i].getAttribute('data-id') === +element.id) {
              document.querySelectorAll('.addToCartBtn')[i].classList.toggle('btn-light')
              document.querySelectorAll('.addToCartBtn')[i].classList.toggle('btn-success')
              document.querySelectorAll('.addToCartBtn')[i].classList.toggle('text-white')
            }
          }
        })
        this.$emit('cart_count', JSON.parse(localStorage.getItem('cart')).length)
        
      }
    } // getItem
  },
  mounted () {
    this.getData()
  }
}