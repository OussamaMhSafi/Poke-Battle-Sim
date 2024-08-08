function promiseNoData(promise, data, error){
	if(promise === null){
		return <span> no data </span>
	}
	if(data === null || data === undefined){
		return <img width="70" src="https://i.imgur.com/llF5iyg.gif?noredirect"></img>
	}
	if(error !== null){
		return <span> {error} </span>
	}
	
	return false;
	
}