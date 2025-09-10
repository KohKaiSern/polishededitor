//GET Addresses
let response = await fetch(
  "https://polishededitor-backend.vercel.app/addresses"
);
const addresses = await response.json();

//GET Items Object
response = await fetch("https://polishededitor-backend.vercel.app/items");
const items = await response.json();

const parseBag = (save, PF) => {
  let data = {
    Items: new Array(75).fill(null),
    Medicine: new Array(37).fill(null),
    Balls: new Array(25).fill(null),
    Berries: new Array(31).fill(null),
  };
	const address = parseInt(addresses["wNumItems"], 16)
  const numItems = parseInt(save[address], 16);
  for (let i = 0; i < 75; i++) {
		data["Items"][i] = {
			"Name": items[PF][parseInt(save[address + (i*2)+1], 16)],
			"Quantity": parseInt(save[address + (i+1)*2], 16)
		}
	}

  console.log(data);
  return data;
};

export default parseBag;
