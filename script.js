// script.js

// COLOQUE SUA URL DO GOOGLE APPS SCRIPT AQUI
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw4RDHKpSfZ8Hd69iLZz3RN9x3vn4oatkhzbYd_V50O2TM6ItxizTowWMuRr6o9Indw/exec';

const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (GOOGLE_SCRIPT_URL.includes('SUA_ID_AQUI')) {
        alert('Por favor, configure a URL do Google Apps Script no arquivo script.js');
        return;
    }

    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };

    // UI Feedback
    submitBtn.disabled = true;
    submitBtn.innerText = 'Enviando...';
    formStatus.classList.remove('hidden', 'text-green-500', 'text-red-500');
    formStatus.innerText = '';

    try {
        // O Google Script exige 'no-cors' para evitar erro de redirecionamento, 
        // ou você pode tratar o redirecionamento. 
        // Mas a forma mais simples de POST para Apps Script é enviar como texto/JSON
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Necessário para Google Apps Script
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        // Como usamos no-cors, não conseguimos ler o corpo da resposta (response.json())
        // Mas se não deu erro no fetch, assumimos sucesso.
        formStatus.classList.add('text-green-500');
        formStatus.innerText = 'Mensagem enviada com sucesso! Obrigado.';
        contactForm.reset();
        
    } catch (error) {
        console.error('Erro:', error);
        formStatus.classList.add('text-red-500');
        formStatus.innerText = 'Erro ao enviar mensagem. Tente novamente mais tarde.';
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = 'Enviar Mensagem';
        formStatus.classList.remove('hidden');
    }
});
