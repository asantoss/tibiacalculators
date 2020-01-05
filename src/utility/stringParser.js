export function parseLootYML(string) {
	const stringifyPaste = string.split(`\n`);
	const partySize = Math.floor((stringifyPaste.length - 1) / 6);
	let partyHuntObjects = [];
	let playerIdx = 6;
	for (let i = 0; i < partySize; i++) {
		const playerObject = {
			name: stringifyPaste[playerIdx],
			loot: trimSpaces(stringifyPaste[playerIdx + 1]),
			supplies: trimSpaces(stringifyPaste[playerIdx + 2]),
			balance: trimSpaces(stringifyPaste[playerIdx + 3]),
			damage: trimSpaces(stringifyPaste[playerIdx + 4]),
			healing: trimSpaces(stringifyPaste[playerIdx + 5])
		};
		playerIdx = playerIdx + 6;
		partyHuntObjects.push(playerObject);
	}
	partyHuntObjects = partyHuntObjects.sort((a, b) => {
		return a['loot'] > b['loot'] ? -1 : 1;
	});
	const payoutObject = {};

	let totalLoot = trimSpaces(stringifyPaste[3]);
	let totalSupplies = trimSpaces(stringifyPaste[4]);

	const profit = (totalLoot - totalSupplies) / 4;
	partyHuntObjects.forEach(el => {
		el['profit'] = profit;
		el['payOut'] = el.supplies + profit;
	});
	const rawData = {
		lootType: stringifyPaste[playerIdx - 5],
		loot: totalLoot,
		profit,
		players: partyHuntObjects,
		supplies: totalSupplies
	};
	return rawData;
}

function trimSpaces(string) {
	string = string.split(':');
	let newString = [];
	for (let i = 0; i < string[1].length; i++) {
		if (
			(string[1].charCodeAt(i) < 58 && string[1].charCodeAt(i) > 47) ||
			string[1].charCodeAt(i) === 45
		) {
			newString.push(string[1][i]);
		}
	}
	return Number.parseFloat(newString.join(''));
}
