<template>
  <main class="main top">
    <div class="">
      <div class="section-slider">
        <VueSlickCarousel v-bind="settings">
          <div class="slide-item px-2">
            <a :href="`${corpBaseUrl}/product/wandays_nyandays/`">
              <picture>
                <source
                  srcset="~/assets/images/home-page/carousel_PC_202207.webp"
                  media="(min-width: 576px)"
                  alt=""
                  type="image/webp"
                />
                <source
                  srcset="~/assets/images/home-page/carousel_PC_202207.png"
                  media="(min-width: 576px)"
                  alt=""
                />
                <source
                  srcset="~/assets/images/home-page/carousel_SP_202207.webp"
                  type="image/webp"
                  alt=""
                />
                <img
                  src="~/assets/images/home-page/carousel_SP_202207.png"
                  alt=""
                />
              </picture>
            </a>
          </div>
          <div class="slide-item px-2">
            <a :href="`${corpBaseUrl}/corporate/`">
              <picture>
                <source
                  srcset="~/assets/images/home-page/carousel_PC3.webp"
                  type="image/webp"
                  alt=""
                />
                <img src="~/assets/images/home-page/carousel_PC3.png" alt="" />
              </picture>
            </a>
          </div>
        </VueSlickCarousel>
      </div>
    </div>

    <div class="to-page-button-container">
      <button
        id="corporate_apply"
        type="button"
        class="btn btn--orange btn--full mw-279 home-button tracking"
        @click="$router.push('/solicitation/step1/')"
      >
        <div class="">
          <img src="~/assets/images/landing/Group 942.svg" />
        </div>
        <span class="btn__text"> お見積り・<br />お申込み </span>
        <i class="icon-fonts icon-fonts--arrow-right" />
      </button>
      <button
        id="coporate_myPage"
        type="button"
        class="btn btn--default btn--full mw-279 home-button tracking"
        @click="handleRedirectMyPage"
      >
        <i class="icon-fonts icon-fonts--user-menu" />
        <span class="btn__text owner-text"> ご契約者さまマイページ </span>
        <i class="icon-fonts icon-fonts--arrow-right" />
      </button>
    </div>
    <!-- 商品情報 -->
    <section class="product">
      <h1 class="product-top_title">商品情報</h1>
      <div class="product-top">
        <p class="product-top_logo">
          <img
            src="~/assets/images/logo/1line_bg_white.svg"
            class="2"
            alt="わんデイズ・にゃんデイズ"
            width="532"
            height="82"
            decoding="async"
            loading="lazy"
          />
        </p>
        <p class="product-top_sub-title">ペット保険で後悔したくない方へ</p>
        <ul class="product-top_list">
          <li class="product-top_item">
            <p class="product-top_item-text">
              <strong class="product-top_item-text--emphasis"
                >月額1,270円</strong
              >
              <span class="product-top_item-text--memo">※B</span>
              <span>から</span>
            </p>
          </li>
          <li class="product-top_item">
            <p class="product-top_item-text">
              <span>通院・入院・手術を</span>
              <strong class="product-top_item-text--emphasis"
                >フルカバー</strong
              >
            </p>
          </li>
          <li class="product-top_item">
            <p class="product-top_item-text">
              <span>保険料の</span>
              <strong class="product-top_item-text--emphasis"
                >値上がりが緩やか</strong
              >
            </p>
          </li>
        </ul>
        <ul class="note">
          <li class="note_item">
            <p class="text cursor-pointer note_notice-text">
              <span class="note_notice-text-notice"> ※B </span>
              <span> 猫・補償割合50%・月払い・0歳から2歳の場合 </span>
            </p>
          </li>
        </ul>
      </div>
      <section class="product-price">
        <h2 class="product_title product_title">
          業界最安クラス<span class="product_title--memo">※A</span>の生涯保険料
        </h2>
        <p class="product-price_title-desc">
          毎月の保険料を抑えるだけでなく、<br class="sp" />一生涯払う保険料も<br
            class=""
          />業界最安クラス<span class="product-price_title-desc--memo">※A</span
          >を実現しました。
        </p>
        <div class="note">
          <ul class="">
            <li class="note_item note_item--center">
              <p
                v-if="open_1"
                class="text cursor-pointer note_notice-text"
                @click="open_1 = !open_1"
              >
                <span class="note_notice-text-notice"> ※A </span>
                <span class="note_notice-text-underline">
                  <span>業界最高クラス・最高水準の理由</span
                  ><span class="close-text">クリックで閉じる</span>
                </span>
              </p>
              <p v-else class="note_notice-text" @click="open_1 = !open_1">
                <span class="note_notice-text-notice"> ※A </span>
                <span class="note_notice-text-underline">
                  <span>業界最安クラスの理由は</span
                  ><span class="open-text cursor-pointer">こちら</span
                  >をクリック
                </span>
              </p>
            </li>
          </ul>
          <p v-if="open_1" class="toggle-note">
            犬（トイ・プードル）と猫の保険料について、ペット保険を扱う保険会社（2020年12月末日時点）のうち、補償内容がホームページで確認ができ補償割合が70%の商品がある保険会社14社の中で、0歳～20歳
            ※ⅰ
            の各年齢の合計保険料を合算した保険料が上位2社内であることから、「生涯保険料業界最安水準（一生涯のお支払い業界最安水準）」と表記しています。
            ※ⅰ
            20歳までの保険料が未公開の場合は、公開されている最高年齢の保険料を据え置きとしております。
            <br />
            <br />
            ＜各社との比較条件※ⅱ＞
            ●補償内容：通院・入院・手術を含むプラン　●補償割合70％　●特約：付帯しない　●免責：なし、または最低基準で設定　●払込方法：月払　●割引：なし
            <br />
            <br />
            <br />
            ※ⅱ
            比較した各社の商品は、支払限度額や除外できない診療費用以外の補償の有無等、契約内容・条件等に相違があります。お客さまによる比較・ご検討に際しては、各社の重要事項説明書等の内容を十分にご確認ください。
          </p>
        </div>
        <p class="product-price_price-table">
          <picture>
            <source
              srcset="~/assets/images/home-page/product-appeal_table.webp"
              media="(min-width: 576px)"
              alt="ポイントは生涯保険料 気づいていますか？支払い合計額の差！ あなたの保険料18歳まで払うと合計は？ 18歳までの合計支払額 当社約60万"
              type="image/webp"
            />
            <source
              srcset="~/assets/images/home-page/product-appeal_table.png"
              media="(min-width: 576px)"
              alt="ポイントは生涯保険料 気づいていますか？支払い合計額の差！ あなたの保険料18歳まで払うと合計は？ 18歳までの合計支払額 当社約60万"
            />
            <source
              srcset="~/assets/images/home-page/product-appeal_table-sp.webp"
              type="image/webp"
              alt="ポイントは生涯保険料 気づいていますか？支払い合計額の差！ あなたの保険料18歳まで払うと合計は？ 18歳までの合計支払額 当社約60万"
            />
            <img
              src="~/assets/images/home-page/product-appeal_table-sp.png"
              alt="ポイントは生涯保険料 気づいていますか？支払い合計額の差！ あなたの保険料18歳まで払うと合計は？ 18歳までの合計支払額 当社約60万"
            />
          </picture>
        </p>
        <ul class="note">
          <li class="note_item">
            <p class="text cursor-pointer note_notice-text">
              <span class="note_notice-text-notice"> (注) </span>
              <span>
                上記のグラフは将来の保険料を約束するものではありません。保険料の改定がある場合、上記の保険料は変わります。
              </span>
            </p>
          </li>
          <li class="note_item">
            <p class="text cursor-pointer note_notice-text">
              <span class="note_notice-text-notice"> ※C </span>
              <span> 猫・補償割合70%の保険料 </span>
            </p>
          </li>
        </ul>
      </section>
      <section class="product-plan">
        <span class="product-plan_sub-title"
          >手軽に備える？しっかり備える？</span
        >
        <h2 class="product_title product-plan_title">選べる2つのプラン</h2>
        <ul class="product-plan_img-list">
          <li
            v-for="item in productPlanList"
            :key="item.id"
            class="product-plan_img-item"
          >
            <picture>
              <source
                :srcset="
                  require(`~/assets/images/home-page/${item.imgName}.webp`)
                "
                media="(min-width: 576px)"
                :alt="item.alt"
                type="image/webp"
              />
              <source
                :srcset="
                  require(`~/assets/images/home-page/${item.imgName}.png`)
                "
                media="(min-width: 576px)"
                :alt="item.alt"
              />
              <source
                :srcset="
                  require(`~/assets/images/home-page/${item.imgName}-sp.webp`)
                "
                type="image/webp"
                :alt="item.alt"
              />
              <img
                :src="
                  require(`~/assets/images/home-page/${item.imgName}-sp.webp`)
                "
                :alt="item.alt"
              />
            </picture>
          </li>
        </ul>
      </section>
      <section class="product-compensation">
        <h2 class="product_title">
          業界最高クラス<span class="product_title--memo">※E</span>の手厚い補償
        </h2>
        <p
          class="product-compensation_sub-title product-compensation_sub-title"
        >
          <strong
            class="product-compensation_sub-title product-compensation_sub-title--strong"
            >120万円まで</strong
          >補償
          <span
            class="product-compensation_sub-title-compensation product-compensation_sub-title--memo"
          >
            （通院・入院・手術の補償額合計）</span
          >
        </p>
        <ul class="product-compensation_list">
          <li
            v-for="item in productCompensationList"
            :key="item.id"
            class="product-compensation_item"
          >
            <picture>
              <source
                :srcset="
                  require(`~/assets/images/home-page/${item.imgName}.webp`)
                "
                type="image/webp"
                :alt="item.alt"
              />
              <img
                decoding="async"
                loading="lazy"
                width="568"
                :src="require(`~/assets/images/home-page/${item.imgName}.png`)"
                :alt="item.alt"
              />
            </picture>
          </li>
        </ul>
        <p class="product-compensation_desc product-compensation_desc-box">
          一番使う回数が多い通院費<span
            class="product-compensation_desc product-compensation_desc--memo"
            >※H</span
          >にも使える、<br />
          <strong
            class="product-compensation_desc product-compensation_desc--strong"
            >フルカバータイプ</strong
          >の保険です。<br />さらに、支払回数は
          <strong
            class="product-compensation_desc product-compensation_desc--strong"
            >無制限<br /></strong
          >支払限度額まで<strong
            class="product-compensation_desc product-compensation_desc--strong"
            ><br />何度でも<span
              class="product-compensation_desc product-compensation_desc--memo product-compensation_desc--memo--g"
              >※G</span
            ></strong
          >お受け取りいただけます
        </p>

        <div class="to-page-button-container to-page-button-container--second">
          <button
            id="corporate_apply"
            type="button"
            class="btn btn--orange btn--full mw-279 home-button tracking order-sp order-2-sp"
            @click="$router.push('/solicitation/step1/')"
          >
            <div class="">
              <img src="~/assets/images/landing/Group 942.svg" />
            </div>
            <span class="btn__text"> お見積り・<br />お申込み </span>
            <i class="icon-fonts icon-fonts--arrow-right" />
          </button>
          <a
            :href="`${corpBaseUrl}/product/wandays_nyandays/`"
            class="btn btn--green-outline order-sp order-1-sp"
          >
            <span class="btn__text btn__text--full"
              >詳しくはこちら
              <i class="icon-fonts icon-fonts--arrow-right" />
            </span>
          </a>
        </div>

        <ul class="note">
          <li class="note_item">
            <template v-if="open_2">
              <p class="text note_notice-text">
                <span class="note_notice-text-notice"> ※E </span>
                <span class="">
                  <span
                    >ペット保険を扱う保険会社（2020年12月末日時点）のうち、補償内容がホームページで確認ができ補償割合が70％の商品がある保険会社14社の中で、入院・通院・手術の支払限度額の合計が上位2社内であることから、「業界最高クラスの手厚い補償」・「ペット保険業界で最高水準」と表記しています。</span
                  >
                  <span
                    class="note_notice-text-underline note_notice-text-close cursor-pointer"
                    @click="open_2 = !open_2"
                    >少なく表示する</span
                  >
                </span>
              </p>
            </template>
            <p
              v-if="!open_2"
              class="note_notice-text"
              @click="open_2 = !open_2"
            >
              <span class="note_notice-text-notice"> ※E </span>
              <span class="">
                <span>業界最高クラスの理由は</span
                ><span class="open-text cursor-pointer">こちら</span>をクリック
              </span>
            </p>
          </li>
          <li class="note_item">
            <p class="text note_notice-text">
              <span class="note_notice-text-notice"> ※H </span>
              <span>
                当社の提携している動物病院の過去1年間の保険金の支払回数に基づいて表記しています
              </span>
            </p>
          </li>
          <li class="note_item">
            <p class="text note_notice-text">
              <span class="note_notice-text-notice"> ※G </span>
              <span>
                ご契約いただいたコースの定める支払限度額まで、保険期間中の保険金のお受取りは回数無制限となります。
              </span>
            </p>
          </li>
        </ul>
      </section>
    </section>

    <div class="notice">
      <div class="title">お知らせ</div>

      <div class="notice__list">
        <div v-for="news in newsList" :key="news.id" class="notice__item">
          <div class="notice__date">
            {{ news.postDate }}
          </div>
          <div class="notice__title">
            <a
              class="notice__title-content"
              :href="news.cmsPdf ? news.cmsPdf.url : news.externalPdfLink"
              target="_blank"
              >{{ news.title }}</a
            >
            <span v-if="news.newFrag" class="notice__label">＜NEW＞</span>
          </div>
        </div>
      </div>
      <div>
        <nuxt-link tag="a" to="/news/" class="btn btn--green-outline">
          <span class="btn__text btn__text--full"
            >お知らせ一覧
            <i class="icon-fonts icon-fonts--arrow-right" />
          </span>
        </nuxt-link>
      </div>
    </div>

    <div class="partner">
      <div class="partner-content">
        <div class="title">パートナー</div>
        <div class="brand-logo">
          <div class="brand-item">
            <a href="https://aioinissaydowa.co.jp/" target="_blank">
              <img src="~/assets/images/landing/brand1.svg" />
            </a>
          </div>
          <div class="brand-item banner-logo-peco">
            <a href="https://peco-japan.com/" target="_blank">
              <img
                src="~/assets/images/home-page/peco-logo.svg"
                width="113"
                height="80"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="banner-intro">
      <a :href="`${corpBaseUrl}/corporate/`" class="pointer">
        <img
          src="~/assets/images/home-page/aboutus-sp.png"
          class="image-sp sp2"
          alt=""
          width="315"
          height="165"
          decoding="async"
          loading="lazy"
        />
        <div class="banner-image -aboutus pc2">
          <picture>
            <source
              srcset="~/assets/images/home-page/aboutus.webp"
              type="image/webp"
              alt=""
              loading="lazy"
            />
            <img
              src="~/assets/images/home-page/aboutus.png"
              class="bg"
              alt="About Us 会社概要とわたしたちの想い read more"
              decoding="async"
              loading="lazy"
            />
          </picture>
          <div class="banner-content left">
            <div>
              <h3 class="title">About Us</h3>
            </div>
            <div class="banner-desc">会社概要とわたしたちの想い</div>
            <div class="read-more">
              read more
              <svg
                class="arrow"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0 11C2.65553e-07 17.0751 4.92487 22 11 22C17.0751 22 22 17.0751 22 11C22 4.92487 17.0751 -2.65552e-07 11 0C4.92487 2.65553e-07 -2.65552e-07 4.92487 0 11ZM6.4165 11C6.4165 10.4937 6.82691 10.0833 7.33317 10.0833H12.4538L11.2687 8.89819C10.9107 8.5402 10.9107 7.9598 11.2687 7.60182C11.6267 7.24384 12.2071 7.24384 12.5651 7.60182L15.3151 10.3518C15.487 10.5237 15.5835 10.7569 15.5835 11C15.5835 11.2431 15.487 11.4763 15.3151 11.6482L12.5651 14.3982C12.2071 14.7561 11.6267 14.7561 11.2687 14.3982C10.9107 14.0402 10.9107 13.4598 11.2687 13.1018L12.4538 11.9167H7.33317C6.82691 11.9167 6.4165 11.5063 6.4165 11Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </div>
      </a>
    </div>
  </main>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel';
import { mapActions } from 'vuex';
import moment from 'moment';

export default {
  components: {
    VueSlickCarousel,
  },
  layout: 'homepage',
  data() {
    return {
      settings: {
        // 'centerMode': true,
        // 'centerPadding': '24px',
        // 'focusOnSelect': true,
        slidesToShow: 1,
        speed: 500,
        button: false,
        autoplay: true,
        arrows: true,
        dots: true,
        infinite: true,
        adaptiveHeight: true,
        responsive: [
          {
            breakpoint: 320,
            settings: {
              centerPadding: '12px',
            },
          },
        ],
      },
      open_1: false,
      open_2: false,
      newsList: [],
    };
  },
  computed: {
    productPlanList() {
      return [
        {
          imgName: 'plan1',
          id: 'productAppeal-1',
          alt: '手術に備える50%プランの表',
        },
        {
          imgName: 'plan2',
          id: 'productAppeal-2',
          alt: 'しっかりに備える70%プランの表',
        },
      ];
    },
    productCompensationList() {
      return [
        {
          imgName: 'outpatient',
          id: 'productCompensation-1',
          alt: '通院での診察費や投薬などの費用',
        },
        {
          imgName: 'hospitalization',
          id: 'productCompensation-2',
          alt: '入院中の検査や注射・投薬などの費用',
        },
        {
          imgName: 'surgery',
          id: 'productCompensation-3',
          alt: '切開・切除手術や麻酔などの費用',
        },
      ];
    },
    corpBaseUrl() {
      return window.location.origin.includes('http://localhost')
        ? 'https://dev.ad-pet.net'
        : window.location.origin;
    },
  },

  async created() {
    localStorage.setItem('access_insurance', 'home_page');
    try {
      const contents = await this.getNews(5);
      if (contents) {
        contents.forEach((d) => {
          d.postDate = moment(d.postDate).format('YYYY.MM.DD');
        });
        this.newsList = contents;
      }
    } catch (e) {
      console.error(e);
    }
  },

  methods: {
    ...mapActions({
      getNews: 'contracts/getNews',
    }),
    async handleRedirectMyPage() {
      await this.$store.dispatch('auth/logout');
      localStorage.clear();
      this.$router.push('/mypage/contracts/');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/scss/landing/accordion';
@import '~/assets/scss/landing/base';
@import '~/assets/scss/landing/parts';
@import '~/assets/scss/landing/style';
@import '~/assets/scss/landing/tab';
@import '~/assets/scss/landing/home';
@import '~/assets/scss/components/base-buttons';
@import 'vue-slick-carousel/dist/vue-slick-carousel.css';

.pet-container-inner {
  max-width: 768px !important;
}

.owner-text {
  width: 120px !important;
}

.banner-logo-peco {
  widows: 315px;
  height: 80px;
  background-color: $white;
}
// わんデイズ・にゃんデイズロゴsvgのインタラクション(::v-deepで子componentに適用)
.pointer ::v-deep .insurance-product-logo > path {
  transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.pointer:hover,
.pointer:focus {
  ::v-deep .insurance-product-logo > path {
    fill: #fff;
    transition: all 0.25s cubic-bezier(0.55, 0.085, 0.68, 0.53);
  }
}
// 外部リンクアイコンsvgのインタラクション(::v-deepで子componentに適用)
.pointer ::v-deep .link-icon > path {
  transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.pointer:hover,
.pointer:focus {
  ::v-deep .link-icon > path {
    fill: #fff;
    transition: all 0.25s cubic-bezier(0.55, 0.085, 0.68, 0.53);
  }
}
</style>
