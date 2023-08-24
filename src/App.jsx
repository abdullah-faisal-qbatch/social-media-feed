import React from "react";
import SocialMedia from "./components/SocialMedia";
import { Provider } from "react-redux";
import store from "./redux/store";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Provider store={store}>
      <SocialMedia></SocialMedia>
      {/* <HeartComponent></HeartComponent> */}
    </Provider>
  );
}

export default App;
