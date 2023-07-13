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
                    let column =
                      cloneStore.text.answer.search("base64") == -1
                        ? {
                            textStrong: cloneStore.text.answer,
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
                            cloneStore.brain.bigegi84 = _.setWith(
                              mobx.toJS(cloneStore.brain.bigegi84),
                              `${path}.$answer.0`,
                              cloneStore.teach.split(" "),
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
