import type { Data } from "$parsers/types";
import parseParty from "$parsers/party/parseParty";
import parseBoxes from "$parsers/boxes/parseBoxes";
import parseBag from "$parsers/bag/parseBag";
import parsePlayer from "$parsers/player/parsePlayer";

function parseSave(file: Uint8Array, PF: 'polished' | 'faithful'): Data {
  return {
    party: parseParty(file, PF),
    boxes: parseBoxes(file, PF),
    bag: parseBag(file, PF),
    player: parsePlayer(file)
  }
}

export default parseSave
