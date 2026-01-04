<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const chips = ["chip_programmable", "chip_escrow", "chip_depin"];

const productCards = [
  {
    titleKey: "api_title",
    bodyKey: "api_body",
    badges: ["api_badge1", "api_badge2", "api_badge3"],
  },
  {
    titleKey: "treasury_title",
    bodyKey: "treasury_body",
    badges: ["treasury_badge1", "treasury_badge2", "treasury_badge3"],
  },
  {
    titleKey: "compliance_title",
    bodyKey: "compliance_body",
    badges: ["compliance_badge1", "compliance_badge2", "compliance_badge3"],
  },
  {
    titleKey: "observability_title",
    bodyKey: "observability_body",
    badges: [
      "observability_badge1",
      "observability_badge2",
      "observability_badge3",
    ],
  },
];
</script>

<template>
  <section id="product" class="section">
    <div class="section-head">
      <div>
        <div class="pill" data-i18n="product_pill">
          {{ t('product_pill') }}
        </div>
        <h2 data-i18n="product_heading">{{ t('product_heading') }}</h2>
        <p class="lead" data-i18n="product_lead">{{ t('product_lead') }}</p>
      </div>
      <div class="chips">
        <span
          v-for="chip in chips"
          :key="chip"
          class="chip"
          :data-i18n="chip"
          >{{ t(chip) }}</span
        >
      </div>
    </div>
    <div class="grid">
      <div
        v-for="card in productCards"
        :key="card.titleKey"
        class="card tilt reveal"
      >
        <h3 :data-i18n="card.titleKey">{{ t(card.titleKey) }}</h3>
        <p :data-i18n="card.bodyKey">{{ t(card.bodyKey) }}</p>
        <div class="badge-row">
          <span
            v-for="badge in card.badges"
            :key="badge"
            class="badge"
            :data-i18n="badge"
            >{{ t(badge) }}</span
          >
        </div>
      </div>
    </div>
  </section>
</template>
