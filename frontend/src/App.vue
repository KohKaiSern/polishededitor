<script setup>
import { onBeforeMount, ref, watch, provide } from "vue";
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
const save = ref(null);
const PF = ref(true);

//Get Game and Save Versions, as well as the address for sSaveVersion
onBeforeMount(async () => {
  versions.value = await (
    await fetch("https://polishededitor-backend.vercel.app")
  ).json();
  addresses.value = await (
    await fetch("https://polishededitor-backend.vercel.app/addresses")
  ).json();
});

//Receive File Input
const readSave = (event) => {
  fileName.value = event.files[0].name;
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
      save.value = parseSave(
        fileContent.value,
        PF.value ? "Polished" : "Faithful"
      );
      setTimeout(() => {
        uploadSuccess.value = null;
      }, 1000);
    } else {
      uploadSuccess.value = false;
    }
  };
  reader.readAsArrayBuffer(event.files[0]);
};

//Download File Output
const downloadSave = () => {
  if (!fileContent.value) return;

  //Update save file with edited info and apply checksum
  const editedSave = checksum(
    reverseParseSave(
      fileContent.value,
      save.value,
      PF.value ? "Polished" : "Faithful"
    )
  );

  //Create Blob
  const buffer = hex2buf(editedSave);
  const blob = new Blob([buffer]);
  const link = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = link;
  a.download = `${fileName.value.slice(0, -4)} - Edited${fileName.value.slice(
    -4
  )}`;
  a.click();
};

//Provider for PF
provide("PF", PF ? "Polished" : "Faithful");
</script>

<template>
  <div class="m-5" v-if="versions">
    <div class="flex justify-between">
      <h1 class="text-3xl mb-5">Polished Editor v{{ versions["Game"] }}</h1>
      <div class="flex text-center gap-2">
        <ToggleSwitch class="mt-0.25" v-model="PF" :disabled="save != null" />
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
    <Boxes v-if="save != null" v-model="save" />
  </div>
</template>

<style scoped></style>
