import {ComponentContent} from './content.js';
import {ComponentAddProduct} from './add-product.js';
import {ComponentCart} from './cart.js';
import {ComponentFavorite} from './favorite.js';

export const ComponentMain = {
    name: 'ComponentMain',
    props: {
        changeLang: {
            type: String,
            required: true
        },
        content: {
            type: Boolean,
            required: true
        },
        addProduct: {
            type: Boolean,
            required: true
        },
        add_new_item: {
            type: Array,
            required: true
        },
        cart_main: {
            type: Boolean,
            required: true
        },
        favorite_main: {
            type: Boolean,
            required: true
        }
    },
    emits: {
        show_component: null,
        cart_count: null,
        favorite_count: null,
        add_new_product: null
    },
    components: {
        ComponentContent,
        ComponentAddProduct,
        ComponentCart,
        ComponentFavorite
    },
    data() {
        return {}
    },
    watch: {},
    computed: {},
    methods: {},
    template: `<main class="main-component">
                 <component-content
                     :content="content"
                     :add_new_item="add_new_item"
                     :changeLang="changeLang"
                     v-on:cart_count="$emit('cart_count', $event)"
                     v-on:favorite_count="$emit('favorite_count', $event)"
                     v-on:show_component="$emit('show_component', $event)">
                 </component-content>
                 <component-add-product
                     :addProduct="addProduct"
                     v-on:add_new_product="$emit('add_new_product', $event)"
                     v-on:show_component="$emit('show_component', $event)">
                 </component-add-product>
                 <component-cart
                     :cart_main="cart_main"
                     v-on:cart_count="$emit('cart_count', $event)">
                 </component-cart>
                 <component-favorite
                     :favorite_main="favorite_main"
                     v-on:cart_count="$emit('cart_count', $event)"
                     v-on:favorite_count="$emit('favorite_count', $event)"
                     v-on:show_component="$emit('show_component', $event)">
                 </component-favorite>
            </main>`
}
