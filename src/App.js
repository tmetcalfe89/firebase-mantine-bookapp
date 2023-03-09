import AppWrapper from "components/AppWrapper";
import { useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { auth } from "./api/firebase";
import Loading from "./views/Loading";
import Public from "./views/Public";
import User from "./views/User";

function App() {
  const [user, loadingUser] = useAuthState(auth);

  if (loadingUser) {
    return <Loading />;
  }

  if (!user) {
    return <Public />;
  }

  return <User user={user} />;
}

export default function WrappedApp() {
  const Router = useMemo(
    () => (process.env.NODE_ENV === "development" ? BrowserRouter : HashRouter),
    []
  );

  return (
    <Router>
      <AppWrapper>
        <App />
      </AppWrapper>
    </Router>
  );
}
