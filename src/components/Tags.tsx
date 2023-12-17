import classNames from "classnames"
import { Item } from "../assets/menu"

const Tags = (item: Item) => {
  return (<>
    {item.new && (
      <span className={classNames(
        'text-xs px-1 rounded',
        'border border-red-700 text-red-700 bg-red-100'
      )}>
        新品
      </span>
    )}
    {item.capacity && (
      <span className={classNames(
        'text-xs px-1 rounded',
        'border border-orange-700 text-orange-700 bg-orange-50'
      )}>
        {item.capacity}ml
      </span>
    )}
    {item.top && (
      <span className={classNames(
        'text-xs px-1 rounded',
        'border border-emerald-700 text-emerald-700 bg-emerald-100'
      )}>
        人气
      </span>
    )}
    {item.cold && (
      <span className={classNames(
        'text-xs px-1 rounded',
        'border border-blue-700 text-blue-700 bg-blue-100'
      )}>
        冷
      </span>
    )}
    {item.recommend && (
      <span className={classNames(
        'text-xs px-1 rounded',
        'border border-orange-700 text-orange-700 bg-orange-100'
      )}>
        主厨推荐
      </span>
    )}
  </>)
}

export default Tags
