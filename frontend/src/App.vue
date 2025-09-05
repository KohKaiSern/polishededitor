<script setup>
import { ref, watch } from "vue";
import FileUpload from "primevue/fileupload";
import Divider from "primevue/divider";
import parseSave from "./lib/parsesave.js";

const fileContent = ref(null);
const data = ref(null);
const PF = ref("Polished");

//Receive File Input
const handleFileSelect = (event) => {
  const file = event.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    fileContent.value = e.target.result;
  };
  reader.readAsArrayBuffer(file);
};

watch(fileContent, () => {
  //Compile File Data into Pokemon Objects
  data.value = parseSave(fileContent.value, PF.value);
});

</script>

<template>
  <div class="m-5">
    <h1 class="text-3xl mb-5">Polished Editor</h1>
    <FileUpload
      mode="basic"
      accept=".sav,.srm"
      :maxFileSize="128000"
      @select="handleFileSelect"
    />
    <Divider />
    {{ data }}
  </div>
</template>

<style scoped></style>
