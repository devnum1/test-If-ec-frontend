<template>
  <div class="page-content bg-gray">
    <page-title logo />
    <div>
      <h1 class="mt-21">
        {{ $t('mailchange.pageTitle') }}
      </h1>
      <div v-if="confirmed" class="confirmed">
        <div class="confirmed-title">
          <div class="confirmed-title-icon">
            <span class="icon-fonts--mail" />
          </div>
          {{ $t('mailchange.confirmed') }}
        </div>

        <div class="confirmed-description">
          <i18n path="mailchange.confirmedDescription">
            <nuxt-link to="/">{{ $t('mailchange.here') }}</nuxt-link>
          </i18n>
        </div>

        <div class="mt-30 confirmed-note">
          <div class="confirmed-note-title">
            <img src="~/assets/images/icon-exclamation.svg" />
            <span class="ml-2">{{ $t('mailchange.confirmedNote1') }}</span>
          </div>
          <p class="confirmed-note-content">
            {{ $t('mailchange.confirmedNote2') }}
          </p>
        </div>
      </div>
      <div v-if="!confirmed">
        <div class="content">
          <p class="description">
            {{ $t('mailchange.description') }}
          </p>
          <div class="mt-24 form-input">
            <label>
              {{ $t('mailchange.newEmailLabel') }}
            </label>
            <div
              class="mt-16 input-icon-container"
              :class="{ 'base-input--error': errors.first('email') }"
            >
              <input
                v-model="email"
                v-validate="{
                  email: true,
                  required: true,
                }"
                placeholder="example@example.com"
                name="email"
                class="base-input__main form-control"
              />
            </div>
          </div>
          <div class="mt-24 form-input">
            <label>
              {{ $t('mailchange.reNewEmailLabel') }}
            </label>
            <div
              class="mt-16 input-icon-container"
              :class="{ 'base-input--error': !isEmailMatch() }"
            >
              <input
                v-model="reNewEmail"
                v-validate="{
                  required: true,
                }"
                placeholder="example@example.com"
                name="reNewEmail"
                class="base-input__main form-control"
              />
            </div>
            <div v-if="!isEmailMatch()" class="mt-12 warn-wrapper">
              <div class="warn">
                <img src="~/assets/images/icon-exclamation.svg" />
                <div class="warn-text1">
                  {{ $t('mailchange.reNewEmailWarn1') }}
                </div>
              </div>
              <p class="warn-description">
                {{ $t('mailchange.reNewEmailWarn2') }}
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
              <div>{{ $t('mailchange.submit') }}</div>
            </div>
          </base-button>
          <div class="note">{{ $t('mailchange.note') }}</div>
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
  middleware: ['auth'],
  data() {
    return {
      email: '',
      reNewEmail: '',
      listErrors: [],
      confirmed: false,
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
        !this.email ||
        !this.reNewEmail ||
        this.listErrors.length > 0 ||
        !this.isEmailMatch()
      );
    },
    isEmailMatch() {
      if (!this.reNewEmail) return true;
      return this.email === this.reNewEmail;
    },
    async handleSubmit() {
      const result = await this.$validator.validate();
      if (!result && this.isEmailMatch()) return false;
      await this.$store.dispatch('auth/changeEmail', {
        email: this.email,
      });
      this.confirmed = true;
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
      margin-top: 15px;
      text-align: center;
      margin-left: 5px;
      width: 250px;
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

.confirmed {
  padding: 16px;

  .confirmed-title {
    font-size: 18px;
    color: #5fbbb5;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .confirmed-title-icon {
      font-size: 40px;
      height: 60px;
      width: 40px;
    }
  }

  .confirmed-description {
    margin-top: 40px;
    font-size: 14px;
    color: #00000099;
    white-space: pre-wrap;
  }

  .confirmed-note {
    padding: 11px;
    color: $red;
    background-color: #fcf1ee;
    border: solid 5px #f9e4df;
    .confirmed-note-title {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .confirmed-note-content {
      margin: 0;
    }
  }
}
</style>
