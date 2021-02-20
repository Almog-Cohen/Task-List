import { LoginPage } from "./modules/LoginPage/LoginPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "./App.css";
import ProjectsInfoPage from "./modules/InfoPage/InfoPage";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector(state => state.auth.userData)

  return (
    <div className="app-container">
      <Router>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/info">
            {/* projects info page is available only after login */}
            {isLoggedIn ? <ProjectsInfoPage /> : <Redirect to="/login" />}
          </Route>
          <Route path="/">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
