export const ComponentFavorite = {
  name: 'ComponentFavorite',
  props: {
    favorite_main: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      favorite: '',
      checkRating (n, product) {
        return product.rating - n >= 0
      }
    }
  },
  watch: {
    favorite_main: function () {
      if (this.favorite_main) {
        this.getFavoriteItem()
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
    }
  },
  mounted () {
    this.getFavoriteItem()
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
                                    <i @click="removeFavoriteItem(arr, $event)" class='favorite_item fas fa-heart active'></i>
                                </div>
                                <div class="row">
                                    <p class="col-6 text-start card-text m-0"><b>{{ arr.country }}</b></p>
                                    <p class="col-6 text-end card-text m-0"><b>{{ arr.location }}</b></p>
                                </div>
                                <div class="row">
                                        <p class="col-8 col-md-9 text-start m-0"><b>{{ arr.price }}$ / per week</b></p>
                                        <p class="col-4 col-md-3 text-end m-0">
                                            <img :src="arr.flag" class="card-img-top flag" :alt="arr.country">
                                        </p>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
                    </div>`
}
