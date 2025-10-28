const styleClass = 'WvInputText'

export const InputPassword = (value, onChange) => {
  const component = document.createElement('input')
  component.value = value ?? ''
  component.type = 'password'
  component.setAttribute('class', styleClass ?? '')
  return (parent = document.createElement('div')) => {
    component.onchange = (e) => {
      if (onChange) onChange(e)
    }
    parent.appendChild(component)
  }
}
