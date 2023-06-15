(() => {
  const Link = ReactRouterDOM.Link;
  const Route = ReactRouterDOM.Route;

  const app = {
    action: {
      withFooter: (Children) => (
        <div style={bigegi84theme.style}>
          <Children />
          <bigegi84footer.view />
        </div>
      ),
    },
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

        <Route
          path="/"
          exact
          component={() => app.action.withFooter(bigegi84.view)}
        />
        <Route
          path="/piano"
          exact
          component={() => app.action.withFooter(piano.view)}
        />
        <Route
          path="/pixel-art"
          exact
          component={() => app.action.withFooter(pixelArt.view)}
        />
        <Route
          path="/ukulele"
          exact
          component={() => app.action.withFooter(ukulele.view)}
        />
        <Route
          path="/drum"
          exact
          component={() => app.action.withFooter(drum.view)}
        />
        {/* <Route path="/new" component={New} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} /> */}
      </ReactRouterDOM.HashRouter>
    ),
  };
  document.title = bigegi84state.fullName + ", " + bigegi84state.degree["id"];
  ReactDOM.render(<app.view />, document.getElementById("root"));
})();
