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
            total_price: '',
            toggle_component: true,
            translates: {
                tr_count_nights: ['Count nights', 'Кількість ночей', 'Количество ночей'],
                tr_count_persons: ['Count persons', 'Кількість людей', 'Количество людей'],
                tr_count_days: ['Count days', 'Кількість днів', 'Количество дней'],
                per_week: ['week', 'тиждень', 'неделя'],
                tr_period: ['Period', 'Період', 'Период'],
                total_sum: ['Total sum', 'Загальна сума', 'Общая сума'],
                confirm_registration: ['Confirm registration', 'Підтвердити реєстрацію', 'Подтвердить регистрацию'],
                completed: ['Your tour has been completed, we will contact you shortly.', "Ваш тур оформлено, ми зв'яжемося з Вами найближчим часом.", "Ваш тур оформлен, мы свяжемся с Вами в ближайшее время."],
                thank: ['Thank.', "Дякуємо.", "Спасибо."],
            }
        };
    },
    computed: {
        isLang() {
            return store.state.language
        }
    },
    methods: {
        translate(phrase) {
            if (this.isLang === 'EN') {
                return this.translates[phrase][0]
            } else if (this.isLang === 'UA') {
                return this.translates[phrase][1]
            } else if (this.isLang === 'RU') {
                return this.translates[phrase][2]
            }
        },
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
            this.toggle_component = false
            setTimeout(()=> this.$emit('cart_count_info', total), 5000)
        }
    },
    mounted() {
        this.picker()
    },
    template: `<div v-if="toggle_component" class="relative p-0">
                    <div class="datepicker demo__item absolute bg-dark-el">
                        <div class="demo__input mt-2">
                            <div class="row d-flex align-items-center justify-content-between">
                                <span class="col-12 count-night bg-dark-el">
                                    <label for="title" class="ms-3"><b>{{ this.translate('tr_count_nights') }}</b></label>
                                    <input type="text" v-model="period" @change="totalCount()" @click="count()" id='datepicker'>
                                </span>
                                <span class="col-12 col-sm-6 count-person bg-dark-el">
                                    <label for="title" class="ms-3"><b>{{ this.translate('tr_count_persons') }}</b></label>
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
                          <b>{{ price }}$ / {{ this.translate('per_week') }}</b>
                      </div>
                    </div>
                    <div class="row">
                       <b class="text-center">{{ this.translate('tr_period') }}: {{ period }}</b>
                     </div>
                    <div class="row">
                       <b class="col-12 col-sm-4 text-center">{{ this.translate('tr_count_nights') }}: {{ count_night }}</b>
                       <b class="col-12 col-sm-4 text-center">{{ this.translate('tr_count_days') }}: {{ count_days }}</b>
                       <b class="col-12 col-sm-4 text-center">{{ this.translate('tr_count_persons') }}: {{ count_person }}</b>
                     </div>
                     <div class="row">
                       <h5 class="text-center"><b>{{ this.translate('total_sum') }}: {{ total_price ? total_price + '$' : '' }}</b></h5>
                     </div>
                    <div class="row">
                        <div class="my-2 col-12 flex ">
                             <button type="button" :disabled="!count_person"  @click="checkout()" class="btn btn-sm  btn-success mb-3 mb-sm-0 d-block mx-auto">{{ this.translate('confirm_registration') }}</button>
                        </div>
                    </div>
                </div>
                <div v-else class="text-center mt-1 mt-sm-3 mt-xl-5">
                    <h2>{{ this.translate('completed') }} <br> {{ this.translate('thank') }}</h2>
                </div>`
}
