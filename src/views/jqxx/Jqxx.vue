<template>
  <main-container :is-collpased="isCollapsed">
    <template slot="sidebar">
      <Menu active-name="1-1" theme="dark" width="auto" class="sider-menu" :class="menuitemClasses">
        <MenuItem name="1-1">
          <Icon type="ios-navigate"></Icon>
          <span>基础理论</span>
        </MenuItem>
        <MenuItem name="1-2">
          <Icon type="ios-analytics-outline" />
          <span>研究前沿</span>
        </MenuItem>
        <MenuItem name="1-3">
          <Icon type="ios-search"></Icon>
          <span>SKlearn</span>
        </MenuItem>
        <MenuItem name="1-4">
          <Icon type="ios-settings"></Icon>
          <span>Matlab</span>
        </MenuItem>
        <MenuItem name="1-5">
          <Icon type="ios-analytics-outline" />
          <span>XGBOOST</span>
        </MenuItem>
        <MenuItem name="1-6">
          <Icon type="ios-analytics-outline" />
          <span>R语言</span>
        </MenuItem>
      </Menu>
    </template>
    <template slot="content">
      <Card class="algs-tree">
        <h4>机器学习算法目录树</h4>
        <custom-tree @on-select="obtainArticles"></custom-tree>
      </Card>
      <Divider>您选择的算法检索到的所有相关文章共计： {{articleCount}} 篇</Divider>
      <Card style="margin-bottom: 16px;" v-for="(item,idx) in articleList" :key="idx">
        <p slot="title">
          <Icon type="ios-film-outline"></Icon>
          <router-link :to="'/blog/read/'+item.id">{{item.title}}</router-link>
        </p>
        <a href="#" slot="extra">
          <Icon type="ios-loop-strong"></Icon>
          <Icon type="ios-star" v-for="n in idx%4" :key="n"></Icon>
        </a>
        <p>
          {{item.brief}}
        </p>
      </Card>
    </template>
  </main-container>
</template>

<script>
    import {getCategories, getArticles} from "../../api/api";
    import CustomTree from "./CustomTree"
    export default {
      name: 'home',
      components: {CustomTree},
      data() {
        return {
          isCollapsed: false,
          articleCount:0,
          articleList:[]
        }
      },
      computed: {
        menuitemClasses: function () {
          return [
            'menu-item', this.isCollapsed ? 'collapsed-menu' : ''
          ]
        }
      },
      methods: {
        obtainArticles(params) {
          getArticles({
            'top_category':params.cat_id
          }).then((response)=>{
            this.articleCount = response.data.count
            this.articleList = response.data.results
            console.log(response.data.results)
          }).catch(function (error) {
            console.log(error)
          })
        }
      },
      created () {
      }
    }
</script>

<style scoped>
  .sider-menu {
    margin-top: 60px;
  }
  .menu-item span{
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }
  .menu-item i{
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }
  .collapsed-menu span{
    /*width: 0;*/
    transition: width .2s ease;
  }
  .collapsed-menu i{
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }
</style>
