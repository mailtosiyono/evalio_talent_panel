(()=>{
 const f=document.getElementById('loginForm'),error=document.getElementById('loginError');
 document.getElementById('togglePass')?.addEventListener('click',e=>{
   const x=document.getElementById('password');x.type=x.type==='password'?'text':'password';
   e.currentTarget.textContent=x.type==='password'?'Tampilkan':'Sembunyikan';
   e.currentTarget.setAttribute('aria-pressed',String(x.type==='text'));
 });
 f?.addEventListener('submit',e=>{
   e.preventDefault();error.hidden=true;
   if(window.EvalioDemoAuth?.signIn(document.getElementById('username').value,document.getElementById('password').value)){
     location.replace('index.html');return;
   }
   error.textContent='Username atau password tidak sesuai.';
   error.hidden=false;
 });
})();
