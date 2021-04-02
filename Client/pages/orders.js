import Products from '../components/Products';
import Pagination from '../components/Pagination';



export default function OrderPage() {
  return (
    <>
      <Pagination page={1}/>
      <Products />
      <Pagination page={1}/>
    </>
  )
         
}