import {ComponentModal} from "./modal.js"
import {translate} from "../mixin.js"

export const ComponentFooter = {
    name: 'ComponentFooter',
    components: {
        ComponentModal
    },
    mixins: [translate],
    props: {
        footer: {
            type: Boolean,
            default: false,
            required: true
        },
    },
    emits: {},
    data() {
        return {
            year: 0,
            translates: {
                ComponentAbout: ['About us', 'Про нас', 'О нас'],
                ComponentContacts: ['Contacts', 'Контакти', 'Контакты'],
                ComponentReviews: ['Reviews', 'Відгуки', 'Отзывы'],
            }
        }
    },
    computed: {},
    watch: {},
    created() {
    },
    mounted() {
        this.year = (new Date()).getFullYear()
        window.addEventListener('scroll', () => {
            document.querySelector(".back-to-top").style.opacity = (pageYOffset * 2) / 1000
        });
    },
    methods: {
        currentTabs(i) {
            store.commit('currentTab', i)
        },
        scrollTo() {
            window.scrollTo({
                top: 0,
                behavior: "auto"
            });
        },
    },
    template: `<footer v-if="footer" class="container-fluid py-4 footer">
                   <div class="row container m-auto">
                        <div class="col-0 col-sm-3 col-md"></div>
                        <div v-for="(tab, index) in translates" :key="index" class="col-4 col-sm-2 col-md-1 text-center">
                            <span :key="tab" @click="currentTabs(index)" class="cursor">{{ this.translate(index) }}</span>
                        </div>
                        <div class="col-0 col-sm-3 col-md"></div>
                   </div>
                   
                   <div class="row mt-2">
                      <div class="text-center col-12"><span>&copy;</span>  {{ year }} </div>
                   </div>
                   <a href="javascript:void(0);" @click="scrollTo()" class="back-to-top">
                        <span class="flex">&#x25B2;</span>
                   </a>
               </footer>`
}
