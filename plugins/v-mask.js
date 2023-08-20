// 01EZTX9M3AWK0ZB16B6KYR56F1

import Vue from 'vue';

import VueMask from 'v-mask';
Vue.use(VueMask, {
  placeholders: {
    H: /^[ぁ-んァ-ンー-龥a-zA-Z0-9０-９\s]*$/,
    N: /^[0-9０-９]*$/,
  },
});
