import NavBar from "./layout/NavBar";
import { UserProvider } from "./context/UserProvider";
import MainContent from "./layout/MainContent";

function App() {
  return (
    <UserProvider>
      <div className="mx-3">
        <header>
          <NavBar />
        </header>
        <MainContent />
        <footer></footer>
      </div>
    </UserProvider>
  );
}

export default App;
