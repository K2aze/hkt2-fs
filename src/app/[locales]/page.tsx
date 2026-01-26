import { BackgroundVideo } from "@/components/heroSection/backgroundVideo";
import Header from "@/components/layouts/Header";
function home() {
  return (
    <>
      <Header />
      <main>
        <div className="hero">
          <BackgroundVideo />
        </div>
      </main>
    </>
  );
}

export default home;
