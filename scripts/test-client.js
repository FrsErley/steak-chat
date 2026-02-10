import { io } from 'socket.io-client';

// Função para criar um cliente
function createClient(name) {
  const socket = io('http://localhost:3000');

  socket.on('connect', () => {
    console.log(`[${name}] Conectado ao servidor!`, socket.id);

    // Envia uma mensagem inicial
    const message = {
      conversationId: 'conv-003',
      sender: 'client',
      content: `Olá do ${name}!`,
    };

    socket.emit('send_message', message); // ✅ enviar o objeto
    console.log(`[${name}] Mensagem enviada:`, message.content);
  });

  socket.on('new_message', (msg) => {
    console.log(`[${name}] Mensagem recebida do bot:`, msg.content);
  });

  socket.on('disconnect', () => {
    console.log(`[${name}] Desconectado`);
  });

  return socket;
}

// Simular 2 clientes diferentes
const client1 = createClient('Cliente1');
const client2 = createClient('Cliente2');

// Enviar mais mensagens depois de alguns segundos
setTimeout(() => {
  client1.emit('send_message', {
    conversationId: 'conv-003',
    sender: 'client',
    content: 'Preciso de ajuda',
  });
}, 2000);

setTimeout(() => {
  client2.emit('send_message', {
    conversationId: 'conv-003',
    sender: 'client',
    content: 'Como funciona o bot?',
  });
}, 3000);
