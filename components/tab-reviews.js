import {currentTabs, translate} from "../mixin.js"

export const ComponentReviews = {
    name: 'ComponentReviews',
    components: {},
    mixins: [currentTabs, translate],
    props: {},
    emits: {},
    data() {
        return {
            translates: {
                Reviews: ['Reviews', 'Відгуки', 'Отзывы'],
            }
        }
    },
    computed: {},
    watch: {},
    created() {
    },
    mounted() {
    },
    methods: {},
    template: `<div class="container tab-reviews">
                    <div class="row d-flex justify-content-end"><button type="button" @click="currentTabs()" class="btn-close m-3"></button></div>
                       {{ this.translate('Reviews') }}
               </div>`
}

