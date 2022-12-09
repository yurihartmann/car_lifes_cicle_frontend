import { Admin, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
// import { UserList } from "./entities/users";
import { authProvider } from "./auth/authProvider";
import { AssetList } from "./entities/asset";
import { dataProvider } from "./data/data";


const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    <Resource name="AssetTransferContract" list={AssetList} />
  </Admin >
);

export default App;