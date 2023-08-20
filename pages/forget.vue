<template>
  <div class="page-content bg-gray">
    <page-title logo />
    <div class="container pb-44">
      <div>
        <h1 class="mt-21">
          {{ $t('mailchange.pageTitle') }}
        </h1>
        <div class="verified-content">
          <img src="~/assets/images/step_check.svg" />
          <div class="complete-text">
            {{ $t('mailchange.verifiedTitle') }}
          </div>
          <p class="description">
            {{ $t('mailchange.verifiedDescription') }}
          </p>
          <div class="mt-30 login-button">
            <base-button
              width="279px"
              height="56px"
              @click="$router.push('/login')"
            >
              <div class="button-label">
                <div>{{ $t('mailchange.login') }}</div>
                <div class="icon-container">
                  <span class="icon-fonts--arrow-right" />
                </div>
              </div>
            </base-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle';
import BaseButton from '@/components/commons/BaseButton';
export default {
  components: {
    PageTitle,
    BaseButton,
  },
  validate({ _params, query, _store }) {
    const { uid, code } = query;
    return !!uid && !!code;
  },
  async fetch() {
    await this.$store.dispatch('auth/verifyUserAttributeSubmit', {
      ...this.$route.query,
    });
  },
};
</script>

<style lang="scss" scoped>
h1 {
  font-size: 24px;
  margin-bottom: 0;
  line-height: 125%;
  padding: 16px;
}

.page-content {
  max-width: 375px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}

.verified-content {
  margin-top: 34px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;

  .complete-text {
    margin-top: 13px;
    font-size: 18px;
    color: #5fbbb5;
  }

  .description {
    margin-top: 40px;
    font-size: 14px;
    .help-link {
      color: #5fbbb5;
      cursor: pointer;
    }
  }
  .button-label {
    position: relative;
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;

    .icon-container {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      font-size: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
