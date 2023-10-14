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
          path="/bahasa"
          exact
          component={(props) => app.action.withFooter([props, bahasa.view])}
        />
        <Route
          path="/bass"
          exact
          component={(props) => {
            return app.action.withFooter([props, bass.view]);
          }}
        />
        <Route
          path="/chord"
          exact
          component={(props) => app.action.withFooter([props, chord.view])}
        />
        <Route
          path="/chordAdmin"
          exact
          component={(props) => app.action.withFooter([props, chordAdmin.view])}
        />
        <Route
          path="/clone"
          exact
          component={(props) => {
            return app.action.withFooter([props, clone.view]);
          }}
        />
        <Route
          path="/computer"
          exact
          component={(props) => app.action.withFooter([props, computer.view])}
        />
        <Route
          path="/einstein"
          exact
          component={(props) => app.action.withFooter([props, einstein.view])}
        />
        <Route
          path="/game"
          exact
          component={(props) => app.action.withFooter([props, game.view])}
        />
        <Route
          path="/garden"
          exact
          component={(props) => {
            return app.action.withFooter([props, garden.view]);
          }}
        />
        <Route
          path="/penny"
          exact
          component={(props) => {
            return app.action.withFooter([props, penny.view]);
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
        <Route
          path="/fa"
          exact
          component={(props) => {
            return app.action.withFooter([
              props,
              () => (
                <div className="row-a" style={{ margin: "3em" }}>
                  {bigegi84icon.map((it, i) => (
                    <div key={i} className="circle-a">
                      <i className={"fa-solid fa-" + it}></i>
                    </div>
                  ))}
                </div>
              ),
            ]);
          }}
        />
      </ReactRouterDOM.HashRouter>
    ),
  };
  document.title = bigegi84state.fullName + ", " + bigegi84state.degree["id"];
  ReactDOM.render(<app.view />, document.getElementById("root"));
})();
