<template>
  <main-container :is-collpased="isCollapsed">
    <template slot="content">
      <Card class="blogbox">
        <Row>
          <i-col span="24">
            <Row>
              <span>请选择编辑器类型:  </span>
              <RadioGroup v-model="editorType">
                <Radio label="markdown">MarkDown编辑器</Radio>
                <Radio label="richeditor">富文本编辑器</Radio>
              </RadioGroup>
            </Row>
            <Divider>我思故我在，请开始您的创作吧</Divider>
            <Row class="editor" v-if=" editorType === 'markdown' ">
              <mavon-editor v-model="editorContent"/>
            </Row>
            <Row class="editor" v-if=" editorType === 'richeditor' ">
              <quill-editor v-model="editorContent"
                            ref="myQuillEditor"
                            :options="editorOption"
                            @blur="onEditorBlur($event)"
                            @focus="onEditorFocus($event)"
                            @ready="onEditorReady($event)">
              </quill-editor>
            </Row>
          </i-col>
        </Row>
        <Divider>请填写文章的其他信息</Divider>
        <Row>
          <i-col span="8">
            <div style="height: 1px;width: 100%"></div>
          </i-col>
          <i-col span="9">
            <Form ref="formValidate" :model="formValidate" :label-width="80">
              <FormItem label="文章类别" prop="category">
                <Cascader :data="categoryData" trigger="hover" transfer v-model="formValidate.category"
                          required></Cascader>
              </FormItem>
              <FormItem label="文章标签" prop="tags">
                <Select multiple v-model="formValidate.tags" placeholder="请选择若干标签" required>
                  <Option v-for="(item,idx) in tagsData" :key="idx" :value="item.id">{{item.name}}</Option>
                </Select>
              </FormItem>
              <FormItem label="文章标题" prop="title">
                <Input type="text" v-model="formValidate.title" placeholder="请输入文章标题 " required/>
              </FormItem>
              <FormItem label="文章摘要" prop="brief">
                <Input type="text" v-model="formValidate.brief" placeholder="请输入文章摘要" required/>
              </FormItem>
              <!--<FormItem label="文章封面" prop="frontimg">-->
              <!--<input type="file" v-model="formValidate.frontimg" placeholder="请选择文章封面" required/>-->
              <!--</FormItem>-->
              <!--<FormItem label="Content" prop="content">-->
              <!--<Input v-model="formValidate.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>-->
              <!--</FormItem>-->
              <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
              </FormItem>
            </Form>
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
  import {getCategories, getTags, postArticle} from "../../api/api";
  import cookie from '../../store/cookie'

  export default {
    name: 'home',
    data() {
      return {
        isCollapsed: true,
        editorType: 'richeditor',
        editorContent: '',
        editorOption: {
          // some quill options
        },
        formValidate: {
          category: [],
          tags: [],
          title: '',
          brief: '',
          // frontimg: '',
          content: '',
        },
        categoryData: [],
        tagsData: []
      }
    },
    methods: {
      onEditorBlur(quill) {
        console.log('editor blur!', quill)
      },
      onEditorFocus(quill) {
        console.log('editor focus!', quill)
      },
      onEditorReady(quill) {
        console.log('editor ready!', quill)
      },
      // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
      onEditorChange({quill, html, text}) {
        console.log('editor change!', quill, html, text)
        this.editorContent = html
      },

      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            postArticle({
              category: this.formValidate.category[this.formValidate.category.length - 1],
              tags: this.formValidate.tags,
              title: this.formValidate.title,
              brief: this.formValidate.brief,
              // front_image: this.formValidate.frontimg,
              content: this.editorContent
            }).then((response) => {
              this.$Message.success('Success!');
              // console.log(response.data)
              this.$router.push({ name: 'blogRead', params: {id: response.data.id} })
            }).catch((error) => {
              console.log(error)
            })
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      },

      getCategoriesTree(tree = []) {
        let arr = [];
        if (tree.length !== 0) {
          tree.forEach(item => {
            if (item.category_type === 1) {
              let obj1 = {};
              obj1.label = item.name;
              obj1.value = item.id;
              obj1.children = [];
              item.sub_cat.forEach(item2 => {
                if (item2.category_type === 2) {
                  let obj2 = {};
                  obj2.label = item2.name;
                  obj2.value = item2.id;
                  obj2.children = [];
                  item2.sub_cat.forEach(item3 => {
                    let obj3 = {};
                    obj3.label = item3.name;
                    obj3.value = item3.id;
                    obj2.children.push(obj3)
                  });
                  obj1.children.push(obj2)
                }
              });
              arr.push(obj1);
            }
          });
        }
        return arr
      },
      obtainCategories() {
        console.log('执行 obtainCategories')
        getCategories({
          params: {}
        }).then((res) => {
          // 这里给节点赋值
          this.categoryData = this.getCategoriesTree(res.data)
        }).catch(error => {
          console.log(error)
        })
      },

      obtainTags() {
        getTags({params: {}}).then((response) => {
          this.tagsData = response.data
          console.log(this.tagsData)
        }).catch(error => {
          console.log(error)
        })
      },

    },
    computed: {
      quillEditor() {
        if (this.editorType === 'richeditor') {
          return this.$refs.myQuillEditor.quill
        } else {
          return null
        }
      },
    },
    watch: {
    },
    created() {
      this.obtainCategories()
      this.obtainTags()
    },
    mounted() {
      console.log('this is current quill instance object', this.quillEditor)
      setTimeout(() => {
        if (this.editorType === 'richeditor') {
          this.editorContent = `<h1 class="ql-align-center">
                        <span class="ql-font-serif" style="background-color: rgb(240, 102, 102); color: rgb(255, 255, 255);"> I am Example 1! </span>
                        </h1>
                        <p><br></p>
                        <p><span class="ql-font-serif">W Can a man still be brave if he's afraid? That is the only time a man can be brave. </span></p>
                        <p><br></p>
                        <p><strong class="ql-font-serif ql-size-large">Courage and folly is </strong><strong class="ql-font-serif ql-size-large" style="color: rgb(230, 0, 0);">always</strong><strong class="ql-font-serif ql-size-large"> just a fine line.</strong></p>
                        <p><br></p>
                        <p><u class="ql-font-serif">There is only one God, and his name is Death. And there is only one thing we say to Death: "Not today."</u></p>
                        <p><br></p>
                        <p><em class="ql-font-serif">Fear cuts deeper than swords.</em></p>
                        <p><br></p>
                        <pre class="ql-syntax" spellcheck="false">const a = 10;<br>const editorOption = { highlight: text => hljs.highlightAuto(text).value };</pre>
                        <p><br></p>
                        <p><span class="ql-font-serif">Every flight begins with a fall.</span></p>
                        <p><br></p>
                        <p><a href="https://surmon.me/" target="_blank" class="ql-font-serif ql-size-small" style="color: rgb(230, 0, 0);"><u>A ruler who hides behind paid executioners soon forgets what death is. </u></a></p>
                        <p><br></p>
                        <iframe class="ql-video ql-align-center" frameborder="0" allowfullscreen="true" src="http://724.169pp.net/169mm/201812/046/2.jpg" height="512" width="800"></iframe>
                        <p><br></p>
                        <p><span class="ql-font-serif">Hear my words, and bear witness to my vow. Night gathers, and now my watch begins. It shall not end until my death. I shall take no wife, hold no lands, father no children. I shall wear no crowns and win no glory. I shall live and die at my post. I am the sword in the darkness. I am the watcher on the walls. I am the fire that burns against the cold, the light that brings the dawn, the horn that wakes the sleepers, the shield that guards the realms of men. I pledge my life and honor to the Night’s Watch, for this night and all the nights to come.</span></p>
                        <p><br></p>
                        <p><span class="ql-font-serif">We are born to suffer, to suffer can make us strong.</span></p>
                        <p><br></p>
                        <p><span class="ql-font-serif">The things we love destroy us every time.</span></p>
                        <p><br></p>
                        <iframe height=480 width=640 src='http://player.youku.com/embed/XMzc5NTczMzcwNA==' class="ql-video ql-align-center" frameborder="0" allowfullscreen="true" ></iframe>                        <p><br></p>
                        `
        } else {
        }
      }, 1300)
    }
  }
</script>

<style scoped>
  .blogbox {
    padding-top: 5px;
    min-height: 700px;
  }
</style>
