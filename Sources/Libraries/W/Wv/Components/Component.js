import { Button } from './B/Button/Button.js'
import { WvColumn } from './C/Column/WvColumn.js'
import { Effect } from './E/Effect/Effect.js'
import { InputPassword } from './I/Input/InputPassword.js'
import { InputText } from './I/Input/InputText.js'
import { WvPanel } from './P/Panel/WvPanel.js'
import { WvRow } from './R/Row/WvRow.js'
import { WvText } from './T/Text/WvText.js'

export const Component = {
  Button,
  Column: WvColumn,
  Effect,
  InputT: InputText,
  InputP: InputPassword,
  Panel: WvPanel,
  PanelColumn: (label = '', child) => WvPanel(label, child, true, 'Column'),
  PanelHide: (label = '', child) => WvPanel(label, child, false),
  Row: WvRow,
  Text: WvText,
}
