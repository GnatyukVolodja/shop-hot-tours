const ComponentFooter = {
    name: 'ComponentFooter',
    data() {
        return {
            year: 0
        }
    },
    computed: {
        isDark() {
            return store.state.dark
        }
    },
    methods: {
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
                      <div class="col-12 d-flex align-items-center justify-content-center">Copyright
                         <span class="mx-3">&copy;</span> {{ year }}
                         <span class="mx-3">
                             <a href="javascript:void(0);" class="remember-pass">Privacy</a>
                         </span>
                         <span>
                             <a href="javascript:void(0);" class="remember-pass">Policy</a>
                          </span>
                      </div>
                   </div>
                   <a href="javascript:void(0);" @click="scrollTo()" class="back-to-top">
                        <span class="flex" :class="{'bg-dark': !isDark}">&#x25B2;</span>
                   </a>
               </footer>`
}
