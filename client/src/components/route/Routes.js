import React, { Fragment, useEffect, useState } from "react";
import { checkAuth, setOnline } from "../../actions/authActions";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../pages/home/Home";
import Auth from "../pages/auth/Auth";
import Contact from "../pages/others/Contact";
import Verify from "../pages/auth/Verify";
import ForgotPasswordRequest from "../pages/auth/ForgotPasswordRequest";
import ForgotPasswordResponce from "../pages/auth/ForgotPasswordResponce";
import Event from "../pages/event/Event";
import Library from "../pages/library/Library";
import LibrarySearch from "../pages/library/LibrarySearch";
import BookDetails from "../pages/library/BookDetails";
import FormDetails from "../pages/home/FormDetails";
import NotFound404 from "../pages/others/NotFound404";
import Profile from "../pages/others/Profile";
import OtherProfile from "../pages/others/OtherProfile";
import ScrollToTop from "../layout/ScrollToTop";
import FAQ from "../pages/others/FAQ";
import { connect } from "react-redux";

function Routes({ auth, checkAuth, setOnline }) {
  const [type, setType] = useState(null);
 
  useEffect(() => {
    async function fetchData() {
      setType(await checkAuth());
      await setOnline();
    }
    fetchData();

    const MINUTE_MS = 30000;

    const interval = setInterval(async () => {
      await setOnline();
    }, MINUTE_MS);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkAuth]);

  useEffect( () => () => console.log("unmount"), [] );
  
  return (
    type && (
      <Fragment>
        <Router>
        <ScrollToTop />
          {type === "auth" && (
            <Switch>
              <Route
                exact
                path='/login/forgot'
                component={ForgotPasswordRequest}
              />
              <Route
                exact
                path='/login/forgot/:id'
                component={ForgotPasswordResponce}
              />
              <Route exact path='/contact' component={Contact} />
              <Route exact path='/faq' component={FAQ} />
              <Route path='/*' component={Auth} />
            </Switch>
          )}
          {type === "verify" && (
            <Switch>
              <Route exact path='/' component={Verify} />
              <Route
                exact
                path='/login/forgot'
                component={ForgotPasswordRequest}
              />
              <Route
                exact
                path='/login/forgot/:id'
                component={ForgotPasswordResponce}
              />
              <Route exact path='/contact' component={Contact} />
              <Route exact path='/faq' component={FAQ} />
              <Route exact path='/*' component={Verify} />
            </Switch>
          )}

          {type === "clear" && (
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/library' component={Library} />
              <Route
                exact
                path='/library/search/:searchParam/:pageParam'
                component={LibrarySearch}
              />
              <Route exact path='/library/book/:id' component={BookDetails} />
              <Route exact path='/event' component={Event} />
              <Route exact path='/contact' component={Contact} />
              <Route exact path='/faq' component={FAQ} />
              <Route exact path='/post/:id' component={FormDetails} />
              <Route exact path='/profile' component={Profile} />
              <Route exact path='/profile/:id' component={OtherProfile} />
              <Route exact path='/*' component={NotFound404} />
            </Switch>
          )}
        </Router>
      </Fragment>
    )
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  checkAuth,
  setOnline,
})(Routes);
