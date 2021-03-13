export const ComponentFooter = {
    name: 'ComponentFooter',
    data() {
        return {
            year: 0,
            translates: {
                Copyright: ['Copyright', 'Авторське право', 'Авторские права'],
                Privacy: ['Privacy', 'Конфіденційність', 'Конфиденциальность'],
            }
        }
    },
    computed: {
        isDark() {
            return store.state.dark
        },
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
        scrollTo() {
            window.scrollTo({
                top: 0,
                behavior: "auto"
            });
        },
    },
    mounted() {
        this.year = (new Date()).getFullYear()
        window.addEventListener('scroll', () => {
            document.querySelector(".back-to-top").style.opacity = (pageYOffset * 2) / 1000
        });
    },
    template: `<footer class="container-fluid py-4 footer"  :class="{'bg-dark': isDark}">
                   <div class="row">
                      <div class="col-12 d-flex align-items-center justify-content-center">{{ this.translate('Copyright') }}
                         <span class="mx-2">&copy;</span> {{ year }}
                         <span class="mx-2">
                             <a href="javascript:void(0);" class="remember-pass">{{ this.translate('Privacy') }}</a>
                         </span>
                      </div>
                   </div>
                   <a href="javascript:void(0);" @click="scrollTo()" class="back-to-top">
                        <span class="flex" :class="{'bg-dark': !isDark}">&#x25B2;</span>
                   </a>
               </footer>`
}
