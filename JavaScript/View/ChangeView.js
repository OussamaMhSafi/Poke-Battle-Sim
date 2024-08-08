function ChangeView(props){
	let status;
	
	return(
		<div class="ChangePokemon">
			<div class="Return">
				<button id="RegretChange" onClick={() => window.location.hash="#battle"}>Exit</button>
			</div>
			
			{props.team.map(poke=>{
				// Check if the pokemon is the current pokemon, if so don't render
				if(poke.pokemon.id == props.currentPokemon){
					return;
				}
				// Check if the pokemon has any remaining health, if so render as alive
				else if(poke.hp > 0) {
					status = "Team Alive";
				}
				else {
					status = "Team Fainted";
				}
				
				
				return (<span class={status} id={poke.pokemon.id} onClick={e => {props.changePokemon(e.target.id); window.location.hash="#battle"}}>
						<div id={poke.pokemon.id}>
							{poke.pokemon.name.charAt(0).toUpperCase() + poke.pokemon.name.slice(1)}
						</div>
						<div id={poke.pokemon.id}>
							<img id={poke.pokemon.id} src={poke.pokemon.sprites.front_default} class="TeamImage"></img>
						</div>
						<div id={poke.pokemon.id}>
							<progress class="UserHealth" id={poke.pokemon.id} value={poke.hp.toFixed(2)} max={poke.max_hp}/>
						</div>
					</span>)
			
			})
		}
		</div>	
	
	)
}