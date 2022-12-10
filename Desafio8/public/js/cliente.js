const socket = io.connect();

const form = document.getElementById('form');
const title = document.getElementById('title');
const price = document.getElementById('price');
const url = document.getElementById('url');
const divProductos = document.getElementById('productos');
const chat = document.getElementById('chat-form');
const mensajesChat = document.querySelector('.chat-messages');
const emailInput = document.getElementById('email')

const mostrarMensaje = (mensaje) => {

    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML =
        `<p class="meta">${mensaje.username} <span> ${mensaje.time}</span></p>
     <p class="text">
        ${mensaje.text}
     </p>`;

    document.querySelector('.chat-messages').appendChild(div);
};


const mostrarProductos = (productsData) => {

    console.log(productsData);
    divProductos.innerHTML = '';

    productsData.forEach(producto => {

        const tr = document.createElement('tr');

        tr.innerHTML = "";

        tr.innerHTML +=
            `<th>${producto.title}</th>
             <th>${producto.price}</th>
             <td><img src=${producto.url} width="50px" style='margin-left:42%'/></td>`;

        divProductos.appendChild(tr);
    });
};


form.addEventListener('submit', (ev) => {

    ev.preventDefault();

    const nuevoProducto = {
        title: title.value,
        price: price.value,
        url: url.value
    }

    socket.emit('cargaProduct', nuevoProducto);

    title.value = '';
    price.value = '';
    url.value = '';

});

socket.on('productsData', data => {

    mostrarProductos(data);

});

socket.on('mensaje', mensaje => {

    mostrarMensaje(mensaje);

    mensajesChat.scrollTop = mensajesChat.scrollHeight;
});

chat.addEventListener('submit', (ev) => {

    ev.preventDefault();

    const msg = ev.target.elements.msg.value;
    const email = emailInput.value;

    console.log(email)

    socket.emit('chatMensaje', { msg, email });

    ev.target.elements.msg.value = '';

})
