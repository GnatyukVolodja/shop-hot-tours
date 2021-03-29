import {currentTabs, translate} from "../mixin.js"

export const ComponentAbout = {
    name: 'ComponentAbout',
    components: {},
    mixins: [currentTabs, translate],
    props: {},
    emits: {},
    data() {
        return {
            translates: {
                We: ['<strong> We </strong> is an international travel operator organizing tours for travelers from all over the CIS and Eastern Europe. We have been working since 1994.',
                    '<Strong> Ми </strong> - міжнародний туристичний оператор, який організовує тури для мандрівників з усіх, країн СНД і Східної Європи. Працюємо з 1994 року.',
                    '<strong>Мы</strong> — международный туристический оператор, организующий туры для путешественников из всех, стран СНГ и Восточной Европы. Работаем с 1994 года.'],
                Company_portfolio: ['The company"s portfolio includes more than 30 countries, such as: <a href="javascript:void(0);">Austria</a>, <a href="javascript:void(0);">Andorra</a>, <a href="javascript:void(0);">Belarus</a>, <a href="javascript:void(0);">Bulgaria</a>, <a href="javascript:void(0);">Hungary</a>, <a href="javascript:void(0);">Greece</a>, <a href="javascript:void(0);">Georgia</a>, <a href="javascript:void(0);">Dominican Republic</a>, <a href="javascript:void(0);">Egypt</a>, <a href="javascript:void(0);">Israel</a>, <a href="javascript:void(0);">Indonesia</a>, <a href="javascript:void(0);">Spain</a>, <a href="javascript:void(0);">Italy</a>, <a href="javascript:void(0);">China</a>, <a href="javascript:void(0);">Cyprus</a>, <a href="javascript:void(0);">Cuba</a>, <a href="javascript:void(0);">Latvia</a>, <a href="javascript:void(0);">Lithuania</a>, <a href="javascript:void(0);">Mauritius</a>, <a href="javascript:void(0);">Maldives</a>, <a href="javascript:void(0);">Mexico</a>, <a href="javascript:void(0);">UAE</a>, <a href="javascript:void(0);">Portugal</a>, <a href="javascript:void(0);">Russia</a>, <a href="javascript:void(0);">Seychelles</a>... ',
                    'Портфель компанії налічує більше 30 країн, таких напрямків, як: <a href="javascript:void(0);">Австрія</a>, <a href="javascript:void(0);">Андорра</a>, <a href="javascript:void(0);">Білорусь</a>, <a href="javascript:void(0);">Болгарія</a>, <a href="javascript:void(0);">Угорщина</a>, <a href="javascript:void(0);">Греція</a>, <a href="javascript:void(0);">Грузія</a>, <a href="javascript:void(0);">Домінікана</a>, <a href="javascript:void(0);">Єгипет</a>, <a href="javascript:void(0);">Ізраїль</a>, <a href="javascript:void(0);">Індонезія</a>, <a href="javascript:void(0);">Іспанія</a>, <a href="javascript:void(0);">Італія</a>, <a href="javascript:void(0);">Китай</a>, <a href="javascript:void(0);">Кіпр</a>, <a href="javascript:void(0);">Куба</a>, <a href="javascript:void(0);">Латвія</a>, <a href="javascript:void(0);">Литва</a>, <a href="javascript:void(0);">Маврикій</a>, <a href = "javascript:void(0); ">Мальдіви</a>, <a href="javascript:void(0);">Мексика</a>, <a href="javascript:void(0);">ОАЕ</a>, <a href="javascript:void(0);">Португалія</a>, <a href="javascript:void(0);">Росія</a>, <a href="javascript: void (0);">Сейшели</a>...',
                    'Портфель компании насчитывает более 30 стран, таких направлений, как: <a href="javascript:void(0);">Австрия</a>, <a href="javascript:void(0);">Андорра</a>, <a href="javascript:void(0);">Беларусь</a>, <a href="javascript:void(0);">Болгария</a>, <a href="javascript:void(0);">Венгрия</a>, <a href="javascript:void(0);">Греция</a>, <a href="javascript:void(0);">Грузия</a>, <a href="javascript:void(0);">Доминикана</a>, <a href="javascript:void(0);">Египет</a>, <a href="javascript:void(0);">Израиль</a>, <a href="javascript:void(0);">Индонезия</a>, <a href="javascript:void(0);">Испания</a>, <a href="javascript:void(0);">Италия</a>, <a href="javascript:void(0);">Китай</a>, <a href="javascript:void(0);">Кипр</a>, <a href="javascript:void(0);">Куба</a>, <a href="javascript:void(0);">Латвия</a>, <a href="javascript:void(0);">Литва</a>, <a href="javascript:void(0);">Маврикий</a>, <a href="javascript:void(0);">Мальдивы</a>, <a href="javascript:void(0);">Мексика</a>, <a href="javascript:void(0);">ОАЭ</a>, <a href="javascript:void(0);">Португалия</a>, <a href="javascript:void(0);">Россия</a>, <a href="javascript:void(0);">Сейшелы</a>...'],
                Cooperate_with_us: ['More than 20 international and national companies cooperating with us, working on sending and receiving tourists, allows the tour operator to provide quality services to tourists from Russia, Bulgaria, Romania, Ukraine, Latvia, Lithuania, Belarus, Estonia, Moldova and Kazakhstan.',
                    'З нами співпрацюють більш ніж 20 міжнародних і національних компаній, що працюють на відправку і прийом туристів, дозволяє туроператору якісно надавати послуги туристам з Росії, Болгарії, Румунії, України, Латвії, Литви, Білорусії, Естонії, Молдові та Казахстану.',
                    'С нами сотрудничают более чем 20 международных и национальных компаний, работающих на отправку и прием туристов, позволяет туроператору качественно предоставлять услуги туристам из России, Болгарии, Румынии, Украины, Латвии, Литвы, Белоруссии, Эстонии, Молдавии и Казахстана.'],
                Tour_operator_profile: [`<li>Tour operator profile - high quality customer service on the most popular destinations of foreign tourism. WE specialize in the provision of travel services represented in different market segments: mass tourism, corporate travel and group outing events, hotel and airline booking, children's recreation, as well as VIP tours.</li>
                                         <li>Package offers are formed on the basis of charter and regular flights of the world's leading airlines with a modern fleet. Among them are Aeroflot, iFly, S7 Airlines, Aegean Airlines, Ural Airways, Thai Airways, Emirates, Yakutia, Qatar Airways, Yamal, Air Baltic and others.</li>
                                         <li>In the hotel industry, the partners of the tour operator are leading hotel chains, including Marriott, Sheraton, Hilton, Jumeirah, Radisson, Aldemar, Grecotel, Le Meridien, Sol Melia, Princess, Hilton, Iberostar, Four Seasons, Ikos, etc.</li>
                                         <li>In all countries, clients are served by highly qualified employees with extensive experience in the tourism sector, who provide support for tourists on vacation and promptly resolve any issues.</li>
                                         <li>We have a well-deserved reputation as one of the most high-tech companies in the travel market. In 2019, the company launched an online aggregator of travel products and services for travel professionals. The service provides an opportunity to book flights, hotels, excursions and transfers around the world in one window, as well as dynamically combine all selected travel products into one tour. Today, more than 600 thousand hotels, villas and apartments around the world are available, air tickets for regular flights, low-cost airlines and charters, transfers, taxis, group and individual excursions in Russian, visas and car rental.</li>`,
                    `<li>Профіль туроператора - високоякісне обслуговування клієнтів на найпопулярніших напрямах зарубіжного туризму. МИ спеціалізується на наданні туристичних послуг, представлених в різних сегментах ринку: масовий туризм, корпоративні поїздки і групові виїзні заходи, бронювання готелів і авіаквитків, дитячий відпочинок, а також VIP-тури.</li>
                                         <li>Пакетні пропозиції сформовані на базі чартерних і регулярних рейсів провідних авіакомпаній світу з сучасним авіапарком. Серед них Aeroflot, iFly, S7 Airlines, Aegean Airlines, Ural Airways, Thai Airways, Emirates, Yakutia, Qatar Airways, Yamal, Air Baltic і інші.</li>
                                         <li>У готельної сфері партнери туроператора - провідні готельні мережі, серед них Marriott, Sheraton, Hilton, Jumeirah, Radisson, Aldemar, Grecotel, Le Meridien, Sol Melia, Princess, Hilton, Iberostar, Four Seasons, Ikos і ін.</li>
                                         <li>У всіх країнах клієнтів обслуговують висококваліфіковані співробітники з великим досвідом роботи в туристичній сфері, що забезпечують підтримку туристів на відпочинку та оперативне вирішення будь-яких питань.</li>
                                         <li>Ми маємо заслужену репутацію однієї з найбільш високотехнологічних компаній на туристичному ринку. У 2019 компанія запустила онлайн-агрегатор туристичних продуктів і послуг для професіоналів турбізнесу. Сервіс надає можливість в одному вікні забронювати авіаквитки, готелі, екскурсії та трансфери по всьому світу, а також динамічно об'єднати всі вибрані турпродукти в один тур. На сьогодні в доступні: понад 600 тис. Готелів, вілл та апартаментів по всьому світу, авіаквитки на регулярні рейси, лоукостер і чартери, трансфери, таксі, групові та індивідуальні екскурсії російською мовою, візи і оренда авто.</li>`,
                    `<li>Профиль туроператора – высококачественное обслуживание клиентов на самых популярных направлениях зарубежного туризма. МЫ специализируется на оказании туристских услуг, представленных в разных сегментах рынка: массовый туризм, корпоративные поездки и групповые выездные мероприятия, бронирование отелей и авиабилетов, детский отдых, а также VIP-туры.</li>
                                         <li>Пакетные предложения сформированы на базе чартерных и регулярных рейсов ведущих авиакомпаний мира с современным авиапарком. Среди них Aeroflot, iFly, S7 Airlines, Aegean Airlines, Ural Airways, Thai Airways, Emirates, Yakutia, Qatar Airways, Yamal, Air Baltic и другие.</li>
                                         <li>В отельной сфере партнеры туроператора — ведущие гостиничные цепочки, среди них Marriott, Sheraton, Hilton, Jumeirah, Radisson, Aldemar, Grecotel, Le Meridien, Sol Melia, Princess, Hilton, Iberostar, Four Seasons, Ikos и др.</li>
                                         <li>Во всех странах клиентов обслуживают высококвалифицированные сотрудники с большим опытом работы в туристической сфере, обеспечивающие поддержку туристов на отдыхе и оперативное решение любых вопросов.</li>
                                         <li>Мы имеем заслуженную репутацию одной из самых высокотехнологичных компаний на туристическом рынке. В 2019 году компания запустила онлайн-агрегатор туристических продуктов и услуг для профессионалов турбизнеса. Сервис предоставляет возможность в одном окне забронировать авиабилеты, отели, экскурсии и трансферы по всему миру, а также динамически объединить все выбранные турпродукты в один тур. На сегодня в  доступны: более 600 тыс. отелей, вилл и апартаментов по всему миру, авиабилеты на регулярные рейсы, лоукостеры и чартеры, трансферы, такси, групповые и индивидуальные экскурсии на русском языке, визы и аренда авто.</li>`],
                Main_advantages: ['Main advantages', 'Головні переваги', 'Главные преимущества'],
                Dispatching_offices: [`<li>own receiving and dispatching offices</li>
                                       <li>progressive and convenient online booking system</li>
                                       <li>individual approach to each application</li>
                                       <li>work only with trusted and reliable partners</li>
                                       <li>wide range of tours and destinations</li>
                                       <li>extensive experience and high professionalism of employees</li>
                                       <li>continuous quality control</li>
                                       <li>prompt solution of any issues, 24/7 support</li>
                                       <li>reputation as one of the most high-tech companies in the travel market</li>`,
                    `<li>власні приймальні і офіси</li>
                                       <li>прогресивна і зручна система онлайн-бронювання</li>
                                       <li>індивідуальний підхід до кожної заявки</li>
                                       <li>робота тільки з перевіреними і надійними партнерами</li>
                                       <li>широкий вибір турів і напрямків</li>
                                       <li>великий досвід роботи і високий професіоналізм співробітників</li>
                                       <li>постійний контроль якості</li>
                                       <li>оперативне вирішення будь-яких питань, підтримка 24/7</li>
                                       <li>репутація однієї з найбільш високотехнологічних компаній на туристичному ринку</li>`,
                    `<li>собственные принимающие и отправляющие офисы</li>
                                       <li>прогрессивная и удобная система онлайн-бронирования</li>
                                       <li>индивидуальный подход к каждой заявке</li>
                                       <li>работа только с проверенными и надежными партнерами</li>
                                       <li>широкий выбор туров и направлений</li>
                                       <li>большой опыт работы и высокий профессионализм сотрудников</li>
                                       <li>постоянный контроль качества</li>
                                       <li>оперативное решение любых вопросов, поддержка 24/7</li>
                                       <li>репутация одной из самых высокотехнологичных компаний на туристическом рынке</li>`],
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
    template: `<div class="container tab-about">
                    <div class="row d-flex justify-content-end"><button type="button" @click="currentTabs()" class="btn-close m-3"></button></div>
                        <div class="row">
                            <div>
                                <p v-html="this.translate('We')"></p>
                                <p v-html="this.translate('Company_portfolio')"></p>
                                <p v-text="this.translate('Cooperate_with_us')"></p>
                                <ul v-html="this.translate('Tour_operator_profile')"></ul>
                                <h3 v-text="this.translate('Main_advantages')"></h3>
                                <ul v-html="this.translate('Dispatching_offices')"></ul>
                            </div>
                        </div>
                    </div>`
}
