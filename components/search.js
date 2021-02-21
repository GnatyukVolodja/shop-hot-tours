const ComponentSearch = {
  name: 'ComponentSearch',
  props: {
    show_search_panel: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      country: '',
      location: '',
      isDark: false
    }
  },
  computed: {
    dark () {
      return store.state.dark
    },
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
  methods: {
    SearchProduct () {
      store.commit('searchData', this.CountryAndLocation)
    },
    ShowComponent (e) {
      this.$emit('show_component', e)
    },
    changeCookie () {
      if (getCookie('dark-theme') === undefined) {
        let date = new Date
        date.setDate(date.getDate() + 365)
        setCookie('dark-theme', 'off', { path: '/', expires: date.toUTCString() })
      }
      if (getCookie('dark-theme') === 'on') {
        console.log('on')
        this.isDark = false
        store.commit('darkTheme', false)
        let date = new Date
        date.setDate(date.getDate() + 365)
        setCookie('dark-theme', 'off', { path: '/', expires: date.toUTCString() })
      } else {
        console.log('of')
        this.isDark = true
        store.commit('darkTheme', true)
        let date = new Date
        date.setDate(date.getDate() + 365)
        setCookie('dark-theme', 'on', { path: '/', expires: date.toUTCString() })
      }
      
      function getCookie (name) {
        let matches = document.cookie.match(new RegExp(
          '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
        ))
        return matches ? decodeURIComponent(matches[1]) : undefined
      }
      
      function setCookie (name, value, options) {
        options = options || {}
        let expires = options.expires
        if (typeof expires === 'number' && expires) {
          let d = new Date()
          d.setTime(d.getTime() + expires * 1000)
          expires = options.expires = d
        }
        if (expires && expires.toUTCString) {
          options.expires = expires.toUTCString()
        }
        value = encodeURIComponent(value)
        let updatedCookie = name + '=' + value
        for (var propName in options) {
          updatedCookie += '; ' + propName
          let propValue = options[propName]
          if (propValue !== true) {
            updatedCookie += '=' + propValue
          }
        }
        document.cookie = updatedCookie
      }
    },
    getCookie () {
      if (getCookie('dark-theme') === 'on') {
        store.commit('darkTheme', true)
        this.isDark = true
      } else {
        store.commit('darkTheme', false)
        this.isDark = false
      }
      
      function getCookie (name) {
        let matches = document.cookie.match(new RegExp(
          '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
        ))
        return matches ? decodeURIComponent(matches[1]) : undefined
      }
    }
  },
  mounted () {
    this.getCookie()
  },
  template: `<div v-if="show_search_panel" class="col-md-4 col-xl-6 flex">
                    <div class="row w-100 flex search">
                        <div class="col-6 col-xl-1 flex p-1">
<!--                        <transition name="fade" mode="out-in">-->
                            <button  @click="changeCookie()" class="btn btn-light btn-sm w-sm-100 w-md-100 w-lg-100" :class="{'bg': !isDark}">
                              {{ !isDark ? 'Dark' : 'Light' }}
                            </button>
<!--                      </transition>-->
<!--                            <button @click="changeCookie()" :class="{'bg': isDark}" class="btn btn-light btn-sm w-sm-100 w-md-100 w-lg-100">{{ isDark ? 'Dark' : 'Light' }}</button>-->
                        </div>
                        <div class="col-6 d-sm-flex d-xl-none flex p-1">
                            <button @click="ShowComponent($event)" class="add addNewProduct btn-sm btn btn-add btn-success w-sm-100 w-md-100  w-lg-100" >+ADD</button>
                        </div>
                        <div class="col-12 col-sm-6 col-xl-5 p-1">
                            <fieldset class="form-group">
                                <input
                                    @keyup="SearchProduct()"
                                    v-model.trim="country"
                                    id="country"
                                    class="form-control form-control-sm"
                                    type="text"
                                    placeholder="Country"/>
                             </fieldset>
                        </div>
                        <div class="col-12 col-sm-6 col-xl-5 p-1">
                            <fieldset class="form-group">
                                <input
                                    @keyup="SearchProduct()"
                                    v-model.trim="location"
                                    id="location"
                                    class="form-control form-control-sm"
                                    type="text"
                                    placeholder="Location"/>
                            </fieldset>
                        </div>
                        <div class="d-none d-xl-flex col-xl-1 flex p-1">
                            <button @click="ShowComponent($event)" class="add addNewProduct btn-sm btn btn-add btn-success w-sm-100 w-md-100 w-lg-100 p-sm-1" >+ADD</button>
                        </div>
                    </div>
                </div>
                <div v-else class="d-none d-md-block col-md-4 col-xl-6"></div>`
}

