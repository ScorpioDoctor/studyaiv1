import axios from 'axios'

let host = 'http://127.0.0.1:8000'

//获取分类类别信息
export const getCategories = params => {
  if ('id' in params) {
    return axios.get(`${host}/categories/` + params.id + '/')
  }
  else {
    return axios.get(`${host}/categories/`, params)
  }
}
