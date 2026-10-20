// client/src/socket.ts
import { io } from 'socket.io-client';

// L'instance unique partagée dans toute l'application
export const socket = io('http://localhost:3000', {
  autoConnect: true,
});