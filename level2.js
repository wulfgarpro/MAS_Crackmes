// I had issues running the level2 app on a modern Android. I had success with 
// the app on Pixel 4a running API 30.

Java.perform(function () {
  const b = Java.use("sg.vantagepoint.a.b");

  b.a.implementation = function (arg) {
    return false;
  }

  b.b.implementation = function (arg) {
    return false;
  }

  b.c.implementation = function (arg) {
    return false;
  }

  const CodeCheck = Java.use("sg.vantagepoint.uncrackable2.CodeCheck");
  CodeCheck.a.implementation = function(s) {
    console.log(`CodeCheck.a() called with ${s}`)
    return this.a(s);
  }
});

Interceptor.attach(Module.findExportByName("libc.so", "strncmp"), {
  onEnter: function (args) {
    try {
      if (args[2].toInt32() === 0x17) { // `strncmp` is only called with length 0x17
        const s1 = args[0].readUtf8String();
        const s2 = args[1].readUtf8String();
        console.log(`strncmp called with: ${s1} and ${s2}`);
      }
    } catch(err) {
      console.warn("Could not safely dereference strncmp args");
    }
  },
  onLeave: function (retval) {
  }
});

/**
    CodeCheck.a() called with 12345678901234567890123
    strncmp called with: 12345678901234567890123 and Thanks for all the fish
*/
