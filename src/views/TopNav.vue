<template>
  <div>
    <Header class="header">
      <Row :gutter="16">
        <i-col span="3" offset="1">
          <router-link to="/">
            <img src="../assets/logo.png" alt="人工智能社区" class="logo"/>
          </router-link>
        </i-col>
        <i-col span="15">
          <Menu mode="horizontal" :active-name="activeName">
            <MenuItem name="/jqxx" to="/jqxx">机器学习</MenuItem>
            <MenuItem name="/jqsj" to="/jqsj">机器视觉</MenuItem>
            <MenuItem name="/zryy" to="/zryy">自然语言</MenuItem>
            <MenuItem name="/yysb" to="/yysb">语音识别</MenuItem>
            <MenuItem name="/zdjs" to="/zdjs">机器人/自动驾驶</MenuItem>
            <MenuItem name="/dsj" to="/dsj">大数据</MenuItem>
            <MenuItem name="/lhjy" to="/lhjy">量化交易</MenuItem>
            <MenuItem name="/qkl" to="/qkl">区块链</MenuItem>
            <MenuItem name="/xnxs" to="/xnxs">虚拟/增强现实</MenuItem>
            <MenuItem name="/wlw" to="/wlw">物联网</MenuItem>
          </Menu>
        </i-col>
        <i-col span="4">
          <Row>
            <i-col span="8">
              <Dropdown>
                <Avatar src="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"></Avatar>
                <DropdownMenu slot="list">
                  <DropdownItem>我的主页</DropdownItem>
                  <DropdownItem>我的收藏</DropdownItem>
                  <DropdownItem>
                    设置
                    <Badge status="error" />
                  </DropdownItem>
                  <DropdownItem divided>退出登录</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </i-col>
            <i-col span="8">
              <Dropdown>
                <Badge :count="count" :offset="[20,4]">
                  <Icon type="md-notifications-outline" size="24" />
                </Badge>
                <DropdownMenu slot="list">
                  <Tabs value="notification">
                    <TabPane label="通知" name="notification">
                      <div class="notifications">通知内容</div>
                    </TabPane>
                    <TabPane label="关注" name="follow">
                      <div class="notifications">关注内容</div>
                    </TabPane>
                    <TabPane label="系统" name="system">
                      <div class="notifications">系统内容</div>
                    </TabPane>
                  </Tabs>
                </DropdownMenu>
              </Dropdown>
            </i-col>
            <i-col span="8">
              <Icon type="md-color-palette" size="24" @click="openTheme = true" />
            </i-col>
          </Row>
        </i-col>
      </Row>
      <Drawer title="关于我们" v-model="openTheme" :closable="false" width="365">
        <Row>
          <h3>运营团队</h3>
        </Row>
        <Divider></Divider>
        <Row>
          <h3>加入我们</h3>
        </Row>
        <Divider></Divider>
        <Row>
          <h3>合作伙伴</h3>
        </Row>
        <Divider></Divider>
        <Row>
          <h3>商业合作</h3>
        </Row>
      </Drawer>
    </Header>
  </div>
</template>

<script>
    export default {
      name: 'top-nav',
      data () {
        return {
          activeName: this.$route.path,
          count: 5,
          openTheme: false,
          isCollapsed: false
        }
      }
    }
</script>

<style scoped>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background: #fff;
    z-index: 3;
  }
  .logo {
    margin-top: 5px;
    height: 50px;
  }
  .notifications {
    height: 150px;
    text-align: center;
  }
</style>
