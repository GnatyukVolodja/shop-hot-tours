export const ComponentRegistration = {
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
      wrong_password: false,
      translates: {
        registration: ['Registration', 'Реєстрація', 'Регистрация'],
        email: ['EMAIL', 'ПОШТА', 'ПОЧТА'],
        name: ['NAME', "ІМ'Я", 'ИМЯ'],
        pl_name: ['name', "ім'я", 'имя'],
        password: ['PASSWORD', 'ПАРОЛЬ', 'ПАРОЛЬ'],
        pl_password: ['password', 'пароль', 'пароль'],
        password_again: ['PASSWORD AGAIN', 'ПОВТОРІТЬ ПАРОЛЬ', 'ПОВТОРИТЕ ПАРОЛЬ'],
        pl_password_again: ['password again', 'повторіть пароль', 'повторите пароль'],
        wrong: ['wrong password', 'не правильний пароль', 'неправильный пароль'],
        register: ['Register', 'Зареєструватися', 'Зарегистрироваться'],
        account: ['I already have account,', 'У мене вже є аккаунт,', 'У меня уже есть аккаунт,'],
        log: ['LOG IN', 'УВІЙТИ', 'ВОЙТИ'],
      }
    }
  },
  computed: {
    isLang() {
      return store.state.language
    }
  },
  methods: {
    translate(phrase) {
      if (this.isLang === 'EN') {
        return this.translates[phrase][0]
      } else if (this.isLang === 'UA') {
        return this.translates[phrase][1]
      } else if (this.isLang === 'RU') {
        return this.translates[phrase][2]
      }
    },
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
        this.$emit('show_login')
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
      this.$emit('show_login')
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
  template: `<div v-if="registration" class="flex registration">
                  <div class="container">
                  <div class="row px-3 p-sm-0">
                      <div class="col-12 col-sm-7 col-md-6 col-lg-5 col-xl-4 p-3 mx-auto bg-light text-dark p-0 bg-dark-el">
                      <h4 class="text-center">{{ this.translate('registration') }}</h4>
                      <form @submit.prevent="onSubmit">
                          <fieldset class="form-group">
                              <label for="email"><b>{{ this.translate('email') }}</b></label>
                              <input
                                  autocomplete="user-email"
                                  v-model.trim="email"
                                  id="email"
                                  class="form-control"
                                  type="email"
                                  placeholder="Example@gmail.com"
                                  name="email"/>
                          </fieldset>
                          <fieldset class="form-group mt-3">
                              <label for="name"><b>{{ this.translate('name') }}</b></label>
                              <input
                                  autocomplete="user-name"
                                  v-model.trim="name"
                                  id="name"
                                  class="form-control"
                                  type="text"
                                  :placeholder="this.translate('pl_name')"
                                  name="name"/>
                          </fieldset>
                          <fieldset class="form-group position-fieldset mt-3">
                              <a href="javascript:void(0);" class="password-control" @click="ShowHidePassword($event, 'password-input')" ></a>
                              <label for="password-input"><b>{{ this.translate('password') }}</b></label>
                              <input
                                  autocomplete="new-password"
                                  v-model.trim="password"
                                  type="password"
                                  id="password-input"
                                  :placeholder="this.translate('pl_password')"
                                  name="password"/>
                          </fieldset>
                          <fieldset class="form-group position-fieldset">
                              <a href="javascript:void(0);" class="password-control" @click="ShowHidePassword($event, 'password-input_again')" ></a>
                              <label for="password-input_again"><b>{{ this.translate('password_again') }}</b></label>
                              <input
                                  autocomplete="new-password"
                                  v-model.trim="password_again"
                                  type="password"
                                  id="password-input_again"
                                  :placeholder="this.translate('pl_password_again')"
                                  name="password_again"/>
                          </fieldset>
                          <small v-show="wrong_password" class="text-danger">{{ this.translate('wrong') }}</small>
                          <button type="submit" class="btn btn-success w-100 mx-auto d-block mt-3">{{ this.translate('register') }}</button>
                      </form>
                    </div>
                  </div>
                  <div class="row mt-3 px-3 p-sm-0">
                      <div class="col-12 col-sm-7 col-md-6 col-lg-5 col-xl-4 mx-auto p-3 link d-flex align-items-center justify-content-center bg-dark-el">
                          <span>{{ this.translate('account') }}</span>
                          <a @click="showLogin" href="javascript:void(0);" class="mx-2">{{ this.translate('log') }}</a>
                      </div>
                  </div>
                  </div>
              </div>`
}
