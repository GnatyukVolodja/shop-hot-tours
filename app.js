import {ComponentLogin} from './components/login.js'
import {ComponentRegistration} from './components/registration.js'
import {ComponentNav} from './components/nav-bar.js'
import {ComponentMain} from './components/main.js'
import {ComponentFooter} from './components/footer.js'
import {translate} from "./mixin.js"


const app = Vue.createApp({
    name: 'App',
    store,
    components: {
        ComponentLogin,
        ComponentRegistration,
        ComponentNav,
        ComponentMain,
        ComponentFooter
    },
    emits: {
        show_registration: null,
        show_main: null
    },
    data() {
        return {
            login: false,
            registration: false,
            user: '',
            content: false,
            footer: false,
            addProduct: false,
            cart_main: false,
            favorite_main: false,
            bg_header: false,
            show_search_panel: false,
            add_new_item: [],
            favorite_counts: '',
            cart_counts: '',
            changeLang: 'EN',
            translates: {
                login: ['Login', 'Логін', 'Логин'],
                registration: ['Registration', 'Реєстрація', 'Регистрация'],
            }
        }
    },
    watch: {},
    computed: {
        isDark() {
            return store.state.dark
        }
    },
    mixins: [translate],
    methods: {
        ShowHideLoginOrRegistration(e) {
            this.login = !this.login
            this.registration = !this.registration
        },
        HideLoginShowMain(user) {
            this.user = user
            this.login = false
            this.content = true
            this.footer = true
            this.bg_header = true
            this.show_search_panel = true
        },
        AddNewProduct(product) {
            this.add_new_item.push(product)
            setTimeout(() => this.add_new_item = [], 0)
            this.addProduct = false
            this.content = true
            this.show_search_panel = true
        },
        ShowComponent(e) {
            if (e === 'to_cart') {
                this.favorite_main = false
                this.cart_main = true
                return
            }
            if (e.target.classList.contains('logo') || e.target.classList.contains('close-comp-add-prod')) {
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
            } else if (e.target.classList.contains('add')) {
                if (this.favorite_main === true || this.cart_main === true) return
                this.addProduct = !this.addProduct
                this.content = !this.content
                this.favorite_main = false
                this.cart_main = false
            } else if (e.target.classList.contains('favorite')) {
                if (this.favorite_main === false && this.cart_main === true || this.addProduct === true) return
                if (this.favorite_counts) {
                    this.favorite_main = !this.favorite_main
                    this.content = !this.content
                    this.cart_main = false
                    this.addProduct = false
                }
            } else if (e.target.classList.contains('cart')) {
                if (this.favorite_main === true && this.cart_main === false || this.addProduct === true) return
                if (this.cart_counts) {
                    this.cart_main = !this.cart_main
                    this.content = !this.content
                    this.favorite_main = false
                    this.addProduct = false
                }
            }
        },
        FavoriteCount(n) {
            if (n === 0) {
                this.favorite_counts = ''
                this.content = true
                this.favorite_main = false
                this.show_search_panel = true
            } else {
                this.favorite_counts = n
            }
        },
        CartCount(n) {
            if (n === 0) {
                this.cart_counts = ''
                this.cart_main = false
                this.content = true
                this.show_search_panel = true
            } else {
                this.cart_counts = n
            }
        },
        changeLanguage(e) {
            this.changeLang = e
        },
        hideContent() {
            this.content = false
        }
    },
    mounted() {
        if (JSON.parse(localStorage.getItem('user')) != null) {
            this.login = true
        } else {
            this.registration = true
        }
    },
    template: `<div class="app-component" :class="{'bg-dark': isDark}">
               <component-nav
                  v-on:show_component="ShowComponent"
                  v-on:change_language="changeLanguage($event)"
                  :user="user"
                  :favorite_counts="favorite_counts"
                  :cart_counts="cart_counts"
                  :show_search_panel="show_search_panel"
                  :bg_header="bg_header">
               </component-nav>
               <component-login
                   :login="login"
                   v-on:show_registration="ShowHideLoginOrRegistration($event)"
                   v-on:show_main="HideLoginShowMain">
                   <template v-slot:login>
                        <h4 class="text-center">{{ this.translate('login') }}</h4>
                  </template>
               </component-login>
               <component-registration
                   :registration="registration"
                   v-on:show_login="ShowHideLoginOrRegistration($event)">
                   <template v-slot:registration>
                        <h4 class="text-center">{{ this.translate('registration') }}</h4>
                  </template>
               </component-registration>
               <component-main
                   v-on:show_component="ShowComponent($event)"
                   v-on:add_new_product="AddNewProduct($event)"
                   v-on:favorite_count="FavoriteCount($event)"
                   v-on:cart_count="CartCount($event)"
                   :content="content"
                   :changeLang="changeLang"
                   :addProduct="addProduct"
                   :add_new_item="add_new_item"
                   :cart_main="cart_main"
                   :favorite_main="favorite_main">
                </component-main>
                <component-footer
                    :footer="footer"
                    v-on:hideContent="hideContent()"
                ></component-footer>
            </div>`
})

app.mount('#app')


