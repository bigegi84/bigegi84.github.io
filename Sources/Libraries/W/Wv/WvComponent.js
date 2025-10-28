import { WvColumn } from './Components/C/Column/WvColumn.js'
import { InputNumber } from './Components/I/Input/InputNumber.js'
import { WvPanel } from './Components/P/Panel/WvPanel.js'
import { WvRow } from './Components/R/Row/WvRow.js'
import { WvText } from './Components/T/Text/WvText.js'

export const WvComponent = {
  Column: WvColumn,
  InputN: InputNumber,
  InputNU0: (value, onChange) => InputNumber(value, onChange, 1),
  InputNumber,
  Panel: WvPanel,
  PanelColumn: (label = '', child) => WvPanel(label, child, true, 'Column'),
  PanelHide: (label = '', child) => WvPanel(label, child, false),
  Row: WvRow,
  Text: WvText,
}
