import useForm from "../lib/useForm";
import Form from "./styles/Form";

export default function CreateProduct() {
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    image: "",
    name: "Nice Shoes",
    price: 500,
    description: "These are the best shoes",
  });
  return (
    <Form onSubmit={(e) => {
      e.preventDefault();
      console.log(inputs)
    }}>
      <fieldset>
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

        <button type="submit" onClick={resetForm}>
          + Add Product
        </button>
      </fieldset>
    </Form>
  );
}
