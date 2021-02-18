const ComponentRegistration = {
  name: 'ComponentRegistration',
  props: {
    registration: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      email: null,
      name: null,
      password: null,
      password_again: null,
      wrong_password: false
    }
  },
  methods: {
    onSubmit () {
      if (this.email === null || this.name === null || this.password === null || this.password_again === null) {
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
        name: this.name,
        password: this.password,
        password_again: this.password_again
      }).then(function () {
        this.$emit('tologin')
      }).catch(function (error) {
      })
      this.localRegistration()
      this.password = null
      this.password_again = null
    },
    localRegistration () {
      if (this.password !== this.password_again) {
        this.wrong_password = true
        setTimeout(() => this.wrong_password = false, 3000)
        return
      }
      if (localStorage.getItem('user') === null) {
        let user = []
        localStorage.setItem('user', JSON.stringify(user))
        user.push({
          email: this.email,
          name: this.name,
          password: this.password,
          password_again: this.password_again
        })
        localStorage.setItem('user', JSON.stringify(user))
      } else {
        let users = JSON.parse(localStorage.getItem('user'))
        users.push({
          email: this.email,
          name: this.name,
          password: this.password,
          password_again: this.password_again
        })
        localStorage.setItem('user', JSON.stringify(users))
      }
      this.$emit('tologin')
    },
    showLogin () {
      this.$emit('show_login')
    },
    ShowHidePassword (e, id) {
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
  template: `<div v-if="registration" class="container registration">
                  <div class="row px-3 p-sm-0">
                      <div class="col-12 col-sm-7 col-md-6 col-lg-5 col-xl-4 p-3 mx-auto bg-light text-dark p-0">
                      <h4 class="text-center">Registration</h4>
                      <form @submit.prevent="onSubmit">
                          <fieldset class="form-group">
                              <label for="email"><b>EMAIL</b></label>
                              <input
                                  autocomplete="user-email"
                                  v-model.trim="email"
                                  id="email"
                                  class="form-control"
                                  type="email"
                                  placeholder="Email"
                                  name="email"/>
                          </fieldset>
                          <fieldset class="form-group">
                              <label for="name"><b>NAME</b></label>
                              <input
                                  autocomplete="user-name"
                                  v-model.trim="name"
                                  id="name"
                                  class="form-control"
                                  type="text"
                                  placeholder="Name"
                                  name="name"/>
                          </fieldset>
                          <fieldset class="form-group position-fieldset">
                              <a href="javascript:void(0);" class="password-control" @click="ShowHidePassword($event, 'password-input')" ></a>
                              <label for="password-input"><b>PASSWORD</b></label>
                              <input
                                  autocomplete="new-password"
                                  v-model.trim="password"
                                  type="password"
                                  id="password-input"
                                  name="password"/>
                          </fieldset>
                          <fieldset class="form-group position-fieldset">
                              <a href="javascript:void(0);" class="password-control" @click="ShowHidePassword($event, 'password-input_again')" ></a>
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
                          <span>I already have account,</span>
                          <a @click="showLogin" href="javascript:void(0);" class="mx-2"> LOG IN</a>
                      </div>
                  </div>
              </div>`
}
