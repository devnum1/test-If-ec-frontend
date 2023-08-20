<template>
  <main class="page-content bg-gray">
    <PageTitle logo />
    <h1>
      {{ $t('mail_contact.pageTitle') }}
    </h1>
    <div class="content">
      <div class="description">{{ $t('mail_contact.description') }}</div>
      <div class="button-group mt-40">
        <a
          class="link"
          href="https://helpfeel.com/littlefamily-ec/contact"
          target="_blank"
        >
          {{ $t('mail_contact.contact') }}
        </a>
        <div class="mt-24 cancel">
          <NuxtLink to="/login">{{ $t('mail_contact.cancel') }}</NuxtLink>
        </div>
      </div>
    </div>
  </main>
</template>
<style lang="scss" scoped>
h1 {
  font-size: 24px;
  margin-bottom: 0;
  line-height: 125%;
  padding: 16px;
  font-weight: normal;
}

.content {
  padding: 16px;
}

.button-group {
  display: grid;
  place-items: center;
}

.cancel {
  cursor: pointer;
  color: #57b1ce;
}
</style>
