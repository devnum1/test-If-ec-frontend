// 01EZTX9M3AWK0ZB16B6KYR56F1

<template>
  <div :class="['base-select', { 'base-select--error': error }]">
    <multiselect
      v-model="valueInput"
      error
      :options="options"
      :placeholder="placeholder"
      :disabled="disabled"
      :label="petBreed ? 'typeName' : ''"
      select-label=""
      selected-label=""
      deselect-label=""
      :searchable="isSearch"
      :allow-empty="false"
      @select="change"
    >
      <template slot="option" slot-scope="props">
        <slot name="option" v-bind="props" />
      </template>
      <span slot="noResult">{{ $t('error.mess_search_select') }}</span>
    </multiselect>
    <span v-if="error" class="base-select__error">{{ error }}</span>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';

export default {
  name: 'BaseSelect',
  components: { Multiselect },
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
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number, Object],
      default: null,
    },
    placeholder: {
      type: String,
      default: 'デフォルトボタン',
    },
    options: {
      type: Array,
      default: () => ['list', 'of', 'options'],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: '',
    },
    petBreed: {
      type: Boolean,
      default: false,
    },
    isSearch: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      valueInput: null,
    };
  },
  watch: {
    value: function (e) {
      this.valueInput = this.petBreed
        ? this.options.filter((it) => it.listId == e)
        : e;
    },
  },
  mounted() {
    this.valueInput = this.petBreed
      ? this.options.filter((it) => it.listId == this.value)
      : this.value;
  },
  methods: {
    change(newValue) {
      this.petBreed
        ? this.$emit('input', newValue.listId)
        : this.$emit('input', newValue);
      this.$emit('change', newValue);
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
@import '~/assets/scss/components/base-select';
</style>
