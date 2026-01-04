<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const heroMetrics = [
  { labelKey: "metric_latency", value: "Visa / Mastercard" },
  { labelKey: "metric_routes", value: "Milliseconds" },
  { labelKey: "metric_efficiency", value: "20+" },
  { labelKey: "metric_coverage", value: "Bank-grade" },
];

const heroBadges = ["hero_badge1", "hero_badge2", "hero_badge3"];

const heroStatus = [
  {
    labelKey: "hero_settlement_label",
    valueKey: "hero_settlement_value",
    dotStyle: {},
  },
  {
    labelKey: "hero_throughput_label",
    valueKey: "hero_throughput_value",
    dotStyle: {
      background: "var(--accent)",
      boxShadow: "0 0 12px rgba(124,77,255,0.65)",
    },
  },
];
</script>

<template>
  <section class="hero">
    <div>
      <div class="pill" data-i18n="hero_pill">{{ t('hero_pill') }}</div>
      <h1 data-i18n-html="hero_title" v-html="t('hero_title')"></h1>
      <p data-i18n="hero_body">{{ t('hero_body') }}</p>
      <div class="hero-actions">
        <a class="btn" href="#" data-i18n="hero_start">{{
          t('hero_start')
        }}</a>
        <a class="btn ghost" href="#" data-i18n="hero_security">{{
          t('hero_security')
        }}</a>
      </div>
      <div class="stacked-metrics">
        <div
          v-for="metric in heroMetrics"
          :key="metric.labelKey"
          class="metric"
        >
          <span :data-i18n="metric.labelKey">{{
            t(metric.labelKey)
          }}</span>
          <strong>{{ metric.value }}</strong>
        </div>
      </div>
    </div>
    <div class="hero-card tilt">
      <div class="floating-tag">LIVE</div>
      <h3 data-i18n="hero_card_title">{{ t('hero_card_title') }}</h3>
      <p data-i18n="hero_card_body">{{ t('hero_card_body') }}</p>
      <div class="badge-row">
        <span
          v-for="badge in heroBadges"
          :key="badge"
          class="badge"
          :data-i18n="badge"
          >{{ t(badge) }}</span
        >
      </div>
      <div class="status-bar" style="margin-top: 16px">
        <div
          v-for="(status, idx) in heroStatus"
          :key="status.labelKey"
          class="status-card"
        >
          <div class="status-dot" :style="status.dotStyle"></div>
          <div>
            <span
              style="color: var(--muted); font-size: 12px"
              :data-i18n="status.labelKey"
              >{{ t(status.labelKey) }}</span
            >
            <div style="font-weight: 600" :data-i18n="status.valueKey">
              {{ t(status.valueKey) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
