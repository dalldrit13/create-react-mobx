import Navbar from "../components/navbar";
import Footer from "../components/footer";

interface Props {
  children: any
}

export default function DefaultLayout(props: Props) {
  return (
    <div>
      <Navbar />
      <main>
        {props.children}
      </main>
      <Footer />
    </div>
  );
}
