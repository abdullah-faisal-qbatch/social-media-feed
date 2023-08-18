import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import NewsFeed from "./components/NewsFeed";
import { Provider } from "react-redux";
import store from "./redux/store";
import UsersFeed from "./components/UsersFeed";

function App() {
  return (
    <>
      {/* <NewsFeed></NewsFeed> */}
      <UsersFeed></UsersFeed>
    </>
  );
}

export default App;
