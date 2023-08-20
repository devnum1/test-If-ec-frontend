// 01EZTX9M3AWK0ZB16B6KYR56F1

<template>
  <div v-click-outside="onClickOutside" class="email-dropdown">
    <div class="email-dropdown__input">
      <BaseInput
        :id="id"
        v-model="email"
        v-validate="{ required: true, email: ['XXX@XXX.XXX'] }"
        :data-vv-as="$t('common.mail')"
        name="email"
        :value="email"
        :error="errors.first('email')"
        :placeholder="placeholderMail"
        autocomplete="email"
        @keyup="handleEnter"
      />
    </div>
    <div
      :class="{
        'email-dropdown__container': true,
        'd-none': hideList,
      }"
    >
      <ul v-if="shouldShowList" class="email-dropdown__list">
        <li
          v-for="(domain, index) in domainsList"
          :key="index"
          tabindex="-1"
          :data-dropdown-item-index="index"
          class="email-dropdown__item"
          @click="handleOptionSelection(domain)"
          @keyup.enter="handleOptionSelection(domain)"
        >
          <span class="email-dropdown__item-local-part">{{ localPart }}</span>
          <span class="email-dropdown__item-domain">@{{ domain }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/javascript">
import vClickOutside from 'v-click-outside';
import VeeValidate from 'vee-validate';
import BaseInput from '@/components/formItems/BaseInput';
import VueI18n from 'vue-i18n';

export default {
  components: { BaseInput },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  props: {
    id: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    defaultDomains: {
      type: Array,
      default() {
        return ['gmail.com', 'yahoo.co.jp', 'outlook.com', 'icloud.com'];
      },
    },
    maxSuggestions: {
      type: Number,
      default: 7,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    placeholderMail: {
      type: String,
      default: '例 ) peco@hmail.com',
    },
  },

  data() {
    return {
      email: this.value,
      hideList: true,
    };
  },

  computed: {
    shouldShowList() {
      return this.domainsList.length && !this.isOptionSelected;
    },
    localPart() {
      return String(this.email).toLowerCase().split('@')[0];
    },
    inputDomain() {
      const parts = String(this.email).toLowerCase().split('@');

      return parts.length > 1 ? parts[1] : '';
    },
    suggestionList() {
      return this.domainsList.map((domain) =>
        `${this.localPart}@${domain}`.toLowerCase()
      );
    },
    isOptionSelected() {
      return this.suggestionList.includes(String(this.email).toLowerCase());
    },
    domainsList() {
      return this.defaultDomains
        .filter((domain) => domain.indexOf(this.inputDomain) === 0)
        .slice(0, this.maxSuggestions);
    },
  },

  watch: {
    email: function (newValue) {
      if (/@./.test(newValue)) {
        this.hideList = false;
      } else {
        this.hideList = true;
      }

      this.$emit('input', newValue);
    },
    isActive: function () {
      this.handleValidate();
    },
  },

  methods: {
    handleOptionSelection(domain) {
      this.email = `${this.localPart}@${domain}`;
    },
    onClickOutside(event) {
      this.hideList = true;
    },
    handleEnter(e) {
      if (e.key === 'Enter') {
        this.hideList = true;
      }
    },
    handleValidate() {
      this.$validator.validate().then((result) => {
        //
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/components/suggest-mail';
</style>
