import React from "react";
import SocialMedia from "./components/SocialMedia";
// import ProfilePost from "./components/ProfilePost";
import { Provider } from "react-redux";
import store from "./redux/store";
import Toast from "./components/Toast";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Avatar from "./components/Avatar";

function App() {
  // const notify = () => toast("Please enter comment value");

  return (
    <Provider store={store}>
      <SocialMedia></SocialMedia>
      {/* <Toast message="Please enter comment value"></Toast>
      <div>
      <button onClick={notify}>Notify!</button>
      <ToastContainer />
    </div> */}
    </Provider>
  );
}

export default App;
