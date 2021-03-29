import {currentTabs, translate} from "../mixin.js"

export const ComponentContacts = {
    name: 'ComponentContacts',
    components: {},
    mixins: [currentTabs, translate],
    props: {},
    emits: {},
    data() {
        return {
            translates: {
                Contact_information: [
                    `<h3 class="contacts-title"> Contact information: </h3>
                      <div class="row">
                           <span class="col-12 col-sm-6"> Address: </span>
                           <span class="col-12 col-sm-6"> c. Lviv, street Green, 5 </span>
                        </div>
                      <div class="row">
                           <span class="col-12 col-sm-6"> Call center phone: </span>
                           <span class="col-12 col-sm-6"> <a href="tel:0800000000"> 0 800 00 00 00 </a> </span>
                        </div>
                      <div class="row">
                           <span class="col-12 col-sm-6"> Call us: </span>
                           <span class="col-12 col-sm-6"> Mon - Fri: 9:00 - 18:00 </span>
                        </div>
                       <div class="row">
                           <span class="col-12 col-sm-6"> Sales Department: </span>
                           <span class="col-12 col-sm-6"> <a href="javascript:void(0);"> sale@tour.ua </a> </span>
                        </div>
                       <div class="row">
                           <span class="col-12 col-sm-6"> Phone: </span>
                           <span class="col-12 col-sm-6"> <a href="tel:0322267384"> 032 226 73 84 </a> </span>
                        </div>
                       <div class="row">
                           <span class="col-12 col-sm-6"> Technical Support: </span>
                           <span class="col-12 col-sm-6"> <a href="javascript:void(0);"> tech@tour.ua </a> </span>
                        </div>`,
                    `<h3 class="contacts-title">Контактна інформація:</h3>
                      <div class="row">
                           <span class="col-12 col-sm-6">Адреса:</span>
                           <span class="col-12 col-sm-6">м. Львів, вул. Зелена, 5</span>
                        </div>
                      <div class="row">
                           <span class="col-12 col-sm-6">Телефон колл-центру:</span>
                           <span class="col-12 col-sm-6"><a href="tel:0800000000">0 800 00 00 00</a></span>
                        </div>
                      <div class="row">
                           <span class="col-12 col-sm-6">Телефонуйте нам:</span>
                           <span class="col-12 col-sm-6">Пн - Пт: 9:00 - 18:00</span>
                        </div>
                       <div class="row">
                           <span class="col-12 col-sm-6">Відділ продажу:</span>
                           <span class="col-12 col-sm-6"><a href="javascript:void(0);">sale@tour.ua</a></span>
                        </div>
                       <div class="row">
                           <span class="col-12 col-sm-6">Телефон:</span>
                           <span class="col-12 col-sm-6"><a href="tel:0322267384">032 226 73 84</a></span>
                        </div>
                       <div class="row">
                           <span class="col-12 col-sm-6">Відділ технічної підтримки:</span>
                           <span class="col-12 col-sm-6"><a href="javascript:void(0);">tech@tour.ua</a></span>
                        </div>`,
                    `<h3 class="contacts-title"> Контактная информация: </h3>
                      <div class="row">
                           <span class="col-12 col-sm-6"> Адрес:</span>
                           <span class="col-12 col-sm-6"> г. Львов, ул. Зеленая, 5</span>
                        </div>
                      <div class="row">
                           <span class="col-12 col-sm-6"> Телефон колл-центра:</span>
                           <span class="col-12 col-sm-6"> <a href="tel:0800000000"> 0800 00 00 00 </a></span>
                        </div>
                      <div class="row">
                           <span class="col-12 col-sm-6"> Звоните нам:</span>
                           <span class="col-12 col-sm-6"> Пн - Пт: 9:00 - 18:00</span>
                        </div>
                       <div class="row">
                           <span class="col-12 col-sm-6"> Отдел продаж:</span>
                           <span class="col-12 col-sm-6"> <a href="javascript:void(0);"> sale@tour.ua </a></span>
                        </div>
                       <div class="row">
                           <span class="col-12 col-sm-6"> Телефон:</span>
                           <span class="col-12 col-sm-6"> <a href="tel:0322267384"> 032226 73 84 </a></span>
                        </div>
                       <div class="row">
                           <span class="col-12 col-sm-6"> Отдел технической поддержки:</span>
                           <span class="col-12 col-sm-6"> <a href="javascript:void(0);"> tech@tour.ua </a></span>
                        </div>`],
                Department: [
                    `<h3 class="contacts-title"> Office: </h3>
                      <div class="row">
                          <span class="col-12 col-sm-6"> c. Kyiv street Shevchenko 234 </span>
                          <span class="col-12 col-sm-6"> <a href="tel:0500000000"> 050 000 00 00 </a> </span>
                      </div>
                      <div class="row">
                          <span class="col-12 col-sm-6"> c. Lviv street Green, 5 </span>
                          <span class="col-12 col-sm-6"> <a href="tel:0500000000"> 050 000 00 00 </a> </span>
                      </div>
                      <div class="row">
                          <span class="col-12 col-sm-6"> c. Uzhhorod street Kapushanska 56 </span>
                          <span class="col-12 col-sm-6"> <a href="tel:0500000000"> 050 000 00 00 </a> </span>
                      </div>
                      <div class="row">
                          <span class="col-12 col-sm-6"> c. Vinnytsia street Danila 58 </span>
                          <span class="col-12 col-sm-6"> <a href="tel:0500000000"> 050 000 00 00 </a> </span>
                      </div>
                      <div class="row">
                          <span class="col-12 col-sm-6"> c. Odessa street Tchaikovsky 352 </span>
                          <span class="col-12 col-sm-6"> <a href="tel:0500000000"> 050 000 00 00 </a> </span>
                      </div>
                      <div class="row">
                          <span class="col-12 col-sm-6"> c. Kharkiv street Mazepi 34 </span>
                          <span class="col-12 col-sm-6"> <a href="tel:0500000000"> 050 000 00 00 </a> </span>
                      </div>`,
                    `<h3 class="contacts-title">Відділення:</h3>
                       <div class="row">
                           <span class="col-12 col-sm-6">м. Київ вул. Шевченка 234</span>
                           <span class="col-12 col-sm-6"><a href="tel:0500000000">050 000 00 00</a></span>
                        </div>
                       <div class="row">
                           <span class="col-12 col-sm-6">м. Львів вул. Зелена, 5</span>
                           <span class="col-12 col-sm-6"><a href="tel:0500000000">050 000 00 00</a></span>
                        </div>
                       <div class="row">
                           <span class="col-12 col-sm-6">м. Ужгород вул. Капушанська 56</span>
                           <span class="col-12 col-sm-6"><a href="tel:0500000000">050 000 00 00</a></span>
                        </div>
                       <div class="row">
                           <span class="col-12 col-sm-6">м. Вінниця вул. Данила 58</span>
                           <span class="col-12 col-sm-6"><a href="tel:0500000000">050 000 00 00</a></span>
                        </div>
                       <div class="row">
                           <span class="col-12 col-sm-6">м. Одеса вул. Чайковського 352</span>
                           <span class="col-12 col-sm-6"><a href="tel:0500000000">050 000 00 00</a></span>
                        </div>
                       <div class="row">
                           <span class="col-12 col-sm-6">м. Харків вул. Мазепи 34</span>
                           <span class="col-12 col-sm-6"><a href="tel:0500000000">050 000 00 00</a></span>
                        </div>`,
                    `<h3 class="contacts-title">Отделения</h3>
                       <div class="row">
                           <span class="col-12 col-sm-6"> г. Киев ул. Шевченко 234</span>
                           <span class="col-12 col-sm-6"> <a href="tel:0500000000"> 050000 00 00 </a></span>
                       </div>
                       <div class="row">
                           <span class="col-12 col-sm-6"> г. Львов ул. Зеленая, 5</span>
                           <span class="col-12 col-sm-6"> <a href="tel:0500000000"> 050000 00 00 </a></span>
                       </div>
                      <div class="row">
                           <span class="col-12 col-sm-6"> г. Ужгород ул. Капушанская 56</span>
                           <span class="col-12 col-sm-6"> <a href="tel:0500000000"> 050000 00 00 </a></span>
                       </div>
                      <div class="row">
                           <span class="col-12 col-sm-6"> г. Винница ул. Даниила 58</span>
                           <span class="col-12 col-sm-6"> <a href="tel:0500000000"> 050000 00 00 </a></span>
                       </div>
                      <div class="row">
                           <span class="col-12 col-sm-6"> г. Одесса ул. Чайковского 352</span>
                           <span class="col-12 col-sm-6"> <a href="tel:0500000000"> 050000 00 00 </a></span>
                       </div>
                      <div class="row">
                           <span class="col-12 col-sm-6"> г. Харьков ул. Мазепы 34</span>
                           <span class="col-12 col-sm-6"> <a href="tel:0500000000"> 050000 00 00 </a></span>
                       </div>`],
                Services: [
                    `<h3 class="contacts-title">Services:</h3>
                   <p>Tour selection, Promotions and special offers, Visas and passports, Preparation and issuance of documents, Hotel selection, Insurance and transfer</p>`,
                    `<h3 class="contacts-title">Послуги:</h3>
                   <p>Підбір турів, Акції та спеціальні пропозиції, Візи та паспорта, Підготовка та видача документів, Вибір готелів, Страхування та трансфер</p>`,
                    `<h3 class="contacts-title">Услуги:</h3>
                   <P>Подбор туров, Акции и специальные предложения, Визы и паспорта, Подготовка и выдача документов, Выбор отелей, Страхование и трансфер</p>`],
            }
        }
    },
    computed: {},
    watch: {},
    created() {
    },
    mounted() {
    },
    methods: {},
    template: `<div class="container tab-contacts">
                    <div class="row d-flex justify-content-end"><button type="button" @click="currentTabs()" class="btn-close m-3"></button></div>
                       <div class="row">
                        <div v-html="this.translate('Contact_information')" class="col-12 col-lg-6"></div>
                        <div v-html="this.translate('Department')" class="col-12 col-lg-6 mt-5 mt-lg-0"></div>
                        <div v-html="this.translate('Services')" class="col-12 mt-5"></div>
                    </div>
                </div>`
}
