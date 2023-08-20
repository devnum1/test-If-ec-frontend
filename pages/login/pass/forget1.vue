<template>
  <div class="page-content bg-gray">
    <page-title logo />
    <div>
      <h1 class="mt-21">
        {{ $t('forget1.pageTitle') }}
      </h1>
      <div class="content">
        <p class="description">
          {{ $t('forget1.description') }}
        </p>
        <div class="form-input">
          <label class="label">{{ $t('forget1.emailInputLabel') }}</label>
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
              class="base-input__main form-control"
            />
          </div>
        </div>
        <div class="mt-40 button-group">
          <div>
            <base-button
              width="279px"
              height="56px"
              :disabled="isDisabled()"
              @click="send"
            >
              <div class="button-label">
                <div>{{ $t('forget1.send') }}</div>
              </div>
            </base-button>
          </div>
          <div class="mt-24 cancel">
            <NuxtLink to="/login">{{ $t('forget1.cancel') }}</NuxtLink>
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
    isDisabled() {
      return this.errors.first('email') || !this.email;
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
.button-group {
  display: grid;
  place-items: center;
}

.cancel {
  cursor: pointer;
  color: #57b1ce;
}
</style>
