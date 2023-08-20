<template>
  <div class="page-content bg-gray">
    <page-title logo />
    <div class="container pb-44">
      <div>
        <h1>
          {{ $t('verified.pageTitle') }}
        </h1>
        <divider />
        <div class="content">
          <img src="~/assets/images/step_check.svg" />
          <div class="complete-text">
            {{ $t('verified.subTitle') }}
          </div>
          <p class="description">
            {{ $t('verified.description') }}
          </p>
          <div class="button">
            <base-button width="279px" height="56px" @click="next">
              <div class="button-label">
                <div>{{ $t('verified.next') }}</div>
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
import Divider from '@/components/commons/Divider';
import PageTitle from '@/components/PageTitle';
import BaseButton from '@/components/commons/BaseButton';
export default {
  components: {
    Divider,
    PageTitle,
    BaseButton,
  },
  validate({ _params, query, _store }) {
    const { uid, code } = query;
    return !!uid && !!code;
  },
  async fetch() {
    await this.$store.dispatch('auth/confirmSignUp', { ...this.$route.query });
  },
  methods: {
    next() {
      this.$router.push('/solicitation/step4/');
    },
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

.content {
  margin-top: 34px;
  display: flex;
  flex-direction: column;
  align-items: center;

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
}

.button {
  margin-top: 30px;
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
