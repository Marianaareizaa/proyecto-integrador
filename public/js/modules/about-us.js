setTimeout(()=>{
    const accordionTitles = document.querySelectorAll('.accordion-title');
    accordionTitles.forEach((titles)=>{
        titles.addEventListener('click',(ev)=>{
                ev.target.classList.toggle('accordion-title--open');
                console.log(ev.target.children[1].classList.toggle('rotate'))
        })
    });
},200);

