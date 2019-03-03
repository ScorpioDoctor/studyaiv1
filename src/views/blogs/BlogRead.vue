<template>
  <!--<article-show :article="article"></article-show>-->
  <main-container>
    <template slot="content">
      <Row :gutter="8">
        <i-col :span="18">
          <Card>
            <h1 slot="title" style="text-align: center">
              {{article.title}}
            </h1>
            <div v-html="article.content"></div>
          </Card>
        </i-col>
        <i-col :span="6">
          <Row>
            <Card>
              <h4 slot="title">
                <Icon type="ios-film-outline"></Icon>
                作者：西交浪人
              </h4>
              <p>
                深度学习的概念源于人工神经网络的研究。含多隐层的多层感知器就是一种深度学习结构。
                深度学习通过组合低层特征形成更加抽象的高层表示属性类别或特征，以发现数据的分布式特征表示。
              </p>
            </Card>
          </Row>
          <Divider></Divider>
          <Row>
            <Card>
              <h4 slot="title">
                <Icon type="ios-film-outline"></Icon>
                相关文章
              </h4>
              <p>
                深度学习的概念源于人工神经网络的研究。含多隐层的多层感知器就是一种深度学习结构。
                深度学习通过组合低层特征形成更加抽象的高层表示属性类别或特征，以发现数据的分布式特征表示。
              </p>
            </Card>
          </Row>
        </i-col>
      </Row>
    </template>
  </main-container>

</template>

<script>
    import {getArticleDetail} from "../../api/api";

    export default {
      name: "blog-read",
      data(){
        return {
          article: ''
        }
      },
      computed: {

      },
      methods: {
        obtainArticle(){
          getArticleDetail(this.$route.params.id).then((response)=>{
            console.log(response.data)
            this.article = response.data
          }).catch(function (err) {
            console.log(err)
          })
        }
      },
      created() {
        this.obtainArticle()
      }
    }
</script>

<style scoped>

</style>
