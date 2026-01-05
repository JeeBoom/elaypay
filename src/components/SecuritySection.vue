<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

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
      { titleKey: "timeline_in_title", body: "POST /api/v1/cards/issue { 'currency': 'USD', 'type': 'VIRTUAL' }" },
      { titleKey: "timeline_post_title", bodyKey: "timeline_post_body" },
    ],
  },
];
</script>

<template>
  <section id="security" class="section">
    <div class="section-head">
      <h2 data-i18n="security_heading">{{ t('security_heading') }}</h2>
      <p class="lead" data-i18n="security_lead">
        {{ t('security_lead') }}
      </p>
    </div>
    <div class="panels">
      <div
        v-for="panel in securityPanels"
        :key="panel.titleKey"
        class="panel reveal"
      >
        <h4 :data-i18n="panel.titleKey">{{ t(panel.titleKey) }}</h4>
        <p :data-i18n="panel.bodyKey">{{ t(panel.bodyKey) }}</p>
        <div v-if="panel.badges" class="badge-row" style="margin-top: 12px">
          <span
            v-for="badge in panel.badges"
            :key="badge"
            class="badge"
            :data-i18n="badge"
            >{{ t(badge) }}</span
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
              t(item.titleKey)
            }}</strong
            ><br />
            <span :data-i18n="item.bodyKey">{{ item.body || t(item.bodyKey) }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
