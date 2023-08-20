// 01EZTX9M3AWK0ZB16B6KYR56F1

<template>
  <div class="page-content bg-gray">
    <PageTitle logo />
    <div class="container">
      <div class="form-group mt-56 mb-41">
        <div class="contract-complete-notification">
          <div class="checked__icon">
            <i class="icon-fonts icon-fonts--check" />
          </div>
          <div class="complete-text">
            {{ $t('magic_link.send_email_confirm') }}
          </div>
        </div>
      </div>
      <div class="form-group mb-41 font-14px txt-black-4">
        <p>{{ $t('magic_link.confirm_mail_content_1') }}</p>
        <p>{{ $t('magic_link.confirm_mail_content_2') }}</p>
        <p>
          {{ $t('magic_link.confirm_mail_content_3a') }}
          <a
            id="emailComplete_clickHere"
            class="txt-green cursor-pointer tracking"
            :href="helpUrl"
          >
            {{ $t('magic_link.confirm_mail_content_3b') }}
          </a>
          {{ $t('magic_link.confirm_mail_content_3c') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  beforeRouteEnter(to, from, next) {
    //check refresh redirect 404
    let checkReload = JSON.parse(localStorage.getItem('reload'));
    if (checkReload) {
      return next((vm) => {
        localStorage.removeItem('reload');
        vm.$router.push('/errors/not_found/');
      });
    }

    next();
  },
  computed: {
    helpUrl() {
      return process.env.HELP_URL;
    },
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
.page-content {
  font-family: $font-family-primary;
}
</style>
