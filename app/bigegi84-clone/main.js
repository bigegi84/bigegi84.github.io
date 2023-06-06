(() => {
  const answer = (text) => {
    let obj = null;
    text.split(" ").forEach((it, i) => {
      if (i == 0) {
        if (knowledge.sentence[it]) obj = knowledge.sentence[it];
        else obj = null;
      } else {
        if (obj != null && obj[it]) obj = obj[it];
        else obj = null;
      }
    });
    return obj;
  };
  const noAnswerRender = () => {
    $("#no-answer").html(
      noAnswer
        .map((it, i) => {
          return (
            "<p>" +
            it +
            '</p><input id="teach-input-' +
            i +
            '" type="text"/><button id="teach-btn-' +
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
      let obj = null;
      text.split(" ").forEach((it, i) => {
        if (i == 0) {
          if (knowledge.sentence[it]) obj = knowledge.sentence[it];
          else {
            knowledge.sentence[it] = {};
            obj = knowledge.sentence[it];
          }
        } else {
          if (obj[it]) obj = obj[it];
          else {
            obj[it] = {};
            obj = obj[it];
          }
        }
      });
      obj["@"] = value;
      const i = noAnswer.indexOf(text);
      if (i != -1) noAnswer.splice(i, 1);
      noAnswerRender();
      saveWordKnowledge(value);
    });
  };
  const saveWordKnowledge = (text) => {
    text.split(" ").forEach((it) => {
      if (!knowledge.word[it]) knowledge.word[it] = it;
    });
  };
  $("#send").click(() => {
    const text = $("#text").val();
    saveWordKnowledge(text);
    const result = answer(text);
    if (result && result["@"]) {
      $("#answer").text(result["@"]);
    } else {
      noAnswer.push(text);
      noAnswerRender();
    }
  });
  $("#download").click(() => {
    var dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(knowledge));
    var dlAnchorElem = document.getElementById("downloadA");
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "knowledge.json");
    dlAnchorElem.click();
  });
})();
