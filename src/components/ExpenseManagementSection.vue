<template>
  <section id="expense" class="section-padding">
    <div class="container">
      <div class="expense-layout">
        <div class="expense-content">
          <span class="pill" data-i18n="expense_pill">{{ t('expense_pill') }}</span>
          <h2 data-i18n="expense_heading">{{ t('expense_heading') }}</h2>

          <div class="expense-features">
            <div
              v-for="(feature, index) in expenseFeatures"
              :key="index"
              class="expense-feature"
            >
              <div class="feature-icon" :style="{ background: feature.iconBg }">
                <div v-html="feature.icon"></div>
              </div>
              <div>
                <h3 :data-i18n="'expense_feature' + (index + 1) + '_title'">{{ feature.title }}</h3>
                <p :data-i18n="'expense_feature' + (index + 1) + '_body'">{{ feature.body }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="expense-visual">
          <div class="visual-card card-ui">
            <div class="card-mockup">
              <!-- <div class="card-logo">ElayPay</div> -->
              <img
                src="../assets/elaypay.png"
                alt="ElayPay"
                style="width: 50px; transform: scale(2.4); margin-left: 20px"
              />
              <!-- <div class="card-number">5435 7890 0000 6000</div> -->
            </div>
          </div>
          <div class="visual-card transaction-ui">
            <div class="transaction-list">
              <div
                class="transaction-item"
                v-for="(tx, idx) in transactions"
                :key="idx"
              >
                <div class="transaction-icon">{{ tx.icon }}</div>
                <div class="transaction-details">
                  <div class="transaction-info">
                    <span class="merchant-name" :data-i18n="tx.merchantKey">{{ tx.merchant }}</span>
                    <span class="transaction-amount">{{ tx.amount }}</span>
                  </div>
                  <div class="transaction-date">{{ tx.date }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const expenseFeatures = computed(() => [
  {
    title: t('expense_feature1_title'),
    body: t('expense_feature1_body'),
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 3H15L17 5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V6C2 5.44772 2.44772 5 3 5H7L9 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    iconBg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    title: t('expense_feature2_title'),
    body: t('expense_feature2_body'),
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    iconBg: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    title: t('expense_feature3_title'),
    body: t('expense_feature3_body'),
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21ZM16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11H16Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    iconBg: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
]);

const transactions = computed(() => [
  { merchantKey: "expense_tx1_merchant", date: "2023.11.01", amount: "$ 149.00", icon: "🛍️" },
  { merchantKey: "expense_tx2_merchant", date: "2023.12.05", amount: "$ 510.00", icon: "✈️" },
  { merchantKey: "expense_tx1_merchant", date: "2023.11.01", amount: "$ 29.00", icon: "🛍️" },
  { merchantKey: "expense_tx1_merchant", date: "2023.11.01", amount: "$ 43.00", icon: "🛍️" },
].map(tx => ({
  ...tx,
  merchant: t(tx.merchantKey)
})));

</script>

<style scoped>
.expense-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.expense-content h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 1.5rem 0 3rem;
  line-height: 1.2;
  color: var(--text-primary);
}

.expense-features {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.expense-feature {
  display: flex;
  gap: 1.5rem;
  animation: fadeInUp 0.6s ease forwards;
}

.expense-feature:nth-child(2) {
  animation-delay: 0.1s;
}

.expense-feature:nth-child(3) {
  animation-delay: 0.2s;
}

.feature-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.expense-feature h3 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.expense-feature p {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-secondary);
}

.expense-visual {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.visual-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  animation: fadeInUp 0.6s ease forwards;
}

.card-ui {
  animation-delay: 0.3s;
}

.transaction-ui {
  animation-delay: 0.4s;
}

.card-mockup {
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #435ed7 0%, #764ba2 100%);
  border-radius: 12px;
  position: relative;
  box-shadow: 0 12px 32px rgba(102, 126, 234, 0.3);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  letter-spacing: 0.5px;
}

.card-mockup::before {
  content: "";
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 60px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
}

.card-mockup::after {
  content: "";
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 80px;
  height: 50px;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 50"><circle cx="25" cy="25" r="20" fill="rgba(255,255,255,0.8)"/><circle cx="55" cy="25" r="20" fill="rgba(255,255,255,0.6)"/></svg>')
    no-repeat center;
  background-size: contain;
}

.transaction-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.transaction-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  border-radius: 8px;
  background: var(--card-hover-bg);
  transition: all 0.2s ease;
}

.transaction-item:hover {
  background: var(--border-color);
}

.transaction-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: linear-gradient(
    135deg,
    var(--accent),
    var(--accent-dark, #6b4dff)
  );
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.transaction-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.transaction-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.merchant-name {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-primary);
}

.transaction-amount {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
}

.transaction-date {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

section {
  margin-top: 8rem;
}

@media (max-width: 968px) {
  .expense-layout {
    grid-template-columns: 1fr;
    gap: 3rem;
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
