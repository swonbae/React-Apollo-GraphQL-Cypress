import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route } from "react-router-dom";
import logo from "./NBA20Secondary20Logo.jpg";
import Games from "./components/Games";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <p className="font-bold text-red-700 text-3xl">Homepage</p>
        <Games />
      </div>
    </ApolloProvider>
  );
}

export default App;
