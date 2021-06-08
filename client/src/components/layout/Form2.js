import "../../css/layout/Form2.css";

const Form2 = ({ form, user }) => {
  return (
    <div
      style={{
        border: `1px solid ${form.post_color
          .substring(0, form.post_color.length - 1)
          .concat("Solid)")}`,
        backgroundColor: form.post_color,
      }}
      className='form2__main-div one-edge-shadow-1'>
      <div>
        <div
          style={user && { backgroundColor: `${user.color}`, color: user.textColor }}
          className='form__profile-img'>
          {user && user.name[0]}
        </div>

        <div className='form__details'>
          <p className='form2__title'>{form.title}</p>
          <p className='form2__desc'>{form.desc}</p>
          <div className='form__tags'>
            {form.tags &&
              form.tags.slice(0, 6).map((tags, index) => (
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

export default Form2;
