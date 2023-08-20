// 01EZTX9M3AWK0ZB16B6KYR56F1

<template>
  <div id="loading" class="loading-screen">
    <div class="modal__overlay">
      <div class="running">
        <img class="loading-img" src="~/assets/images/dog-running.svg" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadingScreen',
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/components/modal';
.modal {
  &__overlay {
    background-color: rgba($black, 0.6);
    z-index: 99;
  }
}
</style>
