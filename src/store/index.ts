/*
 * @Author: TengLong
 * @Date: 2022-04-22 08:03:46
 * @LastEditTime: 2022-04-22 11:13:21
 * @LastEditors: TengLong
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-test\src\store\index.ts
 */
import { createStore } from 'vuex'
import citys from '../model/citys'

export default createStore({
  state: {
    city: "长沙"
  },
  mutations: {
    setCity(state, city) {
      if (citys.indexOf(city) !== -1) state.city = city;
    }
  }
})
