import "./App.css";
import { Toaster } from "react-hot-toast";
import MessageArea from "./components/MessageArea";

function App() {
  return (
    <div className="App">
      <Toaster position="top-center" />
      <MessageArea />
    </div>
  );
}

export default App;
