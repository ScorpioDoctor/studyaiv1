<template>
  <main-container :is-collpased="isCollapsed">
    <template slot="sidebar">
      <Menu active-name="1-2" theme="dark" width="auto" class="sider-menu" :class="menuitemClasses">
        <MenuItem name="1-1">
          <Icon type="ios-navigate"></Icon>
          <span>操作一</span>
        </MenuItem>
        <MenuItem name="1-2">
          <Icon type="ios-search"></Icon>
          <span>操作二</span>
        </MenuItem>
        <MenuItem name="1-3">
          <Icon type="ios-settings"></Icon>
          <span>操作三</span>
        </MenuItem>
        <MenuItem name="1-4">
          <Icon type="ios-analytics-outline" />
          <span>操作四</span>
        </MenuItem>
      </Menu>
    </template>
    <template slot="content">
      <Card style="height: 500px">
        <h2>我是主页</h2>
      </Card>
    </template>
  </main-container>
</template>

<script>
    export default {
      name: 'home',
      data() {
        return {
          isCollapsed: true
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
