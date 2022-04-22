<template>
  <div class="topbar"> 
    <div class="container clearfix">
      <div class="topbar-left float-start clearfix">
        <div class="title float-start">
          <h3>工资计算器</h3>
        </div>
        <div class="cityselect float-start">
          <div class="btn-group">
            <button
              type="button"
              class="btn dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              城市
            </button>
            <ul class="dropdown-menu">
              <li v-for="(item, index) in citys" :key="index">
                <a
                  class="dropdown-item"
                  @click="setCity(item)"
                  href="javascript: void(0)"
                  >{{ item }}</a
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="float-start"><a href="">五险一金缴纳比例表</a></div>
        <div class="float-start"><a href="">个税缴纳比例表</a></div>
      </div>
      <div class="searchbar float-end clearfix">
        <input
          type="text"
          placeholder="Search"
          class="form-control float-start"
        />
        <button type="button" class="btn btn-outline-light float-start">
          Search
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import citys from "../model/citys";
import { useStore } from "vuex";

export default defineComponent({
  name: "TopBar",
  setup() {
    let store = useStore();
    let setCity: (city: string) => void = (city: string): void => {
      store.commit("setCity", city);
    };
    return {
      citys,
      setCity,
    };
  },
});
</script>

<style scoped>
.topbar {
  line-height: 45px;
  background: #007bff;
  font-size: 14px;
}

a {
  text-decoration: none;
}

a,
h3,
button,
a:hover,
button:hover {
  color: #fff;
}

.title h3 {
  padding: 0;
  margin: 0;
  font-size: 18px;
  line-height: 45px;
}

.topbar-left > div {
  padding: 0 6px;
}

.dropdown-menu a {
  color: #333;
}

.searchbar {
  padding: 3px 0;
}

.searchbar input {
  width: 145px;
  margin-right: 15px;
}

.searchbar button:hover {
  color: #333;
}
</style>
