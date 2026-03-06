import About from "./components/About";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import More from "./components/More";
import Navigation from "./components/Navigation";
import ProductShowcase from "./components/ProductShowcase";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";

const App = () => {
  return (
    <div className="min-h-screen bg-white text-zinc-800">
      {/* Header */}
      <Navigation />

      {/* Main Dynamic Part */}
      <main id="main-content" className="max-w-8xl mx-auto">
        <Hero />
        <About />
        <Services />
        <ProductShowcase />
        <More />
        <Testimonials />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
