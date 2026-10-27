let opt="";

// Choisir option page 1
function choisir(el,v){
  document.querySelectorAll('.card').forEach(c=>c.classList.remove('selected'));
  el.classList.add('selected');
  opt=v;
}

// Navigation pages 1-2-3-4
function aller(n){
  if(n==2 && opt==""){
    alert("Choisis d'abord une option!");
    return;
  }
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('p'+n).classList.add('active');
  window.scrollTo(0,0);
}

// Photo passeport
document.getElementById('file')?.addEventListener('change', function(){
  let f=this.files[0];
  if(f){
    let r=new FileReader();
    r.onload=e=>{
      let img=document.getElementById('img');
      img.src=e.target.result;
      img.style.display='block';
      document.getElementById('txt').style.display='none';
    };
    r.readAsDataURL(f);
  }
});

// SEULE FONCTION POUR PAGE 4 - DOSSIER SCELLÉ
function afficherPage4(){
  let nom=document.getElementById('nom').value.trim();
  if(!opt ||!nom){alert("Remplis Page 1 et 2 d'abord");return;}
  document.getElementById('zoneScellee').style.display="block";
  document.getElementById('msgVide').style.display="none";

  let c=localStorage.getItem('esforca_cpt');
  if(!c) c=1; else c=parseInt(c)+1;
  if(c>100000000) c=1;
  localStorage.setItem('esforca_cpt',c);
  let num=String(c).padStart(3,'0');
  document.getElementById('numOrdre').innerText=num;

  // INFOS COMPLETES
  let age = document.getElementById('age').value;
  let datenais = document.getElementById('datenais').value;
  let sexe = document.getElementById('sexe').value;
  let ville = document.getElementById('ville').value;
  let avenue = document.getElementById('avenue').value;
  let quartier = document.getElementById('quartier').value;
  let commune = document.getElementById('commune').value;
  let statut = document.getElementById('statut').value;

  document.getElementById('s_opt').innerText=opt;
  document.getElementById('s_nom').innerText= document.getElementById('nom').value+" "+document.getElementById('postnom').value+" "+document.getElementById('prenom').value + " | Age: " + age + " | Sexe: " + sexe;
  document.getElementById('s_tel').innerText= document.getElementById('tel').value + " | Né le " + datenais + " à " + ville + " | " + avenue + ", " + quartier + ", " + commune + " | Statut: " + statut;

  let sujet=`Inscription ESFORCA ${num} - ${document.getElementById('s_nom').innerText}`;
  let corps=`Option: ${opt}%0D%0ANom: ${document.getElementById('s_nom').innerText}%0D%0AInfos: ${document.getElementById('s_tel').innerText}%0D%0AOrdre: ${num}`;
  document.getElementById('btnMail').href=`mailto:Esforca@gmail.com?subject=${sujet}&body=${corps}`;
}