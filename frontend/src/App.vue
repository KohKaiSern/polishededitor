<script setup>
import { onBeforeMount, ref, watch } from "vue";
import FileUpload from "primevue/fileupload";
import Divider from "primevue/divider";
import ToggleSwitch from "primevue/toggleswitch";
import Button from "primevue/button";
import Message from "primevue/message";
import parseSave from "./lib/parsesave.js";
import reverseParseSave from "./lib/reverseparsesave.js";
import checksum from "./lib/checksum.js";
import { buf2hex, hex2buf } from "./lib/helpers.js";
import Boxes from "./components/Boxes.vue";

const versions = ref(null);
const addresses = ref(null);
const uploadSuccess = ref(null);
const fileName = ref(null);
const fileContent = ref(null);
const data = ref(null);
const PF = ref(true);

//Get Game and Save Versions, as well as the address for sSaveVersion
const getVersions = async () => {
  let response = await fetch("https://polishededitor-backend.vercel.app");
  versions.value = await response.json();
  response = await fetch("https://polishededitor-backend.vercel.app/addresses");
  addresses.value = await response.json();
};

onBeforeMount(() => {
  getVersions();
});

//Receive File Input
const readSave = (event) => {
  const file = event.files[0];
  fileName.value = file.name;
  const reader = new FileReader();
  reader.onload = (e) => {
    const hex = buf2hex(e.target.result);

    //Validation: Check save version
    const saveVersion = parseInt(
      hex[parseInt(addresses.value["sSaveVersion"], 16)] +
        hex[parseInt(addresses.value["sSaveVersion"], 16) + 1],
      16
    );
    if (saveVersion === versions.value["Save"]) {
      fileContent.value = hex;
      uploadSuccess.value = true;
      setTimeout(() => {
        uploadSuccess.value = null;
      }, 1000);
    } else {
      uploadSuccess.value = false;
    }
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

  //Update save file with edited info and apply checksum
  const editedData = checksum(
    reverseParseSave(
      fileContent.value,
      data.value,
      PF.value ? "Polished" : "Faithful"
    )
  );

  //Create Blob
  const buffer = hex2buf(editedData);
  const blob = new Blob([buffer]);
  const link = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = link;
  a.download = `${fileName.value.slice(0, -4)} - Edited${fileName.value.slice(
    -4
  )}`;
  a.click();
};
</script>

<template>
  <div class="m-5" v-if="versions">
    <div class="flex justify-between">
      <h1 class="text-3xl mb-5">Polished Editor v{{ versions["Game"] }}</h1>
      <div class="flex text-center gap-2">
        <ToggleSwitch class="mt-0.25" v-model="PF" :disabled="data != null" />
        <span v-if="PF">Polished</span>
        <span v-else>Faithful</span>
      </div>
    </div>
    <div class="flex flex-wrap justify-between gap-5">
      <div class="flex flex-wrap items-end gap-5">
        <FileUpload
          mode="basic"
          accept=".sav,.srm"
          :maxFileSize="33000"
          @select="readSave"
        />
        <Message v-if="uploadSuccess" severity="success"
          ><i class="pi pi-check"></i
        ></Message>
        <Message
          class="mt-3"
          v-else-if="uploadSuccess === false"
          severity="error"
          >Invalid save file. Please check if it's from the right version of
          Polished Crystal.</Message
        >
      </div>
      <Button icon="pi pi-download" label="Download" @click="downloadSave" />
    </div>
    <Divider />
    <Boxes v-if="data != null" v-model="data" />
  </div>
</template>

<style scoped></style>
