// 01EZTX9M3AWK0ZB16B6KYR56F1

import Vue from 'vue';
import _ from 'lodash';
Vue.prototype._ = _;

// To be able to use this._ or Vue._ in the components without including lodash
Vue.use(_);
