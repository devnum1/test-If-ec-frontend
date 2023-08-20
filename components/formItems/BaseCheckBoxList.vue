// 01EZTX9M3AWK0ZB16B6KYR56F1

<template>
  <div class="list-checkbox mb-24">
    <div
      v-b-toggle="collapseId"
      class="list-checkbox__title"
      @click="collapseClick = !collapseClick"
    >
      <div class="rules-title">
        {{ title }}
      </div>
      <div
        class="icon-fonts icon-fonts--plus-bold list-checkbox__title-right"
        :class="collapseClick ? 'not-collapsed' : ''"
      />
    </div>
    <hr />
    <b-collapse :id="collapseId">
      <slot />
    </b-collapse>
  </div>
</template>

<script>
export default {
  name: 'BaseCheckBoxList',
  props: {
    collapseId: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      collapseClick: false,
    };
  },
};
</script>

<style lang="scss">
.list-checkbox {
  &__title {
    position: relative;

    span {
      margin-left: 8px;
    }

    &-right {
      position: absolute;
      top: 5px;
      left: calc(100% - 16px);
      font-size: 12px;
      cursor: pointer;
      color: rgb($black, 0.82);
      outline: none;
    }

    hr {
      border: 0.5px solid rgba($black-7, 0.15);
      margin: 23px 0 16px 0;
    }

    .not-collapsed {
      &::before {
        content: '\e924';
      }
    }
  }

  &__list {
    display: block;

    &-item {
      margin-bottom: 8px;
    }
  }
}
</style>
