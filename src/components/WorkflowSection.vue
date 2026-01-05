<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const workflowCards = [
  { titleKey: "flow1_title", bodyKey: "flow1_body", icon: "api" },
  { titleKey: "flow2_title", bodyKey: "flow2_body", icon: "webhook" },
  { titleKey: "flow3_title", bodyKey: "flow3_body", icon: "dashboard" },
  { titleKey: "flow4_title", bodyKey: "flow4_body", icon: "sdk" },
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
        <div class="card-icon" aria-hidden="true">
          <svg v-if="card.icon === 'api'" width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path d="M7 8l-4 4 4 4M17 8l4 4-4 4M14 4l-4 16" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="12" cy="12" r="10" fill="url(#grad-api)" opacity="0.12"/>
            <defs>
              <linearGradient id="grad-api" x1="2" y1="2" x2="22" y2="22">
                <stop stop-color="#7C4DFF"/>
                <stop offset="1" stop-color="#6EF7D5"/>
              </linearGradient>
            </defs>
          </svg>

          <svg v-else-if="card.icon === 'webhook'" width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path d="M18 8a6 6 0 0 1-7.7 5.8M6 8a6 6 0 0 0 7.7 5.8M7.5 15.5a6 6 0 0 0 9 0" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
            <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.9"/>
            <circle cx="6" cy="8" r="2" fill="currentColor" opacity="0.8"/>
            <circle cx="18" cy="8" r="2" fill="currentColor" opacity="0.8"/>
            <circle cx="12" cy="18" r="2" fill="currentColor" opacity="0.8"/>
            <rect x="2" y="2" width="20" height="20" rx="10" fill="url(#grad-webhook)" opacity="0.12"/>
            <defs>
              <linearGradient id="grad-webhook" x1="2" y1="2" x2="22" y2="22">
                <stop stop-color="#B17CFF"/>
                <stop offset="1" stop-color="#7C4DFF"/>
              </linearGradient>
            </defs>
          </svg>

          <svg v-else-if="card.icon === 'dashboard'" width="40" height="40" viewBox="0 0 24 24" fill="none">
            <rect x="4" y="4" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.2"/>
            <rect x="13" y="4" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.2"/>
            <rect x="4" y="13" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.2"/>
            <rect x="13" y="13" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.2"/>
            <circle cx="7.5" cy="7.5" r="1.2" fill="currentColor" opacity="0.9"/>
            <circle cx="16.5" cy="7.5" r="1.2" fill="currentColor" opacity="0.9"/>
            <circle cx="7.5" cy="16.5" r="1.2" fill="currentColor" opacity="0.9"/>
            <circle cx="16.5" cy="16.5" r="1.2" fill="currentColor" opacity="0.9"/>
            <rect x="4" y="4" width="16" height="16" rx="2" fill="url(#grad-dashboard)" opacity="0.12"/>
            <defs>
              <linearGradient id="grad-dashboard" x1="4" y1="4" x2="20" y2="20">
                <stop stop-color="#6EF7D5"/>
                <stop offset="1" stop-color="#7C4DFF"/>
              </linearGradient>
            </defs>
          </svg>

          <svg v-else width="40" height="40" viewBox="0 0 24 24" fill="none">
            <rect x="5" y="6" width="14" height="12" rx="2" stroke="currentColor" stroke-width="1.2"/>
            <path d="M9 10h6M9 13h4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
            <rect x="3" y="4" width="2" height="16" rx="1" fill="currentColor" opacity="0.8"/>
            <rect x="19" y="4" width="2" height="16" rx="1" fill="currentColor" opacity="0.8"/>
            <rect x="5" y="6" width="14" height="12" rx="2" fill="url(#grad-sdk)" opacity="0.12"/>
            <defs>
              <linearGradient id="grad-sdk" x1="5" y1="6" x2="19" y2="18">
                <stop stop-color="#7C4DFF"/>
                <stop offset="1" stop-color="#B17CFF"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h3 :data-i18n="card.titleKey">{{ t(card.titleKey) }}</h3>
        <p :data-i18n="card.bodyKey">{{ t(card.bodyKey) }}</p>
      </div>
    </div>
  </section>
</template>

