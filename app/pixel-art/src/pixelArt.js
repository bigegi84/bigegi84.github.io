const pixelArt = {
  view: () => {
    return (
      <div
        className="column-a"
        style={{
          
          background:
            bigegi84store.theme[bigegi84store.theme.value].backgroundColor,
          color: bigegi84store.theme[bigegi84store.theme.value].textColor,
        }}
      >
        
        <pixelArtImage.view />
        <bigegi84footer.view />
      </div>
    );
  },
};
