<template>
  <section class="font-number text-[90%]">
    <div class="flex gap-3">
      <div>
        <div class="flex gap-3">
          <p>
            <label>
              <small>Gas m<sup>3</sup></small><br />
              <input
                type="number" step="50" min="0"
                v-model.number="form.gasM3"
                class="w-20 border border-black/10 rounded dark:bg-white/10"
              >
            </label>
          </p>
        </div>
      </div>
      <p>
        <label>
          <small>Gasprijs</small><br />
          <input
            type="number" step="0.05" min="0.05"
            v-model.number="form.gasPrice"
            class="border border-black/10 rounded w-20 text-right dark:bg-white/10"
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
    <p class="mt-2">
      <label class="block text-sm">
        <input v-model="form.showDetails" type="checkbox">
        Toon geavanceerde (technische) opties en details
      </label>
    </p>
    <section v-if="form.showDetails" class="mt-1 py-3 px-4 rounded-lg border-2 border-dashed border-lime-200/30">
      <div class="flex gap-3">
        <p>
          <label>
            <small>Verwacht (gem.) COP</small><br />
            <input
              type="number" step="0.1" min="1"
              v-model.number="form.cop"
              class="border border-black/10 rounded dark:bg-white/10"
            >
          </label>
        </p>
        <p>
          <label>
            <small>Gas-Elektra: {{ form.gasPercentage }}%-{{ 100 - form.gasPercentage }}%</small><br />
            <input
              type="range" step="1" min="0" max="100"
              v-model.number="form.gasPercentage"
              class="border border-black/10 rounded w-32 text-right dark:bg-white/10"
            >
          </label>
        </p>
        <p>
          <label>
            <small>Vastrecht gas</small><br />
            <input
              type="number" step="10" min="0" max="400"
              v-model.number="form.gasVastrecht"
              class="border border-black/10 rounded w-32 text-right dark:bg-white/10"
            >
          </label>
        </p>
      </div>
      <div class="mt-2 py-2 px-3 bg-lime-200/30 rounded text-sm">
        <strong>Hoe wordt de elektrische warmtevraag berekend?</strong>
        Warmtevraag o.b.v. {{form.gasM3}} m3 gas
        (* 9kW warmte) is {{ readableNumber(calcElektrischkWTotal) }}
        en bij cop van {{ form.cop }}
        is dan {{ readableNumber(calcElektrischkWCopTotal) }} kW nodig.
      </div>
    </section>
    <div class="mt-3 flex gap-3">
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
    <div class="mt-4 overflow-x-auto w-full text-[14px] leading-[24px]">
      <div class="flex gap-2">
        <div>
          <h3>&nbsp;</h3>
          <small class="block">&nbsp;</small>
          <div class="w-10"><small class="block">mnd</small></div>
          <div class="w-10"><small class="block">1 jaar</small></div>
          <div class="w-10 block"><small class="block">5 jaar</small></div>
          <div class="w-10"><small class="block">7 jaar</small></div>
        </div>
        <div class="flex-0 w-[238px]">
          <h3 class="font-bold">Gas</h3>
          <div class="flex gap-2">
            <div class="w-20"><small class="block text-right opacity-60">Variabel</small></div>
            <div><small class="block opacity-60">Totaal</small></div>
          </div>
          <div class="flex gap-2">
            <div class="w-20 text-right">{{ readableNumber(calcGasVariable / 12) }}</div>
          </div>
          <div class="flex gap-2">
            <div class="w-20 text-right">{{ readableNumber(calcGasVariable) }}</div>
          </div>
          <div class="flex gap-2">
            <div class="w-20 text-right">{{ readableNumber(calcGasVariable5Years) }}</div>
          </div>
          <div class="flex gap-2">
            <div class="w-20 text-right">{{ readableNumber(calcGasVariable7Years) }}</div>
          </div>
        </div>
        <div class="flex-0 w-[238px]">
          <h3 class="font-bold">Gas & Elektrisch</h3>
          <div class="flex gap-2">
            <div class="w-20"><small class="block opacity-60">Variabel</small></div>
            <div><small class="block opacity-60">Totaal</small></div>
          </div>
          <div class="flex gap-2">
            <div class="w-20 text-right">{{ readableNumber(calcHybrideVariable / 12) }}</div>
          </div>
          <div class="flex gap-2">
            <div class="w-20 text-right">{{ readableNumber(calcHybrideVariable) }}</div>
            <div class="w-20 text-right">{{ readableNumber(calcHybrideVariable + calcHybrideInvesting) }}</div>
          </div>
          <div class="flex gap-2">
            <div class="w-20 text-right">{{ readableNumber(calcHybrideVariable5Years) }}</div>
            <div class="w-20 text-right">{{ readableNumber(calcHybrideVariable5Years + calcHybrideInvesting) }}</div>
          </div>
          <div class="flex gap-2">
            <div class="w-20 text-right">{{ readableNumber(calcHybrideVariable7Years) }}</div>
            <div class="w-20 text-right">{{ readableNumber(calcHybrideVariable7Years + calcHybrideInvesting) }}</div>
          </div>
        </div>
        <div class="flex-0 w-[238px]">
          <h3 class="font-bold">All electric</h3>
          <div class="flex gap-2">
            <div class="w-20"><small class="block opacity-60">Variabel</small></div>
            <div><small class="block opacity-60">Totaal</small></div>
          </div>
          <div class="flex gap-2">
            <div class="w-20 text-right">{{ readableNumber(calcElektrischVariable / 12) }}</div>
          </div>
          <div class="flex gap-2">
            <div class="w-20 text-right">{{ readableNumber(calcElektrischVariable) }}</div>
            <div class="w-20 text-right">{{ readableNumber(calcElektrischVariable + calcElektrischInvesting) }}</div>
          </div>
          <div class="flex gap-2">
            <div class="w-20 text-right">{{ readableNumber(calcElektrischVariable5Years) }}</div>
            <div class="w-20 text-right">{{ readableNumber(calcElektrischVariable5Years + calcElektrischInvesting) }}</div>
          </div>
          <div class="flex gap-2">
            <div class="w-20 text-right">{{ readableNumber(calcElektrischVariable7Years) }}</div>
            <div class="w-20 text-right">{{ readableNumber(calcElektrischVariable7Years + calcElektrischInvesting) }}</div>
          </div>
        </div>
      </div>
      <div class="mt-4 py-2 px-3 bg-warning-200/20 rounded text-sm">
        <strong>Let op:</strong> prijzen zijn excl. vastrecht voor gas- en elektriciteitaansluiting.
        Kosten verschillen per netbeheerder, op basis van aansluiting en afname.
      </div>
    </div>
  </section>
</template>

<script setup>
const form = reactive({
  showDetails: false,
  gasPercentage: 30,
  investeringCvKetel: 2300,
  investeringHybride: 7500,
  investeringHybrideSubsidie: 2000,
  investeringWarmtepomp: 12000,
  investeringWarmtepompSubsidie: 4000,
  gasM3: 1000,
  gasPrice: 1.4,
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
  return n.toFixed(positions).toString().replace('.', ',')
}
</script>
