import gql from 'graphql-tag';
import { useQuery } from  '@apollo/client';
import styled from 'styled-components';
import Product from './Product';
import { perPage } from '../config';

export const ALL_PRODUCTS_QUERY = gql`
    query ALL_PRODUCTS_QUERY ($skip: Int = 0, $first: Int) {
      allProducts (skip: $skip, first: $first){
        id
        name
        price
        description
        photo {
          id
          image {
            publicUrlTransformed
          }
        }
      }
    }
  `;

const ProductsListStyles = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 60px;
`;

export default function Products({ page }) {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: {
      skip: page * perPage - perPage,
      first: perPage,
    },
  });
  if (loading) return <p>Loading...</p>
  if (error)   return <p>Something went wrong here: {error}</p>
  
  return (
    <ProductsListStyles>
      {data.allProducts.map((product) => (
        <Product product={product} key={product.id}/>
        )
      )}
    </ProductsListStyles>
  )
}

