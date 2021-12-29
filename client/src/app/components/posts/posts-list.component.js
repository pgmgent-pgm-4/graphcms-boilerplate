import { Outlet } from "react-router-dom";
import PostSummaryComponent from "./post-summary.component";

const PostsListComponent = ({posts}) => {
  return (
    <div className="posts-list">
      {posts && posts.map((post) => (
        <PostSummaryComponent key={post.id} post={post} />
      ))}
      <Outlet />
    </div>
  )
};

export default PostsListComponent;