import { useState } from "react";
import Photo from "./components/Photo";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      {/* <h1 className="siteTitle">Vivi's Animal Cuties</h1> */}
      <Photo />
    </div>
  );
}

export default App;
