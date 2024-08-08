function PersistModel(model) {

    let loadingFromFirebase = false;

    model.addObserver(function () {

        if (loadingFromFirebase) {
            return;
        }

        firebase.database().ref("pokeModel").set({ 
            
            attacks: model.getFbAttacks(model.attack),
            currentPokemon: model.currentPokemon,
            team: model.getFbTeam(),
            currentTeamViewPokemon: (model.currentTeamViewPokemon || null),
            currentPoke: model.getFbCurrentPoke(),
            messages: model.messages,
            opponent: model.getFbCurrentOpponent()
        });
    });

    firebase.database().ref("pokeModel").once("value", function (data) {
        loadingFromFirebase = true;
        try {
            if (data.val()) {
                model.getTeamFromFb(data.val().team);
                model.setCurrentTeamViewPokemon(data.val().currentTeamViewPokemon);
                model.setAttacks(model.getAttacksFromFb(data.val().attacks) || []);
                model.setCurrentPokemon((data.val().currentPokemon) || "");
                model.getCurrentPokeFromFb(data.val().currentPoke || "");
                model.getOpponentFromFb(data.val().opponent);
                model.setMessages((data.val().messages) || []);
            }
        }
        catch (e) {
            console.log(e);
        }
        finally {
            loadingFromFirebase = false;
        }
    });
}