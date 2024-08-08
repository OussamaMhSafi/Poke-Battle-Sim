function TeamView(props) {

    const colors={
        bug: "#26de81",
        dragon:"#ffeaa7",
        electric: "#fed330",
        fairy: "#FF0069",
        fighting: "#30336b",
        fire:"#f0932b",
        flying:"#81ecec",
        grass:"#00b894",
        ground:"#EFB549",
        ghost:"#a55eea",
        ice:"#74b9ff",
        normal:"#95afc0",
        poison:"#6c5ce7",
        psychic:"#a29bfe",
        rock:"#2d3436",
        water:"#0190FF"
    }

    return (

        <div id="teamView">

            <nav class="teamTopNav">
                <div class="topBar"> 
					<button onClick={() => window.location.hash = "#startpage"}>Return to menu</button><button disabled={props.pokemon.length < 3} onClick={() => {props.initiateBattle(); window.location.hash = "#battle";}}>Start the Battle</button>

                    <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"></img>
                </div>
            </nav>

            {props.pokemon.map(

                function (e) {

                    return (                   

                        <div class={"pokeContainer" + ((props.isChosenPoke(e.pokemon.id) && !(props.currentPoke==="")) ? 'Chosen' : '')}>

                                    <button onClick={event=>props.removePoke(e.pokemon)}
                                        type="button" style={`border-radius:6px; background:red; border:0px solid`}>
                                    <span ></span>
                                    <span style={`color:white; font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;`}>Remove</span>
                                    </button>

                                    <div onClick={event=> props.setCurrentPoke(e)} class={"pokeCardChosen" + ((props.isChosenPoke(e.pokemon.id) && !(props.currentPoke===""))? '1' : '')} style={`background: radial-gradient(circle at 50% 0%, ${colors[e.pokemon.types[0].type.name]} 36%, white 36%);`}>

                                        <h3 class="pokeHP">
                                            HP {e.pokemon.stats[0].base_stat}
                                        </h3>

                                        <img src={e.pokemon.sprites.front_default} />

                                        <h2 class="pokeName">{e.pokemon.name.charAt(0).toUpperCase() + e.pokemon.name.slice(1)}</h2>

                                        {e.pokemon.types.map(type => (
                                            <span class={"type" + type.type.name+"T"} style={`border: none`}>{type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}</span>))}

                                        <div class="stats">

                                            <div>

                                                <h3>{e.pokemon.stats[1].base_stat}</h3>
                                                <p>Attack</p>

                                            </div>

                                            <div>

                                                <h3>{e.pokemon.stats[2].base_stat}</h3>
                                                <p>Defense</p>

                                            </div>

                                            <div>

                                                <h3>{e.pokemon.stats[5].base_stat}</h3>
                                                <p>Speed</p>

                                            </div>

                                        </div>


                                        <div class="specialStats">

                                            <div>
                                                <h3>{e.pokemon.stats[3].base_stat}</h3>
                                                <p>Special Attack</p>
                                            </div>

                                            <div>
                                                <h3>{e.pokemon.stats[4].base_stat}</h3>
                                                <p>Special Defense</p>
                                            </div>
                                        </div>

                                    </div>

                        </div>

                    );}
            )}

        </div>

    );
      
}