<script>
  import { Checkbox, Listgroup } from 'flowbite-svelte';
  
  // Accept bindable bag prop
  let { bag = $bindable() } = $props();
  
  // Generate choices for 75 TMs and 6 HMs
  const choices = [
    ...Array.from({ length: 75 }, (_, i) => ({
      value: String(i),
      label: `TM${String(i + 1).padStart(2, '0')}`
    })),
    ...Array.from({ length: 6 }, (_, i) => ({
      value: String(i + 75),
      label: `HM${String(i + 1).padStart(2, '0')}`
    }))
  ];
  
  // Initialize group from bag.TMsHMs.contents
  let group = $state(
    bag.TMsHMs.contents
      .map((value, index) => value === "1" ? String(index) : null)
      .filter(v => v !== null)
  );
  
  // Update bag.TMsHMs.contents when checkboxes change
  const handleGroupChange = () => {
    const newContents = Array(81).fill("0");
    group.forEach(index => {
      newContents[parseInt(index)] = "1";
    });
    bag.TMsHMs.contents = newContents;
  };
</script>

<Listgroup class="w-full mt-5 grid grid-flow-col grid-rows-27">
  <Checkbox bind:group {choices} classes={{ div: "p-3" }} onchange={handleGroupChange} />
</Listgroup>
