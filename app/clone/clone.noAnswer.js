const cloneNoAnswer = {
  view: () => {
    const [show, setShow] = React.useState(false);
    const [list, setList] = React.useState(false);
    return (
      <mobxReact.Observer>
        {() => (
          <div>
            <div className="row-a">
              <strong
                style={{ ...bigegi84theme.style, ...{ alignSelf: "center" } }}
              >
                Gatau Jawabannya
              </strong>
              <div
                style={bigegi84theme.styleCircle}
                className="circle-a"
                onClick={() => setShow(!show)}
              >
                <i
                  className={"fas" + (show ? " fa-angle-up" : " fa-angle-down")}
                />
              </div>
            </div>
            {show ? (
              <div className="column-a">
                <div className="row-a">
                  <div
                    className={bigegi84theme.class.circle}
                    onClick={() => setList(!list)}
                  >
                    <i
                      className={
                        "fa-solid" +
                        (list ? " fa-table-cells-large" : " fa-align-justify")
                      }
                    />
                  </div>
                </div>
                {cloneStore.noAnswer.map((it, i) => {
                  if (!list) {
                    return (
                      <div key={i} className="column-a">
                        <p>{it}</p>
                        <textarea
                          className={bigegi84theme.class.inputText}
                          value={cloneStore.input.noAnswerText[i]}
                          onChange={(e) =>
                            (cloneStore.input.noAnswerText[i] = e.target.value)
                          }
                        />
                        <button
                          className={bigegi84theme.class.button}
                          onClick={() =>
                            cloneAction.teach([
                              it,
                              cloneStore.input.noAnswerText[i],
                              i,
                            ])
                          }
                        >
                          Ajarkan
                        </button>
                      </div>
                    );
                  } else {
                    return <span key={i}>{it}</span>;
                  }
                })}
              </div>
            ) : null}
          </div>
        )}
      </mobxReact.Observer>
    );
  },
};
