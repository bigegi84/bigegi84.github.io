const bassSustain = {
  view: () => {
    return (
      <div className="field half">
        <mobxReact.Observer>
          {() => {
            return (
              <input
                type="checkbox"
                name="sustain"
                checked={bassStore.sustain.active}
                onChange={(e) => {
                  bassStore.sustain.active = e.target.checked;
                }}
              />
            );
          }}
        </mobxReact.Observer>
        <label htmlFor="sustaining">Sustain</label>
      </div>
    );
  },
};
