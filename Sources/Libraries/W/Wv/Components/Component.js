import { Button } from './B/Button/Button.js'
import { WvColumn } from './C/Column/WvColumn.js'
import { InputPassword } from './I/Input/InputPassword.js'
import { InputText } from './I/Input/InputText.js'
import { WvPanel } from './P/Panel/WvPanel.js'
import { Row } from './R/Row/Row.js'
import { Text } from './T/Text/Text.js'

export const Component = {
  Button,
  Column: WvColumn,
  InputT: InputText,
  InputP: InputPassword,
  Panel: WvPanel,
  PanelColumn: (label = '', child) => WvPanel(label, child, true, 'Column'),
  Row,
  Text,
}
