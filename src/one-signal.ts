import * as OneSignal from "@onesignal/node-onesignal";

const app_key_provider = {
  getToken() {
    return process.env.ONESIGNAL_API_KEY;
  },
};

const config = OneSignal.createConfiguration({
  authMethods: {
    app_key: {
      tokenProvider: app_key_provider,
    },
  },
});

export const client = new OneSignal.DefaultApi(config);
