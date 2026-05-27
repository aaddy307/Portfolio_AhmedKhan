const bcrypt = require('bcryptjs');

const password = process.argv[2];

if (!password) {
  console.error('Usage: node scripts/hashPassword.js <your-password>');
  process.exit(1);
}

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(password, salt);

console.log('Your password hash:');
console.log(hash);
console.log('\nCopy this into .env.local as ADMIN_PASSWORD_HASH');
