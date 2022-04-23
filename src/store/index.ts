/*
 * @Author: Striver-TL
 * @GitHubAdress: https://github.com/Striver-TL
 * @Date: 2022-04-22 18:28:33
 * @LastEditors: Striver-TL
 * @LastEditTime: 2022-04-23 17:55:54
 * @Description: file content
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
