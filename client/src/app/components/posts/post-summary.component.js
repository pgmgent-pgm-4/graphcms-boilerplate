import { NavLink } from "react-router-dom";

const PostSummaryComponent = ({post}) => {
  return (
    <div className="post-summary">
      <NavLink to={`/posts/${post.id}`}>
        <h2>{post.title}</h2>
      </NavLink>      
    </div>
  )
};

export default PostSummaryComponent;