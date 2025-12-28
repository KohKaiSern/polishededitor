import type { Player } from "$parsers/types";
import addresses from '$data/addresses.json'
import { writeString, insert } from "$parsers/utils";

function reverseParsePlayer(file: Uint8Array, player: Player): Uint8Array {
  file = insert(file, addresses.wPlayerID, 2, player.id)
  file = writeString(file, addresses.wPlayerName, 7, player.name, false)
  file = writeString(file, addresses.wRivalName, 7, player.rivalName, false)
  file = insert(file, addresses.wMoney, 3, player.money)
  file[addresses.wPlayerGender] = ['Male', 'Female', 'Non-Binary'].findIndex(g => g === player.gender)
  return file
}

export default reverseParsePlayer
