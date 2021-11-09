var base_api_url = process.env.REACT_APP_BASE_API_URL;
var base_url = process.env.REACT_APP_BASE_URL;
if( typeof process.env.NODE_ENV !='undefined' && 
    process.env.NODE_ENV!=="development"){
		var lastChar = window.location.href[window.location.href.length -1];
		if(lastChar==="/"){
			base_url =  window.location.href+"/../../"	
			base_api_url = window.location.href+"/../../../"	
		}else{
			base_url =  window.location.href+"/../"
			base_api_url = window.location.href+"/../../"	
		}
}
var base_path = window.location.pathname;
var dirs =[] 
var base_dirs = "";
base_path.split("/").forEach(function(value,index,array){
		if(value!==""){
				dirs.push(value)
		}
})
if(base_path==="/" || dirs.length<3){
	
}else{
	var temp_arr = dirs.splice(0,dirs.length-2)
	base_dirs = "/"+temp_arr.join('/')
}

var config = {"base_url":base_url,
"base_api_url":base_api_url,
"append_url":base_dirs,
}

export default config;