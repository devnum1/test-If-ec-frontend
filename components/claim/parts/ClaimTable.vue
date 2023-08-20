<template>
  <div class="claim-table-wrapper">
    <div style="width: 50%">
      <span class="text-gray text-body-sm">{{ title }}</span>
    </div>
    <span class="text-gray text-body text-black-light">{{ content }}</span>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
      default: '',
    },
    content: {
      type: String,
      required: true,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/claim';
.claim-table-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 13px 8px 10px 8px;
  border: 0px;
  border-bottom: 1px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.15);
}
</style>
