import Create from "./components/Create";
import List from "./components/List";


function App() {
  return (
    <div className="container-fluid">
    <div className="row">
      <div className="col-sm-6">
      <List />
    </div>
      <div className="col-sm-6">
      <Create />
    </div>
    </div>
    </div>
  );
}

export default App;
