import Vue from 'vue'

import './styles/quasar.styl'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import '@quasar/extras/material-icons/material-icons.css'
import {
  Quasar,
  QLayout,
  QHeader,
  QDrawer,
  QPageContainer,
  QPage,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QList,
  QItem,
  QItemSection,
  QItemLabel,
  QTable,
  QSeparator,
  QTh,
  QTr,
  QTd,
  QBtnGroup,
  QDialog,
  QCard,
  QCardSection,
  QCardActions,
  QInput,
  QRadio,
  Notify
} from 'quasar'

Vue.use(Quasar, {
  config: {},
  components: {
    QLayout,
    QHeader,
    QDrawer,
    QPageContainer,
    QPage,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QItem,
    QItemSection,
    QItemLabel,
    QTable,
    QSeparator,
    QTh,
    QTr,
    QTd,
    QBtnGroup,
    QDialog,
    QCard,
    QCardSection,
    QCardActions,
    QInput,
    QRadio,
    Notify
  },
  directives: {
  },
  plugins: {
  }
})
