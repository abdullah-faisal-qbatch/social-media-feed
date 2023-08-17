import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import NewsFeed from "./components/NewsFeed";
import { Provider } from "react-redux";
import store from './redux/store'

function App() {
  return (
  <>
    <NewsFeed></NewsFeed>
    </>
  );
}

export default App;
