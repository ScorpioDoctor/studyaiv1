import axios from 'axios'

let host = 'http://127.0.0.1:8000'

// 登录
export const login = params => { return axios.post(`${host}/login/`, params) }

// 验证码
export const getVeryCode = parmas => { return axios.post(`${host}/codes/`, parmas) }

// 注册
export const register = parmas => { return axios.post(`${host}/users/`, parmas) }

// 获取分类类别信息
export const getCategories = params => {
  if ('id' in params) {
    return axios.get(`${host}/categories/` + params.id + '/')
  } else {
    return axios.get(`${host}/categories/`, params)
  }
}

// 获取文章列表
export const getArticles = params => { return axios.get(`${host}/articles/`, { params: params }) }

// 商品详情
export const getArticleDetail = articleId => { return axios.get(`${host}/articles/${articleId}` + '/') }
