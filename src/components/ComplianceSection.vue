<template>
  <section id="compliance" class="section-padding">
    <div class="container">
      <div class="section-header">
        <!-- <span class="pill">{{ dict.compliance_pill }}</span> -->
        <h2 data-i18n="compliance_heading">{{ dict.compliance_heading }}</h2>
        <!-- <p class="section-lead">{{ dict.compliance_lead }}</p> -->
      </div>

      <div class="compliance-grid">
        <div
          v-for="(item, index) in complianceItems"
          :key="index"
          class="compliance-item"
        >
          <h3 :data-i18n="'compliance_item' + (index + 1) + '_title'">{{ item.title }}</h3>
          <p :data-i18n="'compliance_item' + (index + 1) + '_body'">{{ item.body }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { translations } from "../i18n";

const props = defineProps({
  currentLang: {
    type: String,
    default: "en",
  },
});

const dict = computed(() => translations[props.currentLang]);

const complianceItems = computed(() => [
  {
    title: dict.value.compliance_item1_title,
    body: dict.value.compliance_item1_body,
  },
  {
    title: dict.value.compliance_item2_title,
    body: dict.value.compliance_item2_body,
  },
  {
    title: dict.value.compliance_item3_title,
    body: dict.value.compliance_item3_body,
  },
  {
    title: dict.value.compliance_item4_title,
    body: dict.value.compliance_item4_body,
  },
]);
</script>

<style scoped>
.compliance-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 3rem;
}

.compliance-item {
  padding: 2rem;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--card-bg);
  transition: all 0.3s ease;
  animation: fadeInUp 0.6s ease forwards;
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.compliance-item:nth-child(2) {
  animation-delay: 0.1s;
}

.compliance-item:nth-child(3) {
  animation-delay: 0.2s;
}

.compliance-item:nth-child(4) {
  animation-delay: 0.3s;
}

/* .compliance-item:hover {
  border-color: var(--accent);
  background: var(--card-hover-bg);
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
} */

.compliance-item h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--text-primary);
}

.compliance-item p {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-secondary);
}

section {
  margin-top: 8rem;
}

@media (max-width: 768px) {
  .compliance-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
