export default function Search(Search,setQuery) {
  return (
    <div>
       <form onSubmit={Search}>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button>Search</button>
      </form>
    </div>
  )
}
