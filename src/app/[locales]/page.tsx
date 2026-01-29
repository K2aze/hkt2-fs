import {
  Atmosphere,
  Attractions,
  Collection,
  Essence,
  HeroSection,
  Map,
  TravelInfo,
  TripPlaner,
} from "@/components/home";
function home() {
  return (
    <>
      <HeroSection />
      <Attractions />
      <Essence />
      <Atmosphere />
      <Collection />
      <Map />
      <TripPlaner />
      <TravelInfo />
    </>
  );
}

export default home;
