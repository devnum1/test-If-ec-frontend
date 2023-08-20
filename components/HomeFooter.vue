<template>
  <footer>
    <div class="footer-container">
      <div class="direct-list">
        <div class="direct-item">
          <div class="title">保険商品</div>
          <ul>
            <li class="break-line">
              <a :href="`${corpBaseUrl}/product/wandays_nyandays/`">
                わんデイズ/にゃんデイズ
              </a>
            </li>
          </ul>
        </div>
        <hr />

        <div class="direct-item">
          <div class="title">カスタマーサポート</div>
          <ul>
            <li
              class="cursor-pointer"
              @click="$router.push('/mypage/contracts/')"
            >
              ご契約者さま用マイページ
            </li>
            <li class="cursor-pointer" @click="handleWindowOpenHelpFeel">
              よくあるご質問
            </li>
            <li class="cursor-pointer" @click="handleRedirectWebcas">
              お問合せ
            </li>
          </ul>
        </div>
        <hr />

        <div class="direct-item">
          <div class="title">About Us</div>
          <ul>
            <li>
              <a :href="`${corpBaseUrl}/corporate/`" class="link"> 会社情報 </a>
            </li>
            <li>
              <a
                :href="`${corpBaseUrl}/corporate/privacy_policy/`"
                class="link"
              >
                プライバシーポリシー
              </a>
            </li>
            <li>
              <a
                :href="`${corpBaseUrl}/corporate/solicitation_policy/`"
                class="link"
              >
                勧誘方針
              </a>
            </li>
            <li>
              <a
                :href="`${corpBaseUrl}/corporate/anti_social_policy/`"
                class="link"
              >
                反社会的勢力に対する基本方針
              </a>
            </li>
            <li>
              <a :href="`${corpBaseUrl}/corporate/compliance/`" class="link">
                コンプライアンス
              </a>
            </li>
            <li>
              <a :href="`${corpBaseUrl}/corporate/site_policy/`" class="link">
                サイトポリシー
              </a>
            </li>
            <li>
              <a
                :href="`${corpBaseUrl}/corporate/fiduciary_duty/`"
                class="link"
              >
                お客さま本位の業務運営に関する方針
              </a>
            </li>
            <li>
              <a :href="`${corpBaseUrl}/corporate/public-notice/`" class="link">
                電子公告
              </a>
            </li>
          </ul>
        </div>
        <hr />
        <div class="direct-item">
          <ul class="footer-list-irregular">
            <li>
              <a :href="`${corpBaseUrl}/corporate/sitemap/`">サイトマップ</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-logo-container">
      <div class="logo">
        <img src="~/assets/images/logo/litle-family.svg" alt="" />
      </div>
      <div class="document">
        <p>リトルファミリー少額短期保険株式会社</p>
        <p>（2022年7月承認）2022-078</p>
      </div>
    </div>
    <div class="footer-copyright">
      <p class="text">
        <small
          >Copyright ＠Little Family SS Insurance Co., Ltd. All Rights
          Reserved.</small
        >
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    corpBaseUrl() {
      return window.location.origin.includes('http://localhost')
        ? 'https://dev.ad-pet.net'
        : window.location.origin;
    },
  },
  methods: {
    handleRedirectWebcas() {
      window.open('https://helpfeel.com/littlefamily-ec/contact', '_blank');
    },
    handleWindowOpenHelpFeel() {
      window.open('https://helpfeel.com/littlefamily-ec/', '_blank');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/landing/home';
</style>
