const ComponentHeader = {
  name: 'ComponentHeader',
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
      country: '',
      location: '',
      active_user: true
    }
  },
  methods: {
    ShowFavoriteComponent () {
      this.burger()
      this.$emit('show_favorite_component')
    },
    ShowCartComponent () {
      this.burger()
      this.$emit('show_cart_component')
    },
    ShowAddNewProductComponent () {
      this.burger()
      this.$emit('show_add_new_product_component')
    },
    ShowLoginComponent () {
      this.burger()
      this.$emit('show_login_component')
    },
    ShowMainComponent () {
      this.burger()
      this.$emit('show_main_component')
    },
    SearchProduct () {
      store.commit('searchData', this.CountryAndLocation)
    },
    burger () {
      document.querySelector('.menu-btn').classList.toggle('open')
      document.querySelector('#mobile-menu').classList.toggle('updown')
    }
  },
  computed: {
    CountryAndLocation () {
      if (this.country && this.location) {
        return {
          country: this.country[0].toUpperCase() + this.country.slice(1),
          location: this.location[0].toUpperCase() + this.location.slice(1)
        }
      } else if (this.country) {
        return {
          country: this.country[0].toUpperCase() + this.country.slice(1)
        }
      } else if (this.location) {
        return {
          location: this.location[0].toUpperCase() + this.location.slice(1)
        }
      } else if (!this.country && !this.location) {
        return {
          country: this.country = '',
          location: this.location = ''
        }
      }
    }
  },
  template: `<div class="container-fluid header p-md-2 fixed-top" :class="{'header-color': bg_header}">
                       <div class="row d-none d-md-flex">
                            <div                          class="col-md-4 col-xl-3 flex">
                                <img @click="ShowMainComponent()" class="logo" src="./assets/logo.png" alt="logo">
                            </div>
                            <div v-if="show_search_panel" class="col-md-4 col-xl-6 flex">
                                <div class="container flex search">
                                    <div class="col-sm-12 col-md-6 px-1">
                                        <fieldset class="form-group">
                                            <input
                                                @keyup="SearchProduct()"
                                                v-model.trim="country"
                                                id="country"
                                                class="form-control"
                                                type="text"
                                                placeholder="Country"/>
                                         </fieldset>
                                    </div>
                                    <div class="col-sm-12 col-md-6 px-1">
                                        <fieldset class="form-group">
                                            <input
                                                @keyup="SearchProduct()"
                                                v-model.trim="location"
                                                id="location"
                                                class="form-control"
                                                type="text"
                                                placeholder="Location"/>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                            <div v-else                   class="col-md-4 col-xl-6"></div>
                            <div v-if="bg_header"         class="col-md-4 col-xl-3 d-flex align-items-center justify-content-between">
                                <button @click="ShowAddNewProductComponent()" class="btn btn-add btn-success" >+ADD</button>
                                <span v-if="active_user" class="exit text-center text-white" @mouseover="active_user = !active_user">{{ user }}</span>
                                <span v-else class="exit text-center text-white" @click="ShowLoginComponent()" @mouseleave="active_user = !active_user">exit</span>
                                <span>
                                    <i class='far fa-heart text-light' @click="ShowFavoriteComponent()"></i>
                                    <span class="m-1 text-white" >{{ favorite_counts }}</span>
                                </span>
                                <span>
                                    <i class='fab fa-opencart text-light' @click="ShowCartComponent()"></i>
                                    <span class="m-1 text-white" >{{ cart_counts }}</span>
                                </span>
                            </div>
                       </div>
                    <div class="row d-flex d-md-none mobile-header">
                        <div class="col-6 d-flex align-items-center justify-content-start ps-4">
                            <img class="logo" src="./assets/logo.png" alt="logo">
                        </div>
                        <div class="col-6 d-flex align-items-center justify-content-end">
                            <div @click="burger" class="menu-btn" :class="{'d-none': !bg_header}">
                                <div class="menu-btn__burger"></div>
                            </div>
                        </div>
                        
                        
                        <div id="mobile-menu" class="target text-light py-2 px-3">
                            <div class="row px-2 my-1 flex">
                                <button @click="ShowAddNewProductComponent()" class="col-3 btn  btn-success"  :class="{'d-none': !bg_header}">+ADD</button>
                                <span v-if="active_user" class="col-3 exit text-center text-white" @mouseover="active_user = !active_user">{{ user }}</span>
                                <span v-else class="col-3 exit text-center text-white" @click="ShowLoginComponent()" @mouseleave="active_user = !active_user">exit</span>
                                <p class="col-3 m-0 flex">
                                    <i class=' far fa-heart text-light' @click="ShowFavoriteComponent()"></i>
                                    <span class="m-1 text-white">{{ favorite_counts }}</span>
                                </p>
                                <p class="col-3 m-0 flex">
                                    <i class='fab fa-opencart text-light' @click="ShowCartComponent()"></i>
                                    <span class="m-1 text-white" >{{ cart_counts }}</span>
                                </p>
                            </div>
                            <div v-if="show_search_panel">
                                <div class="row px-2 my-1 flex search">
                                    <div class="ps-0 col-6">
                                        <fieldset class="form-group">
                                            <input
                                                @keyup="SearchProduct()"
                                                v-model.trim="country"
                                                id="search-mobile"
                                                class="form-control clear-search"
                                                type="text"
                                                placeholder="Country"/>
                                        </fieldset>
                                    </div>
                                    <div class="pe-0 col-6">
                                        <fieldset class="form-group">
                                            <input
                                                @keyup="SearchProduct()"
                                                v-model.trim="location"
                                                id="location-mobile"
                                                class="form-control  clear-search"
                                                type="text"
                                                placeholder="Location"/>
                                        </fieldset>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
}
