import SearchIcon from '../assets/search.svg'

const Search = () => {
  return (
    <div className="p-2 bg-white rounded-t-3xl -mt-5 relative">
      <img src={SearchIcon} alt="" className="absolute top-5 left-5" />
      <input
        type="text"
        placeholder="搜索菜品名或编号"
        className="px-4 py-2 pl-9 bg-gray-100 rounded-full w-full outline-none border border-transparent focus:border-primary"
      />
    </div>
  )
}

export default Search
