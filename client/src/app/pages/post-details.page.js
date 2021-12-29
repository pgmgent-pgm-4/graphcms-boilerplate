import {
  gql,
  useQuery,
} from "@apollo/client";
import { useParams } from "react-router-dom";

// Custom components
import { PostDetailsComponent } from '../components/posts';

// GraphQL queries
const POST = gql`
query GetPost($id: ID!) {
  post(where: {id: $id}) {
    id
    title
    description
    body {
      html
    }
    tags {
      id
      name
    }
    category {
      id
      name
    }
  }
}
`;

const PostDetailsPage = () => {
  let params = useParams();
  let postId = (params.postId);

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