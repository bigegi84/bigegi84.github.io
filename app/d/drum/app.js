const Link = ReactRouterDOM.Link;
const Route = ReactRouterDOM.Route;

const app = {
  view: () => {
    return (
      <div id="wrapper" className="divided">
        <section className="banner style1 orient-left content-align-left image-position-right fullscreen onload-image-fade-in onload-content-fade-right">
          <div className="content">
            <h2>bigegi84 - Drum</h2>
            <div className="major">
              <div>
                <div>
                  <div id="chord" className="chord-container"></div>
                  <drum.view />
                </div>
              </div>
            </div>
            <br />
            <p className="major">
              <strong>Dukungan</strong>
            </p>
            <ul className="actions stacked">
              <li>
                <a href="#first" className="bigegi84-saweria button big wide">
                  Get Started
                </a>
              </li>
              <li>
                <a href="#first" className="bigegi84-paypal button big wide">
                  Get Started
                </a>
              </li>
            </ul>
          </div>
        </section>
        <footer className="wrapper style1 align-center">
          <div className="inner">
            <ul className="icons">
              <li>
                <a
                  href="#"
                  className="bigegi84-twitter icon brands style2 fa-twitter"
                >
                  <span className="label">Twitter</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="bigegi84-facebook icon brands style2 fa-facebook-f"
                >
                  <span className="label">Facebook</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="bigegi84-instagram icon brands style2 fa-instagram"
                >
                  <span className="label">Instagram</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="bigegi84-linkedin icon brands style2 fa-linkedin-in"
                >
                  <span className="label">LinkedIn</span>
                </a>
              </li>
              <li>
                <a href="#" className="bigegi84-email icon style2 fa-envelope">
                  <span className="label">Email</span>
                </a>
              </li>
            </ul>
            <p className="bigegi84-copyright"></p>
          </div>
        </footer>
      </div>
    );
  },
};

$(document).ready(() => {
  ReactDOM.render(<app.view />, document.getElementById("root"));
});
