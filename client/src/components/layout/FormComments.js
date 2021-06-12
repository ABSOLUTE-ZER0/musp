import "../../css/layout/FormComments.css";
import { getUserByIdBasic } from "../../actions/authActions";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

var dateFormat = require("dateformat");

const FormComments = ({ comment, post_color, getUserByIdBasic }) => {
  const [author, setAuthor] = useState(null);
  const [date, setDate] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setAuthor(await getUserByIdBasic(comment.author));
    }
    fetchData();

    return () => {
      setAuthor(null);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUserByIdBasic]);

  if (comment && !date) {
    const temp = new Date(comment.date)
    setDate(dateFormat(temp, "fullDate"));
  }

  return (
    <div
      style={{ backgroundColor: post_color }}
      className='formComments__main-div one-edge-shadow-1'>
      <div>
        <Link
          to={author && `/profile/${author._id}`}
          style={author && { backgroundColor: author.color, color: author.textColor }}
          className='formComments__profile-img'>
          {author && author.name[0]}
          {author && author.isOnline && <i className="fas fa-circle form__online-circle"></i>}
        </Link>

        <div className='formComments__details'>
          <p className='formComments__start-date'>
            <h1>{author && author.name}</h1>
            <p>{date}</p>
          </p>
          <p className='formComments__desc'>{comment.desc}</p>
        </div>
      </div>
    </div>
  );
};

FormComments.propTypes = {
  getUserByIdBasic: PropTypes.func.isRequired,
};

export default connect(null, {
  getUserByIdBasic,
})(FormComments);
