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
      <footer
        className="wrapper style1 align-center"
        style={{
          boxShadow:
            "inset 0 1px 0 0 " +
            bigegi84store.theme[bigegi84store.theme.value].textColor,
        }}
      >
        <div className="inner">
          <ul className="icons">
            {bigegi84state.link.map(([name, link, icon], i) => (
              <li key={i}>
                <a
                  target="_blank"
                  href={link}
                  className={"circle-a"}
                  style={{
                    boxShadow:
                      "inset 0 0 0 1px " +
                      bigegi84store.theme[bigegi84store.theme.value].textColor,
                  }}
                >
                  <i
                    style={{
                      color:
                        bigegi84store.theme[bigegi84store.theme.value]
                          .textColor,
                    }}
                    className={icon}
                  />
                </a>
              </li>
            ))}
          </ul>
          <p className="text-gold-a">
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
