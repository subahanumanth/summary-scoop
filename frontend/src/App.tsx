import Footer from "./components/Footer";
import Form from "./components/Form";
import Header from "./components/Header";

function App() {
  return (
    <div
      className="bg-[#0d0d25] min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('../public/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed", // Makes the background image fixed
      }}
    >
      <div className="w-[900px] text-center px-4 py-12 rounded-lg">
        {/* This inner div can have a slight background to enhance readability */}
        <Header />
        <Form />
        <Footer />
      </div>
    </div>
  );
}

export default App;
