import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="pt-2  text-2xl font-extrabold bg-clip-text text-transpsarent bg-linear-to-r from-pink-500 to-violet-500"
    >
      ANBU
    </Link>
  );
}
