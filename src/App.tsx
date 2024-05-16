import MainDashboard from "./components/MainDashboard";
import Title from "./layout/Title";
import NavBar from "./layout/NavBar";

function App() {
  return (
    <div className="mx-3">
      <header>
        <NavBar />
      </header>
      <main>
        <Title />
        <MainDashboard />
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
