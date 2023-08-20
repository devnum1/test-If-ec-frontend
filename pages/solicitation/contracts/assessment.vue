// 01EZTX9M3AWK0ZB16B6KYR56F1

<template>
  <div class="page-content bg-gray">
    <PageTitle logo />
    <!-- DP-0095 -->
    <div class="container">
      <div class="form-group mt-56 mb-41">
        <div class="contract-complete-notification">
          <div class="checked__icon">
            <i class="icon-fonts icon-fonts--check" />
          </div>
          <div class="complete-text">
            {{ $t('contract_complete.page_title') }}
          </div>
        </div>
      </div>
      <div class="form-group px-3 pt-2 mb-2">
        <p class="text-normal text-left mb-4">
          {{ $t('contract_complete.content.check_mail') }}
        </p>
        <p class="text-normal text-left mb-0">
          {{ $t('contract_complete.content.confirm') }}
        </p>
        <p class="text-normal text-left">
          {{ $t('contract_complete.content.reply_asap') }}
        </p>
      </div>
      <div class="text-small">
        <p class="text-small__item">
          {{ $t('contract_complete.note.take_day') }}
        </p>
        <p class="text-small__item">
          {{ $t('contract_complete.note.depend_content') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  beforeRouteEnter(to, from, next) {
    let checkReload = JSON.parse(localStorage.getItem('reload'));
    if (checkReload) {
      localStorage.removeItem('reload');
      return next((vm) => {
        vm.$router.push('/corporate/insurance_product/');
      });
    }

    let accessToComplete = ['solicitation-confirm'];
    if (!accessToComplete.includes(from.name) && !checkReload) {
      return next((vm) => vm.$router.push('/'));
    }

    next();
  },

  beforeRouteLeave(to, from, next) {
    const forbiddenRouters = ['solicitation-confirm'];
    localStorage.removeItem('reload');
    if (forbiddenRouters.includes(to.name)) {
      return next('/corporate/insurance_product/');
    }

    next();
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
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/pages/new-contract';
</style>
