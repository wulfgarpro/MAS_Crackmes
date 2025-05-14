// Convert byte array to string
function bin2string(array){
	var result = "";
	for(var i = 0; i < array.length; ++i){
		result+= (String.fromCharCode(array[i]));
	}
	return result;
}

Java.perform(function () {
  const clz = Java.use("sg.vantagepoint.a.c");

  clz.a.implementation = function (arg) {
    return false;
  }

  clz.b.implementation = function (arg) {
    return false;
  }

  clz.c.implementation = function (arg) {
    return false;
  }

  const clz2 = Java.use("sg.vantagepoint.a.a");
  const m = clz2.a;
  
  clz2.a.implementation = function (arg0, arg1) {
    const ret = m.call(this, arg0, arg1);
    console.log(`Got secret: ${bin2string(ret)}`);
    return ret;
  }
});
