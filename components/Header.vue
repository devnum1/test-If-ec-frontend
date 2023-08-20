// 01EZTX9M3AWK0ZB16B6KYR56F1

<template>
  <div>
    <div class="header">
      <PageTitle :logo="logo" :title="titlePage" :btn-back="btnBack" />
      <div class="header__icon-menu" @click="display = true" />
    </div>
    <div v-if="display" class="menu">
      <div class="menu__overlay" @click="display = false" />
      <div class="menu__container">
        <div class="menu__close-button">
          <div class="icon-fonts--close float-right" @click="display = false" />
        </div>
        <div class="menu__body mt-40">
          <nuxt-link to="/mypage/me/" class="menu__body-row d-flex">
            <div class="menu__info-label font-16px">
              {{ $t('note.confirm_customer_info') }}
            </div>
            <div class="menu__icon-right" />
          </nuxt-link>
          <div
            id="myPage_apply"
            class="menu__body-row d-flex cursor-pointer tracking"
            @click="handleRedirectStep1"
          >
            <div class="menu__info-label font-16px">
              {{ $t('note.application_new') }}
            </div>
            <div class="menu__icon-right" />
          </div>
          <div class="menu__body-row d-flex cursor-pointer tracking">
            <nuxt-link
              to="/mypage/mailchange/mail/input"
              class="menu__info-label font-16px"
            >
              {{ $t('note.email_change') }}
            </nuxt-link>
            <div class="menu__icon-right" />
          </div>
          <div class="menu__body-row d-flex cursor-pointer tracking">
            <nuxt-link
              to="/mypage/passwordchange/input"
              class="menu__info-label font-16px"
            >
              {{ $t('note.password_change') }}
            </nuxt-link>
            <div class="menu__icon-right" />
          </div>
          <div
            class="menu__body-row d-flex cursor-pointer tracking"
            @click="handleWindowOpenHelpFeel"
          >
            <div class="menu__info-label font-16px">
              {{ $t('note.support_user') }}
            </div>
            <div class="menu__icon-right" />
          </div>
          <div class="menu__body-row d-flex cursor-pointer tracking">
            <nuxt-link
              to="/mypage/contracts/"
              class="menu__info-label font-16px"
            >
              {{ $t('note.mypage_top') }}
            </nuxt-link>
            <div class="menu__icon-right" />
          </div>
          <div
            id="myPage_logout"
            class="menu__body-row menu__body-row--bottom d-flex tracking"
            @click="handleLogout"
          >
            <div class="menu__info-label font-16px">
              {{ $t('note.logout') }}
            </div>
            <div class="menu__icon-right" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle.vue';

export default {
  components: { PageTitle },
  props: {
    titlePage: {
      type: String,
      default: '',
    },
    logo: {
      type: Boolean,
      default: true,
    },
    btnBack: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      display: false,
    };
  },
  methods: {
    async handleLogout() {
      await this.$store.dispatch('auth/logout');
      localStorage.clear();
      this.$router.push('/login/');
    },
    handleRedirectStep1() {
      localStorage.setItem('access_insurance', 'mypage');
      this.$router.push('/solicitation/step1/');
    },
    handleWindowOpenHelpFeel() {
      window.open('https://helpfeel.com/littlefamily-ec/');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/layout/header';
</style>
