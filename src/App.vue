<script setup>
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from "vue";
import { translations } from "./i18n";
import ThemeToggle from "./components/ThemeToggle.vue";
import HeroSection from "./components/HeroSection.vue";
import ProductSection from "./components/ProductSection.vue";
import SecuritySection from "./components/SecuritySection.vue";
import WorkflowSection from "./components/WorkflowSection.vue";
import ManagementSection from "./components/ManagementSection.vue";
import ExpenseManagementSection from "./components/ExpenseManagementSection.vue";
import ComplianceSection from "./components/ComplianceSection.vue";
import CtaSection from "./components/CtaSection.vue";
import { useCanvas } from "./composables/useCanvas";

const navLinks = [
  { id: "product", labelKey: "nav_product" },
  { id: "security", labelKey: "nav_security" },
  { id: "expense", labelKey: "nav_expense" },
  { id: "workflow", labelKey: "nav_workflow" },
  { id: "cta", labelKey: "nav_contact" },
  { id: "compliance", labelKey: "nav_compliance" },
];

const scrollSections = [
  "product",
  "security",
  "expense",
  "workflow",
  "cta",
  "compliance",
];

const currentLang = ref("zh");
const langTogglePulse = ref(false);
const activeDot = ref(0);

// Canvas hook
const { canvasRef, setupCanvas, cleanup: cleanupCanvas } = useCanvas();

const dict = computed(() => translations[currentLang.value] || translations.en);
const langToggleStyle = computed(() => ({
  "--slide": currentLang.value === "zh" ? "100%" : "0%",
}));

let observer;

const updateDocumentLang = (lang) => {
  document.documentElement.lang = lang;
};

const setLanguage = (lang) => {
  currentLang.value = lang;
};

const animateLanguage = (lang) => {
  if (lang === currentLang.value) return;
  const nodes = Array.from(
    document.querySelectorAll("[data-i18n], [data-i18n-html]")
  );
  nodes.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(6px)";
  });
  langTogglePulse.value = true;
  setTimeout(() => {
    setLanguage(lang);
    nextTick(() => {
      nodes.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });
    });
    setTimeout(() => {
      langTogglePulse.value = false;
    }, 360);
  }, 180);
};

const addTilt = (el) => {
  const strength = 8;
  let ticking = false;
  el.addEventListener("pointermove", (e) => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `rotateX(${(-y * strength).toFixed(
        2
      )}deg) rotateY(${(x * strength).toFixed(2)}deg) translateY(-4px)`;
      ticking = false;
    });
  });
  el.addEventListener("pointerleave", () => {
    el.style.transform = "rotateX(0deg) rotateY(0deg)";
  });
};

const setupTilts = () => {
  nextTick(() => {
    document.querySelectorAll(".tilt").forEach((el) => addTilt(el));
  });
};

const setupReveal = () => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.2 }
  );

  nextTick(() => {
    document.querySelectorAll(".reveal").forEach((el) => observer?.observe(el));
  });
};

const updateDots = () => {
  const viewportCenter = window.innerHeight * 0.5;
  const nearBottom =
    window.scrollY + window.innerHeight >= document.body.scrollHeight - 8;
  let active = 0;
  let bestDist = Infinity;

  if (nearBottom) {
    active = scrollSections.length - 1;
  } else {
    scrollSections.forEach((id, idx) => {
      const el = document.getElementById(id);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height * 0.5;
      const dist = Math.abs(center - viewportCenter);
      if (dist < bestDist) {
        bestDist = dist;
        active = idx;
      }
    });
  }

  activeDot.value = active;
};

const setupScrollDots = () => {
  window.addEventListener("scroll", updateDots);
  updateDots();
};

const scrollToSection = (id) => {
  const target = document.getElementById(id);
  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
};

watch(currentLang, (lang) => {
  updateDocumentLang(lang);
});

onMounted(() => {
  updateDocumentLang(currentLang.value);
  setupCanvas();
  setupTilts();
  setupReveal();
  setupScrollDots();
});

onBeforeUnmount(() => {
  cleanupCanvas();
  window.removeEventListener("scroll", updateDots);
  if (observer) observer.disconnect();
});
</script>

<template>
  <div>
    <canvas ref="canvasRef" id="backdrop"></canvas>
    <div class="grain"></div>

    <ThemeToggle />

    <div class="page">
      <header class="nav">
        <div class="logo">
          <div class="logo-mark"></div>
          <img
            src="./assets/elaypay.png"
            alt="ElayPay"
            style="width: 50px; transform: scale(2.4); margin-left: 20px"
          />
        </div>
        <nav>
          <ul>
            <li v-for="link in navLinks" :key="link.id">
              <a href="#" :data-i18n="link.labelKey">{{
                dict[link.labelKey]
              }}</a>
            </li>
          </ul>
        </nav>
        <div class="nav-actions">
          <div
            class="lang-toggle"
            :class="{ pulse: langTogglePulse }"
            :style="langToggleStyle"
          >
            <button
              class="lang-btn"
              :class="{ active: currentLang === 'en' }"
              @click="animateLanguage('en')"
              data-lang="en"
            >
              EN
            </button>
            <button
              class="lang-btn"
              :class="{ active: currentLang === 'zh' }"
              @click="animateLanguage('zh')"
              data-lang="zh"
            >
              中文
            </button>
          </div>
          <a class="btn ghost" href="#" data-i18n="nav_login">{{
            dict.nav_login
          }}</a>
          <a class="btn" href="#" data-i18n="nav_signup">{{
            dict.nav_signup
          }}</a>
        </div>
      </header>

      <HeroSection :current-lang="currentLang" />

      <div class="scroll-indicator">
        <div
          v-for="(section, idx) in scrollSections"
          :key="section"
          class="scroll-dot"
          :class="{ active: activeDot === idx }"
          :data-target="section"
          @click="scrollToSection(section)"
        ></div>
      </div>

      <div class="glow-line"></div>

      <ProductSection :current-lang="currentLang" />

      <SecuritySection :current-lang="currentLang" />

      <ManagementSection :current-lang="currentLang" />

      <ExpenseManagementSection :current-lang="currentLang" />

      <WorkflowSection :current-lang="currentLang" />

      <CtaSection :current-lang="currentLang" />

      <ComplianceSection :current-lang="currentLang" />

      <footer>
        <div data-i18n="footer_text">{{ dict.footer_text }}</div>
        <div
          style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center"
        >
          <a
            href="#"
            style="color: var(--text-2); text-decoration: none"
            data-i18n="footer_status"
            >{{ dict.footer_status }}</a
          >
          <a
            href="#"
            style="color: var(--text-2); text-decoration: none"
            data-i18n="footer_docs"
            >{{ dict.footer_docs }}</a
          >
          <a
            href="#"
            style="color: var(--text-2); text-decoration: none"
            data-i18n="footer_careers"
            >{{ dict.footer_careers }}</a
          >
          <span
            style="color: var(--muted); font-size: 12px"
            data-i18n="footer_copyright"
            >{{ dict.footer_copyright }}</span
          >
        </div>
      </footer>
    </div>

    <div class="motion-blur" style="top: 20%; left: 10%"></div>
    <div
      class="motion-blur"
      style="bottom: 10%; right: 15%; animation-delay: 4s"
    ></div>
  </div>
</template>
