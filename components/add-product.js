import {translate} from "./mixin.js";

export const ComponentAddProduct = {
  name: 'ComponentAddProduct',
  props: {
    addProduct: {
      type: Boolean,
      required: true
    }
  },
  emits: {
    show_component: null,
    add_new_product: null
  },
  data () {
    return {
      location: '',
      description: '',
      image: null,
      flag: null,
      country: '',
      rating: 0,
      price: 0,
      id: 0,
      translates: {
        add_tour: ['Add tour', 'Додати тур', 'Добавить тур'],
        add_tours: ['ADD TOUR', 'ДОДАТИ ТУР', 'ДОБАВИТЬ ТУР'],
        book_tour: ['book a tour', 'замовити тур', 'заказать тур'],
        country: ['COUNTRY', 'КРАЇНА', 'СТРАНА'],
        pl_country: ['country', 'країна', 'страна'],
        city: ['CITY', 'МІСТО', 'ГОРОД'],
        pl_city: ['city', 'місто', 'город'],
        description: ['DESCRIPTION', 'ОПИС', 'ОПИСАНИЕ'],
        pl_description: ['description', 'опис', 'описание'],
        photo: ['PHOTO', 'ФОТО', 'ФОТО'],
        flag: ['FLAG', 'ПРАПОР', 'ФЛАГ'],
        rating: ['RATING', 'РЕЙТИНГ', 'РЕЙТИНГ'],
        price: ['PRICE', 'ЦІНА', 'ЦЕНА'],
      }
    }
  },
  watch: {},
  computed: {},
  mixins: [translate],
  methods: {
    onSubmit () {
      axios({
        method: 'post',
        url: '/',
        data: {
          id: Date.now(),
          location: this.location[0].toUpperCase() + this.location.slice(1),
          country: this.country[0].toUpperCase() + this.country.slice(1),
          image: document.getElementById('Photo').value,
          flag: document.getElementById('Flag').value,
          description: this.description,
          price: this.price,
          rating: this.rating
        }
      }).then(function (response) {
      }).catch(function (error) {
      })
      if (this.location === '' || this.description === '' || this.country === '' || this.rating === 0 || this.price === 0) {
        [...document.querySelectorAll('.validate')].forEach(function (el) {
          if (el.value === '' || el.value == 0) {
            el.classList.add('border', 'border-danger')
          } else {
            el.classList.remove('border', 'border-danger')
          }
        })
      } else {
        let product = {
          id: Date.now(),
          location: this.location[0].toUpperCase() + this.location.slice(1),
          country: this.country[0].toUpperCase() + this.country.slice(1),
          image: document.getElementById('Photo').value,
          flag: document.getElementById('Flag').value,
          description: this.description,
          price: this.price,
          rating: this.rating
        }
        this.$emit('add_new_product', product)
        this.location = ''
        this.country = ''
        this.description = ''
        this.price = 0
        this.rating = 0
      }
    }
  },
  template: `<div v-if="addProduct" class="add-product">
                   <div class="container pt-3">
                   <div class="row bg-light text-dark mx-1 mx-sm-0 py-3 bg-dark-el">
                       <h4 class="text-center">{{ this.translate('add_tour') }}</h4>
                       <button type="button" @click="$emit('show_component', $event)" class="btn-close close-comp-add-prod"></button>
                       <div class="col-12 col-sm-9 col-md-6 mx-auto">
                           <form  @submit.prevent="onSubmit">
                                <fieldset class="form-group">
                                    <label for="Country"><b>{{ this.translate('country') }}</b></label>
                                    <input
                                        v-model.trim="country"
                                        id="Country"
                                        minlength="3"
                                        class="form-control form-control-sm validate"
                                        type="text"
                                        name="country"
                                        :placeholder="this.translate('pl_country')"
                                        required/>
                                        <span class="validity"></span>
                                </fieldset>
                                <fieldset class="form-group">
                                    <label for="Location"><b>{{ this.translate('city') }}</b></label>
                                    <input
                                        v-model.trim="location"
                                        id="Location"
                                        minlength="3"
                                        class="form-control form-control-sm validate"
                                        type="text"
                                        name="location"
                                        :placeholder="this.translate('pl_city')"
                                        required/>
                                        <span class="validity"></span>
                                </fieldset>
                                <fieldset class="form-group">
                                    <label for="Description"><b>{{ this.translate('description') }}</b></label>
                                    <textarea
                                        v-model.trim="description"
                                        id="Description"
                                        class="form-control validate"
                                        rows="2"
                                        name="description"
                                        :placeholder="this.translate('pl_description')"
                                        required>
                                    </textarea>
                                </fieldset>
                                <fieldset class="form-group flex">
                                    <div class="col-6 pe-2">
                                        <label for="Photo"><b>{{ this.translate('photo') }}</b></label>
                                        <input
                                            id="Photo"
                                            class="form-control  form-control-sm"
                                            type="file"
                                            name="photo"/>
                                    </div>
                                    <div class="col-6 ps-2">
                                        <label for="Flag"><b>{{ this.translate('flag') }}</b></label>
                                        <input
                                            id="Flag"
                                            class="form-control  form-control-sm"
                                            type="file"
                                            name="flag"/>
                                     </div>
                                </fieldset>
                                <fieldset class="form-group flex">
                                    <div class="col-6 pe-2 rating">
                                        <label for="Rating"><b>{{ this.translate('rating') }}</b></label>
                                        <input
                                            v-model.number.trim="rating"
                                            id="Rating"
                                            pattern="[1-5]{1}"
                                            maxlength="1"
                                            class="form-control  form-control-sm validate"
                                            type="text"
                                            :placeholder="this.translate('rating')"
                                            name="rating"
                                            required/>
                                            <span class="validity"></span>
                                    </div>
                                    <div class="col-6 ps-2 price">
                                        <label for="Price"><b>{{ this.translate('price') }}</b></label>
                                        <input
                                            v-model.number.trim="price"
                                            id="Price"
                                            pattern="[1-9]{3}"
                                            maxlength="4"
                                            class="form-control  form-control-sm validate"
                                            type="text"
                                            :placeholder="this.translate('price')"
                                            name="price"
                                            required/>
                                            <span class="validity"></span>
                                    </div>
                                </fieldset>
                                <button type="submit" class="btn btn-success w-75 mx-auto d-block my-3">{{ this.translate('add_tours') }}</button>
                           </form>
                      </div>
                  </div>
                  </div>
              </div>`
}


