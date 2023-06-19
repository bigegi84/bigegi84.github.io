(() => {
  const Link = ReactRouterDOM.Link;
  const Route = ReactRouterDOM.Route;

  const app = {
    action: {
      withFooter: ([props, Children]) => (
        <div style={bigegi84theme.style}>
          <bigegi84Navbar.view {...props} />
          <Children />
          <bigegi84footer.view />
        </div>
      ),
    },
    view: () => (
      <ReactRouterDOM.HashRouter>
        <Route path="/" exact component={bigegi84.view} />
        <Route
          path="/bass"
          exact
          component={(props) => {
            return app.action.withFooter([props, bass.view]);
          }}
        />
        <Route
          path="/clone"
          exact
          component={(props) => {
            return app.action.withFooter([props, clone.view]);
          }}
        />
        <Route
          path="/piano"
          exact
          component={(props) => {
            return app.action.withFooter([props, piano.view]);
          }}
        />
        <Route
          path="/pixel-art"
          exact
          component={(props) => {
            return app.action.withFooter([props, pixelArt.view]);
          }}
        />
        <Route
          path="/ukulele"
          exact
          component={(props) => {
            return app.action.withFooter([props, ukulele.view]);
          }}
        />
        <Route
          path="/guitar"
          exact
          component={(props) => {
            return app.action.withFooter([props, guitar.view]);
          }}
        />
        <Route
          path="/drum"
          exact
          component={(props) => {
            return app.action.withFooter([props, drum.view]);
          }}
        />
      </ReactRouterDOM.HashRouter>
    ),
  };
  document.title = bigegi84state.fullName + ", " + bigegi84state.degree["id"];
  ReactDOM.render(<app.view />, document.getElementById("root"));
})();
