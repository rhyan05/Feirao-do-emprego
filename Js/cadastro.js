document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.form-cadastro');
    
    // Verifica se o formulário existe
    if (!form) {
        console.error('Formulário com classe "form-cadastro" não encontrado.');
        return;
    }

    const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"]');
    
    // Verifica se há inputs
    if (inputs.length === 0) {
        console.error('Nenhum input de texto, email ou telefone encontrado no formulário.');
        return;
    }

    // Função para limpar mensagens de erro de um input específico
    function clearError(input) {
        const existingError = input.nextElementSibling;
        if (existingError && existingError.classList.contains('error-message')) {
            existingError.remove();
        }
        input.classList.remove('input-error');
    }

    // Função para mostrar erro
    function showError(input, message) {
        clearError(input); // Limpa erro anterior
        const error = document.createElement('div');
        error.className = 'error-message';
        
        // Adiciona o ícone de alerta (SVG embutido)
        error.innerHTML = `
            <svg class="error-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg> ${message}`;
        
        input.classList.add('input-error');
        input.insertAdjacentElement('afterend', error);
    }

    // Função para validar email
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Função para validar telefone (formato BR)
    function validatePhone(phone) {
        return /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/.test(phone);
    }

    // Função para validar nome (apenas letras e espaços, mínimo 2 caracteres)
    function validateName(name) {
        return /^[A-Za-z\s]{2,}$/.test(name);
    }

    // Validação em tempo real enquanto o usuário digita
    inputs.forEach(input => {
        input.addEventListener('input', function () {
            clearError(input); // Limpa erro ao começar a digitar

            if (!input.value.trim()) {
                showError(input, 'Este campo é obrigatório.');
            } else if (input.type === 'email' && !validateEmail(input.value)) {
                showError(input, 'Digite um email válido.');
            } else if (input.type === 'tel' && !validatePhone(input.value)) {
                showError(input, 'Digite um telefone válido.');
            } else if (input.type === 'text' && input.name === 'nome' && !validateName(input.value)) {
                showError(input, 'Digite um nome válido (apenas letras e espaços, mínimo 2 caracteres).');
            }
        });
    });

    // Validação no envio do formulário
    form.addEventListener('submit', function (e) {
        let isValid = true;

        // Limpa mensagens anteriores
        form.querySelectorAll('.error-message').forEach(msg => msg.remove());
        inputs.forEach(input => input.classList.remove('input-error'));

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                showError(input, 'Este campo é obrigatório.');
            } else if (input.type === 'email' && !validateEmail(input.value)) {
                isValid = false;
                showError(input, 'Digite um email válido.');
            } else if (input.type === 'tel' && !validatePhone(input.value)) {
                isValid = false;
                showError(input, 'Digite um telefone válido.');
            } else if (input.type === 'text' && input.name === 'nome' && !validateName(input.value)) {
                isValid = false;
                showError(input, 'Digite um nome válido (apenas letras e espaços, mínimo 2 caracteres).');
            }
        });

        if (!isValid) {
            e.preventDefault();
        }
    });
});