const ComponentNav = {
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
      active_user: true,
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
    getWindowWidth (event) {
      this.windowWidth = document.documentElement.clientWidth
    },
    ShowComponent (e) {
      this.$emit('show_component', e)
      if (e.target.classList.contains('logo')) return
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
  template: `<div class="container-fluid header p-md-2 fixed-top" :class="{'header-color': bg_header}">
                       <div class="row d-none d-md-flex">
                            <div class="col-md-4 col-xl-3 flex">
                                <img @click="ShowComponent($event)" class="logo" src="./assets/logo.png" alt="logo">
                            </div>
                            
                                <component-search class="desktop"
                                    v-if="toggleSearch"
                                    :show_search_panel="show_search_panel"
                                    v-on:show_component="ShowComponent">
                                </component-search>

                            
                            <div v-if="bg_header" class="col-md-4 col-xl-3 flex">
                                <div class="row w-100">
                                    <span v-if="active_user" class="col-4 flex exit text-center text-white" @mouseover="active_user = !active_user">{{ user }}</span>
                                    <span v-else class="col-4 flex exit text-center text-white" @click="ShowComponent($event)" @mouseleave="active_user = !active_user">exit</span>
                                    <span class="col-4 flex">
                                        <i class='favorite far fa-heart text-light' @click="ShowComponent($event)"></i>
                                        <span class="m-1 text-white" >{{ favorite_counts }}</span>
                                    </span>
                                    <span class="col-4 flex">
                                        <i class='cart fab fa-opencart text-light' @click="ShowComponent($event)"></i>
                                        <span class="m-1 text-white" >{{ cart_counts }}</span>
                                    </span>
                                </div>
                            </div>
                       </div>
                       
                    <div class="row d-flex d-md-none" :class="{'mobile-header': bg_header}">
                        <div class="col-6 d-flex align-items-center justify-content-start ps-4">
                            <img @click="ShowComponent($event)" class="logo" src="./assets/logo.png" alt="logo">
                        </div>
                        <div class="col-6 d-flex align-items-center justify-content-end">
                            <div @click="burger()" class="menu-btn" :class="{'d-none': !bg_header}">
                                <div class="menu-btn__burger"></div>
                            </div>
                        </div>
                        
                        
                        <div id="mobile-menu" class="target text-light py-2 px-3 updown" :class="{'d-none': !bg_header}">
                            <div class="row px-2 my-1 flex">
                                <button @click="ShowComponent($event)" class="d-none d-md-block add col-3 btn btn-sm btn-success"  :class="{'d-none': !bg_header}">+ADD</button>
                                <span v-if="active_user" class="col-4 exit text-center text-white" @mouseover="active_user = !active_user">{{ user }}</span>
                                <span v-else class="col-4 exit text-center text-white" @click="ShowComponent($event)" @mouseleave="active_user = !active_user">exit</span>
                                <p class="col-4 m-0 flex">
                                    <i class='favorite far fa-heart text-light' @click="ShowComponent($event)"></i>
                                    <span class="m-1 text-white">{{ favorite_counts }}</span>
                                </p>
                                <p class="col-4 m-0 flex">
                                    <i class='cart fab fa-opencart text-light' @click="ShowComponent($event)"></i>
                                    <span class="m-1 text-white" >{{ cart_counts }}</span>
                                </p>
                            </div>
                                 <component-search class="mobile"
                                     v-if="!toggleSearch"
                                    :show_search_panel="show_search_panel"
                                    v-on:show_component="ShowComponent">
                                </component-search>
                        </div>
                    </div>
                </div>`
}

