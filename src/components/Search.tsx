import classNames from 'classnames'
import SearchIcon from '../assets/search.svg'
import { useEffect, useState } from 'react'

const Search = ({
  onClick
}: {
  onClick?: () => void
}) => {
  const [scrollDownValue, setScrollDownValue] = useState(24)

  // 当滚动高度超过204px时开始减小圆角，从24直到0，在24px内完成
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = document.documentElement.scrollTop
      if (scrollTop > 204) {
        setScrollDownValue(24 - (scrollTop - 204))
      } else {
        setScrollDownValue(24)
      }
    }
    document.addEventListener('scroll', onScroll)
    return () => {
      document.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div
      className="p-2 bg-white -mt-6 sticky top-0 z-10"
      style={{
        borderRadius: `${scrollDownValue}px ${scrollDownValue}px 0 0`
      }}
    >
      <img src={SearchIcon} alt="" className="absolute top-5 left-5" />
      <button
        className={classNames(
          'px-4 py-2 pl-9',
          'bg-gray-100 w-full rounded-full',
          'text-gray-400 text-left',
        )}
        onClick={onClick}
      >
        搜索菜名或编号
      </button>
    </div>
  )
}

export default Search
