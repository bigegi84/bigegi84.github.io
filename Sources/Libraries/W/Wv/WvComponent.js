import { WvColumn } from './Components/C/Column/WvColumn.js'
import { InputNumber } from './Components/I/Input/InputNumber.js'

export const WvComponent = {
  Column: WvColumn,
  InputN: InputNumber,
  InputNU0: (value, onChange) => InputNumber(value, onChange, 1),
  InputNumber,
}
