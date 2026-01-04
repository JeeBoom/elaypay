<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const managementFeatures = [
  { titleKey: "feature1_title", bodyKey: "feature1_body" },
  { titleKey: "feature2_title", bodyKey: "feature2_body" },
  { titleKey: "feature3_title", bodyKey: "feature3_body" },
  { titleKey: "feature4_title", bodyKey: "feature4_body" },
];

const scenarios = [
  { key: "scenario1", icon: new URL('../assets/icon/店铺.svg', import.meta.url).href },
  { key: "scenario2", icon: new URL('../assets/icon/采购.svg', import.meta.url).href },
  { key: "scenario3", icon: new URL('../assets/icon/仓储物流.svg', import.meta.url).href },
  { key: "scenario4", icon: new URL('../assets/icon/promise-product.svg', import.meta.url).href },
  { key: "scenario5", icon: new URL('../assets/icon/广告费用.svg', import.meta.url).href },
  { key: "scenario6", icon: new URL('../assets/icon/钱币.svg', import.meta.url).href },
];
</script>

<template>
  <section id="management" class="section">
    <div class="section-head">
      <div>
        <div class="pill" data-i18n="management_pill">
          {{ t('management_pill') }}
        </div>
        <h2 data-i18n="management_heading">{{ t('management_heading') }}</h2>
        <p class="lead" data-i18n="management_lead">
          {{ t('management_lead') }}
        </p>
      </div>
    </div>
    <div class="grid">
      <div
        v-for="feature in managementFeatures"
        :key="feature.titleKey"
        class="card tilt reveal"
      >
        <h3 :data-i18n="feature.titleKey">{{ t(feature.titleKey) }}</h3>
        <p :data-i18n="feature.bodyKey">{{ t(feature.bodyKey) }}</p>
      </div>
    </div>
    
    <div class="section-head" style="margin-top: 60px">
      <h2 data-i18n="scenarios_heading">{{ t('scenarios_heading') }}</h2>
    </div>
    <div class="scenario-grid">
      <div
        v-for="scenario in scenarios"
        :key="scenario.key"
        class="scenario-card reveal"
      >
        <img :src="scenario.icon" alt="" class="scenario-icon" />
        <div class="scenario-label" :data-i18n="scenario.key">
          {{ t(scenario.key) }}
        </div>
      </div>
    </div>
  </section>
</template>
