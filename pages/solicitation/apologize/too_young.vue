// 01EZTX9M3AWK0ZB16B6KYR56F1

<template>
  <div class="page-content bg-gray">
    <PageTitle logo />
    <div class="container">
      <!-- DP-0013 -->
      <div class="complele-check text-center">
        <div class="complele-check__top">
          <div class="complele-check__icon complele-check__icon--warning" />
          <div
            class="complele-check__text-warning"
            v-html="
              $t('contract_step1.complete_check_{name}_warning_2', {
                name: petInfo.petName,
              })
            "
          />
        </div>
        <div class="complele-check__content mb-0 mt-49">
          <div
            class="complele-check__text text-left"
            v-html="$t('contract_step1.complete_check_content_2')"
          />
        </div>
      </div>

      <div class="page-button mt-56">
        <BaseButton
          btn-class="mw-279 d-flex align-items-center justify-content-center"
          :label="$t('common.button.return_page_detail')"
          btn-full="btn--full"
          icon-right
          @click="$router.push('/corporate/insurance_product/')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import contract from '~/constants/contract';
import { mapState } from 'vuex';
export default {
  beforeRouteEnter(to, from, next) {
    //check refresh redirect 404
    let checkReload = JSON.parse(localStorage.getItem('reload'));
    if (checkReload) {
      return next((vm) => {
        localStorage.removeItem('reload');
        vm.$router.push('/corporate/insurance_product/');
      });
    }

    let accessToApologize = [
      'solicitation-step1',
      'solicitation-contracts-agreement',
    ];
    if (!accessToApologize.includes(from.name) && !checkReload) {
      return next((vm) => vm.$router.push('/corporate/insurance_product/'));
    }

    next();
  },

  beforeRouteLeave(to, from, next) {
    localStorage.removeItem('reload');
    if (to.name === 'solicitation-step1') {
      return next('/corporate/insurance_product/');
    }

    if (to.name === 'solicitation-contracts-agreement') {
      return next('/errors/not_found');
    }

    next();
  },

  data() {
    return {
      constContract: contract,
    };
  },

  computed: {
    ...mapState({
      petInfo: (state) => state.contracts.petInfo,
    }),
  },

  created() {
    this.$helpers.setDataFromLocalToVuex();
  },

  beforeMount() {
    window.addEventListener('pagehide', this.preventNav);
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('pagehide', this.preventNav);
    });
  },

  methods: {
    preventNav() {
      localStorage.setItem('reload', true);
      this.$helpers.setDataFromVuexToLocal('petInfo');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/pages/dp-0012';
.link {
  color: rgba($black, 0.6);
}

.complele-check {
  &__content {
    margin-top: 49px;
    margin-bottom: 52px;
  }

  &__text {
    text-align: left;
  }
}
</style>
