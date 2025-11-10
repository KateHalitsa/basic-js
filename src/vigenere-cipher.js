const { NotImplementedError } = require('../lib');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(direct = true) {
    this.direct = direct;
  }
  encrypt(message, key) {
    if (!message || !key) throw new Error('Incorrect arguments!');

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    message = message.toUpperCase();
    key = key.toUpperCase();

    let encrypted = '';
    let keyIndex = 0;

    for (let i = 0; i < message.length; i++) {
      const messageChar = message[i];
      if (alphabet.includes(messageChar)) {
        const keyChar = key[keyIndex % key.length];
        const messagePos = alphabet.indexOf(messageChar);
        const keyPos = alphabet.indexOf(keyChar);
        const encryptedChar = alphabet[(messagePos + keyPos) % 26];
        encrypted += encryptedChar;

        keyIndex++;
      } else {
        encrypted += messageChar;
      }
    }

    return this.direct ? encrypted : encrypted.split('').reverse().join('');
  }

  decrypt(encryptedMessage, key) {
    if (!encryptedMessage || !key) throw new Error('Incorrect arguments!');

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    encryptedMessage = encryptedMessage.toUpperCase();
    key = key.toUpperCase();

    let decrypted = '';
    let keyIndex = 0;

    for (let i = 0; i < encryptedMessage.length; i++) {
      const encryptedChar = encryptedMessage[i];
      if (alphabet.includes(encryptedChar)) {
        const keyChar = key[keyIndex % key.length];
        const encryptedPos = alphabet.indexOf(encryptedChar);
        const keyPos = alphabet.indexOf(keyChar);
        const decryptedChar = alphabet[(encryptedPos - keyPos + 26) % 26];
        decrypted += decryptedChar;

        keyIndex++;
      } else {
        decrypted += encryptedChar;
      }
    }

    return this.direct ? decrypted : decrypted.split('').reverse().join('');
  }
}

module.exports = {
  directMachine: new VigenereCipheringMachine(),
  reverseMachine: new VigenereCipheringMachine(false),
  VigenereCipheringMachine,
};
