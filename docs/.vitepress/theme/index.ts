import theme from 'vitepress/theme'
import DemoBlock from '../components/demo-block'
import WarnBadge from '../components/WarnBadge'
import CommnBadge from '../components/CommnBadge'
import UpdateBadge from '../components/UpdateBadge'
import NewBadge from '../components/NewBadge'
import './main.css'
import 'uno.css'

export default {
  ...theme,
  enhanceApp({ app }) {
    app.component('demo', DemoBlock)
    app.component('WarnBadge', WarnBadge)
    app.component('CommnBadge', CommnBadge)
    app.component('UpdateBadge', UpdateBadge)
    app.component('NewBadge', NewBadge)
  },
}
