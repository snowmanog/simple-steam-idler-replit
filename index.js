const SteamUser = require('steam-user');
const readline = require('readline');

const username = process.env.username;
const password = process.env.password;

const games = [730, 227300, 550]; // AppID gier
const status = 1; // 1 - online, 7 - invisible

const user = new SteamUser();

// konsola do wpisania kodu 2FA
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

user.logOn({
  accountName: username,
  password: password
});

// Steam zapyta o kod Guard / e-mail
user.on('steamGuard', (domain, callback) => {
  if (domain) {
    console.log(`Kod Steam Guard został wysłany na email: ${domain}`);
  } else {
    console.log('Wpisz kod z aplikacji Steam Guard:');
  }

  rl.question('Kod: ', (code) => {
    callback(code);
  });
});

user.on('loggedOn', () => {
  console.log(user.steamID + ' — zalogowano poprawnie');
  user.setPersona(status);
  user.gamesPlayed(games);
});

user.on('error', (e) => {
  console.log('Błąd logowania:', e);
});
