<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

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
      <h2 data-i18n="workflow_heading">{{ t('workflow_heading') }}</h2>
      <p class="lead" data-i18n="workflow_lead">
        {{ t('workflow_lead') }}
      </p>
    </div>
    <div class="grid">
      <div
        v-for="card in workflowCards"
        :key="card.titleKey"
        class="card tilt reveal"
      >
        <h3 :data-i18n="card.titleKey">{{ t(card.titleKey) }}</h3>
        <p :data-i18n="card.bodyKey">{{ t(card.bodyKey) }}</p>
      </div>
    </div>
  </section>
</template>

