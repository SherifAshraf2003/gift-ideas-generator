import Navbar from "@/components/Navbar";
import Home from "@/components/Home";
const App = () => {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center flex-col h-[90vh]">
        <Home />
      </div>
    </div>
  );
};

export default App;
