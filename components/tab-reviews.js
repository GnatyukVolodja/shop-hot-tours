import {currentTabs, translate} from "../mixin.js"

export const Reviews = {
    name: 'ComponentReviews',
    data() {
        return {
            translates: {
                Reviews: ['Reviews', 'Відгуки', 'Отзывы'],
            }
        }
    },
    methods: {},
    mixins: [currentTabs, translate],
    template: `<div class="container tab-reviews">
                    <div class="row d-flex justify-content-end"><button type="button" @click="currentTabs()" class="btn-close m-3"></button></div>
                       {{ this.translate('Reviews') }}
               </div>`
}

