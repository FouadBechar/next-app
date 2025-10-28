import NavBar from "../../components/NavBar";
import ContentSections from "../../components/ContentSections";
import Footer from "../../components/Footer";
import "../globals.css";

export const metadata = {
  title: "Environmental Protection & More | Fouad Bechar",
  authors: [{ name: "Fouad Bechar" }],
  description:
    "Environmental protection, social justice, domestic violence, web hosting, artificial intelligence, and many other important topics.",
};

export default function Home() {
  return (
    <>
      <NavBar />
      <ContentSections />
      <Footer />
    </>
  );
}
