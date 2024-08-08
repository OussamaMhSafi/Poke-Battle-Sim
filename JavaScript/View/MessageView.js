function MessageView(props){
	
	return (
		<div class="MessageBoard">
			<table class="MessageTable">
				{props.messages.reverse().map(message => 
					<tr class="Row">
						<td id={message.includes("Opponent")}>{message}</td>
					</tr>)}
			</table>
		</div>
		
	
	)
}