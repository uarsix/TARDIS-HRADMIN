/**
 *处理导出数据
 * @param {*} data
 * @returns
 */
export const getExportData = (data) => {
  const arr = []
  data.forEach(item => {
    arr.push(Object.values(item))
  })
  return arr
}
/**
 *处理导出数据的headers
 * @param {*} data
 * @returns
 */
export const getExportHeaders = (data) => {
  const headers = {
    'id': '编号',
    'username': '姓名',
    'mobile': '手机',
    'timeOfEntry': '入职日期',
    'formOfEmployment': '聘用形式',
    'correctionTime': '转正日期',
    'workNumber': '工号',
    'departmentName': '部门'
  }
  return Object.keys(data[0]).map(item => headers[item])
}
