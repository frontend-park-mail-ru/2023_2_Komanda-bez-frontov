export function renderMessage(text, error = false) {

    const messageContainer = document.querySelector("#message-box");

    if (error) {
        messageContainer.classList.add("error-container");
    } else {
        messageContainer.classList.add("success-container");
    }

    const message = document.createElement('p');
    message.textContent = text;

    messageContainer.appendChild(message);
}