(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{14:function(e,t,n){e.exports=n(37)},19:function(e,t,n){},37:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(13),u=n.n(o),l=(n(19),n(3)),c=n(2),i=n.n(c),s=function(e){var t=e.person;return r.a.createElement("div",null,t.name," ",t.number)},m=function(e){var t=e.persons,n=e.searchKey,a=t.filter((function(e){return e.name.toLowerCase().includes(n.toLowerCase())}));return r.a.createElement(r.a.Fragment,null,a.map((function(e){return r.a.createElement(s,{key:e.id,person:e})})))},p=function(){var e=Object(a.useState)([]),t=Object(l.a)(e,2),n=t[0],o=t[1],u=Object(a.useState)(""),c=Object(l.a)(u,2),s=c[0],p=c[1],f=Object(a.useState)(""),d=Object(l.a)(f,2),g=d[0],v=d[1],b=Object(a.useState)(""),h=Object(l.a)(b,2),E=h[0],j=h[1];Object(a.useEffect)((function(){console.log("effect"),i.a.get("/api/persons").then((function(e){console.log("promise fulfilled"),o(e.data)}))}),[]);return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),"filter by:",r.a.createElement("input",{value:E,onChange:function(e){console.log(e.target.name,": ",e.target.value),j(e.target.value)}}),r.a.createElement("h2",null,"Add a new"),r.a.createElement("form",{onSubmit:function(e){e.preventDefault();var t={name:s,number:g};i.a.post("/api/persons",t).then((function(e){var a=e.data;"H\xc4LYTYS T\xc4\xc4LL\xc4 TAPAHTUI VIRHE"===a.error?i.a.put("".concat("/api/persons","/").concat(a.id),t).then((function(e){return e.data})).then((function(e){o(n.map((function(t){return t.id!==a.id?t:e})))})):o(n.concat(t))})),p(""),v("")}},r.a.createElement("div",null,"name:",r.a.createElement("input",{value:s,onChange:function(e){console.log(e.target.name,": ",e.target.value),p(e.target.value)}})),r.a.createElement("div",null,"number:",r.a.createElement("input",{value:g,onChange:function(e){console.log(e.target.name,": ",e.target.value),v(e.target.value)}})),r.a.createElement("button",{type:"submit"},"add")),r.a.createElement("h2",null,"Numbers"),r.a.createElement(m,{persons:n,searchKey:E}))};i.a.get("/api/persons").then((function(e){var t=e.data;u.a.render(r.a.createElement(p,{persons:t}),document.getElementById("root"))}))}},[[14,1,2]]]);
//# sourceMappingURL=main.f1f17adc.chunk.js.map