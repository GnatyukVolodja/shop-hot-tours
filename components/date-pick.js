export const ComponentDatePick = {
    name: 'ComponentDatePick',
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            country: this.item.country,
            location: this.item.location,
            price: this.item.price,
            period: '',
            count_night: '',
            count_days: '',
            count_person: '',
            total_price: ''
        };
    },
    methods: {
        picker() {
            let input = document.getElementById('datepicker')
            let datepicker = new HotelDatepicker(input, {
                format: 'DD-MM-YYYY',
                minNights: 6,
                maxNights: 13,
                startOfWeek: 'monday'
            });
        },
        totalCount() {
            this.period = document.getElementById('datepicker').value
            let el = document.querySelectorAll('.datepicker__month-day.datepicker__month-day--visibleMonth.datepicker__month-day--valid.datepicker__month-day--selected').length
            if (el > 0) {
                this.count_night = el - 1
                this.count_days = el
            }
            this.total_price = (((this.item.price / 7 ) * this.count_days) * this.count_person).toFixed()
        },
        count() {
            this.period = ''
            this.count_night = ''
            this.count_days = ''
            this.count_person = ''
            this.total_price = ''
        },
        checkout() {
            const total = {
                'country': this.item.country,
                'location': this.item.location,
                'price': this.item.price,
                'count_night': this.count_night,
                'count_days': this.count_days,
                'period': this.period,
                'count_person': this.count_person,
                'total_price': this.total_price
            }
            this.$emit('cart_count_info', total)
        }
    },
    mounted() {
        this.picker()
    },
    template: `<div class="relative p-0">
                    <div class="datepicker demo__item absolute bg-dark-el">
                        <div class="demo__input mt-2">
                            <div class="row d-flex align-items-center justify-content-between">
                                <span class="col-12 count-night bg-dark-el">
                                    <label for="title" class="ms-3"><b>Count nights</b></label>
                                    <input type="text" v-model="period" @change="totalCount()" @click="count()" id='datepicker'>
                                </span>
                                <span class="col-12 col-sm-6 count-person bg-dark-el">
                                    <label for="title" class="ms-3"><b>Count person</b></label>
                                    <select  v-model="count_person" @change="totalCount()">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                    </select>
                                </span>
                            </div>
                        </div>
                        <div class="demo__config"></div>
                    </div>
                    <div class="row mt-4 mt-xl-4 pt-2 pt-xl-2">
                      <div class="col-12 py-3 py-sm-0 flex">
                          <b class="mx-1">{{ country }}</b>
                          <b class="mx-1">{{ location }}</b>
                          <b>{{ price }}$ / per week</b>
                      </div>
                    </div>
                    <div class="row">
                       <b class="text-center">Period: {{ period }}</b>
                     </div>
                    <div class="row">
                       <b class="col-12 col-sm-4 text-center">Count nights: {{ count_night }}</b>
                       <b class="col-12 col-sm-4 text-center">Count days: {{ count_days }}</b>
                       <b class="col-12 col-sm-4 text-center">Count person: {{ count_person }}</b>
                     </div>
                     <div class="row">
                       <h5 class="text-center"><b>Total sum: {{ total_price ? total_price + '$' : '' }}</b></h5>
                     </div>
                    <div class="row">
                        <div class="my-2 col-12 flex ">
                             <button type="button" :disabled="!count_person"  @click="checkout()" class="btn btn-sm  btn-success mb-3 mb-sm-0 d-block mx-auto">confirm shipment</button>
                        </div>
                    </div>
                </div>`
}
