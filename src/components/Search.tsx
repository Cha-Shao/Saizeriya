import classNames from 'classnames'
import SearchIcon from '../assets/search.svg'

const Search = ({
  onClick
}: {
  onClick?: () => void
}) => {
  return (
    <div className="p-2 bg-white rounded-t-3xl -mt-5 relative">
      <img src={SearchIcon} alt="" className="absolute top-5 left-5" />
      <button
        className={classNames(
          'px-4 py-2 pl-9',
          'bg-gray-100 rounded-full w-full',
          'text-gray-400 text-left'
        )}
        onClick={onClick}
      >
        搜索菜名或编号
      </button>
    </div>
  )
}

export default Search
