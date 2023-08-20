<template>
  <div class="page-content bg-gray">
    <page-title logo />
    <div>
      <h1 class="mt-21">
        {{ $t('forget3.pageTitle') }}
      </h1>
      <div class="content">
        <p class="description">
          {{ $t('forget3.description') }}
        </p>
        <div class="mt-24 form-input form-password">
          <label>
            {{ $t('forget3.newPasswordInputLabel') }}
          </label>
          <div
            class="mt-16 input-icon-container"
            :class="{ 'base-input--error': errors.first('password') }"
          >
            <input
              v-model="password"
              v-validate="{
                password: true,
                required: true,
              }"
              placeholder="********"
              name="password"
              :type="showPassword ? 'text' : 'password'"
              class="base-input__main form-control"
            />
            <div @click="showPassword = !showPassword">
              <img class="input-icon" src="~/assets/images/eye.svg" />
            </div>
          </div>
          <span v-if="!errors.first('password')" class="helper-text">
            {{ $t('forget3.newPasswordHelper') }}
          </span>
          <div v-else class="mt-12 warn-wrapper">
            <div>
              <img src="~/assets/images/icon-exclamation.svg" />
              <span>{{ $t('forget3.newPasswordWarn') }}</span>
            </div>
            <p class="warn-description">
              {{ $t('forget3.newPasswordHelper') }}
            </p>
          </div>
        </div>
        <div class="mt-24 form-input form-password">
          <label>
            {{ $t('forget3.reNewPasswordInputLabel') }}
          </label>
          <div
            class="mt-16 input-icon-container"
            :class="{ 'base-input--error': !isPasswordMatch() }"
          >
            <input
              v-model="passwordConf"
              placeholder="********"
              name="passwordConf"
              :type="sowRePassword ? 'text' : 'password'"
              class="base-input__main form-control"
            />
            <div @click="sowRePassword = !sowRePassword">
              <img class="input-icon" src="~/assets/images/eye.svg" />
            </div>
          </div>
          <div v-if="!isPasswordMatch()" class="mt-12 warn-wrapper">
            <div class="warn">
              <img src="~/assets/images/icon-exclamation.svg" />
              <div class="warn-text1">
                {{ $t('forget3.reNewPasswordWarn1') }}
              </div>
            </div>
            <p class="warn-description">
              {{ $t('forget3.reNewPasswordWarn2') }}
            </p>
          </div>
        </div>
      </div>

      <div class="mt-40 button">
        <base-button
          :disabled="isDisabled()"
          width="279px"
          height="56px"
          @click="handleSubmit"
        >
          <div class="button-label">
            <div>{{ $t('forget3.submit') }}</div>
          </div>
        </base-button>
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
  data() {
    return {
      email: '',
      password: '',
      passwordConf: '',
      showPassword: false,
      sowRePassword: false,
      isConfirmed: false,
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
      return (
        !this.password ||
        !this.passwordConf ||
        this.listErrors.length > 0 ||
        !this.isPasswordMatch()
      );
    },
    isPasswordMatch() {
      if (!this.passwordConf && !this.isConfirmed) return true;
      return this.password === this.passwordConf;
    },
    async handleSubmit() {
      this.isConfirmed = true;
      const { uid, code } = this.$route.query;
      const result = await this.$validator.validate();
      if (typeof result !== 'boolean' || !result || !this.isPasswordMatch())
        return false;
      await this.$store.dispatch('auth/forgotPasswordSubmit', {
        uid,
        code,
        password: this.password,
      });
      await this.$router.push('/solicitation/step4/');
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
  color: #00000099;
  font-size: 14px;
}

.base-input__main {
  padding-right: 40px;
}

.form-input {
  display: flex;
  flex-direction: column;
  .warn-wrapper {
    font-size: 14px;
    font-weight: bold;
    color: $red;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .warn {
      display: flex;
    }
    .warn-text1 {
      text-align: center;
      margin-left: 5px;
      width: 253px;
    }
    .warn-description {
      font-weight: normal;
      font-size: 12px;
      margin-top: 8px;
    }
  }

  .helper-text {
    margin-top: 12px;
    color: rgba(0, 0, 0, 0.5);
    font-size: 12px;
  }
}

.form-password {
  margin-top: 23px;
}

.button {
  display: grid;
  place-items: center;
}

.link {
  margin-top: 25px;
  text-align: center;
  cursor: pointer;
}

.input-icon-container {
  position: relative;
  display: inline-block;
}

.input-icon {
  position: absolute;
  cursor: pointer;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
}
</style>
