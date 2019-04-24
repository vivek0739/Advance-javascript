function add(a,b) {
  
  
  function parseArg(n) {

    if(Array.isArray(n)) {
      return add.apply(this,n);
    }
    if(typeof n == "function" )  return parseArg(n());
    if(isNaN(n)) 
     return 0;
    else 
      return parseInt(n);
  }
  

  return arguments.length <=1? parseArg(arguments[0]): parseArg(arguments[0])+add([].slice.call(arguments,1));
}