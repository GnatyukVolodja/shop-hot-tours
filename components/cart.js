const ComponentCart = {
  name: 'ComponentCart',
  props: {
    cart_main: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      cart: '',
      country: '',
      location: '',
      price: '',
      checkRating (n, product) {
        return product.rating - n >= 0
      }
    }
  },
  watch: {
    cart_main: function () {
      if (this.cart_main) {
        this.getCartItem()
      }
    }
  },
  methods: {
    checkout (country, location, price) {
      this.country = country
      this.location = location
      this.price = price
    },
    onSubmit () {
      axios.post('/', {
        country: this.country,
        location: this.location,
        price: this.price
      }).then(function (response) {
        }
      ).catch(function (error) {
      })
    },
    getCartItem () {
      this.cart = JSON.parse(localStorage.getItem('cart'))
    },
    removeCartItem (item) {
      localStorage.setItem('cart', JSON.stringify(JSON.parse(localStorage.getItem('cart')).filter(n => n.id !== item.id)))
      this.$emit('cart_count', JSON.parse(localStorage.getItem('cart')).length)
      this.getCartItem()
    }
  },
  template:
    `<div v-if="cart_main" class="container cart-comp d-flex  flex-column justify-content-start align-items-center">
              <div v-for="(item, index) in cart" :key="item.id" :data-index="index" class="col-8 py-3 cart-item">
                  <form @submit.prevent="onSubmit()" class="row bg-light">
                      <button type="button" @click="removeCartItem(item, $event)" class="btn-close removeCartItem"></button>
                      <div class="col-12 col-sm-5 col-md-6 cart-img px-0">
                          <img :src="item.image" class="w-100" :alt="item.country">
                      </div>
                      <div class="col-12 col-sm-7 col-md-6 flex">
                          <div class="row">
                              <div class="col-12 py-3 py-sm-0 flex">
                                  <b class="mx-1">{{ item.country }}</b>
                                  <b class="mx-1">{{ item.location }}</b>
                                  <b>$ {{ item.price  }}</b>
                              </div>
                              <div class="mt-2 col-12 flex ">
                                   <button type="submit" @click="checkout(item.country, item.location, item.price)" class="btn btn-success mb-3 mb-sm-0 d-block mx-auto">confirm shipment</button>
                              </div>
                          </div>
                      </div>
                  </form>
              </div>
      </div>`
}
