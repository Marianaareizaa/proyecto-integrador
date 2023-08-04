setTimeout(()=>{
    const formName = document.getElementById('nombre');;
    const formEmail = document.getElementById('email');
    const formComents = document.getElementById('comentarios');
    const formButton = document.querySelector('.btn');
    const formData = document.querySelector('.form');
    
    
    formData.addEventListener('keyup', ()=>{
        if(formName.value !== '' && formEmail.value !=='' && formComents.value !== '') {
            formButton.disabled = false;
        }
    });
       
}, 100);




