// 01EZTX9M3AWK0ZB16B6KYR56F1

export default async function ({ store, redirect, route }) {
  if (route.name === 'email-expired') {
    return;
  }

  await store.dispatch('auth/load');

  if (!store.getters['auth/isAuthenticated']) {
    const redirectAfterLogin = [
      'solicitation-contracts-agreement',
      'solicitation-additional_information',
      'mypage-contracts',
      'solicitation-step4',
      'solicitation-additional_information-payment-new',
    ];

    if (redirectAfterLogin.indexOf(route.name) >= 0) {
      let { path, fullPath } = route;

      if (path.slice(-1) !== '/') {
        path += '/';
        fullPath = fullPath.replace(route.path, path);
      }

      sessionStorage.setItem('redirect_after_login', fullPath);
    }
    return redirect('/login/');
  }
}
