import React from "react";
import SocialMedia from "./components/SocialMedia";
import { Provider } from "react-redux";
import store from "./redux/store";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { ToastContext } from "./contexts/ToastContext";

function App() {
  return (
    <Provider store={store}>
      <ToastContainer/>
      <ToastContext.Provider value={toast}>
      <SocialMedia/>
      </ToastContext.Provider>
    </Provider>
  );
}

export default App;
