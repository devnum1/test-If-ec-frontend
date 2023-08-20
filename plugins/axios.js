import { get, isEmpty, isNull } from 'lodash';
import { API_FETCH_POLICY_INFO, API_FETCH_DOG_BREED } from '~/api';

export default function ({ $axios, error, store, app }) {
  $axios.setHeader('Accept', 'application/json');
  $axios.setHeader('securityCode', 'GOwkVXKH+aZvc4xtC8E'); // securityCodeをheaderに追加しないと動かないAPIがあるので
  $axios.setHeader('Content-Type', 'application/json; charset=utf-8');

  // TODO: hostMapできたら元に戻す
  const host = window.location.host || 'localhost:3000';
  // $axios.setBaseURL(hostMap[host] || 'http://localhost:8000');
  $axios.setBaseURL('http://localhost:3000');

  const cognitoKeyPrefix = `CognitoIdentityServiceProvider.${process.env.userPoolWebClientId}`;

  $axios.interceptors.request.use(function (config) {
    const lastAuthUser = localStorage.getItem(
      `${cognitoKeyPrefix}.LastAuthUser`
    );

    const idToken = localStorage.getItem(
      `${cognitoKeyPrefix}.${lastAuthUser}.idToken`
    );

    // TODO:一旦全てのリクエストに認証をつけているがログイン周りの実装後にどのAPIはtokenやsecrutiCodeを必要とするのかを確認して、必要なものだけheaderに追加するようにするようにする
    if (idToken) {
      config.headers.post['Authorization'] = `Bearer ${idToken}`;
      const { END_POINT } = API_FETCH_DOG_BREED;
      if ($axios.getUri(config) !== END_POINT) {
        config.headers.get['Authorization'] = `Bearer ${idToken}`;
      }
    }
    store.commit('setLoading', true);
    return config;
  });

  $axios.interceptors.response.use(
    ({ data, config }) => {
      store.commit('setLoading', false);

      // handle for get mypage/contracts
      const { END_POINT } = API_FETCH_POLICY_INFO;
      if ($axios.getUri(config) === END_POINT) {
        const requestData = JSON.parse(config.data);

        if (!requestData.policyId && !requestData.policyCode) {
          return {
            policy: {},
          };
        }
      }

      return data;
    },
    (e) => {
      store.commit('setLoading', false);
      // TODO:axiosエラー時処理。一旦コメントアウト
      // // server error
      // const statusCode = e.response ? parseInt(e.response.status) : 500;

      // // if (statusCode >= 500) {
      // //   // app.router.push('/errors/system_error/');
      // //   return Promise.reject(e);
      // // }

      // // return error({ statusCode });
    }
  );
}
