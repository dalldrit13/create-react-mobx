import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Routes from "./routes";
import Loading from "./components/loading";

const App = () => {
  return (
    <Suspense fallback={<Loading style={{ height: "100vh" }} />}>
      <Router>
        <Toaster />
        <Routes />
      </Router>
    </Suspense>
  );
};

export default App;
