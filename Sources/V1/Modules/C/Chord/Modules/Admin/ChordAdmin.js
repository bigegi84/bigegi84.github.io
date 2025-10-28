import { Wc } from '../../../../../../Libraries/W/Wc/Wc.js'
import { Wd } from '../../../../../../Libraries/W/Wd/Wd.js'
import { Wh } from '../../../../../../Libraries/W/Wh/Wh.js'
import { WvRow } from '../../../../../../Libraries/W/Wv/Components/R/Row/WvRow.js'
import { WvText } from '../../../../../../Libraries/W/Wv/Components/T/Text/WvText.js'
import { Wv } from '../../../../../../Libraries/W/Wv/Wv.js'
import { WvComponent } from '../../../../../../Libraries/W/Wv/WvComponent.js'
import { UrlState } from '../../../../../States/UrlState.js'
import { ChordLayout } from '../../Components/ChordLayout.js'

const data = Wv.UseStore(null)
const page = Wv.UseState(1)
const limit = Wv.UseState(10)
const search = Wv.UseState('')
const PageHttp = async () => {
  const path = `/chord/songs`
  const query = {
    search: search.Value,
    page: page.Value,
    limit: limit.Value,
  }
  // const requestHash = await Wc.SHA256(query)
  // const cacheKey = `POST:${path}:${requestHash}`
  const cacheKey = `GET:${path}?${new URLSearchParams(query).toString()}`
  const cached = Wd.Cache.get(cacheKey)
  if (cached != null) {
    data.Value = cached
    return
  }
  const response = await Wh.Get(`${UrlState.Api}${path}`, query)
  if (response.status == 400) alert('Bad Request.')
  const responseBody = await response.json()
  Wd.Cache.set(cacheKey, responseBody)
  data.Value = responseBody
}

function debounce(fn, delay = 500) {
  let timer
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}
const debouncedFetch = debounce(PageHttp)

const LoadDataAction = async () => {
  try {
    Wv.Loading()
    debouncedFetch()
    Wv.LoadingStop()
  } catch (e) {
    alert(e.message)
  }
}

export const ChordAdmin = () => {
  if (localStorage.getItem('chord_token') == null) {
    Wv.Route.Push('/chord/login')
    return null
  }
  LoadDataAction()
  search.Subscribe(() => LoadDataAction())
  page.Subscribe(() => LoadDataAction())
  limit.Subscribe(() => LoadDataAction())
  return ChordLayout({
    PanelMenu: {
      Text: 'Ini halaman admin.',
      'ButtonLog out': () => {
        localStorage.removeItem('chord_token')
        Wv.Route.Push('/chord/login')
      },
    },
    PanelSong: {
      RowSearch: {
        Text: 'Search: ',
        InputT: (e) => {
          search.Value = e.target.value
        },
      },
      RowLimit: {
        Text: 'Limit: ',
        InputNU010: (e) => {
          limit.Value = e.target.value
          page.Value = 1
        },
      },
      EffectTotal: () => WvText(`Total: ${data.Value?.result?.total ?? 1}`),
      ViewTP: page.Effect(() => WvText(`Page: ${page.Value}`)),
      EffectPages: () => WvText(`Pages: ${data.Value?.result?.pages ?? 1}`),
      Column: {
        'Button<': () => (page.Value == 1 ? 1 : (page.Value = page.Value - 1)),
        'Button>': () =>
          page.Value == data.Value?.result?.pages
            ? data.Value?.result?.pages
            : (page.Value = page.Value + 1),
      },
      Effect: () => {
        // let result = {}
        // data.Value?.result?.data?.forEach((it) => {
        //   const newObj = {}
        //   newObj[`PanelHide${it.artist.name} - ${it.title}`] = {
        //     TextL: it.lyric,
        //   }
        //   result = { ...result, ...newObj }
        // })
        // return Wv.Render(result)
        const result = data.Value?.result?.data?.map((it) =>
          WvComponent.PanelHide(
            `${it.artist.name} - ${it.title}`,
            WvComponent.Text(it.lyric)
          )
        )
        return WvComponent.Row(result)
      },
    },
  })
}
