import "../../css/layout/FormComments.css";
import { getUserById } from "../../actions/authActions";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

var dateFormat = require("dateformat");

const FormComments = ({ comment, post_color, getUserById }) => {
  const [author, setAuthor] = useState(null);
  const [date, setDate] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setAuthor(await getUserById(comment.author));
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUserById]);

  if (comment && !date) {
    const temp = new Date(comment.date)
    setDate(dateFormat(temp, "fullDate"));
  }

  return (
    <div
      style={{ backgroundColor: post_color }}
      className='formComments__main-div one-edge-shadow-1'>
      <div>
        <div
          style={author && { backgroundColor: `${author.color}` }}
          className='formComments__profile-img'>
          {author && author.name[0]}
        </div>

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
  getUserById: PropTypes.func.isRequired,
};

export default connect(null, {
  getUserById,
})(FormComments);
