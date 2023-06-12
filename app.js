const Link = ReactRouterDOM.Link;
const Route = ReactRouterDOM.Route;

const app = {
  // view: () => <bigegi84.view />,
  view: () => (
    <ReactRouterDOM.HashRouter>
      {/* <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
    </ul> */}

      <Route path="/" exact component={bigegi84.view} />
      {/* <Route path="/new" component={New} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} /> */}
    </ReactRouterDOM.HashRouter>
  ),
};

$(document).ready(() => {
  ReactDOM.render(<app.view />, document.getElementById("root"));
});
