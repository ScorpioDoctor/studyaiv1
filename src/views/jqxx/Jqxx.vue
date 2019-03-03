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
          <span>OpenCV</span>
        </MenuItem>
        <MenuItem name="1-4">
          <Icon type="ios-settings"></Icon>
          <span>Matlab</span>
        </MenuItem>
        <MenuItem name="1-5">
          <Icon type="ios-analytics-outline" />
          <span>SKImage</span>
        </MenuItem>
        <MenuItem name="1-6">
          <Icon type="ios-analytics-outline" />
          <span>PyTorch</span>
        </MenuItem>
        <MenuItem name="1-7">
          <Icon type="ios-analytics-outline" />
          <span>TensorFlow</span>
        </MenuItem>
      </Menu>
    </template>
    <template slot="content">
      <Card class="algs-tree">
        <h4>机器学习算法目录树</h4>
        <custom-tree top-category-name="机器学习"
                     @on-select="obtainArticles">
        </custom-tree>
      </Card>
      <Divider>您选择的算法检索到的所有相关文章共计： {{articlesCount}} 篇</Divider>
      <article-list :articles="articlesList"></article-list>
    </template>
  </main-container>
</template>

<script>
  import {getArticles} from "../../api/api"
  import CustomTree from '../../components/CustomTree'
  import ArticleList from '../../components/ArticleList'

  export default {
    name: 'home',
    components: {CustomTree, ArticleList},
    data() {
      return {
        isCollapsed: true,
        articlesCount:0,
        articlesList:[]
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
          this.articlesCount = response.data.count
          this.articlesList = response.data.results
        }).catch(function (error) {
          console.log(error)
        })
      }
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
