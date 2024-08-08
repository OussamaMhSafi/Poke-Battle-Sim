function InstructionsView(props){
	
	return (
		<div class="InstructionContainer">
			<button onClick={()=>{window.location.hash="#startpage"}}>Return to menu</button>
			
			<div class="Title"> Instructions </div>
			<div class="Search"/>
			<div>
				The search field that allows you to search for and then add pokemon to your team.
			</div>
			<ol>
				<li>How each pokemon that results from the search will be displayed which can be clicked for additional information about the pokemon and the ability to add them to the team</li>
				<li>An input field where you can type out the names, full or partial of the pokemon you want to search for</li>
				<li>Allows you to specify which pokemon types you want to search for</li>
			</ol>
			
			<div class="Detail"/>
			<div>
				The detailed description of a chosen pokemon, depicting the different stats of the pokemon with the ability to chose whether to return to the search or add the current pokemon to the team.
				With each pokemon chosen for the team of three being required to be unique.
			</div>
			<ol>
				<li>The ID and name of the pokemon</li>
				<li>The different base stats of the pokemon</li>
				<li>The image of the pokemon</li>
				<li>A button to add the currently displayed pokemon to your team as long as the team is not yet full or the pokemon has not yet been added to the team</li>
				<li>A button to allow you to return to the search page</li>
			</ol>
			
			<div class="TeamPokemon"/>
			<div>
				The display of each team member once added that displays the stats and type/s of each pokemon added to the team.
			</div>
			<ol>
				<li>A button to remove the pokemon displayed from the team</li>
				<li>The base HP stat of the team member</li>
				<li>The type/s of the team member</li>
				<li>The other base stats of the team member</li>
			</ol>
			
			<div class="Menu"/>
			<div>
				Displayed at the top of the search page is the following menu options, allowing you to either return to the menu or starting the battle once the full team has been set.
			</div>
			<ol>
				<li>A button to return to the main menu</li>
				<li>A button to start the battle, will only be possible to click once a full team of three pokemon has been chosen</li>
			</ol>
			
			<div class="Battle"/>
			<div>
				The battle simulation where you and the simple randomised computer opponent take turns using attacks with the goal to get the other down to zero health.
			</div>
			<ol>
				<li>A message board that displays the last 25 actions taken which includes your and the opponents attacks used, whenever you or your oponnent switches out pokemon and whenever either pokemon has fainted</li>
				<li>Your current score (pokemon you have beaten in a row)</li>
				<li>Your current pokemon</li>
					<ol>
						<li>The current health of your current pokemon</li>
					</ol>
				<li>The opposing pokemon</li>	
					<ol>
						<li>The current health of the opposing pokemon</li>
					</ol>
				<li>The four different attacks of the pokemon currently in the battle, clicking on any of the attacks will result in the pokemon using that specific attack against the opponent</li>
					<ol>
						<li>The name of the attack</li>
						<li>The type of the attack</li>
					</ol>
				<li>A button that will allow you to open the page to change the pokemon currently in the battle</li>
				<li>Exit the battle and go to the start menu.</li>
			</ol>
			
			<div class="ChangePokemon"/>
			<div>
				The screen presented when either your current pokemon has fainted, requiring you to chose a new pokemon or whenever you manually decide to switch out pokemon.
				When choosing a new pokemon manually without the current one having fainted the opponent will be allowed to attack before you may chose an attack.
				However if you chose a new pokemon after the last one has fainted you will be returned to the battle without the opponent being allowed to attack first.
			</div>
			<ol>
				<li>A button to allow you to exit back to the battle</li>
				<li>A fainted member of your team, will not be possible to chose</li>
					<ol>
						<li>The health of any fainter is zero</li>
					</ol>
				<li>A member of the team that has not yet fainted which if clicked will be exchanged with the pokemon currently in the battle</li>
					<ol>
						<li>The health of any member of the team which has not yet fainted will be anywhere between full health and above zero</li>
					</ol>
			</ol>
			
			<div class="EndScreen"/>
			<div>
				The end screen of the game, presented after all your pokemon has fainted
			</div>
			<ol>
				<li>Your final score</li>
				<li>A button that restarts the battle with the same team as previously chosen</li>
				<li>A button to return to the main menu</li>
			</ol>
			
		</div>
		
	
	)
}
