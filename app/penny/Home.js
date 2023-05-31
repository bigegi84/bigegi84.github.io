const Home = (props) => {
  return (
    <div>
      <div className="container position-sticky z-index-sticky top-0">
        <div className="row">
          <div className="col-12">
            <nav className="navbar navbar-expand-lg blur border-radius-xl top-0 z-index-3 shadow position-absolute my-3 py-2 start-0 end-0 mx-4">
              <div className="container-fluid ps-2 pe-0">
                <a
                  className="navbar-brand font-weight-bolder ms-lg-0 ms-3"
                  href="../../template/material-dashboard/pages/dashboard.html"
                >
                  {state.appName}
                </a>
                <button
                  className="navbar-toggler shadow-none ms-2"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navigation"
                  aria-controls="navigation"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon mt-2">
                    <span className="navbar-toggler-bar bar1"></span>
                    <span className="navbar-toggler-bar bar2"></span>
                    <span className="navbar-toggler-bar bar3"></span>
                  </span>
                </button>
                <div className="collapse navbar-collapse" id="navigation">
                  <ul className="navbar-nav mx-auto">
                    <li className="nav-item">
                      <a
                        className="nav-link d-flex align-items-center me-2 active"
                        aria-current="page"
                        href="../../template/material-dashboard/pages/dashboard.html"
                      >
                        <i className="fa fa-chart-pie opacity-6 text-dark me-1"></i>
                        Dashboard
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link me-2"
                        href="../../template/material-dashboard/pages/profile.html"
                      >
                        <i className="fa fa-user opacity-6 text-dark me-1"></i>
                        Profile
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link me-2"
                        href="../../template/material-dashboard/pages/sign-up.html"
                      >
                        <i className="fas fa-user-circle opacity-6 text-dark me-1"></i>
                        Sign Up
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link me-2"
                        href="../../template/material-dashboard/pages/sign-in.html"
                      >
                        <i className="fas fa-key opacity-6 text-dark me-1"></i>
                        Sign In
                      </a>
                    </li>
                  </ul>
                  <ul className="navbar-nav d-lg-flex d-none">
                    <li className="nav-item d-flex align-items-center">
                      <a
                        className="btn btn-outline-primary btn-sm mb-0 me-2"
                        target="_blank"
                        href="https://www.creative-tim.com/builder?ref=navbar-material-dashboard"
                      >
                        Online Builder
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="https://www.creative-tim.com/product/material-dashboard"
                        className="btn btn-sm mb-0 me-1 bg-gradient-dark"
                      >
                        Free download
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <main className="main-content mt-0">
        <div
          className="page-header align-items-start min-vh-100"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80)`,
          }}
        >
          <span className="mask bg-gradient-dark opacity-6"></span>
          <div className="container my-auto">
            <div className="row">
              <div className="col-lg-4 col-md-8 col-12 mx-auto">
                <div className="card z-index-0 fadeIn3 fadeInBottom">
                  <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                      <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">
                        Sign in
                      </h4>
                      <div className="row mt-3">
                        <div className="col-2 text-center ms-auto">
                          <a className="btn btn-link px-3" href="javascript:;">
                            <i className="fa fa-facebook text-white text-lg"></i>
                          </a>
                        </div>
                        <div className="col-2 text-center px-1">
                          <a className="btn btn-link px-3" href="javascript:;">
                            <i className="fa fa-github text-white text-lg"></i>
                          </a>
                        </div>
                        <div className="col-2 text-center me-auto">
                          <a className="btn btn-link px-3" href="javascript:;">
                            <i className="fa fa-google text-white text-lg"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <form role="form" className="text-start">
                      <div className="text-center">
                        <button
                          type="button"
                          className="btn bg-gradient-primary w-100 my-4 mb-2"
                          onClick={() => {
                            props.history.push("/new");
                          }}
                        >
                          New
                        </button>
                      </div>
                      <div className="text-center">
                        <button
                          type="button"
                          className="btn bg-gradient-primary w-100 my-4 mb-2"
                        >
                          Load
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer className="footer position-absolute bottom-2 py-2 w-100">
            <div className="container">
              <div className="row align-items-center justify-content-lg-between">
                <div className="col-12 col-md-6 my-auto">
                  <Copyright />
                </div>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};
