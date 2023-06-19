const cloneInfo = {
  view: () => {
    return (
      <div className="column-a">
        <strong style={bigegi84theme.style}>Jawaban</strong>
        <mobxReact.Observer>
          {() => (
            <p id="answer" style={bigegi84theme.style}>
              {cloneStore.text.answer}
            </p>
          )}
        </mobxReact.Observer>
      </div>
    );
  },
};
