module.exports = function json(arr){
	var array = [];
	var a = [];
	var current;
	for(var i=0;i<arr.length;i++){
		current = arr[i];
		array.push(current);
		a.push(current);
	}
	var result = {
		array:array,
		total:array.length,
		a:a
	};
	var lst = JSON.stringify(result);
	console.log(lst);
}