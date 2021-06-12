import "../../css/layout/Form.css";
import { getUserByIdBasic } from "../../actions/authActions"
import {useEffect, useState} from "react"
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";

const Form = ({ form , getUserByIdBasic }) => {
  const descLength = 100;
  const titleLength = 50;
  const [author, setAuthor] = useState(null)

  useEffect(() => {
    async function fetchData() {
        setAuthor(await getUserByIdBasic(form.author));
    }
    fetchData();

    return () => {
      setAuthor(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUserByIdBasic]);
  
  const timeCalc = (date_future1) => {
    const date_now = new Date();
    const date_future = new Date(date_future1);
    var d = Math.abs(date_future - date_now) / 1000;
    var r = {};
    var s = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    };

    Object.keys(s).every((key) => {
      let time = Math.floor(d / s[key]);
      d -= time * s[key];

      if (time > 1) {
        r = time + " " + key + "s ago";
        return false;
      }

      if (time !== 0) {
        r = time + " " + key + " ago";
        return false;
      }

      return r;
    });

    return r;
  };
  

  return (
    <div
     style={{
        border: `1px solid ${form.post_color
          .substring(0, form.post_color.length - 1)
          .concat("Solid)")}`,
        backgroundColor: form.post_color,
      }}
      className='form__main-div one-edge-shadow-1'>
      <div>
        <Link
          to={author && `/profile/${author._id}`}
          style={author && { backgroundColor: author.color, color: author.textColor }}
          className='form__profile-img'>
          {author && author.name[0]}
          {author && author.isOnline && <i className="fas fa-circle form__online-circle"></i>}
        </Link>

        <div className='form__details'>
          <p className='form__title'>
            {form.title.length > titleLength
              ? form.title.substring(0, titleLength) + " ..."
              : form.title}
          </p>
          <p className='form__start-date'>
            {author ? author.name : null} ~ {timeCalc(form.date)}
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
  getUserByIdBasic: PropTypes.func.isRequired,
};


export default connect(null, {
  getUserByIdBasic,
})(Form);

