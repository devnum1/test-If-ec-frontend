// 01EZTX9M3AWK0ZB16B6KYR56F1

export default async function ({ store, redirect }) {
  await store.dispatch('auth/load');

  if (store.getters['auth/isAuthenticated']) {
    return redirect('/mypage/contracts/');
  }
}
