function defaultRoute(){
    if(["#startpage", "#instructions", "#search", "#detail", "#battle", "#choice", "#battle#choice", "#youlost"].find((knownRoute) => window.location.hash == knownRoute) !== undefined){ 
		return
	}
	window.location.hash="#startpage";
}

// <Show hash="#TEMP"> <CurrentPokePresenter model={props.model}/> </Show>
const App= (props)=> { 
   return  ( 

        <div class="Wrapper">
			<Show hash="#startpage"> <StartPagePresenter model={props.model}/> </Show>
			<Show hash="#instructions"><InstructionsPresenter model={props.model}/></Show>
				
			<Show hash="#search"> 
				<TeamPresenter model={props.model}/>
				<CurrentPokePresenter model={props.model}/>
				<SearchPresenter2 model={props.model}/>
			</Show>
			
			
			<Show hash="#detail"> 
				<TeamPresenter model={props.model}/>
				<CurrentPokePresenter model={props.model}/>
				<DetailsPresenter model={props.model}/> 
			</Show>
		
		
            <Show hash="#battle"> <BattlePresenter model={props.model}/> </Show>
			<Show hash="#choice"> <ChoicePresenter model={props.model}/> </Show>
			<Show hash="#youlost"> <YouLostPresenter model={props.model}/> </Show>
         </div>  
     
    );
}


defaultRoute();
window.addEventListener("hashchange", defaultRoute);
