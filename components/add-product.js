const ComponentAddProduct = {
    name: 'ComponentAddProduct',
    props: {},
    data() {
        return {
            title: '',
            location: '',
            description: '',
            image: null,
            flag: null,
            country: '',
            rating: 0,
            price: 0,
            id: Date.now()
        }
    },
    methods: {
        ShowMainComponent() {
            this.$emit('show_main_component')
        },
        onSubmit() {
            axios({
                method: 'post',
                url: '/',
                data: {
                    id: this.id,
                    title: this.title,
                    location: this.location,
                    country: this.country,
                    image: document.getElementById('Photo').value,
                    flag: document.getElementById('Flag').value,
                    description: this.description,
                    price: this.price,
                    rating: this.rating
                }
            }).then(function (response) {
            }).catch(function (error) {
            })
            if (this.title === '' || this.location === '' || this.description === '' || this.country === '' || this.rating === 0 || this.price === 0) {
                [...document.querySelectorAll('.validate')].forEach(function (el) {
                    if (el.value === '' || el.value == 0) {
                        el.classList.add('border', 'border-danger')
                    } else {
                        el.classList.remove('border', 'border-danger')
                    }
                })
            } else {
                let product = {
                    id: this.id,
                    title: this.title,
                    location: this.location,
                    country: this.country,
                    image: document.getElementById('Photo').value,
                    flag: document.getElementById('Flag').value,
                    description: this.description,
                    price: this.price,
                    rating: this.rating
                }
                this.$emit('add_new_product', product)
            }
        }
    },
    template: `<div class="container add-product ">
                   <div class="row bg-light text-dark mx-1 mx-sm-0 py-3">
                       <h4 class="text-center">Add product</h4>
                       <button type="button" @click="ShowMainComponent()" class="btn-close close-comp-add-prod"></button>
                       <div class="col-12 col-sm-9 col-md-6 mx-auto">
                           <form  @submit.prevent="onSubmit">
                                <fieldset class="form-group">
                                    <label for="title"><b>TITLE</b></label>
                                    <input
                                        v-model.trim="title"
                                        id="title"
                                        class="form-control validate"
                                        type="text"
                                        name="title"
                                        placeholder="Title"/>
                                </fieldset>
                                <fieldset class="form-group">
                                    <label for="Location"><b>LOCATION</b></label>
                                    <input
                                        v-model.trim="location"
                                        id="Location"
                                        class="form-control validate"
                                        type="text"
                                        name="location"
                                        placeholder="Location"/>
                                </fieldset>
                                <fieldset class="form-group">
                                    <label for="Country"><b>COUNTRY</b></label>
                                    <input
                                        v-model.trim="country"
                                        id="Country"
                                        class="form-control validate"
                                        type="text"
                                        name="country"
                                        placeholder="Country"/>
                                </fieldset>
                                <fieldset class="form-group">
                                    <label for="Description"><b>DESCRIPTION</b></label>
                                    <textarea
                                        v-model.trim="description"
                                        id="Description"
                                        class="form-control validate"
                                        rows="8"
                                        name="description"
                                        placeholder="Description">
                                    </textarea>
                                </fieldset>
                                <fieldset class="form-group">
                                    <label for="Photo"><b>PHOTOS</b></label>
                                    <input
                                        id="Photo"
                                        class="form-control"
                                        type="file"
                                        name="photo"/>
                                </fieldset>
                                <fieldset class="form-group">
                                    <label for="Flag"><b>FLAG</b></label>
                                    <input
                                        id="Flag"
                                        class="form-control"
                                        type="file"
                                        name="flag"/>
                                </fieldset>
                                <fieldset class="form-group">
                                    <label for="Rating"><b>RATING</b></label>
                                    <input
                                        v-model.number.trim="rating"
                                        id="Rating"
                                        class="form-control validate"
                                        type="text"
                                        placeholder="Rating"
                                        name="rating"/>
                                </fieldset>
                                <fieldset class="form-group">
                                    <label for="Price"><b>PRICE</b></label>
                                    <input
                                        v-model.number.trim="price"
                                        id="Price"
                                        class="form-control validate"
                                        type="text"
                                        placeholder="Price"
                                        name="price"/>
                                </fieldset>
                                <button type="submit" class="btn btn-success w-75 mx-auto d-block mt-3">ADD PRODUCT</button>
                           </form>
                      </div>
                  </div>
              </div>`
}
