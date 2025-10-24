// const styleClass = 'WxButton'

export const InputText = (value, onChange) => {
  const component = document.createElement('input')
  component.value = value ?? ''
  component.type = 'text'
  //   component.className = styleClass ?? ''
  // component.setAttribute("class", className);
  return (parent = document.createElement('div')) => {
    component.onchange = (e) => {
      if (onChange) onChange(e)
    }
    parent.appendChild(component)
  }
}
