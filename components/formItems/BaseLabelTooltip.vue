// 01EZTX9M3AWK0ZB16B6KYR56F1

<template>
  <div :class="['label-tooltip', labelClass]">
    <label class="label-tooltip__main">
      <span
        v-if="labelTitle"
        :class="iconWarning ? 'bg-white' : 'label-tooltip__text'"
        >{{ labelTitle }}</span
      >
      <button
        :id="id"
        v-b-popover.hover="{ content: labelContent, placement }"
        :class="[
          iconWarning ? 'label-tooltip__btn-warning' : 'label-tooltip__btn',
          id ? 'tracking' : '',
        ]"
      >
        {{ iconWarning ? '!' : '?' }}
      </button>
    </label>
  </div>
</template>

<script>
import { VBPopover } from 'bootstrap-vue';

export default {
  name: 'BaseLabelTooltip',
  directives: {
    'b-popover': VBPopover,
  },
  props: {
    id: {
      type: String,
      default: '',
    },
    labelContent: {
      type: String,
      default: '',
    },
    labelTitle: {
      type: String,
      default: '',
    },
    labelClass: {
      type: String,
      default: '',
    },
    iconWarning: {
      type: Boolean,
      default: false,
    },
    placement: {
      type: String,
      default: 'topleft',
    },
  },
};
</script>

<style lang="scss">
@import '~/assets/scss/components/base-labels-tooltip';
</style>
