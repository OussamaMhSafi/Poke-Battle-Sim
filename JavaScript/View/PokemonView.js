//<progress id="UserHealth" value={props.model.user.hp} max={props.model.user.hp}/>
// <progress id="OpponentHealth" value={props.model.opponent.hp} max={props.model.opponent.hp}/>

// <img src={props.pokemon[0].sprites.front_default}/>

function PokemonView(props){

	let userPokemon = props.team.find(poke => poke.pokemon.id == props.currentPokemon);
	
	return (
		<div class="BattleBackground">
		<div class="Score">Your current score is {props.score} points.</div>	
		<div class="BattlePokemon">
		
			<span class="User">
				<div class="Box">
					<div>{userPokemon.pokemon.name.charAt(0).toUpperCase() + userPokemon.pokemon.name.slice(1)}</div>
					<div>
						<progress id="UserHealth" value={userPokemon.hp.toFixed(2)} max={userPokemon.max_hp}/>
					</div>
				</div>
				<img class="UserImage" src={userPokemon.pokemon.sprites.front_default}/>
				
			</span>
			
			<span class="Opponent">
				<div class="Box">
					<div>{props.opponent.currentPokemon.name.charAt(0).toUpperCase() + props.opponent.currentPokemon.name.slice(1)}</div>
					<div>
						<progress id="OpponentHealth" value={props.opponent.hp.toFixed(2)} max={props.opponent.max_hp}/>
					</div>
				</div>
				<img class="OpponentImage" src={props.opponent.currentPokemon.sprites.front_default}/>
				
			</span>
			
		
		</div>
		</div>
		
	
	)
}