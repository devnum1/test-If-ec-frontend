<template>
  <div class="page-content bg-gray">
    <page-title logo />
    <div>
      <h1 class="mt-21">
        {{ $t('forget2.pageTitle') }}
      </h1>
      <div class="content">
        <p class="description">
          {{ $t('forget2.description') }}
        </p>
        <div class="email-view">{{ email }}</div>
        <div class="mt-40 send-link">
          <div class="re-send">
            <div @click="send">{{ $t('forget2.send') }}</div>
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
  },
  data() {
    return {
      email: '',
      listErrors: [],
    };
  },

  fetch() {
    this.email = sessionStorage.getItem('forgot_password_email');
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
    async send() {
      const result = await this.$validator.validate();
      if (!result) return false;
      await this.$store.dispatch('auth/forgotPassword', {
        email: this.email,
      });
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
  padding: 0 16px;
}

.description {
  margin-top: 17px;
  font-size: 14px;
  color: #00000099;
}

.email-view {
  display: flex;
  align-items: center;
  padding-left: 12px;
  width: 343px;
  height: 56px;
  background-color: #f2f2f2;
  border-radius: 10px;
}

.label {
  color: #00000099;
}

.form-input {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  .error {
    color: $red;
  }
}
.send-link {
  display: grid;
  place-items: center;
}

.re-send {
  cursor: pointer;
  color: #5fbbb5;
}
</style>
