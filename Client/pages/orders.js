import { useRouter } from 'next/dist/client/router';
import Products from '../components/Products';
import Pagination from '../components/Pagination';



export default function OrderPage() {
  const router = useRouter();
  console.log(router)
  return (
    <>
      <Pagination page={1}/>
      <Products />
      <Pagination page={1}/>
    </>
  )
         
}