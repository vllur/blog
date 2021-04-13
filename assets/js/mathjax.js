MathJax.Hub.Config({
  TeX: {
    equationNumbers: {
      autoNumber: "AMS"
    }
  },
  tex2jax: {
  inlineMath: [ ['$', '$'] ],
  displayMath: [ ['$$', '$$'] ],
  processEscapes: true,
  }
});
MathJax.Hub.Register.MessageHook("Math Processing Error",function (message) {
	alert("Math Processing Error: "+message[1]);
});
MathJax.Hub.Register.MessageHook("TeX Jax - parse error",function (message) {
	alert("Math Processing Error: "+message[1]);
});
