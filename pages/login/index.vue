<template>
  <div class="page-content bg-gray">
    <page-title logo />
    <div class="container">
      <h1>
        {{ $t('login.pageTitle') }}
      </h1>
      <div class="content">
        <div class="form-input">
          <label>{{ $t('login.emailInputLabel') }}</label>
          <div
            class="mt-16"
            :class="{ 'base-input--error': errors.first('email') }"
          >
            <input
              v-model="email"
              placeholder="example@example.com"
              name="email"
              type="email"
              class="base-input__main form-control"
            />
          </div>
        </div>

        <div class="mt-40 form-input">
          <label>
            {{ $t('login.passwordInputLabel') }}
          </label>
          <div
            class="mt-16 input-icon-container"
            :class="{ 'base-input--error': errors.first('password') }"
          >
            <input
              v-model="password"
              name="password"
              placeholder="********"
              :type="showPassword ? 'text' : 'password'"
              class="input-field base-input__main form-control password-input"
            />
            <div @click="showPassword = !showPassword">
              <img class="input-icon" src="~/assets/images/eye.svg" />
            </div>
          </div>
          <span
            class="mt-12 helper-text"
            :class="{ error: errors.first('password') }"
          >
            {{ $t('login.passwordHelper') }}
          </span>
        </div>

        <div v-if="submitError" class="mt-30 error-wrapper">
          <div class="error">
            <img src="~/assets/images/icon-exclamation.svg" />
            <div class="error-text1">{{ $t('login.submitError1') }}</div>
          </div>
          <p class="error-description">{{ $t('login.submitError2') }}</p>
        </div>

        <div class="mt-40 link">
          <div>
            <NuxtLink to="/login/pass/forget1/">
              {{ $t('login.forgotPasswordLink') }}
            </NuxtLink>
          </div>
          <div class="mt-8">
            <NuxtLink to="/login/mail/forget1/">
              {{ $t('login.forgotEmailLink') }}
            </NuxtLink>
          </div>
        </div>

        <div class="mt-40 button">
          <base-button width="279px" height="56px" @click="login">
            <div class="button-label">
              <div>{{ $t('login.login') }}</div>
              <div class="icon-container">
                <span class="icon-fonts--arrow-right" />
              </div>
            </div>
          </base-button>
          <div class="mt-40 cancel">
            <div @click="$router.back()">{{ $t('login.cancel') }}</div>
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
      password: '',
      showPassword: false,
      submitError: false,
    };
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch('auth/login', {
          email: this.email,
          password: this.password,
        });
        const redirectPath =
          sessionStorage.getItem('redirect_after_login') ?? '/mypage/contracts';
        this.$router.push(redirectPath);
      } catch (e) {
        this.submitError = true;
        console.log(e.code);
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

label {
  margin: 0;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.6);
}

.password-input {
  padding-right: 40px;
}

.helper-text {
  margin-top: 12px;
  font-size: 14px;
  opacity: 60%;
}

.link {
  font-size: 14px;
  margin-top: 25px;
  text-align: center;
  cursor: pointer;
}

.form-input {
  display: flex;
  flex-direction: column;
  .error {
    color: $red;
  }
}

.button {
  display: flex;
  flex-direction: column;
  align-items: center;
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

.divider {
  margin: 33.24px 0;
  height: 0.5px;
  width: 100%;
  background-color: rgba(10, 10, 10, 0.15);
}

.cancel {
  font-size: 14px;
  cursor: pointer;
  color: #57b1ce;
}

.input-icon-container {
  position: relative;
  display: inline-block;
}

.input-field {
  padding-right: 30px;
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

.error-wrapper {
  font-size: 14px;
  font-weight: bold;
  color: $red;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .error {
    display: flex;
  }
  .error-text1 {
    text-align: center;
    margin-left: 5px;
  }
  .error-description {
    font-weight: normal;
    font-size: 12px;
    margin-top: 8px;
  }
}
</style>
