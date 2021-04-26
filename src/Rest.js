import React from "react";
import RestHistory from "./RestHistory";
import ReactJson from "react-json-view";
const raw = [
  {
    method: "get",
    Url: "/controller/user",
    parameter: "1"
  },
  {
    method: "post",
    Url: "/controller/user",
    payload: {
      name: "Suil"
    }
  }
];
function setRestHistory(host, history) {
  window.localStorage.setItem("rest-client-history", JSON.stringify(history));
}
function getRestHistory(host) {
  let history = window.localStorage.getItem("rest-client-history") || "[]";
  history = JSON.parse(history);
  console.log("localstorage history", history);
  return history;
}
export default function Rest({ client, handleError, host }) {
  let [method, setMethod] = React.useState("get");
  let [Url, setUrl] = React.useState("");
  let [payload, setPayload] = React.useState("{}");
  let [parameter, setParameter] = React.useState("");
  let [res, setRes] = React.useState(null);
  let [history, setHistory] = React.useState(getRestHistory(host));
  React.useEffect(
    function () {
      if (res) {
        setRes(null);
      }
    },
    [method, Url]
  );
  async function handleSubmit(e) {
    e.preventDefault();
    setRes(null);
    handleError(null);
    try {
      let requestBody = null;
      if (method === "get" || method === "delete") {
        requestBody = parameter;
      } else {
        requestBody = JSON.parse(payload);
      }
      console.log(
        `${method} ${Url} ${
          typeof requestBody === "object"
            ? JSON.stringify(requestBody)
            : requestBody
        }`
      );
      let res = await client[method](Url, requestBody);
      setRes(res);
      let finalHistory = [
        {
          method,
          Url,
          parameter,
          payload
        },
        ...history
      ];
      setHistory(finalHistory);
      setRestHistory(host, finalHistory);
    } catch (e) {
      console.error("Invalid Json");
      handleError(e);
    }
    return false;
  }
  function handleSetRest(obj) {
    try {
      setMethod(obj.method || "get");
      setUrl(obj.Url || "");
      if (obj.method === "post" || obj.method === "put") {
        setPayload(JSON.stringify(obj.payload));
      } else {
        setParameter(obj.parameter);
      }
    } catch (e) {}
  }
  return (
    <div className="row">
      <div className="col-sm-4">
        <RestHistory
          historylist={history}
          setRest={handleSetRest}
          host={host}
        />
      </div>
      <div className="col-sm-6 ">
        <form onSubmit={handleSubmit}>
          <div class="form-group">
            <select
              value={method}
              className="form-control"
              onChange={(e) => setMethod(e.target.value)}
            >
              <option value="get">GET</option>
              <option value="post">POST</option>
              <option value="put">PUT</option>
              <option value="delete">DELETE</option>
            </select>
          </div>
          <div class="form-group">
            <input
              placeholder="Enter Request URL"
              type="text"
              value={Url}
              class="form-control"
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          {method === "get" ? (
            <div class="form-group">
              <input
                placeholder="Enter Request Parameter"
                type="text"
                value={parameter}
                class="form-control"
                onChange={(e) => setParameter(e.target.value)}
              />
            </div>
          ) : null}
          {method === "post" || method === "put" ? (
            <div class="form-group">
              <textarea
                placeholder="Enter payload"
                type="password"
                value={payload}
                class="form-control"
                style={{ resize: "vertical" }}
                onChange={(e) => setPayload(e.target.value)}
              />
            </div>
          ) : null}
          <div className="form-group">
            <button type="submit" class="btn btn-success">
              Send
            </button>
          </div>

          {res ? (
            <div class="form-group">
              Status :
              <span
                className={[
                  res.status === 200 ? "text-success" : "text-danger"
                ]}
              >
                {res.status}
              </span>
              <hr />
              <div style={{ maxHeight: "350px", overflowY: "scroll" }}>
                <ReactJson src={res.data} displayDataTypes={false} />
              </div>
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
}
