<template>
  <div class="page-content bg-gray">
    <page-title logo />
    <div class="container">
      <h1 class="mt-21">
        {{ $t('reset_password_complete.pageTitle') }}
      </h1>
      <p class="description">
        {{ $t('reset_password_complete.description') }}
      </p>
      <div class="email-view">example@example.com</div>
      <div class="resend">
        <div class="label">
          {{ $t('reset_password_complete.send') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle';

export default {
  components: {
    PageTitle,
  },
  data() {
    return {
      email: '',
    };
  },

  methods: {
    async send() {
      const result = await this.$validator.validate();
      if (!result) return false;
      await this.$store.dispatch('auth/login', {
        email: this.email,
        password: this.password,
      });
      await this.$router.push('/register/complete');
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  font-size: 20px;
  color: #000000d1;
}

.page-content {
  max-width: 375px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}

.description {
  margin-top: 17px;
  font-size: 14px;
  color: #000000d1;
  white-space: pre-line;
}

.email-view {
  margin-top: 28px;
  padding: 12px;
  display: flex;
  align-items: center;
  background: #f2f2f2;
  border-radius: 8px;
  height: 56px;
  width: 343px;
}

.resend {
  margin-top: 16px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  .label {
    color: #57b1ce;
  }
}
</style>
