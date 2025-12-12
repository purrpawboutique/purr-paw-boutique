import TestimonialSection from "../TestimonialSection";
import img1 from "@assets/IMG_3083_1765554781753.jpg";
import img2 from "@assets/IMG_3137_1765554802944.jpg";
import img3 from "@assets/IMG_3075_1765554816107.jpg";

const testimonials = [
  {
    id: "1",
    name: "Sarah M.",
    petName: "Luna",
    rating: 5,
    text: "Absolutely stunning quality! Luna looks like a little princess in her holiday cape. The attention to detail is incredible.",
    petImage: img1,
  },
  {
    id: "2",
    name: "James L.",
    petName: "Whiskers",
    rating: 5,
    text: "My cat actually loves wearing these outfits! So comfortable and well-made. Will definitely be ordering more.",
    petImage: img2,
  },
  {
    id: "3",
    name: "Emily R.",
    petName: "Duchess",
    rating: 5,
    text: "The blue gown is even more beautiful in person. Everyone stops us on walks to compliment Duchess!",
    petImage: img3,
  },
];

export default function TestimonialSectionExample() {
  return <TestimonialSection testimonials={testimonials} />;
}
