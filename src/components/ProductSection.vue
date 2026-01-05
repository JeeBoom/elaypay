<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const productCards = [
  {
    titleKey: "api_title",
    bodyKey: "api_body",
    badges: ["api_badge1", "api_badge2", "api_badge3"],
    icon: "card",
  },
  {
    titleKey: "treasury_title",
    bodyKey: "treasury_body",
    badges: ["treasury_badge1", "treasury_badge2", "treasury_badge3"],
    icon: "globe",
  },
  {
    titleKey: "compliance_title",
    bodyKey: "compliance_body",
    badges: ["compliance_badge1", "compliance_badge2", "compliance_badge3"],
    icon: "shield",
  },
  {
    titleKey: "observability_title",
    bodyKey: "observability_body",
    badges: [
      "observability_badge1",
      "observability_badge2",
      "observability_badge3",
    ],
    icon: "code",
  },
];
</script>

<template>
  <section id="product" class="section product-section">
    <div class="section-head product-head">
      <h2 data-i18n="product_heading">{{ t('product_heading') }}</h2>
      <p class="lead" data-i18n="product_lead">{{ t('product_lead') }}</p>
    </div>
      <div class="grid product-grid">
      <div
        v-for="card in productCards"
        :key="card.titleKey"
          class="card tilt reveal product-card"
      >
        <div class="card-icon" aria-hidden="true">
          <svg v-if="card.icon === 'card'" width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="5" width="18" height="14" rx="3" fill="url(#grad-card)" opacity="0.2"/>
            <rect x="4" y="6.5" width="16" height="11" rx="2" stroke="currentColor" stroke-width="1.2"/>
            <rect x="6" y="11" width="7" height="1.6" rx="0.6" fill="currentColor" opacity="0.9"/>
            <rect x="6" y="13.8" width="4.5" height="1.6" rx="0.6" fill="currentColor" opacity="0.8"/>
            <circle cx="17" cy="14.2" r="1.5" fill="currentColor" opacity="0.95"/>
            <defs>
              <linearGradient id="grad-card" x1="3" y1="5" x2="21" y2="19" gradientUnits="userSpaceOnUse">
                <stop stop-color="#7C4DFF"/>
                <stop offset="1" stop-color="#B17CFF"/>
              </linearGradient>
            </defs>
          </svg>

          <svg v-else-if="card.icon === 'globe'" width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.4" opacity="0.9"/>
            <path d="M4 12h16" stroke="currentColor" stroke-width="1.2" opacity="0.8"/>
            <path d="M12 4c2.2 2.4 2.2 13.6 0 16" stroke="currentColor" stroke-width="1.2" opacity="0.8"/>
            <path d="M12 4c-2.2 2.4-2.2 13.6 0 16" stroke="currentColor" stroke-width="1.2" opacity="0.8"/>
            <circle cx="12" cy="12" r="8" fill="url(#grad-globe)" opacity="0.16"/>
            <defs>
              <linearGradient id="grad-globe" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
                <stop stop-color="#7C4DFF"/>
                <stop offset="1" stop-color="#6EF7D5"/>
              </linearGradient>
            </defs>
          </svg>

          <svg v-else-if="card.icon === 'shield'" width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4l6 2v5.8c0 3.2-2 6.1-6 8.2-4-2.1-6-5-6-8.2V6l6-2Z" stroke="currentColor" stroke-width="1.2" fill="url(#grad-shield)" opacity="0.2"/>
            <path d="M9.5 12.2l1.8 1.6 3.2-3.8" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
            <defs>
              <linearGradient id="grad-shield" x1="6" y1="4" x2="18" y2="20" gradientUnits="userSpaceOnUse">
                <stop stop-color="#7C4DFF"/>
                <stop offset="1" stop-color="#B17CFF"/>
              </linearGradient>
            </defs>
          </svg>

          <svg v-else width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="5" width="16" height="14" rx="2" stroke="currentColor" stroke-width="1.2" opacity="0.9"/>
            <path d="M8 9h8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
            <path d="M8 12h6" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" opacity="0.85"/>
            <path d="M8 15h4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" opacity="0.75"/>
            <rect x="4" y="5" width="16" height="14" rx="2" fill="url(#grad-code)" opacity="0.16"/>
            <defs>
              <linearGradient id="grad-code" x1="4" y1="5" x2="20" y2="19" gradientUnits="userSpaceOnUse">
                <stop stop-color="#6EF7D5"/>
                <stop offset="1" stop-color="#7C4DFF"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
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
