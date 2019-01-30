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
              <FormItem label="账户名" prop="name" >
                <Input v-model="formValidate.name" placeholder="请输入你的账户名"></Input>
              </FormItem>
              <FormItem label="邮箱" prop="mail">
                <Input v-model="formValidate.mail" placeholder="请输入你的邮箱"></Input>
              </FormItem>
              <FormItem label="手机号" prop="phone">
                <Input v-model="formValidate.phone" placeholder="请输入你的手机号"></Input>
              </FormItem>
              <FormItem label="密码" prop="passwd">
                <Input type="password" v-model="formValidate.passwd" placeholder="请输入你的密码"></Input>
              </FormItem>
              <FormItem label="确认密码" prop="passwdCheck">
                <Input type="password" v-model="formValidate.passwdCheck" placeholder="请再次输入你的密码"></Input>
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
    export default {
      name: 'home',
      data() {
        const validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.formValidate.passwdCheck !== '') {
              // 对第二个密码框单独验证
              this.$refs.formValidate.validateField('passwdCheck');
            }
            callback();
          }
        };
        const validatePassCheck = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.formValidate.passwd) {
            callback(new Error('两次输入的密码不匹配!'));
          } else {
            callback();
          }
        };
        return {
          isCollapsed: true,
          formValidate: {
            name: '',
            mail: '',
            phone: '',
            passwd: '',
            passwdCheck: [],
          },
          ruleValidate: {
            name: [
              { required: true, message: '姓名不能为空', trigger: 'blur' }
            ],
            mail: [
              { required: true, message: '邮箱不能为空', trigger: 'blur' },
              { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
            ],
            phone: [
              { required: true, message: '手机号不能为空', trigger: 'change' }
            ],
            passwd: [
              { required: true, message: '请输入密码', trigger: 'change' },
              { validator: validatePass, trigger: 'blur' }
            ],
            passwdCheck: [
              { required: true, message: '请确认密码', trigger: 'change' },
              { validator: validatePassCheck, trigger: 'blur' }
            ],
          }
        }
      },
      computed: {
      },
      methods: {
        handleSubmit (name) {
          this.$refs[name].validate((valid) => {
            if (valid) {
              this.$Message.success('成功!');
            } else {
              this.$Message.error('失败!');
            }
          })
        },
        handleReset (name) {
          this.$refs[name].resetFields();
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
