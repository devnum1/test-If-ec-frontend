<template>
  <div class="page-content bg-gray">
    <page-title logo />
    <div>
      <h1>
        {{ $t('solicitation_step3.pageTitle') }}
      </h1>
      <divider />
      <div class="mt-26 description">
        {{ $t('solicitation_step3.description') }}
      </div>
      <div class="mt-26 button">
        <base-button type="submit" width="279px" height="56px" @click="next">
          <div class="button-label">
            <div class="icon-container">
              <span class="icon-fonts--mail" />
            </div>
            <div>{{ $t('solicitation_step3.send') }}</div>
            <div class="icon-container">
              <span class="icon-fonts--arrow-right" />
            </div>
          </div>
        </base-button>
      </div>
      <div class="mt-26 link">
        <a class="tracking" @click.prevent="handleLoginClick">
          {{ $t('solicitation_step3.login') }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle';
import Divider from '@/components/commons/Divider';
import BaseButton from '@/components/commons/BaseButton';
export default {
  components: {
    PageTitle,
    BaseButton,
    Divider,
  },
  validate({ query }) {
    const { affinityCode } = query;
    return !!affinityCode;
  },
  data() {
    return {
      affinityCode: '',
    };
  },
  mounted() {
    const { affinityCode } = this.$route.query;
    this.affinityCode = affinityCode;
  },
  methods: {
    next() {
      this.$router.push(
        `/solicitation/step3/entry1?affinityCode=${this.affinityCode}`
      );
    },
    handleLoginClick() {
      sessionStorage.setItem('redirect_after_login', '/solicitation/step4/');
      this.$router.push('/login');
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

.description {
  color: var(--black-medium-emphasis, rgba(0, 0, 0, 0.6));
  text-align: center;
  /* H4 14 */
  font-size: 14px;
  line-height: 150%;
}

.button {
  display: flex;
  justify-content: center;

  .button-label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    color: #fff;

    .icon-container {
      font-size: 20px;
    }
  }
}

.link {
  padding: 10px;
  display: flex;
  justify-content: center;
  color: #5fbbb5;
  font-size: 14px;
  cursor: pointer;
}
</style>
