import { ComponentSearch } from './search.js'

export const ComponentNav = {
  name: 'ComponentNav',
  components: {
    ComponentSearch
  },
  props: {
    bg_header: {
      type: Boolean,
      required: true
    },
    favorite_counts: {},
    cart_counts: {},
    show_search_panel: {
      type: Boolean,
      required: true
    },
    user: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      src: './assets/img/flag/EN.png',
      windowWidth: 0
    }
  },
  computed: {
    toggleSearch: function () {
      if (this.windowWidth >= 768) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    lang (l) {
      this.src = l
      document.querySelectorAll('.langs').forEach(el => el.setAttribute('src', l))
      store.commit('lang', l.slice(-6, -4))
      this.$emit('change_language', l.slice(-6, -4))
      
      if (l.slice(-6, -4) === 'EN') {
        this.$refs.exit.innerHTML = 'exit'
      } else if (l.slice(-6, -4) === 'UA') {
        this.$refs.exit.innerHTML = 'вихід'
      } else if (l.slice(-6, -4) === 'RU') {
        this.$refs.exit.innerHTML = 'выйти'
      }
    },
    getWindowWidth () {
      this.windowWidth = document.documentElement.clientWidth
    },
    ShowComponent (e) {
      this.$emit('show_component', e)
      if (e.target.classList.contains('dropel')) return
      this.burger()
    },
    burger () {
      document.querySelector('.menu-btn').classList.toggle('open')
      document.querySelector('#mobile-menu').classList.toggle('updown')
    }
  },
  mounted () {
    this.$nextTick(function () {
      window.addEventListener('resize', this.getWindowWidth)
      this.getWindowWidth()
    })
  },
  beforeUpdate () {
    if (this.bg_header) {
      setTimeout(() => this.$refs.src.setAttribute('src', this.src), 0)
    }
  },
  template: `<header class="container-fluid header p-md-2 fixed-top" :class="{'header-color': bg_header}">
                       <div class="row d-none d-md-flex">
                            <div class="col-4 col-xl-3 flex">
                                <img @click="ShowComponent($event)" class="logo" src="./assets/logo.png" alt="logo">
                            </div>
                            
                            <component-search class="desktop"
                                v-if="toggleSearch"
                                :show_search_panel="show_search_panel"
                                v-on:show_component="ShowComponent">
                            </component-search>
                            
                            <div v-if="!bg_header" class="col-4 col-xl-3 flex">
                                <div class="dropdown">
                                    <img src="./assets/img/flag/EN.png" class="dropel langs" alt="EN">
                                    <div class="dropdown-content" style="right: -30px;">
                                      <a href="javascript:void(0);" @click="lang('./assets/img/flag/UA.png')" class="bg-dark"><img src="./assets/img/flag/UA.png" alt="UA"> UA</a>
                                      <a href="javascript:void(0);" @click="lang('./assets/img/flag/RU.png')" class="bg-dark"><img src="./assets/img/flag/RU.png" alt="RU"> RU</a>
                                      <a href="javascript:void(0);" @click="lang('./assets/img/flag/EN.png')" class="bg-dark"><img src="./assets/img/flag/EN.png" alt="EN"> EN</a>
                                    </div>
                                </div>
                            </div>
                            
                            <div v-if="bg_header" class="col-md-4 col-xl-3 flex">
                                <div class="row w-100">
                                
                                
                                    <div class="col-4 flex">
                                        <div class="dropdown">
                                            <span class="dropel">{{ user }}</span>
                                            <div class="dropdown-content exit bg-dark flex w-100">
                                                  <span class="cursor bg-dark flex p-1 exit" ref="exit"  @click="ShowComponent($event)">exit</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    
                                    <span class="col-3 flex">
                                        <i class='favorite fa-heart text-light' :class="{'far': !favorite_counts}, {'fas': favorite_counts}"  @click="ShowComponent($event)"></i>
                                        <span class="m-1 text-white" >{{ favorite_counts }}</span>
                                    </span>
                                    <span class="col-3 flex">
                                        <i class='cart fab fa-opencart text-light' @click="ShowComponent($event)"></i>
                                        <span class="m-1 text-white" >{{ cart_counts }}</span>
                                    </span>
                                    <div class="col-2 flex">
                                        <div class="dropdown">
                                            <img src="./assets/img/flag/EN.png" ref="src" class="dropel langs" alt="EN">
                                            <div class="dropdown-content" style="right: -30px;">
                                              <a href="javascript:void(0);" @click="lang('./assets/img/flag/UA.png')" class="bg-dark"><img src="./assets/img/flag/UA.png" alt="UA"> UA</a>
                                              <a href="javascript:void(0);" @click="lang('./assets/img/flag/RU.png')" class="bg-dark"><img src="./assets/img/flag/RU.png" alt="RU"> RU</a>
                                              <a href="javascript:void(0);" @click="lang('./assets/img/flag/EN.png')" class="bg-dark"><img src="./assets/img/flag/EN.png" alt="EN"> EN</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                    
                    <div class="row d-flex d-md-none" :class="{'mobile-header': bg_header}">
                        <div class="col-6 d-flex align-items-center justify-content-start ps-4">
                            <img @click="ShowComponent($event)" class="logo" src="./assets/logo.png" alt="logo">
                        </div>
                        <div class="col-6 d-flex align-items-center justify-content-end" :class="{'d-none': !bg_header}">
                            <div @click="burger()" class="menu-btn" >
                                <div class="menu-btn__burger"></div>
                            </div>
                        </div>
                        <div class="col-6 flex justify-content-end" :class="{'d-none': bg_header}">
                            <div class="dropdown">
                                <img src="./assets/img/flag/EN.png" class="dropel langs" alt="EN">
                                <div class="dropdown-content" style="right: -20px;">
                                  <a href="javascript:void(0);" @click="lang('./assets/img/flag/UA.png')" class="bg-dark"><img src="./assets/img/flag/UA.png" alt="UA"> UA</a>
                                  <a href="javascript:void(0);" @click="lang('./assets/img/flag/RU.png')" class="bg-dark"><img src="./assets/img/flag/RU.png" alt="RU"> RU</a>
                                  <a href="javascript:void(0);" @click="lang('./assets/img/flag/EN.png')" class="bg-dark"><img src="./assets/img/flag/EN.png" alt="EN"> EN</a>
                                </div>
                            </div>
                        </div>
                        
                        <div id="mobile-menu" class="target text-light py-2 px-3 updown" :class="{'d-none': !bg_header}">
                            <div class="row px-2 my-1 flex">
                                <button @click="ShowComponent($event)" class="d-none d-md-block add col-3 btn btn-sm btn-success"  :class="{'d-none': !bg_header}">+ADD</button>
                                
                                <div class="col-4 flex">
                                    <div class="dropdown">
                                        <span class="dropel">{{ user }}</span>
                                        <div class="dropdown-content exit bg-dark flex w-100">
                                              <span class="cursor bg-dark flex p-1 exit" ref="exit"  @click="ShowComponent($event)">exit</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <p class="col-3 m-0 flex">
                                    <i class='favorite fa-heart text-light' :class="{'far': !favorite_counts}, {'fas': favorite_counts}"  @click="ShowComponent($event)"></i>
                                    <span class="m-1 text-white">{{ favorite_counts }}</span>
                                </p>
                                <p class="col-3 m-0 flex">
                                    <i class='cart fab fa-opencart text-light' @click="ShowComponent($event)"></i>
                                    <span class="m-1 text-white" >{{ cart_counts }}</span>
                                </p>
                                <div class="col-2 flex">
                                    <div class="dropdown">
                                        <img src="./assets/img/flag/EN.png" class="dropel langs" alt="EN">
                                        <div class="dropdown-content" style="right: -30px;">
                                          <a href="javascript:void(0);" @click="lang('./assets/img/flag/UA.png')" class="bg-dark"><img src="./assets/img/flag/UA.png" alt="UA"> UA</a>
                                          <a href="javascript:void(0);" @click="lang('./assets/img/flag/RU.png')" class="bg-dark"><img src="./assets/img/flag/RU.png" alt="RU"> RU</a>
                                          <a href="javascript:void(0);" @click="lang('./assets/img/flag/EN.png')" class="bg-dark"><img src="./assets/img/flag/EN.png" alt="EN"> EN</a>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                                 <component-search class="mobile"
                                     v-if="!toggleSearch"
                                    :show_search_panel="show_search_panel"
                                    v-on:show_component="ShowComponent">
                                </component-search>
                        </div>
                    </div>
                </header>`
}

