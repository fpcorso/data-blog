/**
Frank's Blog JS Code
**/

document.querySelectorAll('form').forEach(form => {
    // if the form's data-dynamic-form attribute is set to true, add an event listener
    if (form.dataset.dynamicForm === 'true') {
        form.addEventListener('submit', event => {
            event.preventDefault();
            const formData = new FormData(form);
            const errorMessage = form.querySelector('.form-error');
            fetch(event.target.action, {
                method: form.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
              }).then(response => {
                if (response.ok) {
                    const success = document.createElement("div");
                    success.innerHTML = "<p>Thanks for reaching out!</p>";
                    form.replaceWith(success)
                } else {
                  response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                      errorMessage.innerHTML = data["errors"].map(error => error["message"]).join(", ")
                    } else {
                      errorMessage.innerHTML = "Oops! There was a problem submitting your form"
                    }
                  })
                }
              }).catch(error => {
                errorMessage.innerHTML = "Oops! There was a problem submitting your form"
              });
        });
    }
});