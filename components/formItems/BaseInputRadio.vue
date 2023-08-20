// 01EZTX9M3AWK0ZB16B6KYR56F1

<template>
  <label
    :class="[
      'input-radio',
      { 'input-radio--text': radioText },
      { 'input-radio--pet input-radio--cat': radioIconCat },
      { 'input-radio--pet input-radio--dog': radioIconDog },
      { 'input-radio--text--secondLine': secondLine },
      inputClass,
    ]"
  >
    <span v-if="!radioText" class="input-radio__title">{{ label }}</span>
    <input
      :id="id"
      :class="id ? 'tracking input-radio__main' : 'input-radio__main'"
      type="radio"
      :name="name"
      :checked="checked"
      :disabled="disabled"
      :value="value"
      @click="check"
    />
    <span
      v-if="radioText"
      class="input-radio__title"
      :class="secondLine ? 'input-radio__title--secondLine' : ''"
      >{{ label }}
      <span v-if="secondLabel" class="input-radio__secondLine">{{
        secondLabel
      }}</span>
    </span>

    <div v-if="radioIconCat || radioIconDog" class="input-radio__pet">
      <i
        :class="[
          'icon-images',
          { 'icon-images-cat': radioIconCat },
          { 'icon-images-dog': radioIconDog },
        ]"
      />
      <span class="input-radio__title-pet">{{ label }}</span>
    </div>
    <span v-if="!radioText" class="input-radio__checkmark" />
  </label>
</template>
<script>
import VeeValidate from 'vee-validate';

export default {
  name: 'BaseInputRadio',
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
  props: {
    id: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: 'radio',
    },
    checked: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    radioText: {
      type: Boolean,
      default: false,
    },
    radioIconCat: {
      type: Boolean,
      default: false,
    },
    radioIconDog: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Number],
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    secondLabel: {
      type: String,
      default: '',
    },
    secondLine: {
      type: Boolean,
      default: false,
    },
    inputClass: {
      type: String,
      default: '',
    },
    valueInput: {
      type: [String, Number],
      default: '',
    },
  },
  methods: {
    check(e) {
      this.$emit('input', this.valueInput);
      this.$emit('click', e);
    },
  },
};
</script>
<style lang="scss">
@import '~/assets/scss/components/base-inputs-radio';
</style>
