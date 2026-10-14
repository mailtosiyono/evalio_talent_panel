(()=>{
  'use strict';
  const key='evalio_talent_docs_demo_auth_v3';
  const isLogin=location.pathname.split('/').pop()==='login.html';
  let authenticated=false;
  try{authenticated=sessionStorage.getItem(key)==='demo-ok'}catch(e){/* Browser denies storage */}
  if(!isLogin&&!authenticated){
    // Demo access control only. JS and static files are not secured against direct access.
    location.replace('login.html');
  }
  if(isLogin&&authenticated){location.replace('index.html');return}
  if(!isLogin){
    document.addEventListener('DOMContentLoaded',()=>{
      document.querySelectorAll('[data-logout]').forEach(btn=>btn.addEventListener('click',()=>{
        try{sessionStorage.removeItem(key)}catch(e){}
        location.replace('login.html');
      }));
    });
  }
  window.EvalioDemoAuth={
    signIn(username,password){
      if(username.trim()==='admin'&&password==='evalio'){
        try{sessionStorage.setItem(key,'demo-ok');return true}catch(e){return false}
      }
      return false;
    }
  };
})();
