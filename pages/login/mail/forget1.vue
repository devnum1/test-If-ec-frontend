<template>
  <main class="page-content bg-gray">
    <PageTitle logo />
    <h1>
      {{ $t('mail_forget1.pageTitle') }}
    </h1>
    <div class="content">
      <div class="description">{{ $t('mail_forget1.description') }}</div>
      <div class="mt-24">
        <label>{{ $t('mail_forget1.emailInputLabel') }}</label>
        <div :class="{ 'base-input--error': errors.first('email') }">
          <input
            v-model="email"
            v-validate="{
              email: true,
              required: true,
            }"
            placeholder="example@example.com"
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
        <base-button
          width="279px"
          height="56px"
          @click="checkRegistrationStatus"
        >
          <div class="button-label">
            <div>{{ $t('mail_forget1.send') }}</div>
          </div>
        </base-button>
        <div class="mt-24 cancel">
          <NuxtLink to="/login">{{ $t('mail_forget1.cancel') }}</NuxtLink>
        </div>
        <hr class="w-100 mt-24" />
        <div class="mt-8 cancel">
          <NuxtLink to="/login/mail/contact">{{
            $t('mail_forget1.contact')
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
  methods: {
    async checkRegistrationStatus() {
      const result = await this.$validator.validate();
      if (!result) return false;
      try {
        const registrationStatus = await this.$store.dispatch(
          'auth/confirmRegistrationStatus',
          {
            email: this.email,
          }
        );

        if (registrationStatus) {
          await this.$router.push({
            path: '/login/mail/forget2/',
            query: { email: this.email },
          });
        } else {
          await this.$router.push('/login/mail/contact');
        }
      } catch (e) {
        // エラーの場合の仕様なし
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
