// 01EZTX9M3AWK0ZB16B6KYR56F1

<template>
  <div class="pet-container">
    <LoadingScreen v-show="loading" />
    <div class="pet-container-inner">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import LoadingScreen from '~/components/modals/loadingScreen';

export default {
  components: {
    LoadingScreen,
  },
  computed: {
    ...mapState({
      loading: (state) => state.loading,
    }),
  },
};
</script>

<style lang="scss" scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.pet-container {
  background-color: $gray-4;

  &-inner {
    max-width: 568px;
    margin: 0 auto;
  }
}
</style>
