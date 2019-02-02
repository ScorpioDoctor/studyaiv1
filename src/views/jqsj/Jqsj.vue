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
        <h4>机器视觉算法目录树</h4>
        <custom-tree></custom-tree>
      </Card>
      <Divider>您选择的算法检索到的所有相关文章</Divider>
      <Row :gutter="32">
        <i-col :span="6" v-for="idx in 20" :key="idx" style="margin-bottom: 32px">
          <Card>
            <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              物体检测
            </p>
            <a href="#" slot="extra">
              <Icon type="ios-loop-strong"></Icon>
              <Icon type="ios-star" v-for="n in idx%4" :key="n"></Icon>
            </a>
            <p>
              深度学习的概念源于人工神经网络的研究。含多隐层的多层感知器就是一种深度学习结构。
              深度学习通过组合低层特征形成更加抽象的高层表示属性类别或特征，以发现数据的分布式特征表示。
            </p>
          </Card>
        </i-col>
      </Row>
    </template>
  </main-container>
</template>

<script>
  import CustomTree from './CustomTree'

  export default {
    name: 'home',
    components: {CustomTree},
    data() {
      return {
        isCollapsed: false,
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
