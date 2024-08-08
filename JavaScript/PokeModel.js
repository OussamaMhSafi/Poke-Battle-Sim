class PokeModel{
	constructor(observers=[], pokemon=[], attack=[], team=[], user=null, opponent=null, currentPokemon="", currentDetailPokemon="", currentTeamViewPokemon=null, currentPoke="", chosenAttack=0, messages=[]){
		this.observers = observers;
		this.pokemon = [];
		this.attack = [];
		this.team=team;
		this.currentPokemon=currentPokemon;
		this.currentPoke=currentPoke;
		this.chosenAttack=chosenAttack;
		this.messages = [];
    this.score = 0;
	}

	setPokemon(list){
		this.pokemon = list;
		return;
	}

	setAttacks(list){
		this.attack =  list;
		return;
	}

	setTeam(t){
		this.team=t;
		this.notifyObservers();
	}

	setUser(u){
		this.user=u;
		this.notifyObservers();
	}	
	
	setOpponent(o){
		this.opponent=o;
		this.notifyObservers();
	}
	
	setCurrentPokemon(c){
		this.currentPokemon=c;
		this.notifyObservers();
	}

	setMessages(m){
		this.messages=m;
		this.notifyObservers();
	}

  setCurrentTeamViewPokemon(id) {
    this.currentTeamViewPokemon = id;
    this.notifyObservers();
  }

	initiateUsers(){
		// Start with the pokemon in the first position
		let p = this.team[0];
		this.currentPokemon = p.pokemon.id;
		this.currentPoke=p;
		
		// Make sure that the health of the current team is not lowered
		this.team.map(poke => poke.hp = poke.max_hp);
		
		// Reset the message board
		this.messages=["Beginning of combat log"];

    // Reset score
    this.score = 0;

		// Set an initial random pokemon for the opponent
		this.assignOpponent();
	}
	
	restartBattle(){
		// Reset the first pokemon in the team as the pokemon to start with
		// And assign a new opponent pokemon
		this.initiateUsers();
		
		// Reset the health of the current team to full health
		this.team.map(poke => poke.hp = poke.max_hp);
	}
	
	// Assigns a new opponent pokemon with a set 4 random attacks
	assignOpponent(){
		let p = this.randomPokemon();
		this.opponent = {
			currentPokemon: p, 
			hp: this.calculateHealth(p),
			max_hp: this.calculateHealth(p),
			attacks: this.randomAttack()
			};
      this.notifyObservers();
	}
	
	addToTeam(pokemon){
		if(!this.team.some(poke => poke.pokemon.id === pokemon.id)){
			this.team=[...this.team,{pokemon: pokemon, 
									 hp: this.calculateHealth(pokemon),
									 max_hp: this.calculateHealth(pokemon),
									 attacks: []}];
      //this.currentPokemon="";
			this.addAttacks(pokemon);
		}
		this.notifyObservers();
	}
	
	removeFromTeam(pokemon){
		this.team=this.team.filter(poke=> poke.pokemon.id != pokemon.id);
    if(pokemon = this.currentPoke){
		  this.currentTeamViewPokemon=null;
		  this.currentPoke="";
    }
		this.notifyObservers();
	}

	// Function to set the current pokemon being looked at in the detailsview
	setCurrentDetailPokemon(id){
		this.currentDetailPokemon = this.pokemon.find(poke => poke.id === id);
	}
	
	// Simmulates the user changing their current pokemon
	// Allows the opponent to attack before the user may act again unless the user's last pokemon fainted
	changePokemon(id){
		this.addMessage("You have chosen  " + this.team.find(poke => poke.pokemon.id == id).pokemon.name)
		let temp = this.currentPokemon;
		this.currentPokemon = id;
		
		// If the change is due to the last pokemon of the user fainting do not have the opponent attack
		if(this.team.find(poke => poke.pokemon.id == temp).hp <= 0){
			return;
		}
		this.opponentAttack();
		this.notifyObservers();
		return;
	}
	
	// Assigns 4 random attacks to the specified pokemon in the user's team
	addAttacks(pokemon){
		let temp = this.randomAttack();
					
		
		this.team.find(poke => poke.pokemon.id === pokemon.id).attacks = temp;
		this.team.find(poke => poke.pokemon.id === pokemon.id).chosenAttack = 0;
		this.notifyObservers();
		return;
	}

	/*//Attack chosen by user passed in TeamPresenter
	chooseAttack(choice){

		this.chosenAttack=choice;
		this.team.find(poke => poke.pokemon.id === this.currentPokemon).chosenAttack = choice;
		this.notifyObservers();
	}*/

	//set current team element
	setCurrentPoke(poke){
		this.currentTeamViewPokemon=poke.pokemon.id;
		this.currentPoke=poke;
		this.notifyObservers();

	}/*
  unsetCurrentPoke(poke){
    if(poke = this.currentPoke){
		  this.currentPokemon="";
		  this.currentPoke="";
    }
	}*/

	// Returns a random pokemon from the stored detailed list
	randomPokemon(){
		return this.pokemon[Math.floor(Math.random() * this.pokemon.length)];
	}
	
  randomTeam() {
    return this.team[Math.floor(Math.random() * this.team.length)];
  }

	// Returns a list of 4 random attacks from the stored detailed list
	randomAttack(){
		var attacks = [];
		
		while(attacks.length < 4){
			var temp = this.attack[Math.floor(Math.random() * this.attack.length)];
			if(attacks.indexOf(temp) === -1 && temp.power != null){
				attacks.push(temp);
			}
		}
		return attacks;
	}
	
	// Simulates the user attacking and their turn ending
	// With the opponent attacking before the user may attack again
	userAttack(attack){
		// Check if the user is out of usable pokemon (all three pokemon has fainted)
		if(!this.team.some(poke => poke.hp > 0)){
			this.addMessage("You are out of pokemon");
			
			window.location.hash = "#youlost";
			
			return;
		}
		
		// Check if user has fainted
		if(this.team.find(poke => poke.pokemon.id == this.currentPokemon).hp <= 0){
			this.addMessage("You must choose a new pokemon");
			
			// Force the user to change pokemon
			window.location.hash = "#battle#choice";
			
			return;
		}
		
		let attackType = attack.type.name;
		let opponentType = this.opponent.currentPokemon.types[0].type.name;
		let effectiveness = this.calculateEffectiveness(attackType, opponentType);
		
		let text = "";

		// If the attack has a normal effectiveness
		if(effectiveness === 1){
			text = "";
		} 
		// If the attack is super effective
		else if(effectiveness === 2){
			text = " and it was super effective"
		}
		// If the attack is not very effective
		else if(effectiveness === 0.5){
			text = " and it was not very effective"
		}
		// If the opponent's pokemon is immune to the attack
		else if(effectiveness === 0){
			text = " but " + this.opponent.currentPokemon.name + " was immune"
		}
		
		this.addMessage("Your " + this.team.find(poke => poke.pokemon.id == this.currentPokemon).pokemon.name + " used " + attack.name + text);
		let attackDamage = this.calculateDamage(attack, effectiveness);
		
		// Check if opponent will faint due to the damage caused
		if(this.opponent.hp - attackDamage <= 0){
			this.addMessage("Opponent's " + this.opponent.currentPokemon.name + " has fainted");
			this.opponent.hp = 0;
			
			// Assign a new pokemon to the opponent
			this.assignOpponent();
			this.addMessage("Opponent has chosen " + this.opponent.currentPokemon.name)

      // Add +1 to score
      this.score++;
			
			// If opponent has fainted it should not attack
			return;
		}
		this.opponent.hp -= attackDamage;
		
		this.opponentAttack();
	}
	
	// Simulates the opponent attacking
	opponentAttack(){
		
		// Make the opponent use a random attack out of the 4 assigned ones
		let attack = this.opponent.attacks[Math.floor(Math.random() * 4)]
		let user = this.team.find(poke => poke.pokemon.id == this.currentPokemon);
		
		let attackType = attack.type.name;
		let opponentType = user.pokemon.types[0].type.name;
		let effectiveness = this.calculateEffectiveness(attackType, opponentType);
		
		let text = "";
		
		// If the attack has a normal effectiveness
		if(effectiveness === 1){
			text = "";
		} 
		// If the attack is super effective
		else if(effectiveness === 2){
			text = " and it was super effective"
		}
		// If the attack is not very effective
		else if(effectiveness === 0.5){
			text = " and it was not very effective"
		}
		// If the user's pokemon is immune to the attack
		else if(effectiveness === 0){
			text = " but " + user.pokemon.name + " was immune"
		}
		
		this.addMessage("Opponent used " + attack.name + text);
		
		
		let attackDamage = this.calculateDamage(attack, effectiveness);
		
		// Check if user will faint due to the damage caused
		if(user.hp - attackDamage <= 0){
			this.addMessage("Your " + user.pokemon.name + " has fainted");
			user.hp = 0;
			
			// Force the user to change pokemon
			window.location.hash = "#battle#choice";
		}
		
		// Check if the user will be out of usable pokemon (all three pokemon has fainted)
		if(!this.team.some(poke => poke.hp > 0)){
			this.addMessage("You are out of pokemon");
			
			window.location.hash = "#youlost";
			
			return;
		}
		
		user.hp -= attackDamage;
	}
	
	
	// Simplified damage calculation based upon the one used within pokemon games
	// (((( ((2 x level)/5) + 2 ) x power x (attackStat/defenseStat) ) / 50 ) + 2) * typeEffectiveness
	calculateDamage(attack, effect){
		let level = 50;
		let attackStat = this.team.find(poke => poke.pokemon.id == this.currentPokemon).pokemon.stats.find(a => a.stat.name === "attack").base_stat;
		let defenseStat = this.opponent.currentPokemon.stats.find(a => a.stat.name === "defense").base_stat;
		
		let effectiveness = effect;
		
		return ((((((2 * level)/5) + 2) * attack.power * (attackStat/defenseStat)) / 50) + 2) * effectiveness;
	}
	
	// Simplified helath calculation based upon the one used within pokemon games
	// floor(0.01 x (2 x hpStat) x level) + level + 10
	calculateHealth(pokemon){
		let level = 50;
		return Math.floor(0.01 * (2 * pokemon.stats.find(a => a.stat.name === "hp").base_stat) * level) + 10 + level 
	}
	
	// Return the type effectiveness as given in the typeChart
	// 1 means normal effectiveness, 2 means it's super effective, 0.5 means it's not very effective and 0 means the defending pokemon is immune
	calculateEffectiveness(attackType, opponentType){
		return typeChart.types[opponentType][attackType];
	}
	
	// Adds a message to the message board
	addMessage(message){
		this.messages.push(message);
		return;
	}
	
	// Returns the n most recent messages (the last n elements in the messages array)
	getMessages(number){
		return this.messages.slice(-number);
	}


  // Firebase get functions
  getFbTeam() {
    let teamFb = [];
    if(!this.team){return []}
    for (let i = 0; i < this.team.length; i++) {
      let attacksFb = this.getFbTeamAttacks(this.team[i].attacks);
      teamFb.push(
        {
          attacks: attacksFb,
          chosenAttack: this.team[i].chosenAttack,
          pokemon: this.team[i].pokemon.id,
          hp: this.calculateHealth(this.team[i].pokemon),
          max_hp: this.calculateHealth(this.team[i].pokemon),
        }
      );
    }
    return teamFb;
  }

  getFbTeamAttacks(arr) {
    let attacksFb = [];
    for (let i = 0; i < arr.length; i++) {
      attacksFb = [...attacksFb, arr[i].id]
    }
    return attacksFb;
  }

  getFbAttacks(atts) {
    let fbAttacks = [];
    for (let i = 0; i < atts.length; i++) {
      fbAttacks = [...fbAttacks, atts[i].id]
    }
    return fbAttacks;
  }
  getFbCurrentOpponent(){
    if (!this.opponent) {
      return null;
    }
    let fbPoke = {
      currentPokemon: this.opponent.currentPokemon.id,
      hp: this.opponent.hp,
      max_hp: this.opponent.max_hp,
      attacks: this.getFbAttacks(this.opponent.attacks)
    };
    return fbPoke;
  }
  getFbCurrentPoke() {
    if (!this.currentPoke) {
      return "";
    }
    let fbPoke = {
      attacks: this.getFbTeamAttacks(this.currentPoke.attacks),
      chosenAttack: this.currentPoke.chosenAttack,
      hp: this.currentPoke.hp,
      max_hp: this.currentPoke.max_hp,
      pokemon: (this.currentTeamViewPokemon || this.randomTeam().pokemon.id)
    };
    this.currentTeamViewPokemon = fbPoke.pokemon;
    return fbPoke;
  }

  getAttacksFromFb(attFb) {
    let values = [];
    Promise.all(PokeSource.getTeamAttacks(attFb))
      .then(function (v) {
        values = v;
      })
      .then(() => { return values });
  }
  getOpponentFromFb(opponentFb){

    if (!opponentFb) {
      return null;
    }

    let value = [];

    PokeSource.getIdDetail(opponentFb.currentPokemon)
      .then(v => value = v)
      .then(() => {
          let a = [];
          Promise.all(PokeSource.getTeamAttacks(opponentFb.attacks))
            .then(function (attValues) {
              a = attValues;
            }).then(() => {
              let temp = {
                currentPokemon: value,
                hp: opponentFb.hp,
                max_hp: opponentFb.max_hp,
                attacks: a
              };
              this.opponent=temp;
            })
      });
  }

  getTeamFromFb(teamFb) {
    if (!teamFb) {
      return null;
    }
    let values = [];
    Promise.all(PokeSource.getTeamPokemon(teamFb))
      .then(v => values = v)
      .then(() => {
        for (let i = 0; i < teamFb.length; i++) {
          //let a = this.getAttacksFromFb(teamFb[i].attacks);
          let a = [];
          Promise.all(PokeSource.getTeamAttacks(teamFb[i].attacks))
            .then(function (attValues) {
              a = attValues;
            }).then(() => {
              this.team = [...this.team, {
                attacks: a,
                chosenAttack: teamFb[i].chosenAttack,
                hp: teamFb[i].hp,
                max_hp: teamFb[i].max_hp,
                pokemon: values[i]
              }];
            })
        }
      });
  }

  getCurrentPokeFromFb(p) {
    if (!p) {
      return;
    }
    let value = ""
    PokeSource.getIdDetail(p.pokemon)
      .then((v) => value = v)
      .then(() => {
        let a = [];
        Promise.all(PokeSource.getTeamAttacks(p.attacks))
          .then(function (attValues) {
            a = attValues;
          }).then(() => {
            let newPoke = {
              attacks: a,
              chosenAttack: p.chosenAttack,
              hp: p.hp,
              max_hp: p.max_hp,
              pokemon: value
            }
            this.currentPoke = newPoke;
          })
      });
  }
	
	//Observer methods
	addObserver(callback){
		this.observers = [...this.observers, callback];
	}
	
	removeObserver(callback){
		this.observers = this.observers.filter(cb => cb !== callback);
	}
	
	notifyObservers(){
		this.observers.forEach(cb=> {
				try{cb}catch(err){
					console.log(err);
					return;
				}
				cb.call();
				
			}
		)
		
	}
	
	isThereData(data){
    if(!data || data===""){
        return <div></div>;
    }
  }
}

const typeChart = {
    types: {
      bug: {
        bug: 1,
        dark: 1,
        dragon: 1,
        electric: 1,
        fairy: 1,
        fighting: 0.5,
        fire: 2,
        flying: 2,
        ghost: 1,
        grass: 0.5,
        ground: 0.5,
        ice: 1,
        normal: 1,
        poison: 1,
        psychic: 1,
        rock: 2,
        steel: 1,
        water: 1
      },
      dark: {
        bug: 2,
        dark: 0.5,
        dragon: 1,
        electric: 1,
        fairy: 2,
        fighting: 2,
        fire: 1,
        flying: 1,
        ghost: 0.5,
        grass: 1,
        ground: 1,
        ice: 1,
        normal: 1,
        poison: 1,
        psychic: 0,
        rock: 1,
        steel: 1,
        water: 1
      },
      dragon: {
        bug: 1,
        dark: 1,
        dragon: 2,
        electric: 0.5,
        fairy: 2,
        fighting: 1,
        fire: 0.5,
        flying: 1,
        ghost: 1,
        grass: 0.5,
        ground: 1,
        ice: 2,
        normal: 1,
        poison: 1,
        psychic: 1,
        rock: 1,
        steel: 1,
        water: 0.5
      },
      electric: {
        bug: 1,
        dark: 1,
        dragon: 1,
        electric: 0.5,
        fairy: 1,
        fighting: 1,
        fire: 1,
        flying: 0.5,
        ghost: 1,
        grass: 1,
        ground: 2,
        ice: 1,
        normal: 1,
        poison: 1,
        psychic: 1,
        rock: 1,
        steel: 0.5,
        water: 1
      },
      fairy: {
        bug: 0.5,
        dark: 0.5,
        dragon: 0,
        electric: 1,
        fairy: 1,
        fighting: 0.5,
        fire: 1,
        flying: 1,
        ghost: 1,
        grass: 1,
        ground: 1,
        ice: 1,
        normal: 1,
        poison: 2,
        psychic: 1,
        rock: 1,
        steel: 2,
        water: 1
      },
      fighting: {
        bug: 0.5,
        dark: 0.5,
        dragon: 1,
        electric: 1,
        fairy: 2,
        fighting: 1,
        fire: 1,
        flying: 2,
        ghost: 1,
        grass: 1,
        ground: 1,
        ice: 1,
        normal: 1,
        poison: 1,
        psychic: 2,
        rock: 0.5,
        steel: 1,
        water: 1
      },
      fire: {
        bug: 0.5,
        dark: 1,
        dragon: 1,
        electric: 1,
        fairy: 0.5,
        fighting: 1,
        fire: 0.5,
        flying: 1,
        ghost: 1,
        grass: 0.5,
        ground: 2,
        ice: 0.5,
        normal: 1,
        poison: 1,
        psychic: 1,
        rock: 2,
        steel: 0.5,
        water: 2
      },
      flying: {
        bug: 0.5,
        dark: 1,
        dragon: 1,
        electric: 2,
        fairy: 1,
        fighting: 0.5,
        fire: 1,
        flying: 1,
        ghost: 1,
        grass: 0.5,
        ground: 0,
        ice: 2,
        normal: 1,
        poison: 1,
        psychic: 1,
        rock: 2,
        steel: 1,
        water: 1
      },
      ghost: {
        bug: 0.5,
        dark: 2,
        dragon: 1,
        electric: 1,
        fairy: 1,
        fighting: 0,
        fire: 1,
        flying: 1,
        ghost: 2,
        grass: 1,
        ground: 1,
        ice: 1,
        normal: 0,
        poison: 0.5,
        psychic: 1,
        rock: 1,
        steel: 1,
        water: 1
      },
      grass: {
        bug: 2,
        dark: 1,
        dragon: 1,
        electric: 0.5,
        fairy: 1,
        fighting: 1,
        fire: 2,
        flying: 2,
        ghost: 1,
        grass: 0.5,
        ground: 0.5,
        ice: 2,
        normal: 1,
        poison: 2,
        psychic: 1,
        rock: 1,
        steel: 1,
        water: 0.5
      },
      ground: {
        bug: 1,
        dark: 1,
        dragon: 1,
        electric: 0,
        fairy: 1,
        fighting: 1,
        fire: 1,
        flying: 1,
        ghost: 1,
        grass: 2,
        ground: 1,
        ice: 2,
        normal: 1,
        poison: 0.5,
        psychic: 1,
        rock: 0.5,
        steel: 1,
        water: 2
      },
      ice: {
        bug: 1,
        dark: 1,
        dragon: 1,
        electric: 1,
        fairy: 1,
        fighting: 2,
        fire: 2,
        flying: 1,
        ghost: 1,
        grass: 1,
        ground: 1,
        ice: 0.5,
        normal: 1,
        poison: 1,
        psychic: 1,
        rock: 2,
        steel: 2,
        water: 1
      },
      normal: {
        bug: 1,
        dark: 1,
        dragon: 1,
        electric: 1,
        fairy: 1,
        fighting: 2,
        fire: 1,
        flying: 1,
        ghost: 0,
        grass: 1,
        ground: 1,
        ice: 1,
        normal: 1,
        poison: 1,
        psychic: 1,
        rock: 1,
        steel: 1,
        water: 1
      },
      poison: {
        bug: 0.5,
        dark: 1,
        dragon: 1,
        electric: 1,
        fairy: 0.5,
        fighting: 0.5,
        fire: 1,
        flying: 1,
        ghost: 1,
        grass: 0.5,
        ground: 2,
        ice: 1,
        normal: 1,
        poison: 0.5,
        psychic: 2,
        rock: 1,
        steel: 1,
        water: 1
      },
      psychic: {
        bug: 2,
        dark: 2,
        dragon: 1,
        electric: 1,
        fairy: 1,
        fighting: 0.5,
        fire: 1,
        flying: 1,
        ghost: 2,
        grass: 1,
        ground: 1,
        ice: 1,
        normal: 1,
        poison: 1,
        psychic: 0.5,
        rock: 1,
        steel: 1,
        water: 1
      },
      rock: {
        bug: 1,
        dark: 1,
        dragon: 1,
        electric: 1,
        fairy: 1,
        fighting: 2,
        fire: 0.5,
        flying: 0.5,
        ghost: 1,
        grass: 2,
        ground: 2,
        ice: 1,
        normal: 0.5,
        poison: 0.5,
        psychic: 1,
        rock: 1,
        steel: 2,
        water: 2
      },
      steel: {
        bug: 0.5,
        dark: 1,
        dragon: 0.5,
        electric: 1,
        fairy: 0.5,
        fighting: 2,
        fire: 2,
        flying: 0.5,
        ghost: 1,
        grass: 0.5,
        ground: 2,
        ice: 0.5,
        normal: 0.5,
        poison: 0,
        psychic: 0.5,
        rock: 0.5,
        steel: 0.5,
        water: 1
      },
      water: {
        bug: 1,
        dark: 1,
        dragon: 1,
        electric: 2,
        fairy: 1,
        fighting: 1,
        fire: 0.5,
        flying: 1,
        ghost: 1,
        grass: 2,
        ground: 1,
        ice: 0.5,
        normal: 1,
        poison: 1,
        psychic: 1,
        rock: 1,
        steel: 0.5,
        water: 0.5
      }
    }
  };