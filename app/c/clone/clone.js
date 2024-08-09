const clone = {
  view: () => {
    React.useEffect(() => {
      // cloneAction.ask.definition();
    });
    return (
      <bigegi84View.letsRock
        container={{
          viewA: (
            <h1 className={bigegi84theme.class.basic}>bigegi84 - Clone</h1>
          ),
          viewAB: <cloneConfig.view />,
          viewB: <cloneChat.view />,
          viewC: <cloneDetail.view />,
          viewD: <cloneNoAnswer.view />,
        }}
      />
    );
  },
};
