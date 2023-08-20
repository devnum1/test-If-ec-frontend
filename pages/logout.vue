// 01EZTX9M3AWK0ZB16B6KYR56F1

<template>
  <div />
</template>

<script type="text/javascript">
export default {
  mounted() {
    this.logout();
  },
  methods: {
    async logout() {
      await this.$store.dispatch('auth/logout');
      localStorage.clear();
      this.$router.push('/');
    },
  },
};
</script>
