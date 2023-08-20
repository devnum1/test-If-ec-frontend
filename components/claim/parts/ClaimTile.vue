<template>
  <div class="claim-tile-wrapper">
    <div class="claim-tile-title-wrapper">
      <img class="input-icon" src="~/assets/images/tag_alert.svg" />
      <h3 class="claim-tile-title">{{ title }}</h3>
    </div>
    <p class="claim-tile-content">
      {{ content }}
    </p>
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
.claim-tile-wrapper {
  background-color: white;
  border-color: rgba(0, 0, 0, 0.05);
  border-width: 5px;
  border-style: solid;
  padding: 16px;
}

.claim-tile-title-wrapper {
  display: flex;
  column-gap: 6px;
  align-items: center;
}

.claim-tile-title {
  font-size: 16px;
  font-weight: 400;
  line-height: 20.8px;
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 0px;
}

.claim-tile-content {
  font-weight: 400;
  color: #000;
  opacity: 0.5;
  font-size: 14px !important;
  line-height: 21px;
  margin-bottom: 0px;
  margin-top: 16px;
}
</style>
