<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const managementFeatures = [
  { titleKey: "feature1_title", bodyKey: "feature1_body", icon: "control" },
  { titleKey: "feature2_title", bodyKey: "feature2_body", icon: "hierarchy" },
  { titleKey: "feature3_title", bodyKey: "feature3_body", icon: "alert" },
  { titleKey: "feature4_title", bodyKey: "feature4_body", icon: "team" },
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
      <h2 data-i18n="management_heading">{{ t('management_heading') }}</h2>
      <p class="lead" data-i18n="management_lead">
        {{ t('management_lead') }}
      </p>
    </div>
    <div class="grid">
      <div
        v-for="feature in managementFeatures"
        :key="feature.titleKey"
        class="card tilt reveal"
      >
        <div class="card-icon">
          <!-- Control icon -->
          <svg v-if="feature.icon === 'control'" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 8v8M8 12h8"/>
          </svg>
          <!-- Hierarchy icon -->
          <svg v-else-if="feature.icon === 'hierarchy'" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="7" height="7" rx="1"/>
            <rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="14" y="14" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/>
            <path d="M10 6.5h4M17.5 10v4M6.5 10v4"/>
          </svg>
          <!-- Alert/Bell icon -->
          <svg v-else-if="feature.icon === 'alert'" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <!-- Team/Users icon -->
          <svg v-else-if="feature.icon === 'team'" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </div>
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
