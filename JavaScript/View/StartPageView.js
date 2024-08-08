const StartPageView = props =>
    <div>
        <div class="StartTitle">Welcome to PokeBattle!</div>
    </div>;
const StartpageButtonsView = props =>
<div class="StartButtons">
    <button onClick={()=>{window.location.hash="#instructions"}}>Instructions</button>
    <button onClick={()=>{window.location.hash="#search"}}>New Game</button>
</div>;