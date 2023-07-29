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
                  textStrong: "Pertanyaan",
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
                              const text = cloneStore.input.text;
                              const path = text.split(" ").join(".");
                              const { answer, atom, node } = mobx.toJS(
                                cloneStore.brain.data[cloneStore.brain.i]
                              );
                              const answerI = _.get(node, `${path}.$answer.0`);
                              const atomWord = answerI
                                ? answer[answerI]
                                    .split(",")
                                    .map((it) => atom[it])
                                : null;
                              cloneStore.text.answer = atomWord
                                ? atomWord.join(" ")
                                : "Gatau Jawabannya";
                              cloneStore.lastText = text;
                              // cloneStore.input.text = "";
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
                    let column =
                      cloneStore.text.answer.search("base64") == -1
                        ? {
                            buttonSmallHapus: () => {
                              const path = cloneStore.lastText
                                .split(" ")
                                .join(".");
                              cloneStore.brain.data[cloneStore.brain.i].node = _.setWith(
                                mobx.toJS(cloneStore.brain.data[cloneStore.brain.i].node),
                                `${path}.$answer`,
                                null,
                                Object
                              );
                              // cloneStore.text.answer = "";
                            },
                            text: cloneStore.text.answer,
                          }
                        : {
                            view: (
                              <img
                                src={cloneStore.text.answer}
                                style={{ width: "100%" }}
                              />
                            ),
                          };
                    if (cloneStore.text.answer == "Gatau Jawabannya")
                      column = {
                        ...column,
                        ...{
                          inputTextareaJawaban: [
                            cloneStore.teach,
                            (e) => (cloneStore.teach = e),
                          ],
                          buttonSimpan: () => {
                            const path = cloneStore.lastText
                              .split(" ")
                              .join(".");
                            const { answer, atom, node } =
                              cloneStore.brain.data[cloneStore.brain.i];
                            const answerValue = cloneStore.teach
                              .split(" ")
                              .map((e) => {
                                const found = mobx
                                  .toJS(atom)
                                  .findIndex((eA) => eA == e);
                                if (found == -1) {
                                  cloneStore.brain.data[cloneStore.brain.i].atom.push(e);
                                  return (
                                    cloneStore.brain.data[cloneStore.brain.i].atom.length - 1
                                  );
                                } else return found;
                              })
                              .join(",");
                            let findAi = answer.findIndex(
                              (e) => e == answerValue
                            );
                            if (findAi == -1) {
                              cloneStore.brain.data[cloneStore.brain.i].answer.push(
                                answerValue
                              );
                              findAi =
                                cloneStore.brain.data[cloneStore.brain.i].answer.length - 1;
                            }
                            cloneStore.brain.data[cloneStore.brain.i].node = _.setWith(
                              mobx.toJS(node),
                              `${path}.$answer.0`,
                              findAi,
                              Object
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
  },
};
