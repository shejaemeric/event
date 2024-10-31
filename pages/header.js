import Link from "next/link";

export default function Header() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/admin/login">Admin Login</Link>
    </nav>
  );
}
