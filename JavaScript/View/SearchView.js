const SearchFormView = props =>
	<div>
		<input placeholder="Filter" onInput={e=>props.onText(e.target.value)}/>
		{props.inputText}
		<select onChange={e=> props.onType(e.target.value)}>
			<option value="">All types</option>
			{props.types.map(tp=><option>{tp}</option>)}
		</select>
		{/*<button> Search! </button>*/}
	</div>;
const SearchResultsView = props =>
	<div>
	{
	props.searchResults
	.filter(poke => poke.types.some(type=>type.type.name.includes(props.inputType)))
	.filter(poke => poke.name.includes(props.inputText))
	.map(poke=>(
	<span class="searchResult" onClick={()=>{props.pokeChosen(poke.id); window.location.hash="#detail";}}>
		<div>
			{poke.id+ "   " +poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}
		</div>
		<div>
			<img src={poke.sprites.front_default} class="searchImage"></img>
		</div>
		<div>
			{poke.types.map(type=>(
				<span class={"type"+type.type.name}>{type.type.name.charAt(0).toUpperCase() +type.type.name.slice(1)}</span>))}
		</div>
	</span>))}
	</div>;