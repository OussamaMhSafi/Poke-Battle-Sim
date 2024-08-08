function YouLostView(props){
	
	return(
		<div class="YouLost">
			<h0 class="Title">You lost</h0>
			<div class="Score">You managed to beat {props.score} enemies!</div>
			<div class="Navigation">
				<button onClick={() => {props.restart(); window.location.hash="#battle";}}>Restart the battle</button> <button onClick={() => {window.location.hash="#startpage";}}>Exit to menu</button>
			</div>
		</div>
	)
}