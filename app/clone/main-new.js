(() => {
  const findAnswer = (text) => {
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
          }
        }
      }
    });
    return obj;
  };
  const getAnswer = (iMap) => {
    let obj = brain;
    let text = [];
    iMap.forEach((it, i) => {
      const [word, child] = obj[it];
      text.push(word);
      obj = child;
    });
    return text.join(" ");
  };
  const answer = (text) => {
    const map = findAnswer(text);
    if (map && map.length != 0) {
      $("#answer").text(getAnswer(map));
    } else {
      noAnswer.push(text);
      noAnswerRender();
    }
  };
  const getAnswerLocation = (text) => {
    const splitted = text.split(" ");
    let location = [];
    let obj = null;
    splitted.forEach((it, i) => {
      if (i == 0) {
        const find = brain.findIndex(([word]) => word == it);
        if (find != -1) {
          const [x, y] = brain[find];
          obj = y;
          location.push(i);
        } else {
          brain.push([it, []]);
          obj = brain[brain.length - 1];
          location.push(brain.length - 1);
        }
      }
      if (i != 0) {
        const find = obj.findIndex(([word]) => word == it);
        if (find != -1) {
          const [x, y] = brain[find];
          obj = y;
          location.push(i);
        } else {
          obj.push([it, []]);
          obj = obj[obj.length - 1];
          location.push(obj.length - 1);
        }
      }
      console.log(brain);
    });
    return location;
  };
  const getQuestionNode = (text) => {
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
  };
  const saveAnswer = (question, answer) => {
    const location = getAnswerLocation(answer);
    const questionNode = getQuestionNode(question);
    questionNode[2] = location;
    const i = noAnswer.indexOf(text);
    if (i != -1) noAnswer.splice(i, 1);
    noAnswerRender();
  };
  const noAnswerRender = () => {
    $("#no-answer").html(
      noAnswer
        .map((it, i) => {
          return (
            '<p id="question-"' +
            i +
            ">" +
            it +
            '</p><textarea id="teach-input-' +
            i +
            '"></textarea><button id="teach-btn-' +
            i +
            '" class="teach-btn">Ajarkan</button>'
          );
        })
        .join("")
    );
    $(".teach-btn").click((e) => {
      const id = e.target.id;
      const value = $("#teach-input-" + id.replace("teach-btn-", "")).val();
      const text = noAnswer[id.replace("teach-btn-", "")];
      saveAnswer(text, value);
    });
  };
  const wordCount = () => {
    $("#word-count").text(knowledge.word.length);
  };
  const saveWordKnowledge = (text) => {
    text.split(" ").forEach((it) => {
      if (knowledge.word.indexOf(it) == -1) knowledge.word.push(it);
    });
    wordCount();
  };
  $("#send").click(() => {
    const text = $("#text").val();
    answer(text);
  });
  $("#download").click(() => {
    var dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(brain));
    var dlAnchorElem = document.getElementById("downloadA");
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "brain.json");
    dlAnchorElem.click();
  });
  const main = () => {
    wordCount();
  };
  main();
})();
