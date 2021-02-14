const App = {
  store,
  components: {
    ComponentLogin,
    ComponentRegistration,
    ComponentHeader,
    ComponentFooter,
    ComponentAddProduct,
    ComponentFavorite,
    ComponentModal,
    ComponentMain,
    ComponentCart
  },
  data () {
    return {
      // fixed_bottom: true, // ok
      bg_header: false, // ok
      show_search_panel: false, // ok
      login: true, // ok
      registration: false, // ok
      user: '', // ok
      main: false, // ok
      addProduct: false,// ok
      add_new_item: [],// ok
      favorite_counts: '', // ok
      cart_counts: '', // ok
      favorite_main: false, // ok
      cart_main: false // ok
      
      // lengthArray: 0,
      // min: '',
      // max: '',
      
      // hide_clear_filters: false,//
      // selectedCountry: '',
      // filterCountrys: '',
      // favoriteProduct: [],
      
      // showFavoriteProduct: [],
      // countrys: [],
      // searchCountry: '',
      // searchLocation: '',
      // productModal: [],
      // remFavItems: null
    }
  },
  computed: {
    modals () { // ready
      return store.state.modals
    }
  },
  // computed: {
  //     changePrice() {
  //         if (this.searchCountry && this.searchLocation) {
  //
  //             function filterByCity(arr, city, location) {
  //                 return arr.filter(function (item, i, arr) {
  //                     if (item.country.includes(city) && item.location.includes(location)) {
  //                         return item
  //                     }
  //                 })
  //             }
  //
  //             this.changeProduct = filterByCity(this.array, this.searchCountry, this.searchLocation)
  //             return this.changeProduct
  //         } else if (this.searchCountry || this.searchLocation) {
  //
  //             function filterByCity(arr, city, location) {
  //                 return arr.filter(function (item, i, arr) {
  //                     if (item.country.includes(city) || item.location.includes(location)) {
  //                         return item
  //                     }
  //                 })
  //             }
  //
  //             this.changeProduct = filterByCity(this.array, this.searchCountry, this.searchLocation)
  //             return this.changeProduct
  //         }
  //
  //         if (this.selectedCountry.length > 0) {
  //             this.hide_clear_filters = true
  //             this.set_min_max(this.countrys)
  //             return this.countrys
  //         }
  //
  //         if (this.min === '' && this.max === '' && this.selectedCountry === '') {
  //             return this.array
  //         } else {
  //             this.hide_clear_filters = true
  //             let filterProduct = []
  //             const sortArray = this.array.map(num => {
  //                 if (num.price >= this.min && num.price <= this.max) return num
  //             })
  //
  //             for (let i = 0; i < sortArray.length; i++) {
  //                 if (sortArray[i]) {
  //                     filterProduct.push(sortArray[i])
  //                 }
  //             }
  //             this.changeProduct = filterProduct
  //             return this.changeProduct
  //         }
  //
  //     }
  // },
  methods: {
    
    ShowHideLoginOrRegistration () { // ok
      this.login = !this.login
      this.registration = !this.registration
    },
    
    HideLoginShowMain (user) { // ok
      this.user = user
      this.login = false
      this.main = true
      // this.fixed_bottom = false
      this.bg_header = true
      this.show_search_panel = true
    },
    
    AddNewProduct (product) { // ok
      this.add_new_item.push(product)
      setTimeout(() => this.add_new_item = [], 0)
      this.addProduct = false
      this.main = true
    },
    
    ShowMainComponent () { // ok
      this.main = true
      this.bg_header = true
      this.show_search_panel = true
      this.addProduct = false
    },
    
    ShowLoginComponent () { // ok
      this.login = true
      this.addProduct = false
      this.main = false
      this.favorite_main = false
      // this.fixed_bottom = true
      this.bg_header = false
      this.show_search_panel = false
      // this.favoriteProduct = []
      this.favorite_counts = 0
    },
    
    ShowAddNewProductComponent () { // ok
      this.addProduct = true
      this.main = false
      this.show_search_panel = false
    },
    
    ShowFavoriteComponent () {
      if (this.favorite_counts === 0 || this.favorite_counts === '') return
      this.favorite_main = !this.favorite_main
      this.main = !this.main
      this.cart_main = false
      this.show_search_panel = !this.show_search_panel
    },
    
    FavoriteCount (n) {
      if (n === 0) {
        this.favorite_counts = ''
      } else {
        this.favorite_counts = n
      }
    },
    
    ShowCartComponent () {
      if (this.cart_counts === 0 || this.cart_counts === '') return
      console.log('test')
      this.cart_main = !this.cart_main
      this.main = !this.main
      this.favorite_main = false
      this.show_search_panel = !this.show_search_panel
    },
    
    CartCount (n) {
      if (n === 0) {
        this.cart_counts = ''
      } else {
        this.cart_counts = n
        // this.cart_main = !this.cart_main
        // this.main = !this.main
      }
    }
    
    // increment () {
    //   store.commit('increment')
    // },
    // decrement () {
    //   store.commit('decrement')
    // },
    // openModal (product) {
    // store.commit('openModals', product);
    // this.modal = true
    // console.log('productModal app')
    // this.productModal = []
    // this.productModal.push(product)
    // new bootstrap.Modal(document.getElementById('modal'), {}).show()
    // },
    // search (search) { // rem
    //   if (search === undefined) {
    //     console.log('empty')
    //     return false
    //   } else {
    //     this.hide_clear_filters = true
    //     this.searchCountry = search.country
    //     this.searchLocation = search.location
    //     this.changeProduct = this.array
    //   }
    // },
    
    // AllFavoriteProducts(product) {// from main
    //     if (!this.showFavoriteProduct) {
    //         this.showFavoriteProduct.push(product)
    //         this.showFavoriteProduct = this.showFavoriteProduct.flat()
    //     } else {
    //         this.showFavoriteProduct = []
    //         this.showFavoriteProduct.push(product)
    //         this.showFavoriteProduct = this.showFavoriteProduct.flat()
    //     }
    //     this.favoriteProduct = this.showFavoriteProduct
    //     this.favorite_counts = product.length
    //
    // },
    
    // removeFavoriteItem(product, e) {
    //     // console.log('e.target=====>>>>>', e.target)
    //     let el = e.target
    //     el.classList.toggle('active')
    //     el.classList.toggle('far')
    //     el.classList.toggle('fas')
    //
    //     // console.log('removeFromFavorite ==>>', product)
    //     // console.log('removeFromFavorite ==>>', product.id)
    //     // console.log('this.favoriteProduct', this.favoriteProduct)
    //
    //     let item = this.favoriteProduct
    //     item.splice(item.findIndex(e => e.id === product.id), 1)
    //     this.count = this.favoriteProduct.length
    //
    //     if (this.favoriteProduct.length === 0) {
    //         this.showFavoriteProduct = []
    //         this.main = !this.main
    //         this.favorite_main = !this.favorite_main
    //         let elements = document.querySelectorAll('.active')
    //         Array.prototype.forEach.call(elements, function (el) {
    //             el.classList.remove('active')
    //             el.classList.remove('fas')
    //             el.classList.add('far')
    //         })
    //     }
    // },
    // removeFavoriteItems(product) {
    //     // this.remFavItems = product
    //     console.log('product=================================>>>>>>>>>>>>>>>', product)
    //     // this.favoriteProduct.splice(product, 1)
    //     // this.count = this.favoriteProduct.length
    //     // if (this.favoriteProduct.length === 0) {
    //     //     this.main = !this.main
    //     //     this.favorite_main = !this.favorite_main
    //     //     let elements = document.querySelectorAll('.active')
    //     //     Array.prototype.forEach.call(elements, function (el) {
    //     //         el.classList.remove('active')
    //     //         el.classList.remove('fas')
    //     //         el.classList.add('far')
    //     //     })
    //     // }
    // },
    // selectCountry() {
    //     this.countrys = []
    //     this.filterCountrys = this.array.reduce((acc, cur) => [...acc.filter((obj) => obj.country !== cur.country), cur], []) // unic count
    //     this.array.filter((item) => {
    //         if (item.country === this.selectedCountry) {
    //             this.countrys.push(item)
    //         }
    //     })
    // },
    // clearFilters() {
    //     this.min = ''
    //     this.max = ''
    //     this.hide_clear_filters = false
    //     this.selectedCountry = ''
    // },
    // checkRating(n, product) {
    //     return product.rating - n >= 0
    // },
    
    // set_min_max(min_max) {
    //     let n = []
    //     min_max.forEach((e) => {
    //         n.push(e.price)
    //     })
    //     this.min = Math.min(...n)
    //     this.max = Math.max(...n)
    // }
  }
  // mounted () {
  //
  // }
}

Vue.createApp(App).mount('#app')


