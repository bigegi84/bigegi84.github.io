const Link = ReactRouterDOM.Link;
const Route = ReactRouterDOM.Route;

const Login = () => <h1>Login</h1>;
const Register = () => <h1>Register</h1>;

const App = () => (
  <ReactRouterDOM.HashRouter>
    <Route path="/" exact component={Home} />
    <Route path="/new" component={New} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
  </ReactRouterDOM.HashRouter>
);

ReactDOM.render(<App />, document.getElementById(state.prefix + "root"));
