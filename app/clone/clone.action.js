const cloneAction = {
  answer: (text) => {
    const map = cloneAction.findAnswer(text);
    if (map && map.length != 0) {
      cloneStore.text.answer = cloneAction.getAnswer(map);
    } else {
      cloneStore.noAnswer.push(text);
    }
  },
  ask: {
    definition: () => {
      const brain = cloneStore.brain[cloneStore.brain.selected];
      brain.forEach(([text, child, answer], i) => {
        const ask = text + " itu apa";
        const find = cloneAction.findAnswer(ask);
        if (find == null || find.length == 0) {
          cloneStore.noAnswer.push(ask);
          cloneStore.input.noAnswerText.push("");
        }
      });
    },
  },
  findAnswer: (text) => {
    const brain = cloneStore.brain[cloneStore.brain.selected];
    let obj = null;
    const splitted = text.split(" ");
    splitted.forEach((it, i) => {
      if (i == 0) {
        const find = brain.findIndex(([word]) => word == it);
        if (find != -1) {
          const [x, y] = brain[find];
          if (splitted.length != 1) obj = y;
          if (splitted.length == 1) obj = brain[find][1];
        }
      } else {
        if (obj) {
          const find = obj.findIndex(([word]) => word == it);
          if (find != -1) {
            const [x, y, z] = obj[find];
            if (i + 1 != splitted.length) {
              obj = y;
            } else {
              obj = z;
            }
          } else {
            obj = null;
          }
        }
      }
    });
    return obj;
  },
  getAnswer: (iMap) => {
    const brain = cloneStore.brain[cloneStore.brain.selected];
    let obj = brain;
    let text = [];
    iMap.forEach((it, i) => {
      const [word, child] = obj[it];
      text.push(word);
      obj = child;
    });
    return text.join(" ");
  },
  getAnswerLocation: (text) => {
    const brain = cloneStore.brain[cloneStore.brain.selected];
    const splitted = text.split(" ");
    let location = [];
    let obj = null;
    splitted.forEach((it, i) => {
      if (i == 0) {
        const find = brain.findIndex(([word]) => word == it);
        if (find != -1) {
          const [x, y] = brain[find];
          obj = y;
          location.push(find);
        } else {
          brain.push([it, []]);
          const [x, y] = brain[brain.length - 1];
          obj = y;
          location.push(0);
        }
      }
      if (i != 0) {
        const find = obj.findIndex(([word]) => word == it);
        if (find != -1) {
          const [x, y] = brain[find];
          obj = y;
          location.push(find);
        } else {
          obj.push([it, []]);
          const [x, y] = obj[obj.length - 1];
          obj = y;
          location.push(0);
        }
      }
    });
    return location;
  },
  getQuestionNode: (text) => {
    const brain = cloneStore.brain[cloneStore.brain.selected];
    const splitted = text.split(" ");
    let location = [];
    let obj = null;
    splitted.forEach((it, i) => {
      if (i == 0) {
        const find = brain.findIndex(([word]) => word == it);
        if (find != -1) {
          const [x, y] = brain[find];
          if (splitted.length != 1) obj = y;
          if (splitted.length == 1) obj = brain[find];
          location.push(i);
        } else {
          brain.push([it, []]);
          obj = brain[brain.length - 1];
          location.push(brain.length - 1);
        }
      } else {
        const find = obj.findIndex(([word]) => word == it);
        if (find != -1) {
          const [x, y] = obj[find];
          obj = y;
          location.push(i);
        } else {
          obj.push([it, []]);
          const [x, y] = obj[obj.length - 1];
          if (i + 1 != splitted.length) obj = y;
          if (i + 1 == splitted.length) obj = obj[obj.length - 1];
          location.push(y.length - 1);
        }
      }
    });
    return obj;
  },
  saveWord: (text) => {
    const brain = cloneStore.brain[cloneStore.brain.selected];
    const splitted = text.split(" ");
    splitted.forEach((it) => {
      const find = brain.findIndex(([word]) => word == it);
      if (find == -1) brain.push([it, []]);
    });
  },
  send: () => {
    const text = cloneStore.input.text;
    const path = text.split(" ").join(".");
    const answer = _.get(cloneStore.brain.bigegi84, `${path}.$answer.0`);
    cloneStore.text.answer = answer ? answer.join(" ") : "Gatau Jawabannya";
    cloneStore.lastText = text;
    cloneStore.input.text = "";
  },
  teach: ([question, answer, i]) => {
    cloneAction.saveWord(question);
    cloneAction.saveWord(answer);
    let noAnswer = cloneStore.noAnswer;
    const location = cloneAction.getAnswerLocation(answer);
    const questionNode = cloneAction.getQuestionNode(question);
    console.log([location, mobx.toJS(questionNode)]);
    questionNode[2] = location;
    cloneStore.noAnswer = noAnswer.filter((it) => it != question);
    cloneStore.input.noAnswerText[i] = "";
    cloneAction.ask.definition();
  },
};
