const clone = {
  view: () => {
    React.useEffect(() => {
      cloneAction.ask.definition();
    });
    return (
      <div className="column-a" style={{ padding: "3em" }}>
        <h1 style={bigegi84theme.style}>bigegi84 - Clone</h1>
        <div className="row-a">
          <cloneInfo.view />
          <cloneChat.view />
        </div>
        <cloneNoAnswer.view />
      </div>
    );
  },
};
