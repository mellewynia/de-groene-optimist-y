<template>
  <section>
    <p>
      <label>
        <input v-model="form.showDetails" type="checkbox" class="mb-4">
        Toon geavanceerde (technische) opties en details
      </label>
    </p>
    <div class="flex gap-3">
      <p>
        <label>
          <small>Huidig jaarlijks Gas M3</small><br />
          <input
            type="number" step="50" min="0"
            v-model.number="form.gasM3"
            class="border border-black/10 rounded dark:bg-white/10"
          >
        </label>
      </p>
      <p>
        <label>
          <small>Gasprijs</small><br />
          <input
            type="number" step="0.05" min="0.05"
            v-model.number="form.gasPrice"
            class="border border-black/10 rounded w-16 text-right dark:bg-white/10"
          >
        </label>
      </p>
      <p>
        <label>
          <small>Prijs elektriciteit kW</small><br />
          <input
            type="number" step="0.01" min="0.01"
            v-model.number="form.kWPrice"
            class="border border-black/10 rounded dark:bg-white/10"
          >
        </label>
      </p>
    </div>
    <p v-if="form.showDetails" class="mt-5">
      <label>
        <small>Verwacht gemiddeld COP</small><br />
        <input
          type="number" step="0.1" min="1"
          v-model.number="form.cop"
          class="border border-black/10 rounded dark:bg-white/10"
        >
      </label>
    </p>
    <p v-if="form.showDetails">
      <label>
        <small>Hybride gas percentage</small><br />
        <input
          type="range" step="1" min="0" max="100"
          v-model.number="form.gasPercentage"
          class="border border-black/10 rounded w-24 text-right dark:bg-white/10"
        >
      </label>
    </p>
    <h4 class="mt-3">
      Installatiekosten
    </h4>
    <div class="flex gap-3">
      <p>
        <label>
          <small>Cv-ketel</small><br />
          €
          <input
            type="number" step="50" min="0"
            v-model.number="form.investeringCvKetel"
            class="border border-black/10 rounded w-24 dark:bg-white/10 text-right"
          >
        </label>
      </p>
      <div>
        <p>
          <label>
            <small>Hybride</small><br />
            <input
              type="number" step="50" min="0"
              v-model.number="form.investeringHybride"
              class="border border-black/10 rounded w-24 text-right dark:bg-white/10"
            >
          </label>
        </p>
        <p>
          <label>
            <small>Hybride subsidie</small><br />
            <input
              type="number" step="50" min="0"
              v-model.number="form.investeringHybrideSubsidie"
              class="border border-black/10 rounded w-24 text-right dark:bg-white/10"
            >
          </label>
        </p>
      </div>
      <div>
        <p>
          <label>
            <small>Warmtepomp</small><br />
            <input
              type="number" step="50" min="0"
              v-model.number="form.investeringWarmtepomp"
              class="border border-black/10 rounded w-24 text-right dark:bg-white/10"
            >
          </label>
        </p>
        <p>
          <label>
            <small>Warmtepomp subsidie</small><br />
            <input
              type="number" step="50" min="0"
              v-model.number="form.investeringWarmtepompSubsidie"
              class="border border-black/10 rounded w-24 text-right dark:bg-white/10"
            >
          </label>
        </p>
      </div>
    </div>
    <div class="mt-2 py-2 px-3 bg-lime-200/30 rounded text-sm">
      Warmtevraag o.b.v. {{form.gasM3}} m3 gas
      (* 9kW warmte) is {{ calcElektrischkWTotal }}
      en bij cop van {{ form.cop }}
      is dan {{ calcElektrischkWCopTotal }} kW nodig.
    </div>
    <div class="overflow-x-auto w-full">
      <div class="flex gap-2">
        <div class="w-10">
          <h3>&nbsp;</h3>
          <small class="block">&nbsp;</small>
          <div class="w-20">mnd</div>
          <div class="w-20">1 jaar</div>
          <div class="w-20">5 jaar</div>
          <div class="w-20">7 jaar</div>
        </div>
        <div class="flex-0 w-[238px]">
          <h3>Gas</h3>
          <div class="flex gap-2">
            <div class="w-20"><small class="block">Variabel</small></div>
            <div><small class="block">Totaal</small></div>
          </div>
          <div>{{ readableNumber(calcGasVariable / 12) }}</div>
          <div>{{ readableNumber(calcGasVariable) }}</div>
          <div>{{ readableNumber(calcGasVariable5Years) }}</div>
          <div>{{ readableNumber(calcGasVariable7Years) }}</div>
        </div>
        <div class="flex-0 w-[238px]">
          <h3>Gas & Elektrisch</h3>
          <div class="flex gap-2">
            <div class="w-20"><small class="block">Variabel</small></div>
            <div><small class="block">Totaal</small></div>
          </div>
          <div class="flex gap-2">
            <div class="w-16 text-right">{{ readableNumber(calcHybrideVariable / 12) }}</div>
          </div>
          <div class="flex gap-2">
            <div class="w-16 text-right">{{ readableNumber(calcHybrideVariable) }}</div>
            <div class="w-16 text-right">{{ readableNumber(calcHybrideVariable + calcHybrideInvesting) }}</div>
          </div>
          <div class="flex gap-2">
            <div class="w-16 text-right">{{ readableNumber(calcHybrideVariable5Years) }}</div>
            <div class="w-16 text-right">{{ readableNumber(calcHybrideVariable5Years + calcHybrideInvesting) }}</div>
          </div>
          <div class="flex gap-2">
            <div class="w-16 text-right">{{ readableNumber(calcHybrideVariable7Years) }}</div>
            <div class="w-16 text-right">{{ readableNumber(calcHybrideVariable7Years + calcHybrideInvesting) }}</div>
          </div>
        </div>
        <div class="flex-0 w-[238px]">
          <h3>All eletric</h3>
          <div class="flex gap-2">
            <div class="w-20"><small class="block">Variabel</small></div>
            <div><small class="block">Totaal</small></div>
          </div>
          <div class="flex gap-2">
            <div class="w-16 text-right">{{ readableNumber(calcElektrischVariable / 12) }}</div>
          </div>
          <div class="flex gap-2">
            <div class="w-16 text-right">{{ readableNumber(calcElektrischVariable) }}</div>
            <div class="w-16 text-right">{{ readableNumber(calcElektrischVariable + calcElektrischInvesting) }}</div>
          </div>
          <div class="flex gap-2">
            <div class="w-16 text-right">{{ readableNumber(calcElektrischVariable5Years) }}</div>
            <div class="w-16 text-right">{{ readableNumber(calcElektrischVariable5Years + calcElektrischInvesting) }}</div>
          </div>
          <div class="flex gap-2">
            <div class="w-16 text-right">{{ readableNumber(calcElektrischVariable7Years) }}</div>
            <div class="w-16 text-right">{{ readableNumber(calcElektrischVariable7Years + calcElektrischInvesting) }}</div>
          </div>
        </div>
      </div>
      <div class="mt-2 py-2 px-3 bg-lime-200/30 rounded text-sm">
        Prijzen zijn excl. vastrecht voor gas- en elektriciteitaansluiting.
        Kosten verschillen per netbeheerder, op basis van aansluiting en afname.
      </div>
    </div>
  </section>
</template>

<script setup>
const form = reactive({
  showDetails: true,
  gasPercentage: 30,
  investeringCvKetel: 2300,
  investeringHybride: 7500,
  investeringHybrideSubsidie: 2000,
  investeringWarmtepomp: 12000,
  investeringWarmtepompSubsidie: 4000,
  gasM3: 1050,
  gasPrice: 1.45,
  gasVastrecht: 150,
  kWPrice: 0.40,
  cop: 3.7
})

const calcGasVariable = computed(() => (form.gasM3 * form.gasPrice))
const calcGasVariable5Years = computed(() => (calcGasVariable.value) * 5)
const calcGasVariable7Years = computed(() => (calcGasVariable.value) * 7)

const calcElektrischInvesting = computed(() => form.investeringWarmtepomp - form.investeringWarmtepompSubsidie)
const calcElektrischkWTotal = computed(() => form.gasM3 * 9)
const calcElektrischkWCopTotal = computed(() => (calcElektrischkWTotal.value / form.cop))
const calcElektrischVariable = computed(() => (calcElektrischkWCopTotal.value * form.kWPrice))
const calcElektrischVariable5Years = computed(() => (calcElektrischVariable.value * 5))
const calcElektrischVariable7Years = computed(() => (calcElektrischVariable.value * 7))

const calcHybrideInvesting = computed(() => form.investeringHybride - form.investeringHybrideSubsidie)
const calcHybrideVariable = computed(() => (calcGasVariable.value * (form.gasPercentage / 100)) + (calcElektrischVariable.value * ((100 - form.gasPercentage) / 100)))
const calcHybrideVariable5Years = computed(() => (calcHybrideVariable.value * 5))
const calcHybrideVariable7Years = computed(() => (calcHybrideVariable.value * 7))

const readableNumber = (n, positions = 2) => {
  return n.toFixed(positions)
}
</script>
