const ComponentCart = {
  name: 'ComponentCart',
  data () {
    return {
      cart: '',
      // country: '',
      // location: '',
      checkRating (n, product) {
        return product.rating - n >= 0
      }
    }
  },
  methods: {
    onSubmit () {
      axios.post('/', {
        // country: this.country,
        // location: this.location
      }).then(function (response) {
          this.$emit('show_main')
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
  mounted () {
    this.getCartItem()
  },
  template:
    `<div class="container main flex" style="flex-direction: column">
              <div v-for="(item, index) in cart" :key="item.id" :data-index="index" class="col-8 py-3 cart-item">
                  <form @submit.prevent="onSubmit" class="row bg-light">
                      <div class="col-12 col-sm-4 col-md-5 cart-img px-0">
                          <img :src="item.image" class="w-100" :alt="item.country">
                      </div>
                      <div class="col-6 col-sm-2 col-md-2 py-3 py-sm-0 flex">
                          <b class="mx-1">{{ item.country }}</b>
                          <b class="mx-1">{{ item.location }}</b>
                      </div>
                      <div class="col-6 col-sm-2 col-md-2 py-3 py-sm-0 flex">
                          <b>$ {{ item.price  }}</b>
                      </div>
                      <div class="col-12 col-sm-4 col-md-3 flex pb-3 pb-sm-0">
                           <button type="button" @click="removeCartItem(item, $event)" class="btn-close removeCartItem"></button>
                           <button type="submit" class="btn btn-success w-75 d-block mx-auto">confirm shipment</button>
                      </div>
                  </form>
              </div>
      </div>`
}
