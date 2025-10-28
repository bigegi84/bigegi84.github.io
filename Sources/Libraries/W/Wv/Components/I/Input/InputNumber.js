const styleClass = 'WvInputText'

export const InputNumber = (value, onChange, min = null) => {
  const component = document.createElement('input')
  component.value = value ?? ''
  component.type = 'number'
  console.log('min', min)
  if (min != null) component.min = min
  component.setAttribute('class', styleClass ?? '')
  return (parent = document.createElement('div')) => {
    component.onchange = (e) => {
      if (onChange) onChange(e)
    }
    parent.appendChild(component)
  }
}
