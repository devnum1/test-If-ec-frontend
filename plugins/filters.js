// 01EZTX9M3AWK0ZB16B6KYR56F1

import Vue from 'vue';

Vue.mixin({
  filters: {
    expiredMonth(value) {
      return value.toString().padStart(2, '0');
    },

    expiredYear(value) {
      return value.toString().substring(2);
    },

    cardLast4Digit(value) {
      return (
        value.substring(0, value.length - 4).replace(/[0-9]/gi, '*') +
        value.substring(value.length - 4)
      );
    },

    securityCode(value) {
      return value.replace(/[0-9]/gi, '*');
    },

    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace('.', ',');

      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
});
