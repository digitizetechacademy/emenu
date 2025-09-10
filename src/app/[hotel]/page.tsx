import LayoutWrapper from "@/components/layouts/LayoutWrapper";
import AvailableMeals from "@/components/content/AvailableMeals";

export default function HotelPage({ params }: { params: { hotel: string } }) {
  return (
    <LayoutWrapper>
      <AvailableMeals />
    </LayoutWrapper>
  );
}
