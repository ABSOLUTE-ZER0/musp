import "../../css/layout/Form.css";
import { getUserById } from "../../actions/authActions"
import {useEffect, useState} from "react"
import { connect } from "react-redux";
import PropTypes from 'prop-types'


var dateFormat = require("dateformat");

const Form = ({ form , getUserById, user }) => {
  const descLength = 100;
  const titleLength = 50;
  const [author, setAuthor] = useState(null)

  useEffect(() => {
    async function fetchData() {
      if(!user){
        setAuthor(await getUserById(form.author));
      } else {
        setAuthor(user)
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUserById]);

  let date = new Date(form.date);

  date = dateFormat(date, "fullDate");

  return (
    <div
      style={{ backgroundColor: form.post_color }}
      className='form__main-div one-edge-shadow-1'>
      <div>
        <div
          style={author && { backgroundColor: `${author.color}` }}
          className='form__profile-img'>
          {author && author.name[0]}
        </div>

        <div className='form__details'>
          <p className='form__title'>
            {form.title.length > titleLength
              ? form.title.substring(0, titleLength) + " ..."
              : form.title}
          </p>
          <p className='form__start-date'>
            {author ? author.name : null} on {date}
          </p>
          <p className='form__desc'>
            {form.desc.length > descLength
              ? form.desc.substring(0, descLength) + " ..."
              : form.desc}
          </p>
          <div className='form__tags'>
            {form.tags &&
              form.tags.slice(0, 6).map((tags,index) => (
                <div
                  className='form__tag'
                  key={index}
                  style={{
                    backgroundColor: `${form.post_color
                      .substring(0, form.post_color.length - 1)
                      .concat("Solid)")}`,
                  }}>
                  {tags}
                </div>
              ))}
          </div>
        </div>
        <div className='form__count'>
          <div className='form__comment-count'>
            <div>
              <i className='fas fa-comment'></i>
              {form.comments.length}
            </div>
            <div>
              <i className='fas fa-thumbs-up'></i>
              {form.upvoteList.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


Form.propTypes = {
  getUserById: PropTypes.func.isRequired,
};


export default connect(null, {
  getUserById,
})(Form);

