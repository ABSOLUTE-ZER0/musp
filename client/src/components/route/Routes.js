import React, { Fragment, useEffect, useState } from "react";
import { checkAuth } from "../../actions/authActions";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../pages/home/Home";
import Auth from "../pages/auth/Auth";
import About from "../pages/others/About";
import Verify from "../pages/auth/Verify";
import Event from "../pages/event/Event";
import Library from "../pages/library/Library";
import LibrarySearch from "../pages/library/LibrarySearch";
import FormDetails from "../pages/home/FormDetails";
import { connect } from "react-redux";

function Routes({ auth, checkAuth }) {
  const [type, setType] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setType(await checkAuth());
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkAuth]);

  return type && (
    <Fragment>
      <Router>
      {type === "auth" && (
          <Switch>
            <Route path='/*' component={Auth} />
          </Switch>
        )}
        {type === "verify" && (
          <Switch>
            <Route exact path='/login' component={Auth} />
            <Route exact path='/*' component={Verify} />
          </Switch>
        )}

        {type === "clear" &&(
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/library' component={Library} />
            <Route exact path='/library/search/:searchParam/:pageParam' component={LibrarySearch} />
            <Route exact path='/event' component={Event} />
            <Route exact path='/about' component={About} />
            <Route exact path='/login' component={Auth} />
            <Route exact path='/verify' component={Verify} />
            <Route exact path='/post/:id' component={FormDetails} />
          </Switch>
        )}

      </Router>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  checkAuth,
})(Routes);
