export default function Search({search,setQuery}) {
  return (
    <div>
     <form className="product-search-form" onSubmit={search}>
        <input
          className="product-search-input"
          type="text"
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="product-search-btn">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
    </div>
  )
}
