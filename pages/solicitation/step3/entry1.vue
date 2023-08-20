<template>
  <div class="page-content bg-gray">
    <page-title logo />
    <div>
      <h1 class="mt-21">
        {{ $t('solicitation_step3_entry1.pageTitle') }}
      </h1>
      <divider />
      <div class="content">
        <div class="mt-30 sub-title">
          {{ $t('solicitation_step3_entry1.subTitle') }}
        </div>
        <div class="mt-24 form-input">
          <label>{{ $t('solicitation_step3_entry1.emailInputLabel') }}</label>
          <div
            class="mt-16"
            :class="{ 'base-input--error': errors.first('email') }"
          >
            <input
              v-model="email"
              v-validate="{
                email: true,
                required: true,
              }"
              data-vv-validate-on="none"
              placeholder="example@example.com"
              name="email"
              type="email"
              class="base-input__main form-control"
            />
          </div>

          <div v-if="errors.first('email')" class="mt-12 error">
            <div>
              <img src="~/assets/images/icon-exclamation.svg" />
              <span>{{ $t('solicitation_step3_entry1.emailWarn') }}</span>
            </div>
          </div>

          <div v-if="emailExists" class="mt-24 submit-error">
            <div class="submit-error__main">
              <img src="~/assets/images/icon-exclamation.svg" />
              <div class="error-text">
                {{ $t('solicitation_step3_entry1.emailExitsError1') }}
              </div>
            </div>
            <i18n
              class="submit-error__sub"
              path="solicitation_step3_entry1.emailExitsError2"
            >
              <nuxt-link to="/login">
                {{ $t('solicitation_step3_entry1.loginLink') }}
              </nuxt-link>
            </i18n>
          </div>
        </div>
        <div class="mt-24 form-input form-password">
          <label>
            {{ $t('solicitation_step3_entry1.passwordInputLabel') }}
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
              data-vv-validate-on="none"
              placeholder="********"
              name="password"
              :type="showPassword ? 'text' : 'password'"
              class="base-input__main form-control password-input"
            />
            <div @click="showPassword = !showPassword">
              <img class="input-icon" src="~/assets/images/eye.svg" />
            </div>
          </div>
          <span v-if="!errors.first('password')" class="helper-text">
            {{ $t('solicitation_step3_entry1.passwordHelper') }}
          </span>
          <div v-else class="mt-12 error">
            <div>
              <img src="~/assets/images/icon-exclamation.svg" />
              <span>{{ $t('solicitation_step3_entry1.passwordWarn') }}</span>
            </div>
            <p class="error-description">
              {{ $t('solicitation_step3_entry1.passwordHelper') }}
            </p>
          </div>
        </div>
        <div class="mt-24 description">
          <i18n path="solicitation_step3_entry1.consentText">
            <a
              class="link"
              :href="privacyPolicyUrl"
              target="_blank"
              rel="noopener"
            >
              {{ $t('solicitation_step3_entry1.privacyPolicy') }}
            </a>
            <a class="link" :href="termsUrl" target="_blank" rel="noopener">
              {{ $t('solicitation_step3_entry1.terms') }}
            </a>
          </i18n>
        </div>

        <div class="mt-24 button">
          <base-button width="279px" height="56px" @click="next">
            <div class="button-label">
              <div>{{ $t('solicitation_step3_entry1.next') }}</div>
              <div class="icon-container">
                <span class="icon-fonts--arrow-right" />
              </div>
            </div>
          </base-button>
          <nuxt-link
            class="mt-24 link"
            :to="`/solicitation/step3?affinityCode=${affinityCode}`"
          >
            {{ $t('solicitation_step3_entry1.prev') }}
          </nuxt-link>
        </div>
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
    Divider,
    BaseButton,
  },
  validate({ query }) {
    const { affinityCode } = query;
    return !!affinityCode;
  },
  data() {
    return {
      email: '',
      password: '',
      listErrors: [],
      showPassword: false,
      affinityCode: '',
      emailExists: false,
    };
  },
  computed: {
    privacyPolicyUrl() {
      // TODO: プライバシーポリシーのURL
      return '';
    },
    termsUrl() {
      // TODO: 利用規約URL
      return '';
    },
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
  mounted() {
    const { affinityCode } = this.$route.query;
    this.affinityCode = affinityCode;
  },
  methods: {
    async next() {
      const result = await this.$validator.validate();
      if (typeof result !== 'boolean' || !result) return false;
      try {
        await this.$store.dispatch('auth/register', {
          email: this.email,
          password: this.password,
          affinityCode: this.affinityCode,
        });
        await this.$router.push('/solicitation/step3/entry2/');
      } catch (e) {
        if (e.code === 'UsernameExistsException') {
          this.emailExists = true;
        }
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
  color: var(--black-medium-emphasis, rgba(0, 0, 0, 0.6));
}

.sub-title {
  display: flex;
  align-content: center;
  height: 24px;
  position: relative;
  font-size: 18px;
  margin: 33px 0 23px 0;
  padding-left: 12px;
  &::before {
    content: '';
    position: absolute;
    width: 4px;
    height: 24px;
    left: 0;
    background: #5fbbb5;
    border-radius: 7px;
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

.password-input {
  padding-right: 40px;
}

.description {
  color: #000000d1;
  font-size: 14px;
  margin-bottom: 48px;
  .link {
    color: #5fbbb5;
    cursor: pointer;
  }
}

.submit-error {
  color: $red;
  &__main {
    display: flex;
    font-size: 14px;
    justify-content: center;
    .error-text {
      width: 280px;
      margin-left: 5px;
    }
  }
  &__sub {
    display: flex;
    font-size: 12px;
    justify-content: center;
  }
}

.form-input {
  display: flex;
  flex-direction: column;
  .error {
    font-size: 14px;
    font-weight: bold;
    color: $red;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .error-description {
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

.link {
  font-size: 14px;
}
</style>
