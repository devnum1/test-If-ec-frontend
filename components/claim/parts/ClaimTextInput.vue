<template>
  <div>
    <input
      :list="suggestions.length > 0 ? suggestionId : ''"
      type="text"
      :placeholder="placeholder"
      class="rounded-8 w-full"
      :value="value"
      :disabled="disabled"
      @input="handleInput"
    />
    <datalist v-if="suggestions.length > 0" :id="suggestionId">
      <option
        v-for="suggestion in suggestions"
        :key="suggestion"
        :value="suggestion"
      />
    </datalist>
    <span v-if="error" class="base-input__error">{{ error }}</span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    error: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    suggestionId: {
      type: String,
      default: '',
      required: false,
    },
    suggestions: {
      type: Array,
      default: () => [],
      required: false,
    },
  },
  $_veeValidate: {
    // value getter
    value() {
      return this.$el.value;
    },
    // name getter
    name() {
      return this.name;
    },
  },
  methods: {
    handleInput(event) {
      this.$emit('input', event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/claim';
input {
  padding: 16px 12px;
  border: 1px solid rgba(0, 0, 0, 0.15) !important;
  &:focus {
    border-color: rgba(0, 0, 0, 0.6) !important;
  }
  &:focus-visible {
    outline: none;
  }
}
</style>
