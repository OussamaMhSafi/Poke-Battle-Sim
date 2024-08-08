const DetailsView = props => {

	if(props.poke.name === undefined){return};

    return (
    <div class="detailsView">
        <div class="detailsInfo">
            <div>
                <div class="detailsName">
                    {props.poke.id+ "   " +props.poke.name.charAt(0).toUpperCase() + props.poke.name.slice(1)}
                </div>
                <div class="detailsStats">
                    {props.poke.stats.map(stats=>(
                       <div>{stats.stat.name + " " + stats.base_stat}</div>
                    ))}
                </div>
            </div>
		    <div class="detailsImage">
			    <img class="detailsImg" src={props.poke.sprites.front_default}></img>
		    </div>
        </div>
        <div><button disabled={props.teamSize>=3 || props.team.some(poke => poke.pokemon.id === props.poke.id)} onClick={()=>{window.location.hash = "#search";props.pokeAdded(props.poke)}}>Add to team</button><button onClick={()=> window.location.hash = "#search"}>Cancel</button></div>
    </div>)
}