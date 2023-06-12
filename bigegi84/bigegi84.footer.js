const bigegi84footer = {
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
      </footer>
    );
  },
};
