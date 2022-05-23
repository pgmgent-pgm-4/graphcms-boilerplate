import {
  gql,
  useQuery,
} from "@apollo/client";
import { useParams } from "react-router-dom";

// Custom components
import { PostDetailsComponent } from '../components/posts';

// GraphQL queries
const POST = gql`
query GetPostById($id: ID!) {
  post(where: {id: $id}) {
    title
    id
    body {
      html
    }
    createdAt
    imageUrl
    link
    authUser {
      username
    }
  }
}
`;

const PostDetailsPage = () => {
  let params = useParams();
  let postId = (params.postId);

  console.log(postId);

  const { loading, error, data } = useQuery(POST, { 
    variables: {
      id: postId
    }
  });

  const gqlResult = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
      <PostDetailsComponent post={data.post} />
    );
  };

  return (
    <>
      {gqlResult()}
    </>
  )
};

export default PostDetailsPage;