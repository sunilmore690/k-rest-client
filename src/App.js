import "./styles.css";
import React from "react";
import Login from "./Login";
import Rest from "./Rest";
import UpdraftClient from "./client";
export default function App() {
  let [loggedin, setLoggedin] = React.useState(false);
  let [client, setClient] = React.useState(null);
  let [error, setError] = React.useState(null);
  let [host, setHost] = React.useState("");
  async function handleAuthenticate(host, username, password) {
    try {
      client = new UpdraftClient("wss://" + host);
      await client.authenticate(username, password);
      setClient(client);
      setHost(host);
      setLoggedin(true);
    } catch (e) {
      setError(e);
    }
  }
  function handleError(error) {
    setError(error);
  }

  return (
    <div className="row">
      <div>
        <h4>REST Client</h4>
        {loggedin ? (
          <div>
            <div style={{ paddingBottom: "10px" }}>
              <span>Host : </span> <b>{host}</b>
            </div>
            <Rest client={client} handleError={handleError} host={host} />
          </div>
        ) : (
          <Login handleCallback={handleAuthenticate} />
        )}
      </div>
      {error ? (
        <div className="bg-danger" style={{ marginTop: "10px" }}>
          <span>{typeof error === "string" ? error : error.message}</span>
        </div>
      ) : null}
    </div>
  );
}
