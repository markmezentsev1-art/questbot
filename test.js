import "dotenv/config";
const person = { firstName: "Mаrk", lastName: "Mezentsev" };
function password(person) {
  console.log(`твоя фамилия ${person.lastName} и имя ${person.firstName}`);
}
const chec = password(person);

// напиши функцию которая будет принамать параметром обьек
//const person = {firstName: "Mаrk", lastName: "Mezentsev"}
// и вернуть должна строку 'твоя фамилия Mezentsev и имя Mark'

const inventoryItems = [{ itemId: "111" }, { itemId: "222" }]; //'111,222'
