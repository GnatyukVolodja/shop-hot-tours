const ComponentFavorite = {
  name: 'ComponentFavorite',
  props: {
    favorite: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      checkRating (n, product) {
        return product.rating - n >= 0
      }
    }
  },
  methods: {
    removeFavoriteItem (arr, $event) {
      this.$emit('removefavorite', arr)
    }
  },
  template: `<div class="container main">
                        <div class="row d-flex align-items-center justify-content-center search p-2">
                            <div v-for="(arr, index) in favorite" :key="arr.id" :index="index"
                                 class="col-12 col-sm-6 col-md-4 col-lg-3 p-0">
                                <div class="card m-1 ">
                                    <div class="scale">
                                        <img :src="arr.image" class="card-img-top" :alt="arr.country">
                                    </div>
                                    <div class="card-body">
                                        <span v-for="n in 5" :key="n" class="">
                                           <i class="fas fa-star" style="font-size:12px"
                                              :class="{'rating-active': checkRating(n, arr)}"></i>
                                       </span>
                                        <div class="heart">
                                            <i @click="removeFavoriteItem(arr, $event)" :id="arr.id" class='fas fa-heart active'
                                               style='font-size:24px'></i>
                                        </div>
                                        <div class="row">
                                            <p class="col-6 text-start card-text m-0"><b>{{ arr.country }}</b></p>
                                            <p class="col-6 text-end card-text m-0"><b>{{ arr.location }}</b></p>
                                        </div>
                                        <div class="row">
                                            <p class="col-6 text-start m-0"><b>$ {{ arr.price  }}</b></p>
                                            <p class="col-6 text-end m-0">
                                                <img :src="arr.flag" class="card-img-top flag" :alt="arr.country">
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`
}

const ComponentModal = {
  name: 'ComponentModal',
  props: {
    product: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      checkRating (n, product) {
        return product.rating - n >= 0
      }
    }
  },
  template: `<div class="modal fade" id="modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div v-for="(arr, index) in product" :key="arr.id"  :index="index" class="col-12">
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

const ComponentHeader = {
  name: 'ComponentHeader',
  props: {
    bg_header: {
      type: Boolean,
      required: true
    },
    count: {
      type: Number,
      required: true
    },
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
    showFavorite () {
      this.burger()
      this.$emit('show_favorite')
    },
    addProduct () {
      this.burger()
      this.$emit('addproduct')
    },
    toLogin () {
      this.burger()
      this.$emit('tologin')
    },
    toMainPage () {
      this.burger()
      this.$emit('tomain_page')
    },
    search () {
      this.$emit('search', this.lowercase)
    },
    burger () {
      document.querySelector('.menu-btn').classList.toggle('open')
      document.querySelector('#mobile-menu').classList.toggle('updown')
    }
  },
  computed: {
    lowercase () {
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
  template: `<div class="container-fluid header p-0 p-md-2 fixed-top" :class="{'header-color': bg_header}">
                       <div class="row d-none d-md-flex">
                            <div v-if="!bg_header" class="col-md-4 col-xl-3 d-flex align-items-center justify-content-center">
                                <img @click="toMainPage()" class="logo" src="./logo_dark.png" alt="logo">
                            </div>
                            <div v-if="bg_header" class="col-md-4 col-xl-3 d-flex align-items-center justify-content-center">
                                <img @click="toMainPage()" class="logo" src="./logo_light.png" alt="logo">
                            </div>
                            <div class="col-md-3 col-xl-6"></div>
                            <div v-if="bg_header" class="col-md-5 col-xl-3 d-flex align-items-center justify-content-center">
                                <button @click="addProduct()" class="btn btn-add btn-success" >+ADD</button>
                                <span v-if="active_user" class="exit text-center text-white mx-3" @mouseover="active_user = !active_user">{{ user }}</span>
                                <span v-else class="exit text-center text-white mx-5" @click="toLogin()" @mouseleave="active_user = !active_user">exit</span>
                                <i class='far fa-heart text-light' @click="showFavorite()"></i>
                                <span class="m-1 text-white">{{ count }}</span>
                            </div>
                            <div v-if="show_search_panel">
                                <div class="container my-1 p-0 d-flex align-items-center justify-content-center search">
                                    <div class="col-sm-12 col-md-3"></div>
                                    <div class="col-sm-12 col-md-3">
                                        <fieldset class="form-group">
                                            <input
                                                @keydown="search()"
                                                v-model.trim="country"
                                                id="search"
                                                class="form-control"
                                                type="text"
                                                placeholder="Country"/>
                                         </fieldset>
                                    </div>
                                    <div class="col-sm-12 col-md-3 px-3">
                                        <fieldset class="form-group">
                                            <input
                                                @keydown="search()"
                                                v-model.trim="location"
                                                id="location"
                                                class="form-control"
                                                type="text"
                                                placeholder="Location"/>
                                        </fieldset>
                                    </div>
                                    <div class="col-sm-12 col-md-3"></div>
                                </div>
                            </div>
                       </div>
                    <div class="row d-flex d-md-none mobile-header">
                    <div class="col-6 d-flex align-items-center justify-content-start ps-4"><img class="logo" src="./logo_light.png" alt="logo"></div>
                        <div class="col-6 d-flex align-items-center justify-content-end">
                            <div @click="burger" class="menu-btn">
                                <div class="menu-btn__burger"></div>
                            </div>
                        </div>
                        <div id="mobile-menu" class="target text-light updown p-2">
                            <div class="row px-4 my-1 d-flex align-items-center justify-content-center">
                                <button @click="addProduct()" class="col-4 btn  btn-success"  :class="{'d-none': !bg_header}">+ADD</button>
                                <span v-if="active_user" class="col-4 exit text-center text-white" @mouseover="active_user = !active_user">{{ user }}</span>
                                <span v-else class="col-4 exit text-center text-white" @click="toLogin()" @mouseleave="active_user = !active_user">exit</span>
                                <p class="col-4 m-0 d-flex align-items-center justify-content-center">
                                    <i class=' far fa-heart text-light' @click="showFavorite()" style='font-size:24px'></i>
                                    <span class="m-1 text-white">{{ count }}</span>
                                </p>
                            </div>
                            <div v-if="show_search_panel">
                                <div class="row px-4 my-1 d-flex align-items-center justify-content-center search">
                                    <div class="ps-0 col-6">
                                        <fieldset class="form-group">
                                            <input
                                                @keydown="search()"
                                                v-model="country"
                                                id="search-mobile"
                                                class="form-control clear-search"
                                                type="text"
                                                placeholder="Country"/>
                                        </fieldset>
                                    </div>
                                    <div class="pe-0 col-6">
                                        <fieldset class="form-group">
                                            <input
                                                @keydown="search()"
                                                v-model="location"
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

const ComponentLogin = {
  name: 'ComponentLogin',
  data () {
    return {
      mail: null,
      password: null,
      wrong_password: false,
      wrong_login: false
    }
  },
  methods: {
    onSubmit () {
      if (this.mail === null || this.password === null) {
        document.querySelectorAll('form input').forEach(function (a) {
          if (!a.value) {
            a.style.borderColor = 'red'
          } else {
            a.style.borderColor = '#ced4da'
          }
        })
        this.wrong_password = true
        setTimeout(() => this.wrong_password = false, 3000)
        return
      }
      axios.post('/', {
        mail: this.mail,
        password: this.password
      }).then(function (response) {
        this.$emit('tomain')
        // console.log('response ===>>>', response)
      }).catch(function (error) {
        // console.log('error ===>>>', error)
      })
      
      this.localLogin()
      
      this.mail = null
      this.password = null
    },
    localLogin () {
      if (!localStorage.getItem('user')) {
        this.wrong_login = true
        setTimeout(() => this.wrong_login = false, 3000)
      }
      JSON.parse(localStorage.getItem('user')).forEach((element, index, array) => {
        if (array[index].email === this.mail && array[index].password === this.password) {
          this.$emit('tomain', array[index].full_name)
        } else {
          this.wrong_login = true
          setTimeout(() => this.wrong_login = false, 3000)
        }
      })
      
    },
    toRegistration () {
      this.$emit('toregistration')
    },
    toMain () {
      this.$emit('tomain')
    },
    show_hide_password (e) {
      let target = e.target
      let input = document.getElementById('password-input')
      if (input.getAttribute('type') === 'password') {
        target.classList.add('view')
        input.setAttribute('type', 'text')
      } else {
        target.classList.remove('view')
        input.setAttribute('type', 'password')
      }
      return false
    }
  },
  template: `<div class="container login">
                  <div class="row px-3 p-sm-0">
                      <div class="col-12 col-sm-7 col-md-6 col-lg-5 col-xl-4 mx-auto p-3 bg-light text-dark">
                          <h4 class="text-center">Login</h4>
                          <form  @submit.prevent="onSubmit" class="form">
                              <fieldset class="form-group">
                                  <label for="mail"><b>EMAIL</b></label>
                                  <input
                                      autocomplete="useremail"
                                      v-model.trim="mail"
                                      id="mail"
                                      class="form-control"
                                      type="email"
                                      placeholder="Example@gmail.com"
                                      name="email"/>
                              </fieldset>
                              <fieldset class="form-group position-fieldset">
                                  <a href="javascript:void(0);" class="password-control" @click="show_hide_password($event)" ></a>
                                  <label for="password-input"><b>PASSWORD</b></label>
                                  <input
                                      autocomplete="current-password"
                                      v-model.trim="password"
                                      type="password"
                                      id="password-input"
                                      placeholder="Password"
                                      name="password">
                              </fieldset>
                              <a href="javascript:void(0);" class="remember-pass"><p class="text-end remember-password">Don't remember password?</p></a>
                              <small v-show="wrong_password" class="text-danger">wrong password or email</small>
                              <small v-show="wrong_login" class="text-danger">please register</small>
                              <button type="submit" class="btn btn-success w-100 mx-auto d-block mt-3">Continue</button>
                          </form>
                      </div>
                  </div>
                  <div class="row mt-3 px-3 p-sm-0">
                      <div class="col-12 col-sm-7 col-md-6 col-lg-5 col-xl-4 mx-auto p-3 link d-flex align-items-center justify-content-center">
                          <span>I have no account,</span>
                          <a @click="toRegistration()" href="javascript:void(0);" class="mx-2"> REGISTER NOW</a>
                      </div>
                  </div>
             </div>`
}

const ComponentRegistration = {
  name: 'ComponentRegistration',
  data () {
    return {
      email: null,
      full_name: null,
      password: null,
      password_again: null,
      wrong_password: false
    }
  },
  methods: {
    onSubmit () {
      if (this.email === null || this.full_name === null || this.password === null || this.password_again === null) {
        document.querySelectorAll('form input').forEach(function (a, b, c) {
          if (!a.value) {
            a.style.borderColor = 'red'
          } else {
            a.style.borderColor = '#ced4da'
          }
        })
        this.wrong_password = true
        setTimeout(() => this.wrong_password = false, 3000)
        return
      }
      
      axios.post('/', {
        email: this.email,
        full_name: this.full_name,
        password: this.password,
        password_again: this.password_again
      }).then(function (response) {
        this.$emit('tologin')
        // console.log('response ===>>>', response)
      }).catch(function (error) {
        // console.log('error ===>>>', error)
      })
      
      this.localRefgistration()
      
      this.password = null
      this.password_again = null
      
    },
    localRefgistration () {
      if (this.password !== this.password_again) {
        this.wrong_password = true
        setTimeout(() => this.wrong_password = false, 3000)
        return
      }
      
      if (localStorage.length === 0) {
        let user = []
        localStorage.setItem('user', JSON.stringify(user))
        user.push({
          email: this.email,
          full_name: this.full_name,
          password: this.password,
          password_again: this.password_again
        })
        localStorage.setItem('user', JSON.stringify(user))
      } else {
        let users = JSON.parse(localStorage.getItem('user'))
        users.push({
          email: this.email,
          full_name: this.full_name,
          password: this.password,
          password_again: this.password_again
        })
        localStorage.setItem('user', JSON.stringify(users))
      }
      this.$emit('tologin')
    },
    toLogin () {
      this.$emit('tologin')
    },
    show_hide_password (e, id) {
      let target = e.target
      let input = document.getElementById(id)
      if (input.getAttribute('type') === 'password') {
        target.classList.add('view')
        input.setAttribute('type', 'text')
      } else {
        target.classList.remove('view')
        input.setAttribute('type', 'password')
      }
      return false
    }
  },
  template: `<div class="container registration">
                  <div class="row px-3 p-sm-0">
                      <div class="col-12 col-sm-7 col-md-6 col-lg-5 col-xl-4 p-3 mx-auto bg-light text-dark p-0">
                      <h4 class="text-center">Register</h4>
                      <form @submit.prevent="onSubmit">
                          <fieldset class="form-group">
                              <label for="email"><b>EMAIL</b></label>
                              <input
                                  autocomplete="useremail"
                                  v-model.trim="email"
                                  id="email"
                                  class="form-control"
                                  type="email"
                                  placeholder="Email"
                                  name="email"/>
                          </fieldset>
                          <fieldset class="form-group">
                              <label for="full_name"><b>FULL NAME</b></label>
                              <input
                                  autocomplete="username"
                                  v-model.trim="full_name"
                                  id="full_name"
                                  class="form-control"
                                  type="text"
                                  placeholder="Full name"
                                  name="full-name"/>
                          </fieldset>
                          <fieldset class="form-group position-fieldset">
                              <a href="javascript:void(0);" class="password-control" @click="show_hide_password($event, 'password-input')" ></a>
                              <label for="password-input"><b>PASSWORD</b></label>
                              <input
                                  autocomplete="new-password"
                                  v-model.trim="password"
                                  type="password"
                                  id="password-input"
                                  name="password"/>
                          </fieldset>
                          <fieldset class="form-group position-fieldset">
                              <a href="javascript:void(0);" class="password-control" @click="show_hide_password($event, 'password-input_again')" ></a>
                              <label for="password-input_again"><b>PASSWORD AGAIN</b></label>
                              <input
                                  autocomplete="new-password"
                                  v-model.trim="password_again"
                                  type="password"
                                  id="password-input_again"
                                  name="password_again"/>
                          </fieldset>
                          <small v-show="wrong_password" class="text-danger">wrong password</small>
                          <button type="submit" class="btn btn-success w-100 mx-auto d-block mt-3">Register</button>
                      </form>
                    </div>
                  </div>
                  <div class="row mt-3 px-3 p-sm-0">
                      <div class="col-12 col-sm-7 col-md-6 col-lg-5 col-xl-4 mx-auto p-3 link d-flex align-items-center justify-content-center">
                          <span>I already havean account,</span>
                          <a @click="toLogin" href="javascript:void(0);" class="mx-2"> LOG IN</a>
                      </div>
                  </div>
              </div>`
}

const ComponentAddProduct = {
  name: 'ComponentAddProduct',
  props: {
    fixed_bottom: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      title: null,
      location: null,
      description: null,
      image: null,
      country: null,
      rating: 0,
      price: null,
      id: Date.now()
    }
  },
  methods: {
    onSubmit () {
      axios({
        method: 'post',
        url: '/',
        data: {
          title: this.title,
          location: this.location,
          description: this.description,
          image: document.getElementById('Photo').value,
          country: this.country,
          rating: this.rating,
          id: this.id
        }
      }).then(function (response) {
        // console.log('response AddProduct ===>>>', response)
      }).catch(function (error) {
        // console.log('error AddProduct ===>>>', error)
      })
      
      let new_obj = {
        id: this.id,
        title: this.title,
        location: this.location,
        country: this.country,
        image: document.getElementById('Photo').value,
        description: this.description,
        price: this.price,
        rating: this.rating
      }
      this.$emit('addnewproduct', new_obj)
      
    }
  },
  template: `<div class="container add-product">
                   <div class="row bg-light text-dark mx-1 mx-sm-0 py-3">
                       <h4 class="text-center">Add product</h4>
                       <div class="col-12 col-sm-9 col-md-6 mx-auto">
                           <form  @submit.prevent="onSubmit">
                                <fieldset class="form-group">
                                    <label for="title"><b>TITLE</b></label>
                                    <input
                                        v-model.trim="title"
                                        id="title"
                                        class="form-control"
                                        type="text"
                                        name="title"
                                        placeholder="Title"/>
                                </fieldset>
                                <fieldset class="form-group">
                                    <label for="Location"><b>LOCATION</b></label>
                                    <input
                                        v-model.trim="location"
                                        id="Location"
                                        class="form-control"
                                        type="text"
                                        name="location"
                                        placeholder="Location"/>
                                </fieldset>
                                <fieldset class="form-group">
                                    <label for="Country"><b>COUNTRY</b></label>
                                    <input
                                        v-model.trim="country"
                                        id="Country"
                                        class="form-control"
                                        type="text"
                                        name="country"
                                        placeholder="Country"/>
                                </fieldset>
                                <fieldset class="form-group">
                                    <label for="description"><b>DESCRIPTION</b></label>
                                    <textarea
                                        v-model.trim="description"
                                        id="Description"
                                        class="form-control"
                                        rows="8"
                                        name="description"
                                        placeholder="Description">
                                    </textarea>
                                </fieldset>
                                <fieldset class="form-group">
                                    <label for="Photo"><b>PHOTOS</b></label>
                                    <input
                                        id="Photo"
                                        class="form-control"
                                        type="file"
                                        placeholder="Photo"
                                        name="photo"/>
                                </fieldset>
                                <fieldset class="form-group">
                                    <label for="Rating"><b>RATING</b></label>
                                    <input
                                        v-model.number.trim="rating"
                                        id="Rating"
                                        class="form-control"
                                        type="text"
                                        placeholder="Rating"
                                        name="rating"/>
                                </fieldset>
                                <fieldset class="form-group">
                                    <label for="Price"><b>PRICE</b></label>
                                    <input
                                        v-model.number.trim="price"
                                        id="Price"
                                        class="form-control"
                                        type="text"
                                        placeholder="Price"
                                        name="price"/>
                                </fieldset>
                                <button type="submit" class="btn btn-success w-75 mx-auto d-block mt-3">ADD PRODUCT</button>
                           </form>
                      </div>
                  </div>
              </div>`
}

const ComponentFooter = {
  name: 'ComponentFooter',
  props: {
    fixed_bottom: {
      type: Boolean,
      required: true
    }
  },
  template: `<div class="container-fluid mt-4 mb-2" :class="{'fixed-bottom': fixed_bottom}">
                   <div class="row footer">
                      <div class="col-12 d-flex align-items-center justify-content-center">Copyright
                         <span class="mx-3">&copy;</span> 2020.
                         <span class="mx-3">
                             <a href="javascript:void(0);" class="remember-pass">Privacy</a>
                         </span>
                         <span>
                             <a href="javascript:void(0);" class="remember-pass">Policy</a>
                          </span>
                      </div>
                   </div>
               </div>`
}

const App = {
  name: 'main component',
  components: {
    ComponentLogin,
    ComponentRegistration,
    ComponentHeader,
    ComponentFooter,
    ComponentAddProduct,
    ComponentFavorite,
    ComponentModal
  },
  data () {
    return {
      fixed_bottom: true,
      bg_header: false,
      show_search_panel: false,
      login: true,
      registration: false,
      addProduct: false,
      main: false,
      count: 0,
      lengthArray: 0,
      min: '',
      max: '',
      array: [
        {
          id: 1,
          title: '',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa placerat duis ultricies lacus sed turpis tincidunt id.',
          price: 250,
          image: 'img/nature_1.jpg',
          location: 'Roma',
          rating: 5,
          country: 'Italy',
          flag: 'img/flag/IT.jpg'
        },
        {
          id: 2,
          title: '',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa placerat duis ultricies lacus sed turpis tincidunt id.',
          price: 274,
          image: 'img/nature_2.jpg',
          location: 'Napoli',
          rating: 3,
          country: 'Italy',
          flag: 'img/flag/IT.jpg'
        },
        {
          id: 3,
          title: '',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa placerat duis ultricies lacus sed turpis tincidunt id.',
          price: 474,
          image: 'img/nature_3.jpg',
          location: 'Madrid',
          rating: 4,
          country: 'Spain',
          flag: 'img/flag/IS.jpg'
        },
        {
          id: 4,
          title: '',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa placerat duis ultricies lacus sed turpis tincidunt id.',
          price: 350,
          image: 'img/nature_4.jpg',
          location: 'Malaga',
          rating: 2,
          country: 'Spain',
          flag: 'img/flag/IS.jpg'
        },
        {
          id: 5,
          title: '',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa placerat duis ultricies lacus sed turpis tincidunt id.',
          price: 500,
          image: 'img/nature_5.jpg',
          location: 'Sparta',
          rating: 1,
          country: 'Greece',
          flag: 'img/flag/GR.jpg'
        },
        {
          id: 6,
          title: '',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa placerat duis ultricies lacus sed turpis tincidunt id.',
          price: 750,
          image: 'img/nature_6.jpg',
          location: 'Tripolis',
          rating: 5,
          country: 'Greece',
          flag: 'img/flag/GR.jpg'
        },
        {
          id: 7,
          title: '',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa placerat duis ultricies lacus sed turpis tincidunt id.',
          price: 874,
          image: 'img/nature_7.jpg',
          location: 'Pomorie',
          rating: 3,
          country: 'Bulgaria',
          flag: 'img/flag/BG.jpg'
        },
        {
          id: 8,
          title: '',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa placerat duis ultricies lacus sed turpis tincidunt id.',
          price: 974,
          image: 'img/nature_8.jpg',
          location: 'Varna',
          rating: 4,
          country: 'Bulgaria',
          flag: 'img/flag/BG.jpg'
        },
        {
          id: 9,
          title: '',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa placerat duis ultricies lacus sed turpis tincidunt id.',
          price: 1000,
          image: 'img/nature_9.jpg',
          location: 'Stockgolm',
          rating: 2,
          country: 'Sweden',
          flag: 'img/flag/SW.jpg'
        },
        {
          id: 10,
          title: '',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa placerat duis ultricies lacus sed turpis tincidunt id.',
          price: 500,
          image: 'img/nature_10.jpg',
          location: 'Karistad',
          rating: 1,
          country: 'Sweden',
          flag: 'img/flag/SW.jpg'
        },
        {
          id: 11,
          title: '',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa placerat duis ultricies lacus sed turpis tincidunt id.',
          price: 500,
          image: 'img/nature_11.jpg',
          location: 'Zagreb',
          rating: 1,
          country: 'Croatia',
          flag: 'img/flag/CR.jpg'
        },
        {
          id: 12,
          title: '',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa placerat duis ultricies lacus sed turpis tincidunt id.',
          price: 500,
          image: 'img/nature_12.jpg',
          location: 'Rieka',
          rating: 1,
          country: 'Croatia',
          flag: 'img/flag/CR.jpg'
        }
      ],
      changeProduct: [],
      hide_clear_filters: false,
      selectedCountry: '',
      filterCountrys: '',
      favoriteProduct: [],
      favorite_main: false,
      showFavoriteProduct: [],
      countrys: [],
      searchCountry: '',
      searchLocation: '',
      productModal: [],
      user: ''
    }
  },
  computed: {
    changePrice () {
      if (this.searchCountry && this.searchLocation) {
        
        function filterByCity (arr, city, location) {
          return arr.filter(function (item, i, arr) {
            if (item.country.includes(city) && item.location.includes(location)) {
              return item
            }
          })
        }
        
        this.changeProduct = filterByCity(this.array, this.searchCountry, this.searchLocation)
        return this.changeProduct
      } else if (this.searchCountry || this.searchLocation) {
        
        function filterByCity (arr, city, location) {
          return arr.filter(function (item, i, arr) {
            if (item.country.includes(city) || item.location.includes(location)) {
              return item
            }
          })
        }
        
        this.changeProduct = filterByCity(this.array, this.searchCountry, this.searchLocation)
        return this.changeProduct
      }
      
      if (this.selectedCountry.length > 0) {
        this.hide_clear_filters = true
        this.set_min_max(this.countrys)
        return this.countrys
      }
      
      if (this.min === '' && this.max === '' && this.selectedCountry === '') {
        return this.array
      } else {
        this.hide_clear_filters = true
        let filterProduct = []
        const sortArray = this.array.map(num => {
          if (num.price >= this.min && num.price <= this.max) return num
        })
        
        for (let i = 0; i < sortArray.length; i++) {
          if (sortArray[i]) {
            filterProduct.push(sortArray[i])
          }
        }
        this.changeProduct = filterProduct
        return this.changeProduct
      }
      
    }
  },
  methods: {
    modal (product) {
      this.productModal = []
      this.productModal.push(product)
      new bootstrap.Modal(document.getElementById('modal'), {}).show()
    },
    search (search) {
      if (search === undefined) {
        console.log('empty')
        return false
      } else {
        this.hide_clear_filters = true
        this.searchCountry = search.country
        this.searchLocation = search.location
        this.changeProduct = this.array
      }
    },
    addToFavorite (product, e) {
      let el = e.target
      el.classList.toggle('active')
      el.classList.toggle('far')
      el.classList.toggle('fas')
      this.favoriteProduct.push(product)
      const resArr = []
      this.favoriteProduct.filter(function (item) {
        const i = resArr.findIndex(x => (x.id === item.id))
        if (i <= -1) {
          resArr.push(item)
        }
        return null
      })
      this.favoriteProduct = resArr
      this.count = this.favoriteProduct.length
      
      if (el.classList.contains('active')) {
      } else {
        let arr = this.favoriteProduct
        const idToRemove = +el.getAttribute('id')
        arr = arr.filter(n => n.id !== idToRemove)
        this.favoriteProduct = arr
        if (this.favoriteProduct.length === 0) {
          this.count = ''
        } else {
          this.count = this.favoriteProduct.length
        }
      }
    },
    removeFromFavorite (product) {
      this.favoriteProduct.splice(product, 1)
      this.count = this.favoriteProduct.length
      if (this.favoriteProduct.length === 0) {
        this.main = !this.main
        this.favorite_main = !this.favorite_main
        let elements = document.querySelectorAll('.active')
        Array.prototype.forEach.call(elements, function (el) {
          el.classList.remove('active')
          el.classList.remove('fas')
          el.classList.add('far')
        })
      }
    },
    selectCountry () {
      this.countrys = []
      this.filterCountrys = this.array.reduce((acc, cur) => [...acc.filter((obj) => obj.country !== cur.country), cur], []) // unic count
      this.array.filter((item) => {
        if (item.country === this.selectedCountry) {
          this.countrys.push(item)
        }
      })
    },
    clearFilters () {
      this.min = ''
      this.max = ''
      this.hide_clear_filters = false
      this.selectedCountry = ''
    },
    checkRating (n, product) {
      return product.rating - n >= 0
    },
    toMainPage () {
      if (!this.main && !this.addProduct && !this.favorite_main) {
        return ''
      } else {
        this.main = true
        this.bg_header = true
        this.show_search_panel = true
        this.login = false
        this.registration = false
        this.favorite_main = false
        this.addProduct = false
      }
    },
    showFavorite () {
      if (this.favoriteProduct.length === 0) {
        return
      }
      this.favorite_main = !this.favorite_main
      if (this.favorite_main) {
        this.main = false
      } else {
        this.main = true
        this.favorite_main = false
      }
      this.showFavoriteProduct = this.favoriteProduct
      this.addProduct = false
    },
    hide_registration () {
      this.login = !this.login
      this.registration = !this.registration
    },
    hide_login () {
      this.login = !this.login
      this.registration = !this.registration
    },
    add_product () {
      this.addProduct = true
      this.main = false
      this.favorite_main = false
      this.fixed_bottom = false
      this.show_search_panel = true
    },
    to_main (user) {
      this.user = user
      this.login = false
      this.registration = false
      this.addProduct = false
      this.main = true
      this.fixed_bottom = false
      this.bg_header = true
      this.show_search_panel = true
    },
    addNewProduct (newProduct) {
      this.lengthArray = this.changeProduct.length
      this.changeProduct.push(newProduct)
      this.addProduct = false
      this.main = true
      this.fixed_bottom = false
      this.bg_header = true
      this.favorite_main = false
      this.showFavoriteProduct = false
    },
    hide_main () {
      this.login = true
      this.registration = false
      this.addProduct = false
      this.main = false
      this.favorite_main = false
      this.fixed_bottom = true
      this.bg_header = false
      this.show_search_panel = false
      this.favoriteProduct = []
      this.count = ''
    },
    set_min_max (min_max) {
      let min = []
      let max = []
      min_max.forEach((e) => {
        min.push(e.price)
        max.push(e.price)
      })
      
      this.min = Math.min(...min)
      this.max = Math.max(...max)
    }
  },
  mounted () {
    this.changeProduct = this.array
    this.selectCountry()
    this.set_min_max(this.changeProduct)
  }
}

Vue.createApp(App).mount('#app')
