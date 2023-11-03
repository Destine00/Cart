// components
import Navbar from "./Navbar";
import CartContainer from "./CartContainer";
import { useAppCtx } from "./Context";

function App() {
  const { loading } = useAppCtx();
  if (loading) {
    return <main>
      <div className="loading" style={{marginTop: "8rem"}}></div>
    </main>
  }
  return (
    <main>
      <Navbar />
      <CartContainer />
    </main>
  );
}

export default App;
