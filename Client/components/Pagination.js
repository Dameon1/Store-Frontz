import Head from "next/head";
import Link from "next/link";
import PaginationStyles from "./styles/PaginationStyles";
import { perPage } from "../config";

import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import DisplayError from "./ErrorMessage";

export const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    _allProductsMeta {
      count
    }
  }
`;

export default function Pagination({ page }) {
  const { data, loading, error } = useQuery(PAGINATION_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  const { count } = data._allProductsMeta;
  const pageCount = Math.ceil(count / perPage);
  return (
    <PaginationStyles>
      <Head>
        <title>
          Store Frontz - {page} of {pageCount}
        </title>
      </Head>
      <Link href={`/products/${page - 1}`}>
       <a aria-disabled={page <= 1}> Prev </a>   
      </Link>
      <p>
        Page {page} of {pageCount}
      </p>
      <p>{count} Items</p>
      <Link href={`/products/${page + 1}`}> 
        <a aria-disabled={page >= pageCount}>
          Next
        </a>
      </Link>
    </PaginationStyles>
  );
}
