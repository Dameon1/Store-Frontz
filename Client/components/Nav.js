import Link from "next/link";
import NavStyles from './styles/NavStyles';
import { useUser } from "./User";


export default function Nav() {
  const user = useUser();
  console.log(user)
  return (
    <NavStyles>
      { !user && (<Link href ="/signin">Sign In</Link>)}
      <Link href ="/sell">Sell</Link>
      { user && ( <>
                    <Link href ="/orders">Orders</Link>
                    <Link href ="/products">Products</Link>
                    <Link href ="/accounts">Account</Link>
                  </> )}
    </NavStyles>
  )
}