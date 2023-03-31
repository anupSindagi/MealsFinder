import { useGlobalContext } from "../context"

const Search = () => {
    const {onSearchSubmit, onSearchChange, onRandomMeal} = useGlobalContext();
    
    return (
        <div className="relative flex flex-col justify-center items-center bg-slate-300 py-4 borber border-b-4 border-slate-200  md:flex-row  md:space-x-4">
            <h1 className="text-3xl text-slate-700 drop-shadow-lg tracking-widest mr-8 pb-2"> meals app</h1>
            <form className="space-x-2" onSubmit={onSearchSubmit}>
                <input className="w-[250px] p-1 px-3 text-gray-400 rounded focus:outline-none drop-shadow-lg" type="text" placeholder="search your favorite meal..." onChange={onSearchChange}></input>
                {/*<button type="submit" className="text-center bg-slate-700  tracking-wide text-white rounded leading-relaxed px-3 p-1 drop-shadow-lg hover:bg-slate-500">search</button>*/}
                <button className="text-center bg-slate-900 tracking-wide text-white leading-relaxed rounded px-3 p-1 drop-shadow-lg hover:bg-slate-600 hover:scale-95" onClick={onRandomMeal}>surprise me!</button>
            </form>

        </div>
    );
}
export default Search;