<template>
  <Card class="album">
    <Tree :data="treeData" :load-data="loadData" :render="renderContent"></Tree>
  </Card>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'Album',
    data () {
      return {
        treeData: [],
      }
    },
    methods: {
      ...mapActions([
        'albumCategoryList'
      ]),
      loadData (item, callback) {
        let parentId = item.id || 0
        let data = []
        this.albumCategoryList({
          parentId: parentId
        }).then((res) => {
          if (res.status === 1) {
            data = this.getTree(res.fields)
            callback(data)
          } else {
            this.$Notice.error({
              title: '错误',
              desc: res.msg
            })
          }
        }).catch(error => {
          this.$Notice.error({
            title: '错误',
            desc: '网络连接错误'
          })
          console.log(error)
        })
      },
      getTree (tree = []) {
        let arr = [];
        if (tree.length !== 0) {
          tree.forEach(item => {
            let obj = {};
            obj.categoryName = item.categoryName;
            obj.id = item.id; // 其他你想要添加的属性
            obj.removed = item.removed; // 其他你想要添加的属性
            obj.rank = item.rank; // 其他你想要添加的属性
            obj.imageUrl = item.imageUrl; // 其他你想要添加的属性
            obj.desc = item.desc; // 其他你想要添加的属性
            obj.parentId = item.parentId; // 其他你想要添加的属性
            if(item.child === 1) {
              obj.children = [];
              obj.loading = false;
            }
            arr.push(obj);
          });
        }
        return arr
      },
      renderContent (h, { root, node, data }) {
        return h('span', {
          style: {
            display: 'inline-block',
            width: '100%'
          }
        }, [
          h('span',[
            h('Icon', {
              style: {
                marginRight: '8px'
              }
            }),
            h('span', data.categoryName)
          ]),
          h('span', {
            style: {
              display: 'inline-block',
              float: 'right',
              marginRight: '32px'
            }
          }, [
            h('span', {
              style: {
                display: 'inline-block',
                'text-align': 'center',
                width: '25px',
                marginRight: '40px'
              }
            }, data.rank),
            h('span', {
              style: {
                display: 'inline-block',
                width: '480px',
                marginRight: '20px'
              }
            }, data.imageUrl || ''),
            h('Button', {
              props: Object.assign({},  {
                type: 'primary',
                size: 'small',
              }),
              style: {
                marginRight: '8px'
              },
              on: {
                click: () => { this.albumCategoryAdd(data) }
              }
            }, '添加'),
            h('Button', {
              props: Object.assign({},  {
                type: 'primary',
                size: 'small',
              }),
              style: {
                marginRight: '8px'
              },
              on: {
                click: () => { this.albumCategoryEdit(data) }
              }
            }, '编辑'),
            h('Button', {
              props: Object.assign({},  {
                type: 'error',
                size: 'small',
              }),
              on: {
                click: () => { this.changeAlbumCategoryStatus(data.id, data.removed) }
              }
            }, data.removed === 0 ? '启用' : '停用' )
          ])
        ]);
      },
      // 页面加载后 查询parentID=0 的分类
      queryCategoryList (parentId = 0) {
        console.log('执行专辑分类queryCategoryList')
        this.albumCategoryList({
          parentId: parentId
        }).then((res) => {
          if (res.status === 1) {
            // 这里给节点赋值
            this.treeData = this.getTree(res.fields)
          } else {
            this.$Notice.error({
              title: '错误',
              desc: res.msg
            })
          }
        }).catch(error => {
          this.$Notice.error({
            title: '错误',
            desc: '网络连接错误'
          })
          console.log(error)
        })
      },
    },
    mounted () {
      this.queryCategoryList()
    }
  }
</script>

<style scoped>

</style>

