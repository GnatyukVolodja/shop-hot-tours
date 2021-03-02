import { ComponentModal } from './modal.js';

export const ComponentContent = {    name: 'ComponentContent',
    components: {
        ComponentModal
    },
    props: {
        add_new_item: {
            type: Array,
            required: true
        },
        content: {
            type: Boolean,
            required: true
        }
    },
    data() {
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

            page: 1,
            perPage: 8,
            pages: [],
        }
    },
    watch: {
        perPage: function (i) {
            console.log('watch', i)
            document.querySelectorAll('.page-link')[1].click()
        }
    },
    computed: {
        searchItems() {
            return store.state.searchItem
        },
        dataProduct() {
            this.searchCountry = this.searchItems.country
            this.searchLocation = this.searchItems.location
            if (this.searchCountry && this.searchLocation) {
                function filterByCity(arr, city, location) {
                    return arr.filter(function (item) {
                        if (item.country.includes(city) && item.location.includes(location)) {
                            return item
                        }
                    })
                }

                this.data = filterByCity(this.originData, this.searchCountry, this.searchLocation)
                return this.setPages(this.data)
            } else if (this.searchCountry || this.searchLocation) {
                function filterByCity(arr, city, location) {
                    return arr.filter(function (item) {
                        if (item.country.includes(city) || item.location.includes(location)) {
                            return item
                        }
                    })
                }

                this.data = filterByCity(this.originData, this.searchCountry, this.searchLocation)
                return this.setPages(this.data)
            }
            if (this.content) {
                this.getDataFromLocal()
            }
            if (this.add_new_item.length > 0) {
                this.originData.push(this.add_new_item)
                this.originData = this.originData.flat(Infinity)
                this.data = this.originData
                this.clearFilters()
                return this.setPages(this.originData)
            }
            if (this.selectedCountry.length > 0) {
                this.data = this.originData
                this.hide_clear_filters = true
                this.set_min_max(this.countrys)
                return this.setPages(this.countrys)
            }
            if (this.min === '' && this.max === '' && this.selectedCountry === '') {
                this.hide_clear_filters = false
                this.data = this.originData
                this.countrys = []
                this.filterProduct = []
                return this.setPages(this.originData)
            } else {
                this.data = this.originData
                this.hide_clear_filters = true
                let filterProduct = []
                const sortArray = this.data.map(num => {
                    if (num.price >= this.min && num.price <= this.max) return num
                })
                for (let i = 0; i < sortArray.length; i++) {
                    if (sortArray[i]) {
                        filterProduct.push(sortArray[i])
                    }
                }
                this.filterProduct = filterProduct
                return this.setPages(this.filterProduct)
            }
        }
    },
    methods: {
        back() {
            this.page--
            if (this.page === 1) {
                document.getElementById('previous').setAttribute('disabled', 'disabled')
            } else {
                document.getElementById('previous').removeAttribute('disabled')
            }
            document.getElementById('next').removeAttribute('disabled')
            this.activePage()
        },
        next() {
            this.page++
            if (this.page === this.pages.length) {
                document.getElementById('next').setAttribute('disabled', 'disabled')
            } else {
                document.getElementById('next').removeAttribute('disabled')
            }
            document.getElementById('previous').removeAttribute('disabled')
            this.activePage()
        },
        currentPage(pageNumber) {
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
        activePage() {
            document.querySelectorAll('.item').forEach((el) => {
                el.classList.remove('active')
                if (+el.getAttribute('data-pagenumber') === +this.page) {
                    el.classList.add('active')
                }
            })
        },
        setPages(data) {
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
        toggleModal(product) {
            if (product) {
                this.modal = true
                this.productModal.push(product)
            } else if (!product) {
                this.productModal = []
                this.modal = false
            }

        },
        clearFilters() {
            this.min = ''
            this.max = ''
            this.hide_clear_filters = false
            this.selectedCountry = ''
            this.data = this.originData
            this.countrys = []
            this.filterProduct = []
        },
        set_min_max(min_max) {
            let n = []
            min_max.forEach((e) => {
                n.push(e.price)
            })
            this.min = Math.min(...n)
            this.max = Math.max(...n)
        },
        selectCountry() {
            this.countrys = []
            this.filterCountrys = this.data.reduce((acc, cur) => [...acc.filter((obj) => obj.country !== cur.country), cur], [])
            this.data.filter((item) => {
                if (item.country === this.selectedCountry) {
                    this.countrys.push(item)
                }
            })
        },
        checkRating(n, product) {
            return product.rating - n >= 0
        },
        getDataJson() {
            axios.get('./data.json')
                .then((response) => {
                    this.data = response.data
                    this.originData = response.data
                    this.set_min_max(response.data)
                    this.selectCountry()
                    this.setPages(this.data)
                    setTimeout(() => this.spinner = false, 1000)
                })
                .catch(() => {
                })
                .then(() => {
                })
        },
        addToFavoriteProduct(product, e) {
            let el = e.target
            // setItemFavorite
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
        addToCartProduct(product, e) {
            // document.querySelectorAll('.addToCartItem ').forEach(el => el.classList.remove('btn-success'))
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
        getDataFromLocal() {
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
    mounted() {
        this.getDataJson()
    },
    template: `<div v-if="content" class="container main">
                    <div v-show="spinner" class="spinner flex">
                        <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                    </div>
                    <div class="row py-1 px-1 my-1 d-flex align-items-center justify-content-center search  bg-light text-dark bg-dark-el">
                   
                        <div class="col-6 col-md-3 col-lg-3 mb-1 px-1">
                            <fieldset class="form-group d-flex align-items-center justify-content-center flex-column mt-4">
                                <label for="country" class="mx-0 mb-1"></label>
                                <select v-model="selectedCountry" id="country" class="form-control" @click="selectCountry()">
                                    <option disabled value="">country</option>
                                    <option v-for="array in filterCountrys" :value="array.country">{{ array.country }}</option>
                                </select>
                            </fieldset>
                        </div>
                        <div class="col-6 d-block d-md-none mb-1 px-1">
                            <fieldset class="form-group d-flex align-items-center justify-content-center flex-column  mt-4">
                                <label for="count" class="mx-0 mb-1"></label>
                                <select v-model="perPage" id="count" class="form-control">
                                    <option disabled value="8">count per page</option>
                                    <option :value="8">8</option>
                                    <option :value="12">12</option>
                                    <option :value="16">16</option>
                                    <option :value="20">20</option>
                                </select>
                            </fieldset>
                        </div>
                        <div class="col-6 col-md-3 col-lg-3 mb-1 px-1">
                            <fieldset class="form-group d-flex align-items-center justify-content-center flex-column">
                                <label for="min" class="mx-0 mb-1">min price</label>
                                <input v-model.number="min" id="min" class="form-control" type="text" placeholder="Price from (USD)"/>
                            </fieldset>
                        </div>
                        <div class="col-6 col-md-3 col-lg-3 mb-1 px-1">
                            <fieldset class="form-group d-flex align-items-center justify-content-center flex-column">
                                <label for="max" class="mx-0 mb-1">max price</label>
                                <input v-model.number="max" id="max" class="form-control" type="text" placeholder="Price to (USD)"/>
                            </fieldset>
                        </div>
                        
                        <div class="d-none d-md-block col-md-3 col-lg-3 mb-1 px-1">
                            <fieldset class="form-group d-flex align-items-center justify-content-center flex-column  mt-4">
                                <label for="count" class="mx-0 mb-1"></label>
                                <select v-model="perPage" id="count" class="form-control">
                                    <option disabled value="8">count per page</option>
                                    <option :value="8">8</option>
                                    <option :value="12">12</option>
                                    <option :value="16">16</option>
                                    <option :value="20">20</option>
                                </select>
                            </fieldset>
                        </div>
                        
                        
                            <a v-if="hide_clear_filters"
                               class="close close-filters col-3 p-0 flex"
                               href="javascript:void(0);" aria-label="Close" @click="clearFilters()">
                                <span class="clear-filters mx-2">clear filters</span><span class="mx-2" aria-hidden="true">&times;</span>
                            </a>
                    </div>
                   
                    <div class="row px-3 p-sm-0  p-2 d-flex align-items-center justify-content-center search">
                        <div v-for="(arr, index) in dataProduct" :key="arr.id" :id="arr.id" :data-index="index + 1"
                             class="col-12 col-sm-6 col-md-4 col-lg-3 p-0">
                            <div class="card m-1 bg-dark-el">
                                <div class="scale">
                                    <img :src="arr.image" @click="toggleModal(arr)" :id="'product_' + arr.id" class="card-img-top" :alt="arr.country">
                                </div>
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
                                        <p class="col-7 col-md-8 text-start m-0"><b>{{ arr.price }}$ / per week</b></p>
                                        <p class="col-5 col-md-4 text-end m-0">
                                            <img :src="arr.flag" class="card-img-top flag" :alt="arr.country">
                                        </p>
                                    </div>
                                    <div class="row">
                                        <button
                                        @click="addToCartProduct(arr, $event)"
                                        :data-id="arr.id" class="btn btn-light btn-sm addToCartItem addToCartBtn mt-2">book a tour
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
                            <button type="button" id="previous" class="page-link bg-dark-el" @click="back()" disabled> Back </button>
                        </li>
                        <li class="page-item" v-for="pageNumber in pages" :key="pageNumber" >
                            <button type="button" class="page-link item bg-dark-el" :data-pagenumber="pageNumber" :data-page="page" @click="currentPage(pageNumber)"> {{pageNumber}} </button>
                        </li>
                        <li class="page-item">
                            <button type="button" id="next" @click="next()" class="page-link bg-dark-el"> Next </button>
                        </li>
                    </ul>
              </nav>
         </div>`
}
