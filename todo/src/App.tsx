import "./App.css";
import Heading from "./components/Heading/Heading";
import List from "./components/List/List";
import { Provider } from "react-redux";
import { store } from "./Redux/store/store";
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Heading></Heading>
        <List></List>
      </Provider>
    </div>
  );
}

export default App;
