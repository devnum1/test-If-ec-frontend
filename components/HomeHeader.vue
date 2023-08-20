<template>
  <header class="homepage-header">
    <div class="global-header">
      <div class="nav-icon" @click="display = true">
        <i class="icon-fonts icon-fonts--menu" />
      </div>
      <div class="logo">
        <router-link to="/">
          <img src="~/assets/images/logo/litle-family.svg" />
        </router-link>
      </div>
      <div class="global-nav">
        <a :href="helpUrl" target="_blank">
          <div class="btn">
            <div><i class="icon-fonts icon-fonts--mail" /></div>
            <div class="">お問合せ</div>
          </div>
        </a>
        <a>
          <div class="btn" @click="handleRedirectMyPage">
            <div><i class="icon-fonts icon-fonts--user-menu" /></div>
            <div class="">マイページ</div>
          </div>
        </a>
      </div>
    </div>
    <div class="navigation">
      <ul class="navigation-container">
        <li class="pointer dropdown-nav">
          <a :href="`${corpBaseUrl}/product/`">保険商品</a>
          <ul class="dropdown-list">
            <li>
              <a
                :href="`${corpBaseUrl}/product/wandays_nyandays/`"
                class="link"
              >
                わんデイズ/にゃんデイズ
              </a>
            </li>
          </ul>
        </li>
        <li class="pointer dropdown-nav">
          <a :href="helpUrl" target="_blank">カスタマーサポート</a>
          <ul class="dropdown-list">
            <li @click="handleRedirectMyPage">
              <div class="link">ご契約者さま用マイページ</div>
            </li>
            <li>
              <a class="link" :href="helpUrl" target="_blank">
                よくあるご質問
              </a>
            </li>
            <li>
              <a
                class="link"
                href="https://helpfeel.com/littlefamily-ec/contact"
                target="_blank"
              >
                お問合せ
              </a>
            </li>
          </ul>
        </li>
        <li class="pointer dropdown-nav">
          <a :href="`${corpBaseUrl}/corporate/`" class="about-us">About Us</a>
          <ul class="dropdown-list">
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
        </li>
      </ul>
    </div>
    <div v-if="display" class="menu">
      <div class="menu__overlay" @click="display = false" />
      <div class="menu__container">
        <div class="menu__close-button">
          <div class="icon-fonts--close float-right" @click="display = false" />
        </div>
        <div v-if="!showchildrenMenu" class="menu__body mt-40">
          <div
            v-for="list in listmenuHome"
            :key="list.menuId"
            class="menu__body-row d-flex"
            @click="handleNextChild(list.menuId)"
          >
            <div class="menu__info-label font-16px">
              {{ list.name }}
            </div>
            <div class="menu__icon-right" />
          </div>
        </div>
        <div v-else class="menu__body mt-40">
          <div class="menu__body-top menu__body-row" @click="handleBack">
            <div class="menu__icon-right" />
            <span class="menu__body-top-text">
              {{ listChildrenMenu.name }}
            </span>
          </div>
          <div class="menu__body-child">
            <div
              v-for="list in listChildrenMenu.menuChildren"
              :key="list.id"
              @click="display = false"
            >
              <nuxt-link
                v-if="!list.href"
                :to="list.link"
                class="menu__body-row d-flex"
              >
                <div class="menu__info-label font-14px">
                  {{ list.name }}
                </div>
                <div class="menu__icon-right" />
              </nuxt-link>
              <a
                v-else
                :href="`${list.absolute ? list.link : corpBaseUrl + list.link}`"
                class="menu__body-row d-flex"
              >
                <div class="menu__info-label font-14px">
                  {{ list.name }}
                </div>
                <div class="menu__icon-right" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
import listMenu from '~/constants/list_menu_home';
export default {
  data() {
    return {
      display: false,
      listmenuHome: listMenu,
      listChildrenMenu: null,
      showchildrenMenu: false,
    };
  },
  computed: {
    corpBaseUrl() {
      return window.location.origin.includes('http://localhost')
        ? 'https://dev.ad-pet.net'
        : window.location.origin;
    },
    helpUrl() {
      return process.env.HELP_URL;
    },
  },

  watch: {
    display(to, from) {
      if (!from) {
        this.showchildrenMenu = false;
      }
    },
  },

  methods: {
    handleNextChild(menuId) {
      this.listChildrenMenu = this.listmenuHome.find((item) => {
        return item.menuId === menuId;
      });
      this.showchildrenMenu = true;
    },
    handleBack() {
      this.showchildrenMenu = false;
    },

    async handleRedirectMyPage() {
      await this.$store.dispatch('auth/logout');
      localStorage.clear();
      this.$router.push('/mypage/contracts/');
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~/assets/scss/landing/home';
.dropdown-nav {
  min-width: 192px;
  position: relative;

  &:hover {
    .dropdown-list {
      display: block;
    }
  }

  .dropdown-list {
    position: absolute;
    display: none;
    background-color: rgba($white, 0.9);
    color: $black;
    transition: all 0.3s linear;
    width: 100%;
    font-size: 13px;
    line-height: 19px;
    text-align: left;
    font-weight: normal;
    padding-top: 10px;

    li {
      position: relative;
      transition: all 0.3s linear;

      &:after {
        content: '\e922';
        font-family: $font-family-icons !important;
        font-style: normal;
        font-weight: 400;
        font-variant: normal;
        text-transform: none;
        line-height: 1;
        // Better Font Rendering
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        position: absolute;
        right: 14px;
        top: 50%;
        transform: translateY(-50%) rotate(180deg);
        font-size: 9px;
        color: rgba($black, 0.6);
      }

      &:hover {
        background-color: $gray-bg;
      }
      .link {
        padding: 10px;
        padding-right: 25px;
        display: block;
        color: $black;
      }
    }
  }
}

.menu {
  position: relative;
  display: flex;
  justify-content: flex-end;

  &__overlay {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    background-color: rgba($black, 0.15);
  }

  &__container {
    background-color: $white;
    padding: 20px;
    width: 240px;
    height: 100%;
    position: fixed;
    top: 0;
    min-height: -webkit-fill-available;
  }

  &__close-button {
    position: absolute;
    right: 22px;
    top: 22px;
    font-size: 14px;
  }

  &__info-label {
    flex-grow: 1;
    color: rgba($black, 0.82);
  }

  &__body-row {
    padding: 12px 0 12px 0;
    border-bottom: 0.5px solid rgba($black-7, 0.15);
    align-items: center;

    &--bottom {
      position: absolute;
      bottom: 30px;
      width: calc(100% - 40px);
      margin-bottom: 20px;
    }
  }

  &__body-top {
    display: flex;
    align-items: center;

    .menu__icon-right {
      transform: rotate(180deg);
      height: 18px;
      width: 18px;
      background-size: 18px 18px;
    }

    &-text {
      font-size: 16px;
      font-weight: $font-weight-bold;
      margin-left: 5px;
    }
  }

  &__body-child {
    padding-left: 23px;
  }

  &__icon-right {
    background-image: url('~assets/images/icon-right.svg');
    width: 14px;
    height: 14px;
    background-repeat: no-repeat;
    background-position: center;
  }
}

.icon-fonts--close {
  cursor: pointer;
}

.about-us {
  letter-spacing: 0.1rem;
}
</style>
