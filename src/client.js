const res = {
  data: {
    login: "ggobi",
    id: 423638,
    node_id: "MDEyOk9yZ2FuaXphdGlvbjQyMzYzOA==",
    url: "https://api.github.com/orgs/ggobi",
    repos_url: "https://api.github.com/orgs/ggobi/repos",
    events_url: "https://api.github.com/orgs/ggobi/events",
    hooks_url: "https://api.github.com/orgs/ggobi/hooks",
    issues_url: "https://api.github.com/orgs/ggobi/issues",
    members_url: "https://api.github.com/orgs/ggobi/members{/member}",
    public_members_url:
      "https://api.github.com/orgs/ggobi/public_members{/member}",
    avatar_url: "https://avatars.githubusercontent.com/u/423638?v=4",
    description: ""
  },
  status: 200
};
export default class UpdraftClient {
  constructor(host) {
    this.host = host;
  }
  authenticate(username, password) {
    return new Promise(function (resolve, reject) {
      setTimeout(resolve, 1000, "Username or password is wrong");
    });
  }
  post() {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 1000, res);
    });
  }
  get() {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 1000, res);
    });
  }
  put() {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 1000, res);
    });
  }
  delete() {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 1000, res);
    });
  }
}
