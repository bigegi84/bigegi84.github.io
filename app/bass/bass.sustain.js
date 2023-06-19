const bassSustain = {
  view: () => {
    return (
      <div className="field half">
        <mobxReact.Observer>
          {() => (
            <input
              type="checkbox"
              id="bass-sustaining"
              name="bass-sustaining"
              checked={bassStore.sustain.active}
              onChange={(e) => {
                bassStore.sustain.active = e.target.checked;
              }}
            />
          )}
        </mobxReact.Observer>
        <label htmlFor="bass-sustaining" className={bigegi84theme.class.input}>
          Sustain
        </label>
      </div>
    );
  },
};
