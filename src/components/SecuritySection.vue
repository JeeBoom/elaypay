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

const securityPanels = [
  {
    titleKey: "panel1_title",
    bodyKey: "panel1_body",
    badges: ["panel1_badge1", "panel1_badge2", "panel1_badge3"],
  },
  {
    titleKey: "panel2_title",
    bodyKey: "panel2_body",
    timeline: [
      { titleKey: "timeline_pre_title", bodyKey: "timeline_pre_body" },
      { titleKey: "timeline_in_title", bodyKey: "timeline_in_body" },
      { titleKey: "timeline_post_title", bodyKey: "timeline_post_body" },
    ],
  },
];
</script>

<template>
  <section id="security" class="section">
    <div class="section-head">
      <div>
        <div class="pill" data-i18n="security_pill">
          {{ dict.security_pill }}
        </div>
        <h2 data-i18n="security_heading">{{ dict.security_heading }}</h2>
        <p class="lead" data-i18n="security_lead">
          {{ dict.security_lead }}
        </p>
      </div>
    </div>
    <div class="panels">
      <div
        v-for="panel in securityPanels"
        :key="panel.titleKey"
        class="panel reveal"
      >
        <h4 :data-i18n="panel.titleKey">{{ dict[panel.titleKey] }}</h4>
        <p :data-i18n="panel.bodyKey">{{ dict[panel.bodyKey] }}</p>
        <div v-if="panel.badges" class="badge-row" style="margin-top: 12px">
          <span
            v-for="badge in panel.badges"
            :key="badge"
            class="badge"
            :data-i18n="badge"
            >{{ dict[badge] }}</span
          >
        </div>
        <div
          v-if="panel.timeline"
          class="timeline"
          style="margin-top: 16px"
        >
          <div
            v-for="item in panel.timeline"
            :key="item.titleKey"
            class="timeline-item"
          >
            <strong :data-i18n="item.titleKey">{{
              dict[item.titleKey]
            }}</strong
            ><br />
            <span :data-i18n="item.bodyKey">{{ dict[item.bodyKey] }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
