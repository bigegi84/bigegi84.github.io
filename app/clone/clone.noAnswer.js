const cloneNoAnswer = {
  view: () => (
    <mobxReact.Observer>
      {() => (
        <div>
          <strong className={bigegi84theme.class.basic}>
            Gatau Jawabannya
          </strong>
          {cloneStore.noAnswer.map((it, i) => {
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
                    cloneAction.teach([it, cloneStore.input.noAnswerText[i], i])
                  }
                >
                  Ajarkan
                </button>
              </div>
            );
          })}
        </div>
      )}
    </mobxReact.Observer>
  ),
};
