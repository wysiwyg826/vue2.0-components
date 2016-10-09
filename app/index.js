/* 
 * charset:  utf-8
 * @Author:  wysiwyg826
 * @Email:   wysiwyg826@gmail.com
 * @Date:    2016-10-09 14:29:53
 * @File:    index.js
 * @Last modified by:   wysiwyg826
 * @Last Modified time: 2016-10-09 14:34:26
 */

import Vue from 'vue';
import vueResource from 'vue-resource';
import vueRouter from 'vue-router';

Vue.use(vueResource);
Vue.use(vueRouter);

import index from './views/index.vue';

const routes = [{
    path: '/',
    component: index
}];

const router = new vueRouter({
    routes
});

const app = new Vue({
    router
}).$mount('#app');
