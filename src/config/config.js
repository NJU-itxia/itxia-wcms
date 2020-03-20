const config = {
  network: {
    api: {
      protocol: "http",
      host: "localhost:34543"
    }
  },
  oauth: {
    qq:
      "https://graph.qq.com/oauth2.0/authorize?response_type=token&client_id=101842907&redirect_uri=https%3A%2F%2Fapi.itxia.cn%2Foauth%2Fqq&scope=get_user_info"
  },
  etc: {
    name: "ITXIA后台系统",
    footer: {
      text: "南京大学IT侠-web组 © 2019"
    }
  }
};

export { config };
