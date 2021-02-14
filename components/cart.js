const ComponentCart = {
  name: 'ComponentCart',
  data () {
    return {
      cart: '',
      // country: '',
      // location: '',
      // price: '',
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
          // console.log('response ===>>>', response)
        }
      ).catch(function (error) {
        // console.log('error ===>>>', error)
      })
    },
    getCartItem () {
      this.cart = JSON.parse(localStorage.getItem('cart'))
    }
    ,
    removeCartItem (item) {
      localStorage.setItem('cart', JSON.stringify(JSON.parse(localStorage.getItem('cart')).filter(n => n.id !== item.id)))
      this.$emit('cart_count', JSON.parse(localStorage.getItem('cart')).length)
      this.getCartItem()
      console.log('from cart', JSON.parse(localStorage.getItem('cart')).length)
    }
  },
  mounted () {
    this.getCartItem()
  }
  ,
  template:
    `<div class="container main">
          <form @submit.prevent="onSubmit" class="row p-2">
              <div v-for="(item, index) in cart" :key="item.id" :data-index="index" class="col-12 p-3 cart-item">
                  <div class="row bg-light">
                      <div class=" col-4 cart-img ps-0">
                          <img :src="item.image" class="w-100" :alt="item.country">
                      </div>
                      <div class="col-2 flex">
                          <b class="mx-1">{{ item.country }}</b>
                          <b class="mx-1">{{ item.location }}</b>
                      </div>
                      <div class="col-1 flex">
                          <b>$ {{ item.price  }}</b>
                      </div>
                      <div class="col-2 flex">
                       </div>
                      <div class="col-3 flex">
                           <button type="button" @click="removeCartItem(item, $event)" class="btn-close removeCartItem"></button>
                           <button type="submit" class="btn btn-success w-50 d-block mx-auto mt-3">confirm shipment</button>
                      </div>
                      
                  </div>
              </div>
          </form>
      </div>`
}
