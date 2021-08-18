import Vue from 'vue'

// 基于element原始组件进行定制化封装
import uTabs from './tabs.vue' // tab页签
import uPage from './page.vue' // 分页
import uForm from './form.vue' // 表单
import uTable from './table.vue' // 表格
import uCard from './card.vue' // 卡片
import opt from './opt.vue' // 操作

Vue.component('opt', opt)
Vue.component('uTabs', uTabs)
Vue.component('uPage', uPage)
Vue.component('uForm', uForm)
Vue.component('uTable', uTable)
Vue.component('uCard', uCard)
