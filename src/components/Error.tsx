const Error = () => {
  return (
    <div className="text-center mt-36">
      <img
        src="/logo.webp"
        alt="Saizeriya"
        className="w-1/2 mx-auto max-w-[128px] mb-6"
      />
      <h1 className="text-4xl font-bold mb-2 text-main">欢迎光临萨莉亚</h1>
      <p className="text-lg text-gray-500">但是您的访问链接有些问题...</p>
      <a href="/count?storeId=1&tableId=1" className="mt-6 block w-fit mx-auto">
        <button className="px-4 py-2 bg-primary rounded-lg text-white">
          访问能用的一个链接
        </button>
      </a>
    </div>
  )
}

export default Error
