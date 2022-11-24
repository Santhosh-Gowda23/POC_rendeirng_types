import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div>Hello! Welcome to my application</div>
      <br></br>
      <br></br>
      <br></br>
      <Link href="/plp">
        to view plp <button>click here</button>
      </Link>
    </>
  );
}
