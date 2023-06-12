const bigegi84footer = {
  action: {
    renderAllIcon: bigegi84icon.map((it, i) => (
      <div key={i} className="circle-a">
        <i className={"fa-solid fa-" + it}></i>
      </div>
    )),
  },
  view: () => {
    return (
      <footer className="wrapper style1 align-center">
        <div className="inner">
          <ul className="icons">
            {bigegi84state.link.map(([name, link, icon], i) => (
              <li key={i}>
                <a target="_blank" href={link} className={"circle-a"}>
                  <i className={icon} />
                </a>
              </li>
            ))}
          </ul>
          <p className="bigegi84-copyright">
            &copy; {bigegi84state.fullName}, {bigegi84state.degree.id}{" "}
            {new Date().getFullYear()}
          </p>
        </div>
        {/* <div className="row-a" style={{ margin: "3em" }}>
          {bigegi84footer.action.renderAllIcon}
        </div> */}
      </footer>
    );
  },
};
