import React from "react";

export default function ReactHistoryList({ setRest, historylist = [] }) {
  let [activeIndex, setActiveIndex] = React.useState(0);
  return (
    <React.Fragment>
      <div style={{ marginBottom: "10px" }}>
        <input className="form-control" />
      </div>
      <div class="list-group">
        {historylist.map((obj, index) => (
          <a
            href="#"
            className={
              "list-group-item " + (activeIndex === index ? "active" : "")
            }
            onClick={(e) => {
              setRest(obj);
              setActiveIndex(index);
            }}
            key={"history-" + index}
          >
            {obj.method && obj.method.toUpperCase()} &nbsp;&nbsp;{obj.Url}
          </a>
        ))}
      </div>
    </React.Fragment>
  );
}
