<template>
  <div class="page-content bg-gray">
    <page-title logo />
    <div>
      <h1 class="mt-21">
        {{ $t('passwordchange.pageTitle') }}
      </h1>
      <div class="content">
        <p class="description">
          {{ $t('passwordchange.description') }}
        </p>
        <div class="mt-24 form-input form-password">
          <label>
            {{ $t('passwordchange.passwordLabel') }}
          </label>
          <div
            class="mt-16 input-icon-container"
            :class="{ 'base-input--error': submitOldPasswordError }"
          >
            <input
              v-model="oldPassword"
              placeholder="********"
              name="oldPassword"
              :type="showOldPassword ? 'text' : 'password'"
              class="base-input__main form-control"
              @input="submitOldPasswordError = false"
            />
            <div @click="showOldPassword = !showOldPassword">
              <img class="input-icon" src="~/assets/images/eye.svg" />
            </div>
          </div>
          <div v-if="submitOldPasswordError" class="mt-12 warn-wrapper">
            <div>
              <img src="~/assets/images/icon-exclamation.svg" />
              <span>{{ $t('passwordchange.oldPasswordWarn1') }}</span>
            </div>
            <p class="warn-description">
              {{ $t('passwordchange.oldPasswordWarn2') }}
            </p>
          </div>
          <div class="mt-40 newPasswordDescription">
            {{ $t('passwordchange.newPasswordDescription') }}
          </div>
        </div>
        <div class="mt-24 form-input form-password">
          <label>
            {{ $t('passwordchange.newPasswordInputLabel') }}
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
            {{ $t('passwordchange.newPasswordHelper') }}
          </span>
          <div v-else class="mt-12 warn-wrapper">
            <div>
              <img src="~/assets/images/icon-exclamation.svg" />
              <span>{{ $t('passwordchange.newPasswordWarn') }}</span>
            </div>
            <p class="warn-description">
              {{ $t('passwordchange.newPasswordHelper') }}
            </p>
          </div>
        </div>
        <div class="mt-24 form-input form-password">
          <label>
            {{ $t('passwordchange.reNewPasswordInputLabel') }}
          </label>
          <div
            class="mt-16 input-icon-container"
            :class="{ 'base-input--error': !isPasswordMatch() }"
          >
            <input
              v-model="rePassword"
              placeholder="********"
              name="password"
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
                {{ $t('passwordchange.reNewPasswordWarn1') }}
              </div>
            </div>
            <p class="warn-description">
              {{ $t('passwordchange.reNewPasswordWarn2') }}
            </p>
          </div>
        </div>
      </div>

      <div class="mt-40 button">
        <base-button
          width="279px"
          height="56px"
          :disabled="isDisabled()"
          @click="handleSubmit"
        >
          <div class="button-label">
            <div>{{ $t('passwordchange.submit') }}</div>
          </div>
        </base-button>
        <div class="note">{{ $t('passwordchange.note') }}</div>
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
  // middleware: ['auth'],
  data() {
    return {
      email: '',
      oldPassword: '',
      password: '',
      rePassword: '',
      showOldPassword: false,
      showPassword: false,
      sowRePassword: false,
      isConfirmed: false,
      submitOldPasswordError: false,
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
        !this.oldPassword ||
        !this.password ||
        !this.rePassword ||
        this.listErrors.length > 0 ||
        !this.isPasswordMatch()
      );
    },
    isPasswordMatch() {
      if (!this.rePassword && !this.isConfirmed) return true;
      return this.password === this.rePassword;
    },
    async handleSubmit() {
      this.isConfirmed = true;
      const result = await this.$validator.validate();
      if (!this.oldPassword) {
        this.submitOldPasswordError = true;
      }
      if (typeof result !== 'boolean' || !result || !this.isPasswordMatch()) {
        return false;
      }
      try {
        await this.$store.dispatch('auth/changePassword', {
          oldPassword: this.oldPassword,
          newPassword: this.password,
        });
        await this.$router.push('/mypage/contracts');
      } catch (e) {
        if (e.code === 'NotAuthorizedException') {
          this.submitOldPasswordError = true;
        }
        console.error(e);
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
  color: #00000099;
  font-size: 14px;
}

.base-input__main {
  padding-right: 40px;
}
.newPasswordDescription {
  color: #00000099;
  font-size: 14px;
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
      padding: 0 15px;
      margin-left: 5px;
      width: 253px;
    }
    .warn-description {
      text-align: center;
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

.note {
  margin-top: 10px;
  font-size: 12px;
  color: #00000080;
}
</style>
