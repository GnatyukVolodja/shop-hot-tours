import { ComponentDatePick } from './date-pick.js';

export const ComponentCart = {  name: 'ComponentCart',
      components: {
        ComponentDatePick
      },
  props: {
    cart_main: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      cart: '',
      checkRating (n, product) {
        return product.rating - n >= 0
      }
    }
  },
  watch: {
    cart_main: function () {
      if (this.cart_main) {
        this.cart = JSON.parse(localStorage.getItem('cart'))
      }
    }
  },
  methods: {
    onSubmit (data) {
      axios.post('/', {
        data: data
    }).then(function (response) {
      }).catch(function (error) {
      })
      this.removeCartItem ()
    },
    removeCartItem () {
      delete localStorage.cart
      this.$emit('cart_count', 0)
    },
  },
  template:
    `<div v-if="cart_main" class="container cart-comp d-flex  flex-column justify-content-start align-items-center">
              <div v-for="(item, index) in cart" :key="item.id" :data-index="index" class="col-12 col-md-8 py-3 px-3 px-sm-0 cart-item">
                  <form @submit.prevent="onSubmit()" class="row bg-light">
                      <button type="button" @click="removeCartItem()" class="btn-close removeCartItem"></button>
                      <div class="col-12 cart-img px-0 bg-dark-el">
                          <img :src="item.image" class="w-100" :alt="item.country">
                      </div>
                      <div class="col-12 bg-dark-el">
                          <div class="row">
                              <component-date-pick :item="item" v-on:cart_count_info="onSubmit($event)"></component-date-pick>
                          </div>
                      </div>
                  </form>
              </div>
      </div>`
}
