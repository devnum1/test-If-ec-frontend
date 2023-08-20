<template>
  <button :style="{ width: `${width}px` }" class="claim-button">
    {{ title }}
    <span v-if="isPdf" class="claim-pdf">PDF</span>
  </button>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
      default: '',
    },
    width: {
      type: Number,
      required: true,
      default: 297,
    },
    isPdf: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.claim-button {
  background-color: white;
  border-color: #5fbbb5;
  border-width: 1px;
  border-style: solid;
  border-radius: 40px;
  padding: 16px 12px;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  color: #5fbbb5;
  cursor: pointer;
  box-shadow: 0px 4px 0px #4b9590;
  font-size: 14px;
  display: flex;
  justify-content: center;
  column-gap: 8px;
}

.claim-pdf {
  background-color: #5fbbb5;
  color: white;
  border-radius: 4px;
  padding: 1px 5px;
  font-size: 12px;
  line-height: 18px;
}
</style>
