export interface Store {
  id: number
  name: string
  location: string
}

export const stores: Store[] = [{
  id: 1,
  name: '北京路天河城店',
  location: '越秀区北京路天河城F6层'
}, {
  id: 2,
  name: '东方宝泰广场店',
  location: '天河区林和中路东方宝泰广场负一楼'
}]
