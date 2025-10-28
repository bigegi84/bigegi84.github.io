import { Dom } from './Actions/Dom.js'
import { Route } from './Actions/Route.js'
import { UseEffect } from './Actions/UseEffect.js'
import { UseState } from './Actions/UseState.js'
import { UseStore } from './Actions/UseStore.js'
import { Button } from './Components/B/Button/Button.js'
import { Effect } from './Components/E/Effect/Effect.js'
import { InputText } from './Components/I/Input/InputText.js'
import { WvRow } from './Components/R/Row/WvRow.js'
import { Post } from '../Wh/Action/Post.js'
import { Render } from './Actions/Render/Render.js'
import { InputPassword } from './Components/I/Input/InputPassword.js'

// Wv View Systems
export var Wv = {
  Button,
  Dom,
  Effect,
  InputT: InputText,
  InputP: InputPassword,
  IPassword: InputPassword,
  IText: InputText,
  Loading: () => {
    const loading = document.getElementById('WvLoading')
    loading.style.display = 'flex'
  },
  LoadingStop: () => {
    const loading = document.getElementById('WvLoading')
    loading.style.display = 'none'
  },
  Navigate: (path) => Route.Push(path),
  Render,
  Route,
  Row: WvRow,
  UseEffect,
  UseState,
  UseStore,
}
