export default function bufferToBase64(buffer: ArrayBuffer): string {
  console.log('ok');
  let binary = '';
  const bytes = new Uint8Array(buffer);

  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return window.btoa(binary);
};