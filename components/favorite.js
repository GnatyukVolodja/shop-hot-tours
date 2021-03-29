import {translate} from "../mixin.js";

export const ComponentFavorite = {
    name: 'ComponentFavorite',
    components: {},
    mixins: [translate],
    props: {
        favorite_main: {
            type: Boolean,
            default: false,
            required: true
        }
    },
    emits: {
        favorite_count: null,
        cart_count: null,
        show_component: null
    },
    data() {
        return {
            favorite: '',
            checkRating(n, product) {
                return product.rating - n >= 0
            },
            translates: {
                per_week: ['week', 'тиждень', 'неделя'],
                book_tour: ['book a tour', 'замовити тур', 'заказать тур'],
            }
        }
    },
    computed: {},
    watch: {
        favorite_main: function () {
            if (this.favorite_main) {
                this.getFavoriteItem()
            }
        }
    },
    created() {
    },
    mounted() {
        this.getFavoriteItem()
    },
    methods: {
        getFavoriteItem() {
            this.$nextTick(() => {
                this.favorite = JSON.parse(localStorage.getItem('favorite'))
                if (JSON.parse(localStorage.getItem('cart')) != null) {
                    JSON.parse(localStorage.getItem('cart')).forEach((element) => {
                        let el = document.querySelector('.addToCartItem[data-id="' + element.id + '"]')
                        if (el) {
                            el.classList.toggle('btn-light')
                            el.classList.toggle('btn-success')
                            el.classList.toggle('text-white')
                        }
                    })
                }
            })
        },
        removeFavoriteItem(product) {
            localStorage.setItem('favorite', JSON.stringify(JSON.parse(localStorage.getItem('favorite')).filter(n => n.id !== product.id)))
            this.$emit('favorite_count', JSON.parse(localStorage.getItem('favorite')).length)
            this.getFavoriteItem()
        },
        checkout(product) {
            delete localStorage.cart
            let cart = []
            localStorage.setItem('cart', JSON.stringify(cart))
            cart.push(product)
            localStorage.setItem('cart', JSON.stringify(cart))
            this.$emit('cart_count', localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')).length : 0)
            this.$emit('show_component', 'to_cart')
        },
    },
    template: `<div v-if="favorite_main" class="container favorite-comp">
                <div class="row flex p-2">
                    <div v-for="(arr, index) in favorite" :key="arr.id" :data-index="index"
                         class="col-12 col-sm-6 col-md-4 col-lg-3 p-0">
                        <div class="card m-1 bg-dark-el">
                            <div class="scale">
                                <img :src="arr.image" class="card-img-top" :alt="arr.country">
                            </div>
                            <div class="card-body">
                                <span v-for="n in 5" :key="n" class="">
                                   <i class="fas fa-star" style="font-size:12px"
                                      :class="{'rating-active': checkRating(n, arr)}"></i>
                               </span>
                                <div class="heart bg-dark-el">
                                    <i @click="removeFavoriteItem(arr, $event)" class='favorite_item fas fa-heart'></i>
                                </div>
                                <div class="row">
                                    <p class="col-6 text-start card-text m-0"><b>{{ arr.country }}</b></p>
                                    <p class="col-6 text-end card-text m-0"><b>{{ arr.location }}</b></p>
                                </div>
                                <div class="row">
                                        <p class="col-8 col-md-9 text-start m-0"><b>{{ arr.price }}$ / {{ this.translate('per_week') }}</b></p>
                                        <p class="col-4 col-md-3 text-end m-0">
                                            <img :src="arr.flag" class="card-img-top flag" :alt="arr.country">
                                        </p>
                                    </div>
                                <div class="row">
                                    <button
                                    @click="checkout(arr)"
                                    :data-id="arr.id" class="btn btn-light btn-sm addToCartItem addToCartBtn mt-2 to_cart">{{ this.translate('book_tour') }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    </div>`
}
