document.querySelector( '#dark-switch' ).addEventListener( 'change', function( event ) {
    event.target.checked ? document.body.classList.add('dark') : document.body.classList.remove('dark');
});