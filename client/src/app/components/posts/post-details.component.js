const PostDetailsComponent = ({post}) => {
  return (
    <div className="post-details">
      <h1>{post.title}</h1>
      <p>{post.description}</p>
      <div className="" dangerouslySetInnerHTML={{ __html: post.body.html }}>
      </div>
    </div>
  )
};

export default PostDetailsComponent;