import { ComponentModal } from './modal.js'
import { translate } from '../mixin.js'
import { About } from './tab-about.js'
import { Contacts } from './tab-contacts.js'
import { Reviews } from './tab-reviews.js'

export const ComponentContent = {
  name: 'ComponentContent',
  components: {
    ComponentModal,
    About,
    Contacts,
    Reviews
  },
  props: {
    add_new_item: {
      type: Object,
      default: {},
      required: true
    },
    content: {
      type: Boolean,
      default: false,
      required: true
    },
    changeLang: {
      type: String,
      default: 'EN',
      required: true
    }
  },
  emits: {
    favorite_count: null,
    cart_count: null
  },
  data () {
    return {
      spinner: true,
      min: '',
      max: '',
      data: [],
      originData: [],
      filterProduct: [],
      hide_clear_filters: false,
      selectedCountry: '',
      filterCountrys: '',
      favorite_main: false,
      countrys: [],
      searchCountry: '',
      searchLocation: '',
      productModal: [],
      modal: false,
      sortItem: true,
      page: 1,
      perPage: 8,
      pages: [],
      translates: {
        all_country: ['All country', 'Всі країни', 'Все страны'],
        count_per_page: ['count per page', 'кількітсь на сторінку', 'количество на страницу'],
        per_week: ['week', 'тиждень', 'неделя'],
        book_tour: ['book a tour', 'замовити тур', 'заказать тур'],
        prev: ['Prev', 'Попередня', 'Предыдущая'],
        next: ['Next', 'Наступна', 'Следующая'],
        price_from: [' Price from (USD)', 'Ціна від (USD)', 'Цена от (USD)'],
        price_to: [' Price to (USD)', 'Ціна до (USD)', 'Цена до (USD)']
      }
    }
  },
  watch: {
    perPage: function (i, c) {
      if (this.pages.length <= 2) {
        document.getElementById('next').removeAttribute('disabled')
      }
      if (this.pages.length >= 2) {
        document.getElementById('previous').setAttribute('disabled', 'disabled')
        document.getElementById('next').setAttribute('disabled', 'disabled')
      }
    },
    changeLang: function () {
      this.getDataJson()
    }
  },
  computed: {
    currentTabComponent () {
      return store.state.currentTabs
    },
    searchItems () {
      return store.state.searchItem
    },
    dataProduct () {
      if (this.content) {
        this.getDataFromLocal()
      }
      this.searchCountry = this.searchItems.country
      this.searchLocation = this.searchItems.location
      if (this.searchCountry === undefined) {
        this.searchCountry = ''
      }
      if (this.searchLocation === undefined) {
        this.searchLocation = ''
      }
      
      let sort = (filter) => {
        if (this.sortItem) {
          function compare (a, b) {
            if (a.price < b.price)
              return -1
            if (a.price > b.price)
              return 1
            return 0
          }
          
          return filter.slice(0).sort(compare)
        } else {
          function compare (a, b) {
            if (a.price > b.price)
              return -1
            if (a.price < b.price)
              return 1
            return 0
          }
          
          return filter.slice(0).sort(compare)
        }
      }
      
      if (this.searchCountry !== '' || this.searchLocation !== '') {
        this.hide_clear_filters = true
        
        function filterByCity (arr, city, location) {
          return arr.filter(function (item) {
            if (item.country.includes(city) && item.location.includes(location)) {
              return item
            }
          })
        }
        
        return this.setPages(sort(filterByCity(this.originData, this.searchCountry, this.searchLocation)))
      }
      
      if (this.add_new_item.length > 0) {
        this.originData.push(this.add_new_item)
        this.originData = this.originData.flat(Infinity)
        this.data = this.originData
        this.clearFilters()
        return this.setPages(this.data)
      }
      
      if (this.selectedCountry !== '') {
        this.hide_clear_filters = true
        this.filterProduct = []
        
        if (this.min !== '' || this.max !== '') {
          const sortArray = this.countrys.map(num => {
            if (num.price >= this.min && num.price <= this.max) return num
          })
          for (let i = 0; i < sortArray.length; i++) {
            if (sortArray[i]) {
              this.filterProduct.push(sortArray[i])
            }
          }
        } else {
          const sortArray = this.countrys.map(num => {
            if (num.price >= this.min || num.price <= this.max) return num
          })
          for (let i = 0; i < sortArray.length; i++) {
            if (sortArray[i]) {
              this.filterProduct.push(sortArray[i])
            }
          }
        }
        return this.setPages(sort(this.filterProduct))
      }
      
      if (this.selectedCountry === '' && this.min !== '' || this.max !== '') {
        this.hide_clear_filters = true
        this.filterProduct = []
        const sortArray = this.data.map(num => {
          if (num.price >= this.min && num.price <= this.max) return num
        })
        for (let i = 0; i < sortArray.length; i++) {
          if (sortArray[i]) {
            this.filterProduct.push(sortArray[i])
          }
        }
        return this.setPages(sort(this.filterProduct))
      }
      
      if (this.selectedCountry === '' && this.searchCountry === '' && this.searchLocation === '' && this.min === '' && this.max === '' && this.content && this.add_new_item.length === 0) {
        this.hide_clear_filters = false
        this.data = this.originData
        return this.setPages(sort(this.originData))
      }
    }
  },
  mixins: [translate],
  methods: {
    back () {
      this.page--
      if (this.page === 1) {
        document.getElementById('previous').setAttribute('disabled', 'disabled')
      } else {
        document.getElementById('previous').removeAttribute('disabled')
      }
      document.getElementById('next').removeAttribute('disabled')
      this.activePage()
    },
    next () {
      this.page++
      if (this.page === this.pages.length) {
        document.getElementById('next').setAttribute('disabled', 'disabled')
      } else {
        document.getElementById('next').removeAttribute('disabled')
      }
      document.getElementById('previous').removeAttribute('disabled')
      this.activePage()
    },
    currentPage (pageNumber) {
      this.page = pageNumber
      if (this.page > 1) {
        document.getElementById('previous').removeAttribute('disabled')
      }
      if (this.page < this.pages.length) {
        document.getElementById('next').removeAttribute('disabled')
      }
      if (this.page === 1) {
        document.getElementById('previous').setAttribute('disabled', 'disabled')
      }
      if (this.pages.length === this.page) {
        document.getElementById('next').setAttribute('disabled', 'disabled')
      }
      this.activePage()
    },
    activePage () {
      document.querySelectorAll('.item').forEach((el) => {
        el.classList.remove('active')
        if (+el.getAttribute('data-pagenumber') === +this.page) {
          el.classList.add('active')
        }
      })
    },
    setPages (data) {
      this.pages = []
      for (let i = 1; i <= Math.ceil(data.length / this.perPage); i++) {
        this.pages.push(i)
      }
      let page = this.page
      let perPage = this.perPage
      let from = (page * perPage) - perPage
      let to = (page * perPage)
      return data.slice(from, to)
    },
    toggleModal (product) {
      if (product) {
        this.modal = true
        this.productModal.push(product)
      } else if (!product) {
        this.productModal = []
        this.modal = false
      }
    },
    clearFilters () {
      this.min = ''
      this.max = ''
      this.hide_clear_filters = false
      this.selectedCountry = ''
      this.searchCountry = ''
      this.searchLocation = ''
      store.commit('searchData', '')
      document.getElementById('country').value = ''
      document.getElementById('location').value = ''
      this.data = this.originData
      this.countrys = []
      this.filterProduct = []
      this.perPage = 8
    },
    selectCountry () {
      this.min = ''
      this.max = ''
      this.countrys = []
      this.filterCountrys = this.data.reduce((acc, cur) => [...acc.filter((obj) => obj.country !== cur.country), cur], [])
      this.data.filter((item) => {
        if (item.country === this.selectedCountry) {
          this.countrys.push(item)
        }
      })
    },
    checkRating (n, product) {
      return product.rating - n >= 0
    },
    getDataJson () {
      if (store.state.language === 'EN') {
        axios.get('./dataEn.json')
          .then((response) => {
            this.originData = response.data
          })
      } else if (store.state.language === 'UA') {
        axios.get('./dataUa.json')
          .then((response) => {
            this.originData = response.data
          })
      } else if (store.state.language === 'RU') {
        axios.get('./dataRu.json')
          .then((response) => {
            this.originData = response.data
          })
      }
      this.data = this.originData
      this.selectCountry()
      this.setPages(this.data)
      setTimeout(() => this.spinner = false, 1000)
    },
    addToFavoriteProduct (product, e) {
      let el = e.target
      if (!localStorage.getItem('favorite')) {
        let favorite = []
        localStorage.setItem('favorite', JSON.stringify(favorite))
        favorite.push(product)
        localStorage.setItem('favorite', JSON.stringify(favorite))
      } else if (el.classList.contains('far')) {
        let favorite = JSON.parse(localStorage.getItem('favorite'))
        favorite.push(product)
        localStorage.setItem('favorite', JSON.stringify(favorite))
      } else if (el.classList.contains('fas')) {
        localStorage.setItem('favorite', JSON.stringify(JSON.parse(localStorage.getItem('favorite')).filter(n => n.id !== product.id)))
      }
      this.$emit('favorite_count', JSON.parse(localStorage.getItem('favorite')).length)
      
      el.classList.toggle('far')
      el.classList.toggle('fas')
    },
    addToCartProduct (product, e) {
      delete localStorage.cart
      let el = e.target
      if (el.classList.contains('btn-light')) {
        document.querySelectorAll('.addToCartItem ').forEach(el => el.classList.remove('btn-success'))
        document.querySelectorAll('.addToCartItem ').forEach(el => el.classList.add('btn-light'))
        el.classList.add('btn-success')
        el.classList.remove('btn-light')
        let cart = []
        localStorage.setItem('cart', JSON.stringify(cart))
        cart.push(product)
        localStorage.setItem('cart', JSON.stringify(cart))
      } else if (el.classList.contains('btn-success')) {
        el.classList.remove('btn-success')
        el.classList.add('btn-light')
      }
      this.$emit('cart_count', localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')).length : 0)
    },
    getDataFromLocal () {
      if (JSON.parse(localStorage.getItem('favorite')) != null) {
        setTimeout(() => {
          JSON.parse(localStorage.getItem('favorite')).forEach((element) => {
            let el = document.querySelector('.favorite_item[data-id="' + element.id + '"]')
            if (el) {
              el.classList.remove('far')
              el.classList.add('fas')
            }
          })
        }, 0)
        this.$emit('favorite_count', JSON.parse(localStorage.getItem('favorite')).length)
      }
      if (JSON.parse(localStorage.getItem('cart')) != null) {
        setTimeout(() => {
          JSON.parse(localStorage.getItem('cart')).forEach((element) => {
            let el = document.querySelector('.addToCartItem[data-id="' + element.id + '"]')
            if (el) {
              el.classList.toggle('btn-light')
              el.classList.toggle('btn-success')
              el.classList.toggle('text-white')
            }
          })
        }, 0)
        this.$emit('cart_count', JSON.parse(localStorage.getItem('cart')).length)
      }
    }
  },
  created () {
    this.getDataJson()
  },
  template: `<div v-if="content" class="container main">
                    <div v-show="spinner" class="spinner flex">
                        <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                    </div>
                    <div class="row py-1 px-1 my-1 d-flex align-items-center justify-content-center search  bg-light text-dark bg-dark-el">
                        <a v-if="hide_clear_filters" class="close" href="javascript:void(0);" aria-label="Close" @click="clearFilters()">
                            <span class="close-filters" aria-hidden="true">&times;</span>
                        </a>
                        <div class="col-5 col-md-3 col-lg-3 px-1 my-md-1 mb-1 mb-md-0">
                            <fieldset class="form-group d-flex align-items-center justify-content-center flex-column">
                                <label for="countrys"></label>
                                <select v-model="selectedCountry" id="countrys" class="form-control cursor" @click="selectCountry()">
                                    <option value="">{{ this.translate('all_country') }}</option>
                                    <option v-for="array in filterCountrys" :value="array.country">{{ array.country }}</option>
                                </select>
                            </fieldset>
                        </div>
                        <div class="col-2 d-block d-md-none col-md-1 col-lg-1 my-md-1 mb-1 mb-md-0 px-0">
                            <button v-if="sortItem" @click="sortItem = !sortItem" class="btn w-100 p-0"><i class='fas fa-sort-amount-down-alt text-white' style='font-size:24px'></i></button>
                            <button v-else          @click="sortItem = !sortItem"  class="btn w-100 p-0"><i class='fas fa-sort-amount-down text-white' style='font-size:24px'></i></button>
                        </div>
                        <div class="col-5 d-block d-md-none px-1 my-md-1 mb-1 mb-md-0">
                            <fieldset class="form-group d-flex align-items-center justify-content-center flex-column">
                                <label for="counts"></label>
                                <select v-model="perPage" id="counts" class="form-control cursor">
                                    <option :value="8">{{ this.translate('count_per_page') }} 8</option>
                                    <option :value="12">{{ this.translate('count_per_page') }} 12</option>
                                    <option :value="16">{{ this.translate('count_per_page') }} 16</option>
                                    <option :value="20">{{ this.translate('count_per_page') }} 20</option>
                                </select>
                            </fieldset>
                        </div>
                        <div class="col-6 col-md-3 col-lg-3 my-md-1 px-1">
                            <fieldset class="form-group d-flex align-items-center justify-content-center flex-column">
                                <label for="min"></label>
                                <input v-model.number="min" id="min" class="form-control" type="text" :placeholder="this.translate('price_from')"/>
                            </fieldset>
                        </div>
                        <div class="col-6 col-md-3 col-lg-3 my-md-1 px-1">
                            <fieldset class="form-group d-flex align-items-center justify-content-center flex-column">
                                <label for="max"></label>
                                <input v-model.number="max" id="max" class="form-control" type="text" :placeholder="this.translate('price_to')"/>
                            </fieldset>
                        </div>
                        
                        <div class="d-none d-md-block col-md-2 col-lg-2 px-1  my-md-1 mb-1 mb-md-0">
                            <fieldset class="form-group d-flex align-items-center justify-content-center flex-column">
                                <label for="count"></label>
                                <select v-model="perPage" id="count" class="form-control cursor">
                                    <option :value="8">{{ this.translate('count_per_page') }} 8</option>
                                    <option :value="12">{{ this.translate('count_per_page') }} 12</option>
                                    <option :value="16">{{ this.translate('count_per_page') }} 16</option>
                                    <option :value="20">{{ this.translate('count_per_page') }} 20</option>
                                </select>
                            </fieldset>
                        </div>
                        <div class="d-none d-md-block col-md-1 col-lg-1 my-md-1 mb-1 mb-md-0 px-0">
                            <button v-if="sortItem" @click="sortItem = !sortItem" class="btn w-100 p-0"><i class='fas fa-sort-amount-down-alt text-white' style='font-size:24px'></i></button>
                            <button v-else          @click="sortItem = !sortItem"  class="btn w-100 p-0"><i class='fas fa-sort-amount-down text-white' style='font-size:24px'></i></button>
                        </div>
                    </div>
                   
                    <div class="row px-3 p-sm-0  p-2 d-flex align-items-center justify-content-center search">
                        <div v-for="(arr, index) in dataProduct" :key="arr.id" :id="arr.id" :data-index="index + 1"
                             class="col-12 col-sm-6 col-md-4 col-lg-3 p-0">
                            <div class="card m-1 bg-dark-el">
                                <picture class="scale">
                                    <img :src="arr.image" loading="lazy" @click="toggleModal(arr)" :id="'product_' + arr.id" class="card-img-top" :alt="arr.country">
                                </picture>
                                <div class="card-body">
                                            <span v-for="n in 5" :key="n">
                                               <i class="fas fa-star" style="font-size:12px"
                                                  :class="{'rating-active': checkRating(n, arr)}"></i>
                                           </span>
                                    <div class="heart bg-dark-el">
                                        <i @click="addToFavoriteProduct(arr, $event, arr.id)" :data-id="arr.id" class='favorite_item far fa-heart'></i>
                                    </div>
                                    <div class="row">
                                        <p class="col-6 text-start card-text m-0"><b>{{ arr.country }}</b></p>
                                        <p class="col-6 text-end card-text m-0"><b>{{ arr.location }}</b></p>
                                    </div>
                                    <div class="row">
                                        <p class="col-7 col-md-8 text-start m-0"><b>{{ arr.price }}$ / {{ this.translate('per_week') }} </b></p>
                                        <p class="col-5 col-md-4 text-end m-0">
                                            <img :src="arr.flag" class="card-img-top flag" :alt="arr.country">
                                        </p>
                                    </div>
                                    <div class="row">
                                        <button
                                        @click="addToCartProduct(arr, $event)"
                                        :data-id="arr.id" class="btn btn-light btn-sm addToCartItem addToCartBtn mt-2">{{ this.translate('book_tour') }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
               <component-modal
                    :modal="modal"
                    :productModal="productModal"
                    v-on:toggle_modal="toggleModal($event)">
               </component-modal>
              <nav class="nav flex">
                    <ul class="pagination mt-3 mb-0">
                        <li class="page-item">
                            <button type="button" id="previous" class="page-link bg-dark-el" @click="back()" disabled> {{ this.translate('prev') }} </button>
                        </li>
                        <li class="page-item" v-for="pageNumber in pages" :key="pageNumber" >
                            <button type="button" class="page-link item bg-dark-el" :data-pagenumber="pageNumber" :data-page="page" @click="currentPage(pageNumber)"> {{ pageNumber }} </button>
                        </li>
                        <li class="page-item">
                            <button type="button" id="next" @click="next()" class="page-link bg-dark-el"> {{ this.translate('next') }} </button>
                        </li>
                    </ul>
              </nav>
              <transition name="fade">
                   <keep-alive v-if="currentTabComponent">
                       <component :is="currentTabComponent"></component>
                   </keep-alive>
               </transition>
         </div>`
}
