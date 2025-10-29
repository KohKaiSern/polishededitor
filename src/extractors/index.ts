import { writeJSON } from './utils';


for (const [name, obj] of Object.entries({
})) {
  writeJSON(name, obj);
}
