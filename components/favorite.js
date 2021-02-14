const ComponentFavorite = {
  name: 'ComponentFavorite',
  data () {
    return {
      favorite: '',
      checkRating (n, product) {
        return product.rating - n >= 0
      }
    }
  },
  methods: {
    getFavoriteItem () {
      this.favorite = JSON.parse(localStorage.getItem('favorite'))
    },
    removeFavoriteItem (product) {
      localStorage.setItem('favorite', JSON.stringify(JSON.parse(localStorage.getItem('favorite')).filter(n => n.id !== product.id)))
      this.$emit('favorite_count', JSON.parse(localStorage.getItem('favorite')).length)
      this.getFavoriteItem()
      console.log('from favorite', JSON.parse(localStorage.getItem('favorite')).length)
    }
  },
  mounted () {
    this.getFavoriteItem()
  },
  template: `<div class="container main">
                        <div class="row flex p-2">
                            <div v-for="(arr, index) in favorite" :key="arr.id" :data-index="index"
                                 class="col-12 col-sm-6 col-md-4 col-lg-3 p-0">
                                <div class="card m-1 ">
                                    <div class="scale">
                                        <img :src="arr.image" class="card-img-top" :alt="arr.country">
                                    </div>
                                    <div class="card-body">
                                        <span v-for="n in 5" :key="n" class="">
                                           <i class="fas fa-star" style="font-size:12px"
                                              :class="{'rating-active': checkRating(n, arr)}"></i>
                                       </span>
                                        <div class="heart">
                                            <i @click="removeFavoriteItem(arr, $event)" class='fas fa-heart active'
                                               style='font-size:24px'></i>
                                        </div>
                                        <div class="row">
                                            <p class="col-6 text-start card-text m-0"><b>{{ arr.country }}</b></p>
                                            <p class="col-6 text-end card-text m-0"><b>{{ arr.location }}</b></p>
                                        </div>
                                        <div class="row">
                                            <p class="col-6 text-start m-0"><b>$ {{ arr.price  }}</b></p>
                                            <p class="col-6 text-end m-0">
                                                <img :src="arr.flag" class="card-img-top flag" :alt="arr.country">
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`
}
