var promise=new Promise(function(res,rej){
	var state=true;
	if(state){
		res("resolved");
	}
	else{
		rej("rejected");
	}
});

promise.then(function(data){console.log(data)}).catch(function(data){
	console.log(data);
})