import "./App.css";
import { PointsProvider } from "./Providers/PointsProviders";
import { PointFeed } from "./Components/PointFeed";

function App() {
  return (
    <PointsProvider>
      <PointFeed />
    </PointsProvider>
  );
}

export default App;
