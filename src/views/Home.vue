<template>
  <main-container :is-collpased="isCollapsed">
    <template slot="content">
      <Card style="height: 500px">
        <h2>我是主页</h2>
        <Button id="btn-munu" @click="obtainCategories">获取分类类别</Button>
        <custom-tree></custom-tree>
      </Card>
    </template>
  </main-container>
</template>

<script>
  import {getCategories} from '../api/api'
  import CustomTree from '../components/CustomTree'
  export default {
    name: 'home',
    components: {
      CustomTree
    },
    data() {
      return {
        isCollapsed: false
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
      obtainCategories() {
        getCategories({
          params: {name: '机器学习'}
        }).then((response) => {
            console.log(response)
          }
        ).catch(function (error) {
            console.log(error)
          }
        )
      }
    }
  }
</script>

<style scoped>
  .sider-menu {
    margin-top: 60px;
  }

  .menu-item span {
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }

  .menu-item i {
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }

  .collapsed-menu span {
    /*width: 0;*/
    transition: width .2s ease;
  }

  .collapsed-menu i {
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }
</style>
