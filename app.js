const app = Vue.createApp({})

app.component('app', {
  name: 'App',
  store,
  components: {
    ComponentLogin,
    ComponentRegistration,
    ComponentNav,
    ComponentMain,
    ComponentFooter
  },
  data () {
    return {
      login: true,
      registration: false,
      user: '',
      
      content: false,
      addProduct: false,
      cart_main: false,
      favorite_main: false,
      
      bg_header: false,
      show_search_panel: false,
      add_new_item: [],
      favorite_counts: '',
      cart_counts: ''
      
    }
  },
  computed: {
    isDark () {
      return store.state.dark
    },
  },
  methods: {
    ShowHideLoginOrRegistration () {
      this.login = !this.login
      this.registration = !this.registration
    },
    HideLoginShowMain (user) {
      this.user = user
      this.login = false
      this.content = true
      this.bg_header = true
      this.show_search_panel = true
    },
    AddNewProduct (product) {
      this.add_new_item.push(product)
      setTimeout(() => this.add_new_item = [], 0)
      this.addProduct = false
      this.content = true
      this.show_search_panel = true
    },
    ShowComponent (e) {
      if (e.target.classList.contains('logo') || e.target.classList.contains('close-comp-add-prod')) { // ok
        this.content = true
        this.bg_header = true
        this.show_search_panel = true
        this.addProduct = false
        this.favorite_main = false
        this.cart_main = false
        
      } else if (e.target.classList.contains('exit')) {
        this.login = true
        this.addProduct = false
        this.content = false
        this.favorite_main = false
        this.cart_main = false
        this.bg_header = false
        this.show_search_panel = false
        // this.favorite_counts = 0
      } else if (e.target.classList.contains('add')) { // ok
        this.addProduct = true
        this.content = false
        this.favorite_main = false
        this.cart_main = false
        this.show_search_panel = false
      } else if (e.target.classList.contains('favorite')) { // ok
        console.log('show favorite component')
        if (this.favorite_main === false && this.cart_main === true) return
        if (this.favorite_counts) {
          this.show_search_panel = !this.show_search_panel
          this.favorite_main = !this.favorite_main
          this.content = !this.content
          this.cart_main = false
          this.addProduct = false
        }
      } else if (e.target.classList.contains('cart')) { // ok
        console.log('show cart component')
        if (this.favorite_main === true && this.cart_main === false) return
        if (this.cart_counts) {
          this.show_search_panel = !this.show_search_panel
          this.cart_main = !this.cart_main
          this.content = !this.content
          this.favorite_main = false
          this.addProduct = false
        }
      }
    },
    FavoriteCount (n) {
      if (n === 0) {
        this.favorite_counts = ''
        this.content = true
        this.favorite_main = false
        this.show_search_panel = true
      } else {
        this.favorite_counts = n
      }
    },
    CartCount (n) {
      if (n === 0) {
        this.cart_counts = ''
        this.cart_main = false
        this.content = true
        this.show_search_panel = true
      } else {
        this.cart_counts = n
      }
    }
  },
  template: `<div class="app-component" :class="{'bg-dark': isDark}">
               <component-nav
                  v-on:show_component="ShowComponent"
                  :user="user"
                  :favorite_counts="favorite_counts"
                  :cart_counts="cart_counts"
                  :show_search_panel="show_search_panel"
                  :bg_header="bg_header">
               </component-nav>
               <component-login
                   :login="login"
                   v-on:show_registration="ShowHideLoginOrRegistration"
                   v-on:show_main="HideLoginShowMain">
               </component-login>
               <component-registration
                   :registration="registration"
                   v-on:show_login="ShowHideLoginOrRegistration">
               </component-registration>
               <component-main
                   v-on:show_component="ShowComponent($event)"
                   v-on:add_new_product="AddNewProduct($event)"
                   v-on:favorite_count="FavoriteCount($event)"
                   v-on:cart_count="CartCount($event)"
                   :content="content"
                   :addProduct="addProduct"
                   :add_new_item="add_new_item"
                   :cart_main="cart_main"
                   :favorite_main="favorite_main">
                </component-main>
                <component-footer></component-footer>
            </div>`
})

app.mount('#app')


