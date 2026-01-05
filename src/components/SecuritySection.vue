<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const securityPanels = [
  {
    titleKey: "panel1_title",
    bodyKey: "panel1_body",
    badges: ["panel1_badge1", "panel1_badge2", "panel1_badge3"],
    icon: "advertising",
  },
  {
    titleKey: "panel2_title",
    bodyKey: "panel2_body",
    timeline: [
      { titleKey: "timeline_pre_title", bodyKey: "timeline_pre_body" },
      { titleKey: "timeline_in_title", body: "POST /api/v1/cards/issue { 'currency': 'USD', 'type': 'VIRTUAL' }" },
      { titleKey: "timeline_post_title", bodyKey: "timeline_post_body" },
    ],
    icon: "ecommerce",
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
        <div v-if="panel.badges" class="badge-row" style="margin-top: 16px">
          <span
            v-for="badge in panel.badges"
            :key="badge"
            class="badge"
            :data-i18n="badge"
            >{{ t(badge) }}</span
          >
        </div>
        
        <!-- Large decorative illustration for advertising panel -->
        <div v-if="panel.icon === 'advertising'" class="panel-illustration">
          <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Background gradient -->
            <rect width="200" height="140" rx="8" fill="url(#panel-bg)" opacity="0.1"/>
            
            <!-- Main ad card -->
            <rect x="20" y="20" width="80" height="100" rx="6" fill="url(#card-grad)" opacity="0.15"/>
            <rect x="20" y="20" width="80" height="100" rx="6" stroke="currentColor" stroke-width="1.5" opacity="0.6"/>
            
            <!-- Card details -->
            <rect x="30" y="30" width="40" height="4" rx="2" fill="currentColor" opacity="0.4"/>
            <rect x="30" y="40" width="50" height="3" rx="1.5" fill="currentColor" opacity="0.3"/>
            <rect x="30" y="50" width="35" height="3" rx="1.5" fill="currentColor" opacity="0.25"/>
            
            <!-- Platform icons -->
            <circle cx="40" cy="75" r="8" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>
            <path d="M37 75l2 2 4-4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" opacity="0.5"/>
            
            <circle cx="60" cy="75" r="8" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>
            <path d="M57 75l2 2 4-4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" opacity="0.5"/>
            
            <circle cx="80" cy="75" r="8" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>
            <path d="M77 75l2 2 4-4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" opacity="0.5"/>
            
            <!-- Budget bar chart -->
            <rect x="110" y="80" width="20" height="40" rx="3" fill="url(#bar1)" opacity="0.6"/>
            <rect x="135" y="60" width="20" height="60" rx="3" fill="url(#bar2)" opacity="0.6"/>
            <rect x="160" y="50" width="20" height="70" rx="3" fill="url(#bar3)" opacity="0.6"/>
            
            <!-- Connecting lines -->
            <path d="M100 60 Q120 40 140 50" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.3"/>
            
            <!-- Money symbol -->
            <circle cx="140" cy="25" r="15" fill="url(#money-grad)" opacity="0.2"/>
            <text x="140" y="32" text-anchor="middle" font-size="18" font-weight="600" fill="currentColor" opacity="0.5">$</text>
            
            <defs>
              <linearGradient id="panel-bg" x1="0" y1="0" x2="200" y2="140">
                <stop stop-color="#7C4DFF"/>
                <stop offset="1" stop-color="#B17CFF"/>
              </linearGradient>
              <linearGradient id="card-grad" x1="20" y1="20" x2="100" y2="120">
                <stop stop-color="#7C4DFF"/>
                <stop offset="1" stop-color="#FF7AD1"/>
              </linearGradient>
              <linearGradient id="bar1" x1="120" y1="80" x2="120" y2="120">
                <stop stop-color="#7C4DFF"/>
                <stop offset="1" stop-color="#9A7BFF"/>
              </linearGradient>
              <linearGradient id="bar2" x1="145" y1="60" x2="145" y2="120">
                <stop stop-color="#9A7BFF"/>
                <stop offset="1" stop-color="#B17CFF"/>
              </linearGradient>
              <linearGradient id="bar3" x1="170" y1="50" x2="170" y2="120">
                <stop stop-color="#B17CFF"/>
                <stop offset="1" stop-color="#FF7AD1"/>
              </linearGradient>
              <linearGradient id="money-grad" x1="125" y1="10" x2="155" y2="40">
                <stop stop-color="#6EF7D5"/>
                <stop offset="1" stop-color="#7C4DFF"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        <div
          v-if="panel.timeline"
          class="timeline"
          style="margin-top: 20px"
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
