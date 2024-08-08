const  PokeSource={   // JS object creation literal
   apiCall(params) {
	return fetch("https://pokeapi.co/api/v2" + params, {"method": "GET"})
	  .then(response => { 
	  
		try {
			if (response.status !== 200) {
				throw new Error(response.status + ": " + response.statusText)
			}
	    }
		catch(err) {
			console.log(err);
			return;
	    }
		
		return response;
	  
	  })   
      .then(response => response.json());
   },
   
   // Makes an API call to get a list of the first 151 pokemon
   // Makes an individual fetch for each entry in the lsit to be able to return a detailed list
   getPokeList(){
		const promises = [];
		
		for (let i = 1; i <= 151; i++) {
			promises.push(this.getIdDetail(i));
		}
		
		for (let i = 1; i <= 100; i++) {
			promises.push(this.getAttackDetail(i));
		}
		return promises;
   },
   
   // Makes an API call for the details of a specific pokemon based one id
   getIdDetail(id){ return PokeSource.apiCall("/pokemon/" + id); },
   
   // Makes an API call for the details of a specific pokemon based one name
   getNameDetail(name){ return PokeSource.apiCall("/pokemon/" + name); },
   
   // Makes an API call for a specific attack
   getAttackDetail(id){ return PokeSource.apiCall("/move/" + id + "/"); },

   getPokeColorDetails(id){ 
	   	var obj;
		return PokeSource.apiCall("/pokemon-species/" + id + "/")
		  .then(data =>{ 
			  return data.color.name
			});
	},

	async returnColor(id) {
		const a = await this.getPokeColorDetails(id);
		return a;
	},

	async getTeamDetails() {
		const promises = [];
		for (let i = 1; i <= 151; i++) {
			promises.push(this.getIdDetail(i));
		}
		for (let i = 1; i <= 10; i++) {
			promises.push(this.getAttackDetail(i));
		}
		return promises;
	},
	getTeamAttacks(att) {
		const attPromises = att.map(a =>
			this.getAttackDetail(a)
		);
		return attPromises;
	},

	getTeamPokemon(team) {
		const teamPromises = team.map(t =>
			this.getIdDetail(t.pokemon)
		);
		return teamPromises;
	},

	getOpponent(opp){
		const oppPromise = opp.map(t =>
			this.getIdDetail(opp)
		);
		return oppPromise;
	}
};