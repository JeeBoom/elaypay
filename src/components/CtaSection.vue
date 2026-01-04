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

const ctaStatuses = [
  {
    titleKey: "cta_status1_title",
    subKey: "cta_status1_sub",
    dotStyle: {
      background: "var(--success)",
      boxShadow: "0 0 12px rgba(110,247,213,0.65)",
    },
  },
  {
    titleKey: "cta_status2_title",
    subKey: "cta_status2_sub",
    dotStyle: {
      background: "var(--warning)",
      boxShadow: "0 0 12px rgba(242,191,255,0.6)",
    },
    html: true,
  },
  {
    titleKey: "cta_status3_title",
    subKey: "cta_status3_sub",
    dotStyle: {
      background: "var(--danger)",
      boxShadow: "0 0 12px rgba(255,122,209,0.6)",
    },
  },
];
</script>

<template>
  <section id="cta" class="cta reveal">
    <div>
      <div class="pill" data-i18n="cta_pill">{{ dict.cta_pill }}</div>
      <h3 data-i18n="cta_title">{{ dict.cta_title }}</h3>
      <p data-i18n="cta_body">{{ dict.cta_body }}</p>
      <div class="cta-buttons" style="margin-top: 14px">
        <a
          class="btn"
          href="mailto:hello@elaypay.app"
          data-i18n="cta_btn_primary"
          >{{ dict.cta_btn_primary }}</a
        >
        <a class="btn ghost" href="#" data-i18n="cta_btn_secondary">{{
          dict.cta_btn_secondary
        }}</a>
      </div>
    </div>
    <div>
      <div class="status-bar">
        <div
          v-for="item in ctaStatuses"
          :key="item.titleKey"
          class="status-card"
        >
          <div class="status-dot" :style="item.dotStyle"></div>
          <div>
            <div
              v-if="item.html"
              style="font-weight: 600"
              :data-i18n-html="item.titleKey"
              v-html="dict[item.titleKey]"
            ></div>
            <div v-else style="font-weight: 600" :data-i18n="item.titleKey">
              {{ dict[item.titleKey] }}
            </div>
            <span
              style="color: var(--muted); font-size: 12px"
              :data-i18n="item.subKey"
              >{{ dict[item.subKey] }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
