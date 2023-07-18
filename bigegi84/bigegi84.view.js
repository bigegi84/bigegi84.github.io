const bigegi84View = {
  button: ({ name, onClick }) => (
    <button
      className={bigegi84theme.class.button}
      onClick={(e) => (onClick ? onClick(e) : () => {})}
    >
      {name}
    </button>
  ),
  buttonSmall: ({ name, onClick }) => (
    <button
      className={`${bigegi84theme.class.button} small`}
      onClick={(e) => (onClick ? onClick(e) : () => {})}
    >
      {name}
    </button>
  ),
  card: ({ children }) => (
    <div className="bigegi84-column bigegi84-card">{children}</div>
  ),
  circle: ({ label, onClick, iClassName }) => (
    <bigegi84View.row>
      {label ? (
        <strong
          className={bigegi84theme.class.basic}
          style={{ alignSelf: "center" }}
        >
          {label}
        </strong>
      ) : null}
      <div
        style={bigegi84theme.styleCircle}
        className="circle-a"
        onClick={() => (onClick ? onClick() : () => {})}
      >
        <i className={iClassName} />
      </div>
    </bigegi84View.row>
  ),
  circleTwo: ({ iClassNameTrue, iClassNameFalse, onClick }) => {
    const [state, setState] = React.useState(false);
    return (
      <bigegi84View.row>
        <div
          style={bigegi84theme.styleCircle}
          className="circle-a"
          onClick={() => {
            setState(!state);
            onClick ? onClick(state) : () => {};
          }}
        >
          <i className={state ? iClassNameTrue : iClassNameFalse} />
        </div>
      </bigegi84View.row>
    );
  },
  circleAngle: ({ label, state: [state, setState] }) => (
    <bigegi84View.row>
      {label ? (
        <strong
          className={bigegi84theme.class.basic}
          style={{ alignSelf: "center" }}
        >
          {label}
        </strong>
      ) : null}
      <div
        style={bigegi84theme.styleCircle}
        className="circle-a"
        onClick={() => (setState ? setState(!state) : () => {})}
      >
        <i className={"fas" + (state ? " fa-angle-up" : " fa-angle-down")} />
      </div>
    </bigegi84View.row>
  ),
  column: ({ gap, children }) => (
    <div className="bigegi84-column" style={{ gap: gap ? gap : "10px" }}>
      {children}
    </div>
  ),
  container: ({ gap, children }) => (
    <div
      className="bigegi84-column"
      style={{
        padding: "1em",
        gap: gap ? gap : "10px",
      }}
    >
      {children}
    </div>
  ),
  empty: ({ view }) => view,
  form: ({ input, button }) => {
    const view = [];
    let i = 0;
    for (const key in input) {
      const [type, state, option] = input[key];
      if (type) {
        switch (type) {
          case "select":
            view.push(
              <bigegi84View.inputSelect
                key={i}
                name={key}
                state={state}
                option={option}
              />
            );
            break;
          case "text":
            view.push(
              <bigegi84View.inputText key={i} name={key} state={state} />
            );
            break;
          case "textarea":
            view.push(
              <bigegi84View.inputTextarea key={i} name={key} state={state} />
            );
            break;
          default:
            break;
        }
      }
      i++;
    }
    for (const key in button) {
      view.push(
        <bigegi84View.button key={i} name={key} onClick={button[key]} />
      );
      i++;
    }
    return view;
  },
  inputText: ({ name, state: [state, setState, onFocus] }) => (
    <bigegi84View.column>
      <label className={bigegi84theme.class.basic}>{name}</label>
      <input
        type="text"
        name={name}
        className={bigegi84theme.class.inputText}
        value={state}
        onFocus={onFocus ? onFocus : null}
        onChange={(e) => setState(e.target.value)}
      />
    </bigegi84View.column>
  ),
  inputSelect: ({ name, state: [state, setState], option }) => (
    <bigegi84View.column>
      <label className={bigegi84theme.class.basic}>{name}</label>
      <select
        className={bigegi84theme.class.input}
        name={name}
        value={state}
        onChange={(e) => setState(e.target.value)}
      >
        <option>{`Pilih ${name}`}</option>
        {option
          ? option.map((e, i) => (
              <option key={i} value={typeof e == "string" ? e : e[1]}>
                {typeof e == "string" ? e : e[0]}
              </option>
            ))
          : null}
      </select>
    </bigegi84View.column>
  ),
  inputTextarea: ({ name, state: [state, setState] }) => (
    <bigegi84View.column>
      <label className={bigegi84theme.class.basic}>{name}</label>
      <textarea
        rows="2"
        cols="50"
        name={name}
        className={bigegi84theme.class.inputText}
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
    </bigegi84View.column>
  ),
  isShow: ({ value, show, nope }) => (value ? show : nope ? nope : null),
  letsPlay: (props) => bigegi84View.render(props),
  letsRock: (props) => bigegi84View.render(props),
  listCard: ({ arr, onMap }) => (
    <bigegi84View.column>
      <bigegi84View.row>
        <bigegi84View.observer
          onChange={() =>
            arr.map((e, i) => (
              <bigegi84View.card key={i}>
                {onMap ? onMap(e, i) : () => {}}
              </bigegi84View.card>
            ))
          }
        />
      </bigegi84View.row>
    </bigegi84View.column>
  ),
  row: ({ gap, children }) => (
    <div className="bigegi84-row" style={{ gap: gap ? gap : "10px" }}>
      {children}
    </div>
  ),
  observer: ({ onChange }) => (
    <mobxReact.Observer>{onChange}</mobxReact.Observer>
  ),
  section: ({ name, state, show, add }) => {
    let stateIsReal = state ? state : React.useState(false);
    let stateAdd = React.useState(false);
    let [sAdd, sSetAdd] = stateAdd;
    return (
      <bigegi84View.column>
        <bigegi84View.circleAngle label={name} state={stateIsReal} />
        <bigegi84View.isShow
          value={stateIsReal[0]}
          show={
            <bigegi84View.column>
              {add ? (
                <bigegi84View.circle
                  iClassName={"fa-solid" + (sAdd ? " fa-minus" : " fa-plus")}
                  onClick={() => sSetAdd(!sAdd)}
                />
              ) : null}
              {sAdd ? (
                <bigegi84View.card>
                  <bigegi84View.row>
                    {bigegi84View.render(add)}
                  </bigegi84View.row>
                </bigegi84View.card>
              ) : null}
              {show}
            </bigegi84View.column>
          }
        />
      </bigegi84View.column>
    );
  },
  text: ({ label, fontSize }) => (
    <p
      className={bigegi84theme.class.basic + " bigegi84-text"}
      style={{
        whiteSpace: "pre-wrap",
        fontSize: fontSize ? fontSize : "medium",
      }}
    >
      {label ? label : ""}
    </p>
  ),
  textStrong: ({ label, color }) => (
    <strong
      className={bigegi84theme.class.basic}
      style={{
        ...{ whiteSpace: "pre-wrap" },
        ...(color ? { color: color } : {}),
      }}
    >
      {label ? label : ""}
    </strong>
  ),
  render: (props) => {
    const view = [];
    if (typeof props == "object") {
      let i = 0;
      for (const key in props) {
        let found = false;
        if (!found && key.search("buttonSmall") != -1) {
          found = true;
          view.push(
            <bigegi84View.buttonSmall
              key={i}
              name={key.replace("buttonSmall", "")}
              onClick={props[key]}
            />
          );
        }
        if (!found && key.search("button") != -1) {
          found = true;
          view.push(
            <bigegi84View.button
              key={i}
              name={key.replace("button", "")}
              onClick={props[key]}
            />
          );
        }
        if (key.search("card") != -1) {
          view.push(
            <bigegi84View.card key={i}>
              {bigegi84View.render(props[key])}
            </bigegi84View.card>
          );
        }
        if (!found && key.search("circleTwo") != -1) {
          found = true;
          const [[a, b], c] = props[key];
          view.push(
            <bigegi84View.circleTwo
              key={i}
              iClassNameTrue={a}
              iClassNameFalse={b}
              onClick={c}
            />
          );
        }
        if (!found && key.search("circle") != -1) {
          found = true;
          const [a, b] = props[key];
          view.push(<bigegi84View.circle key={i} iClassName={a} onClick={b} />);
        }
        if (key.search("column") != -1) {
          view.push(
            <bigegi84View.column key={i}>
              {bigegi84View.render(props[key])}
            </bigegi84View.column>
          );
        }
        if (key.search("container") != -1) {
          view.push(
            <bigegi84View.container key={i}>
              {bigegi84View.render(props[key])}
            </bigegi84View.container>
          );
        }
        if (key.search("inputSelect") != -1) {
          const [state, option] = props[key];
          view.push(
            <bigegi84View.inputSelect
              key={i}
              name={key.replace("inputSelect", "")}
              state={state}
              option={option}
            />
          );
        }
        if (key.search("inputTextarea") != -1) {
          found = true;
          const state = props[key];
          view.push(
            <bigegi84View.inputTextarea
              key={i}
              name={key.replace("inputTextarea", "")}
              state={state}
            />
          );
        }
        if (!found && key.search("inputText") != -1) {
          const state = props[key];
          view.push(
            <bigegi84View.inputText
              key={i}
              name={key.replace("inputText", "")}
              state={state}
            />
          );
        }
        if (!found && key.search("observer") != -1) {
          found = true;
          view.push(<bigegi84View.observer key={i} onChange={props[key]} />);
        }
        if (key.search("row") != -1) {
          view.push(
            <bigegi84View.row key={i}>
              {bigegi84View.render(props[key])}
            </bigegi84View.row>
          );
        }
        if (key.search("section") != -1) {
          const { add, content } = props[key];
          view.push(
            <bigegi84View.section
              key={i}
              name={key.replace("section", "")}
              add={add}
              show={bigegi84View.render(content)}
            />
          );
        }
        if (!found && key.search("textStrong") != -1) {
          found = true;
          view.push(<bigegi84View.textStrong key={i} label={props[key]} />);
        }
        if (!found && key.search("text") != -1) {
          found = true;
          view.push(<bigegi84View.text key={i} label={props[key]} />);
        }
        if (key.search("view") != -1) {
          const { add, content } = props[key];
          view.push(<bigegi84View.empty key={i} view={props[key]} />);
        }
        i++;
      }
    }
    // console.log(view);
    return view;
  },
};
