const Link = ReactRouterDOM.Link;
const Route = ReactRouterDOM.Route;

const app = {
  view: () => {
    return (
      <div id="top" className="column-a" style={{ margin: "3em" }}>
        <h2>bigegi84 - Pixel Art</h2>
        <pixelArt.view />
      </div>
    );
  },
};

$(document).ready(() => {
  ReactDOM.render(<app.view />, document.getElementById("root"));
});
