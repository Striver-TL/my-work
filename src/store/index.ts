/*
 * @Author: Striver-TL
 * @GitHubAdress: https://github.com/Striver-TL
 * @Date: 2022-04-22 18:28:33
 * @LastEditors: Striver-TL
 * @LastEditTime: 2022-04-24 10:30:00
 * @Description: file content
 */
import { createStore } from 'vuex'
import citys from '@/data/citys'

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
