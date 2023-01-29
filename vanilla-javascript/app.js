


const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            entry.target.classList.add('slide-in-right-end');
        }else{
            entry.target.classList.remove('slide-in-right-end');
        }
    });
});


const hiddenElements = document.querySelectorAll('.slide-in-right-start');
hiddenElements.forEach((el) => observer.observe(el));

//document.getElementById("banner").classList.add("banner-end");