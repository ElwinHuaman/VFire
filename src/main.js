import './firebase';
import Vue from 'vue'
import App from './App.vue'
import VueFire from 'vuefire';
import './css/skeleton.css'

Vue.use(VueFire);

new Vue({
  el: '#app',
  render: h => h(App)
})
