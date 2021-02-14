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
      bg_header: false,
      show_search_panel: false,
      login: true,
      registration: false,
      user: '',
      main: false,
      addProduct: false,
      add_new_item: [],
      favorite_counts: '',
      cart_counts: '',
      favorite_main: false,
      cart_main: false
    }
  },
  computed: {
    modals () {
      return store.state.modals
    }
  },
  methods: {
    ShowHideLoginOrRegistration () {
      this.login = !this.login
      this.registration = !this.registration
    },
    HideLoginShowMain (user) {
      this.user = user
      this.login = false
      this.main = true
      this.bg_header = true
      this.show_search_panel = true
    },
    AddNewProduct (product) {
      this.add_new_item.push(product)
      setTimeout(() => this.add_new_item = [], 0)
      this.addProduct = false
      this.main = true
    },
    ShowMainComponent () {
      this.main = true
      this.bg_header = true
      this.show_search_panel = true
      this.addProduct = false
    },
    ShowLoginComponent () {
      this.login = true
      this.addProduct = false
      this.main = false
      this.favorite_main = false
      this.bg_header = false
      this.show_search_panel = false
      this.favorite_counts = 0
    },
    ShowAddNewProductComponent () {
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
        this.main = true
        this.favorite_main = false
      } else {
        this.favorite_counts = n
      }
    },
    ShowCartComponent () {
      if (this.cart_counts === 0 || this.cart_counts === '') return
      this.cart_main = !this.cart_main
      this.main = !this.main
      this.favorite_main = false
      this.show_search_panel = !this.show_search_panel
    },
    CartCount (n) {
      if (n === 0) {
        this.cart_counts = ''
        this.cart_main = false
        this.main = true
      } else {
        this.cart_counts = n
      }
    }
  }
}
Vue.createApp(App).mount('#app')
