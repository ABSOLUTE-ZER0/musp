import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { removeModal } from "../../actions/modalActions";
import { connect } from "react-redux";
import { addForm } from "../../actions/formActions";
import { setAlert } from "../../actions/alertActions";
import PropTypes from "prop-types";
import Alert from "./Alert";

import "../../css/layout/AddPostModal.css";

const AddPostModal = ({ modal, removeModal, user, setAlert, addForm }) => {
  const handleClose = () => {
    removeModal();
  };

  const [post, setPost] = useState({
    title: "",
    description: "",
    type: "general",
    tags: "",
    post_color: "var(--general)",
  });


  const handleInput = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const submitPost = async () => {
    let tags = post.tags.split(",");
    tags.map((tag, index) => (tags[index] = tags[index].trim()));
    tags = tags.filter((item) => item !== "");

    const postData = {
      title: post.title,
      desc: post.description,
      type: post.type,
      tags,
      post_color: post.post_color,
      author: user._id,
      author_color: user.color,
      author_name: user.name,
    };
    const res = await addForm(postData);
    if (res && res.errors) {
      setAlert(res.errors[0].msg, "warning");
    }
  };

  return (
    <div>
      <Modal
        size='lg'
        contentClassName='appPostModalContent'
        className='addPostModal__modal'
        show={modal.addPostModal}
        closeButton
        onHide={handleClose}>
        <Modal.Header
          style={{ backgroundColor: post.post_color }}
          closeButton
          className='addPostModal__header one-edge-shadow'>
          <p>
            <i className='far fa-edit'></i> Ask a Question
          </p>
        </Modal.Header>
        <Alert />
        <div className='addPostModal__body'>
          <div>
            <i className='fas fa-heading'></i>
            <p> Title: </p>
            <div className='addPostModal__input-div'>
              <input
                className='addPostModal__input'
                type='text'
                name='title'
                onChange={handleInput}
                placeholder='Title'
                value={post.title}
                autoComplete='off'
              />
            </div>
          </div>

          <div>
            <i className='fab fa-wpforms'></i>
            <p> Description: </p>
            <div className='addPostModal__input-div'>
              <textarea
                rows={5}
                className='addPostModal__input'
                type='text'
                name='description'
                onChange={handleInput}
                placeholder='Explain your problem in great detail!'
                value={post.password}
                autoComplete='off'
              />
            </div>
          </div>

          <div className='addPostModal__formControl-div'>
            <i className='fas fa-cubes'></i>
            <p> Type: </p>
            <Form.Group>
              <Form.Control
                className='addPostModal__formControl'
                as='select'
                style={{ backgroundColor: post.post_color }}
                onChange={(e) => {
                  setPost({
                    ...post,
                    post_color: `var(--${e.target.value})`,
                    type: e.target.value,
                  });
                }}>
                <option>general</option>
                <option>management</option>
                <option>homework</option>
                <option>frustration</option>
                <option>casual</option>
              </Form.Control>
            </Form.Group>
          </div>

          <div>
            <i className='fas fa-tags'></i>
            <p> Tags: </p>
            <div className='addPostModal__input-div'>
              <input
                className='addPostModal__input'
                type='text'
                name='tags'
                onChange={handleInput}
                placeholder='Separate tags via space'
                value={post.tags}
                autoComplete='off'
              />
            </div>
          </div>
        </div>
        <button onClick={submitPost} className='btn addPostModal__button'>
          Submit
        </button>
      </Modal>
    </div>
  );
};

AddPostModal.propTypes = {
  modal: PropTypes.object,
  removeModal: PropTypes.func.isRequired,
  addForm: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  modal: state.modal,
});

export default connect(mapStateToProps, { removeModal, addForm, setAlert })(
  AddPostModal
);
