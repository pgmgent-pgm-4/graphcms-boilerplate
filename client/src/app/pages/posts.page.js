import {
  gql,
  useQuery,
} from "@apollo/client";
import { Spinner } from 'reactstrap';

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
    if (loading) return <Spinner
      color="primary"
      size=""
      type="grow"
    >
      Loading...
    </Spinner>;
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