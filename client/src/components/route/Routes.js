import React, { Fragment, useEffect, useState } from "react";
import { checkAuth } from "../../actions/authActions";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../pages/home/Home";
import Auth from "../pages/auth/Auth";
import About from "../pages/others/About";
import Verify from "../pages/auth/Verify";
import ForgotPasswordRequest from "../pages/auth/ForgotPasswordRequest";
import ForgotPasswordResponce from "../pages/auth/ForgotPasswordResponce";
import Event from "../pages/event/Event";
import Library from "../pages/library/Library";
import LibrarySearch from "../pages/library/LibrarySearch";
import BookDetails from "../pages/library/BookDetails";
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
            <Route exact path='/login/forgot' component={ForgotPasswordRequest} />
            <Route exact path='/login/forgot/:id' component={ForgotPasswordResponce} />
            <Route path='/*' component={Auth} />
          </Switch>
        )}
        {type === "verify" && (
          <Switch>
            <Route exact path='/login' component={Auth} />
            <Route exact path='/login/forgot' component={ForgotPasswordRequest} />
            <Route exact path='/login/forgot/:id' component={ForgotPasswordResponce} />
            <Route exact path='/*' component={Verify} />
          </Switch>
        )}

        {type === "clear" &&(
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/library' component={Library} />
            <Route exact path='/library/search/:searchParam/:pageParam' component={LibrarySearch} />
            <Route exact path='/library/book/:id' component={BookDetails} />
            <Route exact path='/event' component={Event} />
            <Route exact path='/about' component={About} />
            <Route exact path='/login' component={Auth} />
            <Route exact path='/login/forgot' component={ForgotPasswordRequest} />
            <Route exact path='/login/forgot/:id' component={ForgotPasswordResponce} />
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
