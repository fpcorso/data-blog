// Sets up dark mode switcher.
document.querySelector( '#dark-switch' ).addEventListener( 'change', function( event ) {
    event.target.checked ? document.body.classList.add('dark') : document.body.classList.remove('dark');
});

// Sets up the scroll indicator.
var p_elements = document.querySelectorAll('p');
document.querySelector('#scroll-indicator').style.display = 'block';
document.addEventListener( 'scroll', function() {
    var seen = 0;
    p_elements.forEach((element, index) => {
        let rect = element.getBoundingClientRect();
        let inView = rect.bottom > 0 && rect.bottom < window.innerHeight;
        if ( inView ) {
            seen = ( index / p_elements.length ) * 100;
        }
    });
    document.querySelector('#scroll-indicator').value = seen;
});