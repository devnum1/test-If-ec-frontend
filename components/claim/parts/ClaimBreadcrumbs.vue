// 01EZTX9M3AWK0ZB16B6KYR56F1

<template>
  <div class="claim-bread-wrapper">
    <span class="claim-bread-list-start">{{ level1 }}</span
    ><span class="arrow" />
    <span class="claim-bread-list-end">{{ level2 }}</span>
  </div>
</template>
<script>
export default {
  props: {
    level1: {
      type: String,
      required: true,
      default: '',
    },
    level2: {
      type: String,
      required: true,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.claim-bread-wrapper {
  display: flex;
  align-items: center;
  column-gap: 8px;
}
.claim-bread-list-start {
  font-weight: 400;
  color: #5fbbb5;
  font-size: 14px !important;
  line-height: 21px;
}

.arrow {
  width: 8px;
  height: 8px;
  display: inline-block;
  border-style: solid;
  border-width: 1px 1px 0 0 !important;
  border-color: #000 #000 transparent transparent;
  transform: rotate(45deg);
  opacity: 0.6;
}

.claim-bread-list-end {
  font-weight: 400;
  color: #000;
  opacity: 0.5;
  font-size: 14px !important;
  line-height: 21px;
}
</style>
