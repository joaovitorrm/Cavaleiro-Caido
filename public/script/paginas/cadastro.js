
document.getElementById('imgPerfil').addEventListener('change', function(e) {
    if (e.target.files[0]) {
      let foto = new FileReader()
      foto.onload = () => {
        document.getElementById('img').src = foto.result;        
      }
      foto.readAsDataURL(e.target.files[0])
    } else {
        document.getElementById('img').src = '../images/icones/perfil.png';  
    }
    
});