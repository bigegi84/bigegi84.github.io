const cloneChat = {
  view: () => {
    const chat = React.useState("");
    return (
      <bigegi84View.letsRock
        sectionNgobrol={{
          content: {
            row: {
              card: {
                column: {
                  textStrong: "Coba",
                  observer: () => {
                    return (
                      <bigegi84View.letsRock
                        column={{
                          inputTextarea: [
                            cloneStore.input.text,
                            (e) => (cloneStore.input.text = e),
                          ],
                          row: {
                            buttonSmallKirim: () => {
                              cloneAction.send();
                            },
                          },
                        }}
                      />
                    );
                  },
                },
              },
              cardAnswer: {
                column: {
                  textStrong: "Jawaban",
                  observer: () => {
                    let column = {
                      textStrong: cloneStore.text.answer,
                    };
                    if (cloneStore.text.answer == "Gatau Jawabannya")
                      column = {
                        ...column,
                        ...{
                          inputTextJawaban: [
                            cloneStore.teach,
                            (e) => (cloneStore.teach = e),
                          ],
                          buttonSimpan: () => {
                            const path = cloneStore.lastText
                              .split(" ")
                              .join(".");
                            cloneStore.brain.bigegi84 = _.set(
                              cloneStore.brain.bigegi84,
                              `${path}.$answer`,
                              [cloneStore.teach.split(" ")]
                            );
                            cloneStore.text.answer = "";
                          },
                        },
                      };
                    return <bigegi84View.letsRock column={column} />;
                  },
                },
              },
            },
          },
        }}
      />
    );
    return (
      <div className="column-a">
        <label htmlFor="text" style={bigegi84theme.style}>
          Ngobrol
        </label>
        <mobxReact.Observer>
          {() => (
            <textarea
              id="text"
              type="text"
              className={bigegi84theme.class.inputText}
              value={cloneStore.input.text}
              onChange={(e) => (cloneStore.input.text = e.target.value)}
            />
          )}
        </mobxReact.Observer>
        <button
          className={bigegi84theme.class.button}
          id="send"
          onClick={() => cloneAction.send()}
        >
          Kirim
        </button>
        {/* <button
          className={bigegi84theme.class.button}
          onClick={() => {
            const brain = cloneStore.brain[cloneStore.brain.selected];
            const dataStr =
              "data:text/json;charset=utf-8," +
              encodeURIComponent(JSON.stringify(brain));
            const dlAnchorElem = document.getElementById("downloadA");
            dlAnchorElem.setAttribute("href", dataStr);
            dlAnchorElem.setAttribute("download", "brain.json");
            dlAnchorElem.click();
          }}
        >
          Simpan Pengetahuan
        </button> */}
        <button
          className={bigegi84theme.class.button}
          onClick={() => {
            const brain = cloneStore.brain[cloneStore.brain.selected];
            const convert = (arr) => {
              const obj = {};
              arr.forEach(([word, child, $answer]) => {
                const ch = child ? convert(child) : {};
                obj[word] = {
                  ...ch,
                  ...{ $answer: $answer ? $answer : null },
                };
              });
              return obj;
            };
            const findKey = (obj, arr) => {
              let i = 0;
              let str = [];
              for (const key in obj) {
                if (arr[0] == i) {
                  str.push(key);
                  str = [
                    ...str,
                    ...(arr[1] !== null
                      ? findKey(obj[key], arr.splice(1))
                      : []),
                  ];
                }
                i++;
              }
              console.log(obj);
              console.log(arr);
              console.log(str);
              return str;
            };
            let newBrain = convert(mobx.toJS(brain));
            const convertAnswer = (obj) => {
              for (const key in obj) {
                // console.log(key);
                if (key != "$answer") {
                  const { $answer } = obj[key];
                  obj[key] = {
                    ...convertAnswer(obj[key]),
                    ...($answer
                      ? { $answer: [findKey(newBrain, $answer)] }
                      : {}),
                  };
                }
              }
              return obj;
            };
            newBrain = convertAnswer(newBrain);
            const yaml = jsyaml.dump(newBrain);
            const dataStr =
              "data:text/yaml;charset=utf-8," + encodeURIComponent(yaml);
            const dlAnchorElem = document.getElementById("downloadA");
            dlAnchorElem.setAttribute("href", dataStr);
            dlAnchorElem.setAttribute(
              "download",
              "bigegi84.bigegi84-Clone.yaml"
            );
            dlAnchorElem.click();
          }}
        >
          Simpan yaml ss
        </button>
        <a id="downloadA" style={{ display: "none" }}></a>
      </div>
    );
  },
};
