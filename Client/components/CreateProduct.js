import useForm from "../lib/useForm";
import Form from "./styles/Form";
import gql from 'graphql-tag';
import {useMutation} from '@apollo/client'
import DisplayError from './ErrorMessage';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
      name:$name,
      description: $description,
      price: $price,
      status: "AVAILABLE",
      photo: { create: { image: $image, altText: $name}}
    }) {
      id
      description
      price
      name
    }
  }
`;

export default function CreateProduct() {
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    image: "",
    name: "Nice Shoes",
    price: 500,
    description: "These are the best shoes",
  });

  const [createProduct, { loading, error, data }] = useMutation( CREATE_PRODUCT_MUTATION, {
    variables: inputs
  });

  return (
    <Form onSubmit={async (e) => {
      e.preventDefault();
      console.log(inputs)
      await createProduct();
      clearForm();
    }}>
      <DisplayError error={error}/>
      <fieldset disable={loading ? 'true' : 'false'} aria-busy={loading}>
        <label htmlFor="image">
          Image
          <input type="file" id="image" name="image" onChange={handleChange} />
        </label>
        <label htmlFor="name">
          Name
          <input required
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="description"
            value={inputs.description} 
            onChange={handleChange}/>
        </label>

        <button type="submit" onClick={handleChange}>
          + Add Product
        </button>
      </fieldset>
    </Form>
  );
}
