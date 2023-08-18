import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import NewsFeed from "./components/NewsFeed";
import { Provider } from "react-redux";
import store from "./redux/store";
import UsersFeed from "./components/UsersFeed";

function App() {
  return (
    <div
    // style={{
    //   display: "flex",
    //   flexDirection: "row",
    // }}
    >
      <div>
        <NewsFeed></NewsFeed>
      </div>
      <div>
        <UsersFeed></UsersFeed>
      </div>{" "}
    </div>
  );
}

export default App;
