<template>
  <main-container :is-collpased="isCollapsed">
    <template slot="content">
      <Card class="registbox">
        <Row>
          <i-col span="7">
            <div style="height: 1px;width: 100%"></div>
          </i-col>
          <i-col span="10">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
              <FormItem label="用户名" prop="name" >
                <Input v-model="formValidate.name" placeholder="请输入你的用户名" />
              </FormItem>
              <p v-show="error.username">{{error.username}}</p>
              <FormItem label="邮箱" prop="mail">
                <Input v-model="formValidate.mail" placeholder="请输入你的邮箱" />
              </FormItem>
              <FormItem label="手机号" prop="phone">
                <Row>
                  <i-col :span="15">
                    <Input v-model="formValidate.phone" placeholder="请输入你的手机号" required />
                  </i-col>
                  <i-col span="1" style="text-align: center">--</i-col>
                  <i-col :span="8">
                    <Button type="default" @click="handleCode('formValidate')">发送手机验证码</Button>
                  </i-col>
                </Row>
              </FormItem>
              <p v-show="error.mobile">{{error.mobile}}</p>
              <FormItem label="验证码" prop="code" >
                <Input v-model="formValidate.code" placeholder="请输入你收到的验证码" required />
              </FormItem>
              <p v-show="error.code">{{error.code}}</p>
              <FormItem label="密码" prop="passwd">
                <Input type="password" v-model="formValidate.passwd" placeholder="请输入你的密码" />
              </FormItem>
              <p v-show="error.password">{{error.password}}</p>
              <FormItem label="确认密码" prop="passwdCheck">
                <Input type="password" v-model="formValidate.passwdCheck" placeholder="请再次输入你的密码" />
              </FormItem>
              <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
              </FormItem>
            </Form>
          </i-col>
          <i-col span="7">
            <div style="height: 1px;width: 100%"></div>
          </i-col>
        </Row>
        <Row>
          <i-col span="8">
            <div style="height: 1px;width: 100%"></div>
          </i-col>
          <i-col span="9">
            <Row :gutter="64">
              <i-col span="8">
                <Button>微信注册</Button>
              </i-col>
              <i-col span="8">
                <Button>QQ注册</Button>
              </i-col>
              <i-col span="8">
                <Button>Github注册</Button>
              </i-col>
            </Row>
          </i-col>
          <i-col span="7">
            <div style="height: 1px;width: 100%"></div>
          </i-col>
        </Row>
      </Card>
    </template>
  </main-container>
</template>

<script>
import { getVeryCode, register } from '../../api/api'
import cookie from '../../store/cookie'

export default {
  name: 'home',
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.formValidate.passwdCheck !== '') {
          // 对第二个密码框单独验证
          this.$refs.formValidate.validateField('passwdCheck')
        }
        callback()
      }
    }
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formValidate.passwd) {
        callback(new Error('两次输入的密码不匹配!'))
      } else {
        callback()
      }
    }
    return {
      isCollapsed: true,
      formValidate: {
        name: '',
        mail: '',
        phone: '',
        code: '',
        passwd: '',
        passwdCheck: []
      },
      ruleValidate: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        mail: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'change' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'change' }
        ],
        passwd: [
          { required: true, message: '请输入密码', trigger: 'change' },
          { validator: validatePass, trigger: 'blur' }
        ],
        passwdCheck: [
          { required: true, message: '请确认密码', trigger: 'change' },
          { validator: validatePassCheck, trigger: 'blur' }
        ]
      },
      error: {
        mobile: '',
        password: '',
        username: '',
        code: ''
      }
    }
  },
  computed: {
  },
  methods: {
    handleCode (name) {
      if (this.formValidate.phone === '') {
        this.$Message.error('请填写手机号!')
      } else {
        getVeryCode({
          mobile: this.formValidate.phone
        }).then((response) => {
          console.log(response)
          this.$Message.success('你的验证码为: ' + response.data['code'])
        }).catch(function (error) {
          console.log(error)
        })
      }
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          var that = this
          register({
            username: this.formValidate.name,
            mobile: this.formValidate.phone,
            email: this.formValidate.mail,
            code: this.formValidate.code,
            password: this.formValidate.passwd
          }).then((response) => {
            this.$Message.success('注册成功!')
            console.log(response)
            cookie.setCookie('name', response.data.username, 7)
            cookie.setCookie('token', response.data.token, 7)
            // 存储在store
            // 更新store数据
            that.$store.dispatch('setInfo')
            // 跳转到首页页面
            this.$router.push({ name: 'home' })
          }).catch(function (error) {
            console.log(error)
            that.error.mobile = error.mobile ? error.mobile[0] : ''
            that.error.password = error.password ? error.password[0] : ''
            that.error.username = error.username ? error.username[0] : ''
            that.error.code = error.code ? error.code[0] : ''
          })
        } else {
          this.$Message.error('失败!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>

<style scoped>
  .registbox {
    padding-top: 80px;
    height: 700px;
    font-size: 32px;
  }
</style>
