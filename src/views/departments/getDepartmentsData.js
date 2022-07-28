export const getDepartmentsData = (data) => {
  const newList = []
  data.forEach(item => {
    if (item.pid === '') {
      item.children = []
      data.forEach(item1 => {
        if (item1.pid === item.id) {
          item.children.push(item1)
        }
      })
      newList.push(item)
    }
  })
  return newList
}

export const getDepartmentsDataRecursive = (data, pid) => {
  const newList = []
  data.forEach(item => {
    if (item.pid === pid) {
      item.children = getDepartmentsDataRecursive(data, item.id)
      newList.push(item)
    }
  })
  return newList
}
