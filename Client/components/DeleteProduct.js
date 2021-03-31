import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

function update(cache, payload) {
  console.log(payload);
  console.log("Running delete function!");
  cache.evict(cache.identify(payload.data.deleteProduct));
}

export default function DeleteProduct({ id, children }) {
  const [
    deleteProduct,
    { loading, error },
  ] = useMutation(DELETE_PRODUCT_MUTATION, { variables: { id }, update });
  return (
    <button
      type="button"
      disabled={loading}
      onClick={() => {
        confirm("DELETE THIS ITEM?");
        deleteProduct().catch((err) => alert(err.message));
      }}
    >
      {children}
    </button>
  );
}
