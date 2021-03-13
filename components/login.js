export const ComponentLogin = {
    name: 'ComponentLogin',
    props: {
        login: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            mail: null,
            password: null,
            wrong_password: false,
            wrong_login: false,
            isEditing: true,
            translates: {
                login: ['Login', 'Логін', 'Логин'],
                email: ['EMAIL', 'ПОШТА', 'ПОЧТА'],
                password: ['PASSWORD', 'ПАРОЛЬ', 'ПАРОЛЬ'],
                pl_password: ['password', 'пароль', 'пароль'],
                dont: ["Don't remember password?", "Забули пароль?", "Забыли пароль?"],
                wrong: ['wrong password or email', 'не правильний пароль або електронна адреса', 'неправильный пароль или адрес электронной почты'],
                please_register: ['please register', 'будь ласка, зареєструйтесь', 'пожалуйста, зарегистрируйтесь'],
                log: ['Log in', 'Увійти', 'Войти'],
                account: ['I have no account,', 'Немає аккаунта,', 'Нет аккаунта,'],
                register: ['REGISTER', 'ЗАРЕЄСТРУЙСЯ', 'ЗАРЕГИСТРИРУЙТЕСЬ'],
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
        onSubmit() {
            // this.$emit('show_main')

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
        localLogin() {
            if (!localStorage.getItem('user')) {
                this.wrong_login = true
                setTimeout(() => this.wrong_login = false, 3000)
            }
            if (JSON.parse(localStorage.getItem('user')) != null) {
                JSON.parse(localStorage.getItem('user')).forEach((element, index, array) => {
                    if (array[index].email === this.mail && array[index].password === this.password) {
                        this.$emit('show_main', array[index].name)
                    } else {
                        this.wrong_login = true
                        setTimeout(() => this.wrong_login = false, 3000)
                    }
                })
            }
        },
        showRegistration() {
            this.$emit('show_registration')
        },
        ShowHidePassword(e) {
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
    mounted() {
        delete localStorage.cart
    },
    template: `<div v-if="login" class="flex login">
                <div class="container">
                <div class="row px-3 p-sm-0">
                    <div class="col-12 col-sm-7 col-md-6 col-lg-5 col-xl-4 mx-auto p-3 bg-light text-dark bg-dark-el">
                        <h4 class="text-center">{{ this.translate('login') }}</h4>
                        <form  @submit.prevent="onSubmit" class="form">
                            <fieldset class="form-group">
                                <label for="mail"><b>{{ this.translate('email') }}</b></label>
                                <input
                                    autocomplete="user-email"
                                    v-model.trim="mail"
                                    id="mail"
                                    class="form-control"
                                    type="email"
                                    placeholder="Example@gmail.com"
                                    name="email"/>
                            </fieldset>
                            <fieldset class="form-group position-fieldset mt-3">
                                <a href="javascript:void(0);" class="password-control" @click="ShowHidePassword($event)" ></a>
                                <label for="password-input"><b>{{ this.translate('password') }}</b></label>
                                <input
                                    autocomplete="current-password"
                                    v-model.trim="password"
                                    type="password"
                                    id="password-input"
                                    :placeholder="this.translate('pl_password')"
                                    name="password">
                            </fieldset>
                            <a href="javascript:void(0);" class="remember-pass"><p class="text-end remember-password">{{ this.translate('dont') }}</p></a>
                            <small v-show="wrong_password" class="text-danger">{{ this.translate('wrong') }}</small>
                            <small v-show="wrong_login" class="text-danger">{{ this.translate('please_register') }}</small>
                            <button type="submit" class="btn btn-success w-100 mx-auto d-block mt-3">{{ this.translate('log') }}</button>
                        </form>
                    </div>
                </div>
                <div class="row mt-3 px-3 p-sm-0">
                    <div class="col-12 col-sm-7 col-md-6 col-lg-5 col-xl-4 mx-auto p-3 link d-flex align-items-center justify-content-center bg-dark-el">
                        <span>{{ this.translate('account') }}</span>
                        <a @click="showRegistration()" href="javascript:void(0);" class="mx-2">{{ this.translate('register') }}</a>
                    </div>
                </div>
                </div>
           </div>`
}

