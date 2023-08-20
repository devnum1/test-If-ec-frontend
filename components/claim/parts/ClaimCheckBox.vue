<template>
  <div v-if="checked" class="claim-checkbox-wrapper-checked" @click="onClick">
    <img class="input-icon" src="~/assets/images/btn_check_active.svg" />
    <h3 class="claim-checkbox-title">{{ title }}</h3>
  </div>
  <div v-else class="claim-checkbox-wrapper" @click="onClick">
    <!-- checkedがfalseの時に表示する内容をここに書く -->
    <img class="input-icon" src="~/assets/images/btn_check.svg" />
    <h3 class="claim-checkbox-title">{{ title }}</h3>
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
    checked: {
      type: Boolean,
      required: true,
      default: true,
    },
    onClick: {
      type: Function,
      required: true,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
.claim-checkbox-wrapper-checked {
  background-color: rgba(93, 183, 191, 0.15);
  border-color: #5fbbb5;
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  padding: 16px 12px;
  display: flex;
  column-gap: 19px;
  align-items: center;
}
.claim-checkbox-wrapper {
  background-color: white;
  border-color: rgba(0, 0, 0, 0.15);
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  padding: 16px 12px;
  display: flex;
  column-gap: 19px;
  align-items: center;
}

.claim-checkbox-title-checked {
  font-size: 16px;
  font-weight: 400;
  line-height: 20.8px;
  color: #5fbbb5;
  margin-bottom: 0px;
}

.claim-checkbox-title {
  font-size: 16px;
  font-weight: 400;
  line-height: 20.8px;
  color: rgba(0, 0, 0, 0.5);
  margin-bottom: 0px;
}

.claim-checkbox-content {
  font-weight: 400;
  color: #000;
  opacity: 0.5;
  font-size: 14px !important;
  line-height: 21px;
}
</style>
