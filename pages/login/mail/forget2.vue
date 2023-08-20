<template>
  <main class="page-content bg-gray">
    <PageTitle logo />
    <h1>
      {{ $t('mail_forget2.pageTitle') }}
    </h1>
    <div class="content">
      <div class="text-center">
        <img src="~/assets/images/step_check.svg" />
      </div>
      <div class="complete-message">
        {{ $t('mail_forget2.complete') }}
      </div>
      <div class="description">{{ $t('mail_forget2.description') }}</div>
      <div class="mt-24">
        <div :class="{ 'base-input--error': errors.first('email') }">
          <input
            v-model="email"
            v-validate="{
              email: true,
              required: true,
            }"
            placeholder="example@exemple.com"
            name="email"
            type="email"
            class="base-input__main form-control input"
          />
        </div>
        <span v-if="errors.first('email')" class="error-text">
          {{ $t('common_error.email_incorrect_format') }}
        </span>
      </div>
      <div class="button-group mt-40">
        <base-button width="279px" height="56px" @click="send">
          <div class="button-label">
            <div>{{ $t('mail_forget2.send') }}</div>
          </div>
        </base-button>
        <div class="mt-24 cancel">
          <NuxtLink to="/login">{{ $t('mail_forget2.cancel') }}</NuxtLink>
        </div>
        <hr class="w-100 mt-24" />
        <div class="mt-8 cancel">
          <NuxtLink to="/login/mail/contact">{{
            $t('mail_forget2.contact')
          }}</NuxtLink>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import BaseButton from '@/components/commons/BaseButton';

export default {
  components: {
    BaseButton,
  },
  data() {
    return {
      email: '',
      listErrors: [],
    };
  },
  watch: {
    errors: {
      handler: function () {
        this.listErrors = this.errors.items.reduce((arr, it) => {
          return [...arr, it.msg];
        }, []);
      },
      deep: true,
    },
  },
  created() {
    this.setDefaultEmail();
  },
  methods: {
    setDefaultEmail() {
      this.email = this.$route.query.email || '';
    },
    async send() {
      const result = await this.$validator.validate();
      if (!result) return false;
      try {
        await this.$store.dispatch('auth/forgotPassword', {
          email: this.email,
        });
        await this.$router.push('/login/pass/forget2/');
      } catch (e) {
        // TODO: エラー時の処理　※画面のデザインが特に無いので一旦は握りつぶす
      }
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
  font-weight: normal;
}

.content {
  padding: 16px;
}

.complete-message {
  text-align: center;
  font-size: 18px;
  color: rgb(95, 187, 181);
  padding: 0 72px;
  margin-top: 12px;
}

.description {
  margin-top: 40px;
}

.input {
  margin-top: 4px;
}

.error-text {
  color: $red;
  margin-top: 8px;
  font-size: 14px;
}

.button-group {
  display: grid;
  place-items: center;
}

.cancel {
  cursor: pointer;
  color: #57b1ce;
}
</style>
