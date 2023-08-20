// 01EZTX9M3AWK0ZB16B6KYR56F1

import Amplify from 'aws-amplify';

export default ({ $config }) => {
  const { region, userPoolId, userPoolWebClientId, cookieStorage } =
    $config.cognito;

  Amplify.configure({
    Auth: {
      region,
      userPoolId,
      userPoolWebClientId,
      cookieStorage,
    },
  });
};
