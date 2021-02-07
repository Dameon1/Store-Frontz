import Link from "next/link";

export default function Nav() {

  return <nav>
    <Link href ="/sell">Sell</Link>
    <Link href ="/orders">Orders</Link>
    <Link href ="/products">Products</Link>
    <Link href ="/accounts">Account</Link>
  </nav>
}