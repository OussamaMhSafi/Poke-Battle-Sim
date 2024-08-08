function App(props){ 
	return  (
		<div>
			<TeamPresenter model={props.model}/>
			<CurrentPokePresenter model={props.model}/>
		</div>  
	 );
}