var dummyTest = (function(){
  if(1 + 1 === 2){
    console.log("\'Test\' test passes");
  } else {
    throw new Error("We got trouble, right here in River City");
  }
})();