import Navbar from "../components/Navbar";
import BookTableHero from "./BookTableHero";
import Tables from "./Tables";
import BookingForm from "./BookingForm";

export default function BookPage() {
  return (
    <>
      <Navbar />
      <BookTableHero />
      <Tables />
      <BookingForm />
    </>
  );
}
