import React from "react";
import SocialMedia from "./components/SocialMedia";
// import ProfilePost from "./components/ProfilePost";
import { Provider } from "react-redux";
import store from "./redux/store";
// import Avatar from "./components/Avatar";

function App() {
  return (
    <Provider store={store}>
      <SocialMedia></SocialMedia>
    </Provider>
  );
}

export default App;
