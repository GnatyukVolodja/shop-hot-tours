import { ComponentContent } from './content.js';
import { ComponentAddProduct } from './add-product.js';
import { ComponentCart } from './cart.js';
import { ComponentFavorite } from './favorite.js';

export const ComponentMain = {
  name: 'ComponentMain',
  props: {
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
  components: {
    ComponentContent,
    ComponentAddProduct,
    ComponentCart,
    ComponentFavorite
  },
  data () {
    return {}
  },
  methods: {
    ShowComponent (e) {
      this.$emit('show_component', e)
    },
    CartCount (e) {
      this.$emit('cart_count', e)
    },
    FavoriteCount (e) {
      this.$emit('favorite_count', e)
    },
    AddNewProduct (e) {
      this.$emit('add_new_product', e)
    }
  },
  template: `<main class="main-component">
                 <component-content
                     :content="content"
                     :add_new_item="add_new_item"
                     v-on:cart_count="CartCount($event)"
                     v-on:favorite_count="FavoriteCount($event)"
                     v-on:show_component="ShowComponent($event)">
                 </component-content>
                 <component-add-product
                     :addProduct="addProduct"
                     v-on:add_new_product="AddNewProduct($event)"
                     v-on:show_component="ShowComponent($event)">
                 </component-add-product>
                 <component-cart
                     :cart_main="cart_main"
                     v-on:cart_count="CartCount">
                 </component-cart>
                 <component-favorite
                     :favorite_main="favorite_main"
                     v-on:favorite_count="FavoriteCount">
                 </component-favorite>
            </main>`
}
