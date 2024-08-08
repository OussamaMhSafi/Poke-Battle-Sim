function RenderTest(){ console.log("Vue sub-component render test"); return false; }
function App(props){     
	return  ( 
		<div>
			<div class="container">
				<Show hash="#start"><StartpagePresenter model={props.model}/></Show>
				<Show hash="#search"><TeamPresenter model={props.model}/><CurrentPokePresenter model={props.model}/><SearchPresenter2 model={props.model}/><DetailsPresenter model={props.model}/></Show>

			</div>
			<RenderTest/>
		</div>  
	);
}
function defaultRoute(){
    if(["#start", "#search", "#battle", "#choice", "#battle#choice", "#youlost"].find((knownRoute) => window.location.hash == knownRoute) !== undefined){ 
		return
	}
	window.location.hash="#start";
}
defaultRoute();
window.addEventListener("hashchange", defaultRoute);