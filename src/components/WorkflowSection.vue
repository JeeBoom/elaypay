<script setup>
import { computed } from 'vue';
import { translations } from '../i18n';

const props = defineProps({
  currentLang: {
    type: String,
    required: true
  }
});

const dict = computed(() => translations[props.currentLang] || translations.en);

const workflowCards = [
  { titleKey: "flow1_title", bodyKey: "flow1_body" },
  { titleKey: "flow2_title", bodyKey: "flow2_body" },
  { titleKey: "flow3_title", bodyKey: "flow3_body" },
  { titleKey: "flow4_title", bodyKey: "flow4_body" },
];
</script>

<template>
  <section id="workflow" class="section">
    <div class="section-head">
      <div>
        <div class="pill" data-i18n="workflow_pill">
          {{ dict.workflow_pill }}
        </div>
        <h2 data-i18n="workflow_heading">{{ dict.workflow_heading }}</h2>
        <p class="lead" data-i18n="workflow_lead">
          {{ dict.workflow_lead }}
        </p>
      </div>
    </div>
    <div class="grid">
      <div
        v-for="card in workflowCards"
        :key="card.titleKey"
        class="card tilt reveal"
      >
        <h3 :data-i18n="card.titleKey">{{ dict[card.titleKey] }}</h3>
        <p :data-i18n="card.bodyKey">{{ dict[card.bodyKey] }}</p>
      </div>
    </div>
  </section>
</template>
