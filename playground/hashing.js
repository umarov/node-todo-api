const argon = require('argon2');

async function getSalt() {
  const salt = await argon.generateSalt();
  console.log(salt);
  return salt;
}

async function hashPassword(password, getSalt) {
  const salt = await getSalt();
  const hash = await argon.hash(password, salt);
  console.log(hash)

  try {
    await argon.verify(hash, password);
    console.log('VERIFIED!');
  } catch(err) {
    console.log(err)
  }
  return hash
}

async function verify(hash, password) {
}



hashPassword('password', getSalt);
