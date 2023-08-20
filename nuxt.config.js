const appEnv = process.env.APP_ENV;
const envSet = require(`./.environment/${appEnv}.ts`);

const cognitoConfig = {
  region: envSet.COGNITO_REGION,
  userPoolId: envSet.COGNITO_POOL_ID,
  userPoolWebClientId: envSet.COGNITO_CLIENT_ID,
};

const paymentGMOConfig = {
  shopId: envSet.GMO_SHOP_ID,
};

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    htmlAttrs: {
      lang: 'ja',
    },
    title: 'わんデイズ／にゃんデイズ｜お見積り・お申込み手続き',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, user-scalable=no',
      },
      {
        hid: 'description',
        name: 'description',
        content:
          'わんデイズ／にゃんデイズ｜使いやすさと充実の補償を実現した保険です。',
      },
      {
        hid: 'og:title',
        name: 'og:title',
        content: 'わんデイズ／にゃんデイズ｜お見積り・お申込み手続き',
      },
      { hid: 'og:type', name: 'og:type', content: 'website' },
      { hid: 'og:image', name: 'og:image', content: '/OGP_image.jpeg' },
      {
        hid: 'og:description',
        name: 'og:description',
        content:
          'わんデイズ／にゃんデイズ｜使いやすさと充実の補償を実現した保険です。',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700;900&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap',
      },
    ],
    script: [
      {
        src: envSet.DEVELOPMENT
          ? 'https://stg.static.mul-pay.jp/ext/js/token.js'
          : 'https://static.mul-pay.jp/ext/js/token.js',
        body: true,
      },
      {
        src: 'https://helpfeel.com/projects/js/helpfeel-element.js',
        body: false,
        'data-project-name': 'littlefamily',
      },
    ],
  },

  ssr: false,

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~/assets/scss/global.scss'],

  env: {
    ...cognitoConfig,
    ...paymentGMOConfig,
    WEBCAS_URL: envSet.WEBCAS_URL,
    INSURANCE_CLAIM_URL: envSet.INSURANCE_CLAIM_URL,
    INS_AGENT_NO: envSet.INS_AGENT_NO,
    HELP_URL: envSet.HELP_URL,
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/misc.client' },
    { src: '~/plugins/veelidate' },
    { src: '~/plugins/lodash' },
    { src: '~/plugins/amplify', mode: 'client' },
    { src: '~/plugins/auth', mode: 'client' },
    { src: '~/plugins/helpers' },
    '@/plugins/axios.js',
    { src: '~/plugins/v-mask', mode: 'client' },
    { src: '~/plugins/filters' },
    { src: '~/plugins/smooth-scroll', ssr: false },
    { src: '~/plugins/vue-cookie' },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    //
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/gtm',
    '@nuxtjs/style-resources',
    [
      'nuxt-i18n',
      {
        locales: [
          {
            code: 'ja',
            iso: 'ja-JP',
            file: 'ja.js',
          },
        ],
        lazy: true,
        langDir: 'locales/',
        defaultLocale: 'ja',
        strategy: 'no_prefix',
      },
    ],
  ],

  styleResources: {
    scss: ['~/assets/scss/abstracts/abstracts.scss'],
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    babel: {
      compact: false,
    },
  },

  gtm: {
    id: envSet.GTM_ID || 'GTM-5XXHVDB',
    enabled: true,
    debug: envSet.DEVELOPMENT || false,
    pageTracking: true,
    respectDoNotTrack: false,
  },

  publicRuntimeConfig: {
    cognito: cognitoConfig,
    gtm: {
      id: `${envSet.GTM_ID}&runtime`,
    },
  },

  privateRuntimeConfig: {
    cognito: cognitoConfig,
  },

  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'email-expired',
        path: '/email/expired',
        component: resolve(
          __dirname,
          'pages/solicitation/contracts/agreement/expired.vue'
        ),
      });
    },
  },
};
