// 01EZTX9M3AWK0ZB16B6KYR56F1

<template>
  <div class="step-progress-bar">
    <div class="head-progress">
      <div
        v-for="item in stepList"
        :key="item.index"
        class="step"
        :class="item.index == progress ? 'step__current' : ''"
      >
        <div class="step__text">
          <div class="step__text-count">
            {{ item.index }}
          </div>
          <div class="step__text-title">
            {{ item.title }}
          </div>
        </div>
        <svg class="step-arrow">
          <path class="border" d="M0,0 L10,15 a0,0 0 0,1 0,2 l-10,16" />
        </svg>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  props: {
    stepList: {
      type: [Array, Object],
      default: () => [],
    },
    current: {
      type: [Number, String],
      default: 0,
    },
  },
  data() {
    return {
      progress: 1,
    };
  },
  mounted() {
    this.current ? (this.progress = parseInt(this.current)) : 1;
  },
};
</script>

<style lang="scss" scoped>
.space-10 {
  width: 100%;
  height: 30px;
}
.head-progress {
  text-align: center;
  display: flex;
  width: 305px;
  margin: 24px auto 0;

  .step {
    padding-right: 5px;
    display: inline-flex;
    height: 32px;
    justify-content: center;
    align-items: center;
    position: relative;
    color: rgba($black, 0.15);
    background-color: #d0eaec;
    z-index: 3;
    border-top: 1px solid $green;
    border-bottom: 1px solid $green;
    padding-left: 15px;
    cursor: pointer;
    transition-property: color;
    transition-duration: 0.3s;

    @for $i from 1 through 10 {
      &:nth-child(#{$i}) {
        z-index: #{10 - $i};
      }
    }

    &__text {
      display: flex;
      align-items: center;

      &-count {
        display: inline;
        font-size: 18px;
      }

      &-title {
        display: inline;
        font-size: 14px;
        margin-left: 10px;
      }
    }

    &:first-of-type {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      border-left: 1px solid rgba($black, 0.15);
      padding-left: 15px;
      &:not(.step__current) {
        margin-left: unset;
      }
    }

    .step-arrow {
      width: 11px;
      height: 32px;
      right: -10px;
      position: absolute;

      path {
        stroke-width: 1px;
        stroke: $green;
        fill: #d0eaec;
      }
    }

    &__current {
      background-color: $green;
      color: $white;
      border-top: 1px solid rgba($black, 0.15);
      border-bottom: 1px solid rgba($black, 0.15);
      z-index: 2;
      flex-grow: 1;
      .step-arrow {
        path {
          fill: $green !important;
          stroke: rgba($black, 0.15);
        }
      }

      ~ .step {
        background-color: transparent;
        color: rgba(0, 0, 0, 0.15);
        border-top: 1px solid rgba($black, 0.15);
        border-bottom: 1px solid rgba($black, 0.15);

        .step-arrow {
          path {
            fill: none;
            stroke: rgba($black, 0.15);
          }
        }
      }
    }

    &:last-of-type {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      border-right: 1px solid rgba($black, 0.15);
      padding-right: 15px;
      z-index: 1;

      .step-arrow {
        display: none;
      }
    }
    &:not(.step__current) {
      .step__text-title {
        display: none;
      }
    }
  }
}
</style>
