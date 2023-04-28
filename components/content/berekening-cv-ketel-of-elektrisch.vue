<template>
  <section>
    ## CV-ketel

    CV ketel € 2.500
    - Per jaar 450 m3 verwarming
    <!-- <p>
      <label>
        <small>Gas M3</small><br />
        <input type="number" :value.number="form.gasM3">
      </label>
    </p> -->
    <p>
      <label>
        <small>Gas M3</small><br />
        <input
          type="number" step="50" min="0"
          v-model.number="form.gasM3"
          class="border border-black/10 rounded"
        >
      </label>
    </p>
    <p>
      <label>
        <small>Gasprijs</small><br />
        <input
          type="number" step="0.05" min="0.05"
          v-model.number="form.gasPrice"
          class="border border-black/10 rounded"
        >
      </label>
    </p>
    <div>
      2500 Gas totaal: {{ calcGasTotal }}
    </div>
    <div>
      2500 Gas totaal: {{ calcGasTotal5Years }} (5 jaar)
    </div>
    <h3>
      Elektrisch
    </h3>
    <p>
      <label>
        <small>Prijs elektriciteit kW</small><br />
        <input
          type="number" step="0.01" min="0.01"
          v-model.number="form.kWPrice"
          class="border border-black/10 rounded"
        >
      </label>
    </p>
    <p>
      <label>
        <small>Verwacht gemiddeld COP</small><br />
        <input
          type="number" step="0.1" min="1"
          v-model.number="form.cop"
          class="border border-black/10 rounded"
        >
      </label>
    </p>
    <div class="p-3 bg-primary/10 rounded">
      Warmtevraag o.b.v. {{form.gasM3}} m3 gas
      (* 9kW warmte) is {{ calcElektrischkWTotal }}
      en bij cop van {{ form.cop }}
      is dan {{ calcElektrischkWCopTotal }} kW nodig.
    </div>
    <div>
      6500 Elektrisch totaal: {{ calcElektrischTotal }}
    </div>
    <div>
      6500 Elektrisch totaal: {{ calcElektrischTotal5Years }} (5 jaar)
    </div>
  </section>
</template>

<script setup>
const form = reactive({
  gasM3: 450,
  gasPrice: 1.45,
  gasVastrecht: 150,
  kWPrice: 0.65,
  cop: 2.7
})

const calcGasTotal = computed(() => (form.gasM3 * form.gasPrice) + form.gasVastrecht)
const calcGasTotal5Years = computed(() => (calcGasTotal.value) * 5)

const calcElektrischkWTotal = computed(() => form.gasM3 * 9)
const calcElektrischkWCopTotal = computed(() => (calcElektrischkWTotal.value / form.cop))
const calcElektrischTotal = computed(() => (calcElektrischkWCopTotal.value * form.kWPrice))
const calcElektrischTotal5Years = computed(() => (calcElektrischTotal.value * 5))
</script>
