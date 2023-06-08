const Link = ReactRouterDOM.Link;
const Route = ReactRouterDOM.Route;

const App = () => <Piano />;

$(document).ready(() => {
  ReactDOM.render(<App />, document.getElementById("root"));
});
