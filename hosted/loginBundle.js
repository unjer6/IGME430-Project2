(()=>{var e={536:(e,t,r)=>{const a=r(603);e.exports=({csrf:e})=>React.createElement(React.Fragment,null,React.createElement("h1",null,"Login"),React.createElement("form",{id:"loginForm",name:"loginForm",onSubmit:e=>{e.preventDefault(),a.hideError();const t=e.target.querySelector("#user").value,r=e.target.querySelector("#pass").value,s=e.target.querySelector("#_csrf").value;return t&&r?(a.sendPost(e.target.action,{username:t,pass:r,_csrf:s}),!1):(a.handleError("Username or password is empty!"),!1)},action:"/login",method:"POST"},React.createElement("label",{htmlFor:"username"},"Username: "),React.createElement("input",{id:"user",type:"text",name:"username",placeholder:"username"}),React.createElement("label",{htmlFor:"pass"},"Password: "),React.createElement("input",{id:"pass",type:"password",name:"pass",placeholder:"password"}),React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:e}),React.createElement("input",{className:"formSubmit",type:"submit",value:"Sign in"})))},185:(e,t,r)=>{const a=r(603);e.exports=({csrf:e})=>React.createElement(React.Fragment,null,React.createElement("h1",null,"Sign Up"),React.createElement("form",{id:"signupForm",name:"signupForm",onSubmit:e=>{e.preventDefault(),a.hideError();const t=e.target.querySelector("#user").value,r=e.target.querySelector("#pass").value,s=e.target.querySelector("#pass2").value,n=e.target.querySelector("#_csrf").value;return t&&r&&s?r!==s?(a.handleError("Passwords do not match!"),!1):(a.sendPost(e.target.action,{username:t,pass:r,pass2:s,_csrf:n}),!1):(a.handleError("Username or password is empty!"),!1)},action:"/signup",method:"POST",className:"mainForm"},React.createElement("label",{htmlFor:"username"},"Username: "),React.createElement("input",{id:"user",type:"text",name:"username",placeholder:"username"}),React.createElement("label",{htmlFor:"pass"},"Password: "),React.createElement("input",{id:"pass",type:"password",name:"pass",placeholder:"password"}),React.createElement("label",{htmlFor:"pass2"},"Password: "),React.createElement("input",{id:"pass2",type:"password",name:"pass2",placeholder:"retype password"}),React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:e}),React.createElement("input",{className:"formSubmit",type:"submit",value:"Sign up"})))},603:e=>{e.exports={handleError:e=>{},sendPost:async(e,t,r)=>{const a=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}),s=await a.json();s.redirect&&(window.location=s.redirect),s.error&&s.error,r&&r(s)},sendDelete:(e,t)=>{fetch(e,{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})},hideError:()=>{}}}},t={};function r(a){var s=t[a];if(void 0!==s)return s.exports;var n=t[a]={exports:{}};return e[a](n,n.exports,r),n.exports}(()=>{const e=r(536),t=r(185),a=({csrf:r})=>React.createElement(React.Fragment,null,React.createElement("h1",null,"Welcome to Chalk!"),React.createElement("p",null,"Love Twitter, but need less words to choose from? Tired of politics, religion, and toxicity? Chalk has you covered. Send messages using pre-defined templates."),React.createElement(e,{csrf:r}),React.createElement("hr",null),React.createElement(t,{csrf:r}));window.onload=async()=>{const e=await fetch("/getToken"),{csrfToken:t}=await e.json();ReactDOM.render(React.createElement(a,{csrf:t}),document.querySelector("#root"))}})()})();