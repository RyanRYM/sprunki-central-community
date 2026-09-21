/* SCC v1.0.1 — server-backed authentication. */
(function(){
  const TOKEN='scc_auth_token_v095', CACHE='scc_user_cache_v095';
  function getToken(){return localStorage.getItem(TOKEN)||sessionStorage.getItem(TOKEN)||'';}
  function setToken(t){if(t){localStorage.setItem(TOKEN,t);sessionStorage.setItem(TOKEN,t)}else{localStorage.removeItem(TOKEN);sessionStorage.removeItem(TOKEN)}}
  function cache(u){if(u)localStorage.setItem(CACHE,JSON.stringify(u));else localStorage.removeItem(CACHE)}
  function cached(){try{return JSON.parse(localStorage.getItem(CACHE)||'null')}catch{return null}}
  async function api(action,method='GET',body){const r=await fetch('/api/auth?action='+encodeURIComponent(action),{method,headers:{'Content-Type':'application/json',...(getToken()?{Authorization:'Bearer '+getToken()}: {})},body:body?JSON.stringify(body):undefined});let d={};try{d=await r.json()}catch{};return {...d,httpOk:r.ok,status:r.status};}
  async function refresh(){const u=await api('me');if(u.httpOk&&u.user){cache(u.user);return u.user}if(u.status===401){setToken('');cache(null)}return null}
  window.SCCAuth={
    signup:async(u,p,d,b)=>{const r=await api('signup','POST',{username:u,password:p,displayName:d,baleId:b});if(r.token){setToken(r.token);cache(r.user)}return r},
    login:async(u,p)=>{const r=await api('login','POST',{username:u,password:p});return r},
    verifyOwnerSecret:async s=>{const r=await api('owner-secret','POST',{secret:s});if(r.token){setToken(r.token);cache(r.user)}return r},
    current:()=>cached(),
    refresh,
    isOwner:()=>cached()?.owner===true,
    isLoggedIn:()=>!!cached(),
    userCount:async()=>{const r=await api('count');return r.count||0},
    logout:()=>{location.href='logout-confirm.html'},
    clearSession:async()=>{if(getToken())await api('logout','POST');setToken('');cache(null);location.replace('index.html')},
    token:getToken
  };
  refresh().catch(()=>{});
})();
