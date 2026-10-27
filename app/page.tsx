import Navbar from "./components/navbar";
import S1 from "./components/s1";
import S2 from "./components/s2";
import S3 from "./components/s3";
import S4 from "./components/s4";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <S1 />
        <S2 />
        <S3 />
        <S4 />
        <Contact />
      </main>
    </>
  );
}
