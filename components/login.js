import {translate, showHidePassword} from "./mixin.js"

export const ComponentLogin = {
    name: 'ComponentLogin',
    props: {
        login: {
            type: Boolean,
            required: true
        }
    },
    emits: {
        show_registration: null,
        show_main: null
    },
    data() {
        return {
            mail: null,
            password: null,
            wrong_password: false,
            wrong_login: false,
            isEditing: true,
            translates: {
                email: ['EMAIL', 'ПОШТА', 'ПОЧТА'],
                password: ['PASSWORD', 'ПАРОЛЬ', 'ПАРОЛЬ'],
                pl_password: ['password', 'пароль', 'пароль'],
                dont: ["Don't remember password?", "Забули пароль?", "Забыли пароль?"],
                wrong: ['wrong password or email', 'не правильний пароль або електронна адреса', 'неправильный пароль или адрес электронной почты'],
                please_register: ['please register', 'будь ласка, зареєструйтесь', 'пожалуйста, зарегистрируйтесь'],
                log: ['Log in', 'Увійти', 'Войти'],
                account: ['I have no account,', 'Немає аккаунта,', 'Нет аккаунта,'],
                register: ['REGISTER', 'ЗАРЕЄСТРУЙТЕСЬ', 'ЗАРЕГИСТРИРУЙТЕСЬ'],
            }
        }
    },
    watch: {},
    computed: {},
    mixins: [translate, showHidePassword],
    methods: {
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
    },
    mounted() {
        delete localStorage.cart
    },
    template: `<div v-if="login" class="flex login">
                <div class="container">
                <div class="row px-3 p-sm-0">
                    <div class="col-12 col-sm-7 col-md-6 col-lg-5 col-xl-4 mx-auto p-3 bg-light text-dark bg-dark-el">
                        <slot name="login"></slot>
                        <form  @submit.prevent="onSubmit" class="form">
                            <fieldset class="form-group">
                                <label for="mail"><b>{{ this.translate('email') }}</b></label>
                                <input
                                    v-model.trim="mail"
                                    id="mail"
                                    class="form-control"
                                    type="email"
                                    placeholder="Example@gmail.com"
                                    name="email"/>
                            </fieldset>
                            <fieldset class="form-group position-fieldset mt-3">
                                <a href="javascript:void(0);" class="password-control" @click="showHidePassword($event, 'password-input')" ></a>
                                <label for="password-input"><b>{{ this.translate('password') }}</b></label>
                                <input
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
                        <a @click="$emit('show_registration', $event)" href="javascript:void(0);" class="mx-2">{{ this.translate('register') }}</a>
                    </div>
                </div>
                </div>
           </div>`
}

