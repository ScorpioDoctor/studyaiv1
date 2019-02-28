<template>
  <div class="category">
    <Tree :data="treeData"
          :load-data="loadData"
          :render="renderContent"
    ></Tree>
  </div>
</template>

<script>
  import {getCategories} from "../../api/api";

  export default {
    name: 'CustomTree',
    props: {
    },
    data () {
      return {
        topCategoryName: '机器学习',
        treeData: [],
      }
    },
    methods: {

      handleSelectChange (cat_id) {
        this.$emit('on-select', {'cat_id':cat_id})
      },

      loadData (item, callback) {
        let id = item.id || 0
        let data = []
        getCategories({
          id: id
        }).then((res) => {
          if (res.status === 200) {
            console.log(res.data)
            data = this.getTree(res.data.sub_cat)
            callback(data)
          } else {
            console.log("res.status !== 200")
          }
        }).catch(error => {
          console.log(error)
        })
      },

      getTree (tree = []) {
        let arr = [];
        if (tree.length !== 0) {
          tree.forEach(item => {
            let obj = {};
            obj.name = item.name;
            obj.id = item.id;
            obj.category_type = item.category_type; // 其他你想要添加的属性
            obj.parent_category = item.parent_category; // 其他你想要添加的属性
            if(item.category_type !== 3) {
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
            h('Button', {
              props: Object.assign({},  {
                type: 'default',
                size: 'small',
              }),
              on: {
                click: ()=>{this.handleSelectChange(data.id)}
              }
            }, data.name)
          ])
        ]);
      },

      // 页面加载后 查询 category_type = 1 的一级分类
      obtainCategories (cat_name) {
        console.log('执行 obtainCategories')
        getCategories({
          params: {name: cat_name}
        }).then((res) => {
          if (res.status === 200) {
            // 这里给节点赋值
            this.treeData = this.getTree(res.data)
          } else {
            console.log("res.status != 200")
          }
        }).catch(error => {
          console.log(error)
        })
      }
    },
    created () {
      this.obtainCategories(this.topCategoryName)
    }
  }
</script>

<style scoped>

</style>

