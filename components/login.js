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
        this.$emit('show_main')
      }).catch(function (error) {
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
          this.$emit('show_main', array[index].name)
        } else {
          this.wrong_login = true
          setTimeout(() => this.wrong_login = false, 3000)
        }
      })
    },
    showRegistration () {
      this.$emit('show_registration')
    },
    ShowHidePassword (e) {
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
  mounted () {
    delete localStorage.cart
  },
  template: `<div class="container login">
                  <div class="row px-3 p-sm-0">
                      <div class="col-12 col-sm-7 col-md-6 col-lg-5 col-xl-4 mx-auto p-3 bg-light text-dark">
                          <h4 class="text-center">Login</h4>
                          <form  @submit.prevent="onSubmit" class="form">
                              <fieldset class="form-group">
                                  <label for="mail"><b>EMAIL</b></label>
                                  <input
                                      autocomplete="user-email"
                                      v-model.trim="mail"
                                      id="mail"
                                      class="form-control"
                                      type="email"
                                      placeholder="Example@gmail.com"
                                      name="email"/>
                              </fieldset>
                              <fieldset class="form-group position-fieldset">
                                  <a href="javascript:void(0);" class="password-control" @click="ShowHidePassword($event)" ></a>
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
                          <a @click="showRegistration()" href="javascript:void(0);" class="mx-2"> REGISTER NOW</a>
                      </div>
                  </div>
             </div>`
}
