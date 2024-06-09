document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    // Initialize an object to store form data
    let formDataObject = {};

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Simple form validation
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();

        if (name === '' || email === '' || message === '') {
            formMessage.textContent = 'All fields are required.';
            formMessage.style.color = 'red';
            formMessage.classList.remove('hidden');
            return;
        }

        // Add form data to the object
        formDataObject = {
            ...formDataObject, // Preserve existing data
            [Date.now()]: {    // Use timestamp as key
                name: name,
                email: email,
                message: message
            }
        };

        // Optional: Log the form data object
        console.log(formDataObject);

        // Simulate form submission
        setTimeout(() => {
            formMessage.textContent = 'Thank You for conacting us!';
            formMessage.style.color = 'green';
            formMessage.classList.remove('hidden');

            // Reset form fields
            form.reset();
        }, 1000);
    });
});
