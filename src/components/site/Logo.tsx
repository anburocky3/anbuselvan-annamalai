import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="text-2xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-pink-500 to-violet-500 hover:opacity-90 transition-opacity"
    >
      ANBU
    </Link>
  );
}
