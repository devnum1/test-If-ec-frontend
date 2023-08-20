// 01EZTX9M3AWK0ZB16B6KYR56F1

<template>
  <button
    type="button"
    :class="[
      'btn btn--default',
      { 'btn--icon-right': iconRight },
      { 'btn--icon-plus': btnIconPlus },
      { 'btn--icon-pdf': btnIconPdf },
      { 'btn--icon-plus-label': btnIconPlusLabel },
      { 'btn--black': btnBlack },
      { 'btn--orange': btnOrange },
      { 'btn--green-outline': btnGreenOutline },
      { 'btn--black-outline': btnBlackOutline },
      btnClass,
      btnSize,
      btnFull,
    ]"
    :disabled="disabled"
    @click="callback($event)"
  >
    <i
      v-if="btnIconPlus || btnIconPlusLabel"
      class="icon-fonts icon-fonts--plus"
    />
    <i v-if="btnIconEmail" class="icon-fonts icon-fonts--mail mr-1 txt-green" />
    <span v-if="!btnIconPlus" class="btn__text" v-html="label" />
    <i v-if="iconRight" class="icon-fonts icon-fonts--arrow-right" />
    <img v-if="btnIconPdf" src="~/assets/images/pdf.svg" />
  </button>
</template>
<script>
export default {
  name: 'BaseButton',
  props: {
    label: {
      type: String,
      default: 'デフォルトボタン',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    btnBlack: {
      type: Boolean,
      default: false,
    },
    btnOrange: {
      type: Boolean,
      default: false,
    },
    btnGreenOutline: {
      type: Boolean,
      default: false,
    },
    btnBlackOutline: {
      type: Boolean,
      default: false,
    },
    btnClass: {
      type: String,
      default: '',
    },
    iconRight: {
      type: Boolean,
      default: false,
    },
    btnIconPlus: {
      type: Boolean,
      default: false,
    },
    btnIconPlusLabel: {
      type: Boolean,
      default: false,
    },
    btnSize: {
      type: String,
      default: '',
    },
    btnFull: {
      type: String,
      default: '',
    },
    btnIconEmail: {
      type: Boolean,
      default: false,
    },
    btnIconPdf: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    callback: function (e) {
      this.$emit('click', e);
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~/assets/scss/components/base-buttons';
</style>
