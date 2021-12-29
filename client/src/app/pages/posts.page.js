import {
  gql,
  useQuery,
} from "@apollo/client";

// Custom components
import { PostsListComponent } from '../components/posts';

// GraphQL queries
const POSTS = gql`
query GetPosts {
  posts {
    id
    title
  }
}
`;

const PostsPage = () => {
  const { loading, error, data } = useQuery(POSTS);

  const gqlResult = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
      <PostsListComponent posts={data.posts} />
    );
  };

  return (
    <>
      {gqlResult()}
    </>
  )
};

export default PostsPage;