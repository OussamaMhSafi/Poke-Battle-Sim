function CurrentPokeView(props){
	
	

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

    var obj=props.poke;

    var selectElem = document.getElementById('attSlct')

    return(

        <div id="currentPokeView">


                <div class="currentPokeCard" style={`background: radial-gradient(circle at 50% 0%, ${colors[obj.pokemon.types[0].type.name]} 5%, white 30%);`}>


                                    <h3 class="currentPokeHP"> HP {obj.pokemon.stats[0].base_stat}</h3>

                                    <img src={obj.pokemon.sprites.front_default} />

                                    <h2 class="currentPokeName">{obj.pokemon.name.charAt(0).toUpperCase() + obj.pokemon.name.slice(1)}</h2>

                                    {obj.pokemon.types.map(type => (
                                        <span class={"type" + type.type.name + "T"} style={`border: none`}>{type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}</span>))}

                                    <div class="stats">

                                        <div>

                                            <h3>{obj.pokemon.stats[1].base_stat}</h3>
                                            <p>Attack</p>

                                        </div>

                                        <div>

                                            <h3>{obj.pokemon.stats[2].base_stat}</h3>
                                            <p>Defense</p>

                                        </div>

                                        <div>

                                            <h3>{obj.pokemon.stats[5].base_stat}</h3>
                                            <p>Speed</p>

                                        </div>

                                    </div>


                                    <div class="stats">

                                        <div>
                                            <h3>{obj.pokemon.stats[3].base_stat}</h3>
                                            <p>Special Attack</p>
                                        </div>

                                        <div>
                                            <h3>{obj.pokemon.stats[4].base_stat}</h3>
                                            <p>Special Defense</p>
                                        </div>
                                    </div>
                                    
                                    <div class="pokeAttacks">
                                            <ol>
                                            Moves:

                                                {props.poke.attacks.map(

                                                    function (e){

                                                        return(

                                                            <li class="abilityName">{e.name} (Acurracy:{e.accuracy} Power:{e.power})</li>
                                                        );
                                                    }
                                                )}
                                            </ol>

                                    </div>
                                    {/*<div class="pokeAttacks">
                                        
                                        <div>Moves:</div>

                                        <select id="attSlct" class="attackSelect" >

                                            {props.poke.attacks.map(

                                                function(att) {

                                                    return(
                                                        
                                                        <option class={"attackOpt" + (props.isChosenAtt(props.poke.attacks.indexOf(att)) ? 'Chosen' :  '')} 
                                                        key={props.poke.attacks.indexOf(att)}>{att.name} (Acurracy:{att.accuracy} Power:{att.power})</option>

                                                    ); 
                                                }
                                            )
                                            
                                        }

                                        </select>

                                        

                                    </div> 

                                <div class="pokeAbilities">
                                            
                                            Abilities:
                                            <ol>
                                                {props.poke.pokemon.abilities.map(

                                                    function (e){

                                                        return(

                                                            <li class="abilityName">{e.ability.name}</li>
                                                        );
                                                    }
                                                )}
                                            </ol>

                                                </div>*/}
                                
                </div>

            </div>
    
    );

}

  