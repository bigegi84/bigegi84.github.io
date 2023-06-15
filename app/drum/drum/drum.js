const drum = {
  view: () => {
    return (
      <div className="column-a">
        <drumAudio.view />
        <drumNote.view />
        <drumSheet.view />
      </div>
    );
  },
};
