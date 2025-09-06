<script setup>
import { ref, watch } from "vue";
import FileUpload from "primevue/fileupload";
import Divider from "primevue/divider";
import ToggleSwitch from "primevue/toggleswitch";
import Button from "primevue/button";
import parseSave from "./lib/parsesave.js";
import checksum from "./lib/checksum.js";
import { buf2hex, hex2buf } from "./lib/helpers.js";
import Editor from "./components/Editor.vue";

const fileName = ref(null);
const fileContent = ref(null);
const data = ref(null);
const PF = ref(true);

//Receive File Input
const readSave = (event) => {
  const file = event.files[0];
  fileName.value = file.name;
  const reader = new FileReader();
  reader.onload = (e) => {
    fileContent.value = buf2hex(e.target.result);
  };
  reader.readAsArrayBuffer(file);
};

watch(fileContent, () => {
  //Compile File Data into Pokemon Objects
  data.value = parseSave(fileContent.value, PF.value ? "Polished" : "Faithful");
});

//Download File Output
const downloadSave = () => {
  if (!fileContent.value) return;

  //Create Blob
  const buffer = hex2buf(checksum(fileContent.value));
  const blob = new Blob([buffer]);
  const link = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = link;
  a.download = `${fileName.value.slice(0, -4)} - Edited${fileName.value.slice(-4)}`;
  a.click();
};
</script>

<template>
  <div class="m-5">
    <div class="flex justify-between">
      <h1 class="text-3xl mb-5">Polished Editor</h1>
      <div class="flex text-center gap-2">
        <ToggleSwitch class="mt-0.25" v-model="PF" :disabled="data != null" />
        <span v-if="PF">Polished</span>
        <span v-else>Faithful</span>
      </div>
    </div>
    <div class="flex flex-wrap justify-between">
      <FileUpload
        mode="basic"
        accept=".sav,.srm"
        :maxFileSize="33000"
        @select="readSave"
      />
      <Button icon="pi pi-download" label="Download" @click="downloadSave" />
    </div>
    <Divider />
    <Editor v-if="data != null" v-model="data" />
  </div>
</template>

<style scoped></style>
