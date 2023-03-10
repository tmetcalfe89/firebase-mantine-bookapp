import AppWrapper from "components/AppWrapper";
import UserProvider, { UserContext } from "context/UserContext";
import { useContext, useMemo } from "react";
import { BrowserRouter, HashRouter } from "react-router-dom";
import Loading from "./views/Loading";
import Public from "./views/Public";
import User from "./views/User";

function App() {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Public />;
  }

  return <User />;
}

export default function WrappedApp() {
  const Router = useMemo(
    () => (process.env.NODE_ENV === "development" ? BrowserRouter : HashRouter),
    []
  );

  return (
    <Router>
      <UserProvider>
        <AppWrapper>
          <App />
        </AppWrapper>
      </UserProvider>
    </Router>
  );
}
