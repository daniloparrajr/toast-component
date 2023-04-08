import React from "react";

import ToastPlayground from '../ToastPlayground';
import Footer from '../Footer';
import ToastShelf from "../ToastShelf";
import ToastProvider from "../../providers/ToastProvider";

function App() {
  return (
    <ToastProvider>
      <ToastShelf />
      <ToastPlayground />
      <Footer />
    </ToastProvider>
  );
}

export default App;
