import React, { useEffect, useState } from "react";
import Header from "../../layout/Header";
import Form from "../../layout/Form";
import UserId from "../../layout/UserId";
import { showAppPostModal } from "../../../actions/modalActions";
import { setAlert } from "../../../actions/alertActions";
import {
  loadForms,
  filterForm,
  setForms,
  searchPost,
  getfavouritePost,
} from "../../../actions/formActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Container } from "react-bootstrap";
import AddPostModal from "../../layout/AddPostModal";
import Alert from "../../layout/Alert";
import FooterLarge from "../../layout/FooterLarge";

import "../../../css/home/Home.css";
import classNames from "classnames";
import { Link } from "react-router-dom";
import Loader from "../../layout/Loader";
import { setUsers } from "../../../actions/authActions";

const Home = ({
  auth,
  modal,
  form,
  loadForms,
  filterForm,
  showAppPostModal,
  setForms,
  searchPost,
  getfavouritePost,
  setAlert,
  setUsers,
}) => {
  const [type, setType] = useState(null);
  const [mainType, setMainType] = useState("all");
  const [searchAlert, setSearchAlert] = useState(false);
  const [search, setSearch] = useState("");
  useEffect(() => {
    async function fetchData() {
      await loadForms();
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadForms]);

  const filterPost = async (e) => {
    const type = { type: e.target.name };
    setType(e.target.name);
    setMainType(null);
    const res = await filterForm(type);
    setForms(res);
  };

  const getFavourites = async () => {
    setMainType("fav");
    setType(null);
    const res = await getfavouritePost();
    setForms(res.data);
  };

  const getUsers = async () => {
    setMainType("users");
    setType(null);
    const filter = "";
    const res = await searchPost(filter, "users");
    res && setUsers(res.data);
  };

  const searchForm = async (e) => {
    setSearch(e.target.value);
    const filter = e.target.value;
    let res = null
    if(mainType === "users"){
    res = await searchPost(filter, "users");
    res && setUsers(res.data);
    } else{
    res = await searchPost(filter, type);
    res && (await setForms(res.data));
    if (res && res.data.length === 0) {
      setSearchAlert(true);
      setAlert(
        "No such post found! Create a new question with your query",
        "warning"
      );
      setTimeout(() => setSearchAlert(false), 5000);
    }
    }
    
  };

  const searchFormButton = async () => {
    const res = await searchPost(search, type);
    res && setForms(res.data);
    if (res && res.data.length === 0) {
      setSearchAlert(true);
      setAlert(
        "No such post found! Create a new question with your query",
        "warning"
      );
      setTimeout(() => setSearchAlert(false), 5000);
    }
  };

  return (
    <div>
      <Header page='header__forum' />
      <Container className='home__main-div'>
        <div className='home__tool-div box-shadow'>
          <button
            onClick={() => {
              showAppPostModal();
            }}
            className='home__add-btn box-shadow'>
            Ask a Question
          </button>
          <div>
            <button
              className={classNames("home__all-form home__button", {
                activeMain: mainType === "all",
              })}
              onClick={async () => {
                setType(null);
                setMainType("all");
                setForms(await filterForm());
              }}>
              <i className='far fa-comments'></i>All Questions
            </button>
            <button
              onClick={getFavourites}
              className={classNames("home__favourite-form home__button", {
                activeMain: mainType === "fav",
              })}>
              <i className='fas fa-star'></i>Favourite
            </button>
            <button
              onClick={getUsers}
              className={classNames("home__users-form home__button", {
                activeMain: mainType === "users",
              })}>
              <i className='fas fa-users'></i>Users
            </button>
            {modal.addPostModal ? <AddPostModal user={auth.user} /> : null}
          </div>
          <div>
            <button
              name='general'
              id='home__general'
              className={classNames("home__type-form home__button", {
                active: type === "general",
              })}
              onClick={filterPost}>
              <i
                style={{ color: "var(--generalSolid)" }}
                className='fas fa-square'></i>
              General
            </button>
            <button
              id='home__management'
              className={classNames("home__type-form home__button", {
                active: type === "management",
              })}
              name='management'
              onClick={filterPost}>
              <i
                style={{ color: "var(--managementSolid)" }}
                className='fas fa-square'></i>
              Management
            </button>
            <button
              id='home__homework'
              className={classNames("home__type-form home__button", {
                active: type === "homework",
              })}
              name='homework'
              onClick={filterPost}>
              <i
                style={{ color: "var(--homeworkSolid)" }}
                className='fas fa-square'></i>
              Homework
            </button>
            <button
              id='home__frustration'
              className={classNames("home__type-form home__button", {
                active: type === "frustration",
              })}
              name='frustration'
              onClick={filterPost}>
              <i
                style={{ color: "var(--frustrationSolid)" }}
                className='fas fa-square'></i>
              Frustration
            </button>
            <button
              id='home__casual'
              className={classNames("home__type-form home__button", {
                active: type === "casual",
              })}
              name='casual'
              onClick={filterPost}>
              <i
                style={{ color: "var(--casualSolid)" }}
                className='fas fa-square'></i>
              Casual
            </button>
          </div>
        </div>
        <div className='home__form-div'>
          {searchAlert && <Alert />}
          <div className='home__search-div one-edge-shadow-1'>
            <input
              value={search}
              onChange={searchForm}
              className='home__search'
              placeholder='Search...'
            />
            <button onClick={searchFormButton} className='home__search-button'>
              Search
            </button>
          </div>
          {mainType === "users" ? (
            auth.isUsersLoading ? (
              <Loader />
            ) : (
              auth.users &&
              auth.users.map((user, index) => (
                <Link
                  key={index}
                  to={`/profile/${user._id}`}
                  className='home__link'>
                  <UserId user={user} />
                </Link>
              ))
            )
          ) : form.formsIsLoading ? (
            <Loader />
          ) : (
            form.forms &&
            form.forms.map((form, index) => (
              <Link key={index} to={`/post/${form._id}`} className='home__link'>
                <Form form={form} />
              </Link>
            ))
          )}
        </div>
      </Container>
      <FooterLarge />
    </div>
  );
};

Home.propTypes = {
  loadForms: PropTypes.func.isRequired,
  filterForm: PropTypes.func.isRequired,
  showAppPostModal: PropTypes.func.isRequired,
  setForms: PropTypes.func.isRequired,
  getfavouritePost: PropTypes.func.isRequired,
  searchPost: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  auth: PropTypes.object,
  modal: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  modal: state.modal,
  form: state.form,
});

export default connect(mapStateToProps, {
  loadForms,
  filterForm,
  showAppPostModal,
  getfavouritePost,
  setForms,
  searchPost,
  setAlert,
  setUsers,
})(Home);
