function BattleView(props){
	
	let userPokemon = props.team.find(poke => poke.pokemon.id == props.currentPokemon);
	
	return(
		<div class="BattleProps">
			<div class="Buttons">
				<button id={userPokemon.attacks[0].type.name} 
						name={userPokemon.attacks[0].name}
						onClick={e => props.useAttack(userPokemon.attacks[0])}>
							<div class="Info">
								<div class="Name">{userPokemon.attacks[0].name.charAt(0).toUpperCase() + userPokemon.attacks[0].name.slice(1)}</div>
								<span class="Type" type={userPokemon.attacks[0].type.name}>{"Type: " + userPokemon.attacks[0].type.name.charAt(0).toUpperCase() + userPokemon.attacks[0].type.name.slice(1)}</span>
							</div>
				</button>
				
				<button id={userPokemon.attacks[1].type.name} 
						name={userPokemon.attacks[1].name}
						onClick={e => props.useAttack(userPokemon.attacks[1])}>
							<div class="Info">
								<div class="Name">{userPokemon.attacks[1].name.charAt(0).toUpperCase() + userPokemon.attacks[1].name.slice(1)}</div>
								<span class="Type" type={userPokemon.attacks[1].type.name}>{"Type: " + userPokemon.attacks[1].type.name.charAt(0).toUpperCase() + userPokemon.attacks[1].type.name.slice(1)}</span>
							</div>
				</button>
				
				<button id={userPokemon.attacks[2].type.name} 
						name={userPokemon.attacks[2].name}
						onClick={e => props.useAttack(userPokemon.attacks[2])}>
							<div class="Info">
								<div class="Name">{userPokemon.attacks[2].name.charAt(0).toUpperCase() + userPokemon.attacks[2].name.slice(1)}</div>
								<span class="Type" type={userPokemon.attacks[2].type.name}>{"Type: " + userPokemon.attacks[2].type.name.charAt(0).toUpperCase() + userPokemon.attacks[2].type.name.slice(1)}</span>
							</div>
				</button>
				
				<button id={userPokemon.attacks[3].type.name} 
						name={userPokemon.attacks[3].name}
						onClick={e => props.useAttack(userPokemon.attacks[3])}>
							<div class="Info">
								<div class="Name">{userPokemon.attacks[3].name.charAt(0).toUpperCase() + userPokemon.attacks[3].name.slice(1)}</div>
								<span class="Type" type={userPokemon.attacks[3].type.name}>{"Type: " + userPokemon.attacks[3].type.name.charAt(0).toUpperCase() + userPokemon.attacks[3].type.name.slice(1)}</span>
							</div>
				</button>
			</div>
			
			<div class="ChangeTeam">
				<button id="ChangeTeam" onClick={() => window.location.hash="#battle#choice"}>Switch current Pokemon</button>
				<button onClick={() => {window.location.hash="#startpage";}}>Exit to menu</button>
			</div>
		</div>
	)
}