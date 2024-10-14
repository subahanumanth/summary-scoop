import Footer from "./components/Footer";
import Form from "./components/Form";
import Header from "./components/Header";

function App() {
  return (
    <div className="flex items-center justify-center background-img">
      <div className="w-[900px] text-center py-12">
        <Header />
        <Form />
        <Footer />
      </div>
    </div>
  );
}

export default App;
