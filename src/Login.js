import React from "react";
export default function Login({ handleCallback }) {
  let [username, setUsername] = React.useState("testuser");
  let [password, setPassword] = React.useState("");
  let [host, setHost] = React.useState("localhost:8009");

  async function handleSubmit(e) {
    e.preventDefault();
    handleCallback(host, username, password);
  }
  return (
    <div className="col-sm-6 col-sm-offset-3">
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label for="email">Username</label>
          <input
            type="text"
            class="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div class="form-group">
          <label for="pwd">Password:</label>
          <input
            type="password"
            class="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div class="form-group">
          <label for="pwd">Host:</label>
          <input
            type="text"
            class="form-control"
            value={host}
            onChange={(e) => setHost(e.target.value)}
          />
        </div>
        <button type="submit" class="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
}
