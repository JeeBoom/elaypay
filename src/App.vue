<script setup>
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from "vue";
import { useI18n } from "vue-i18n";
import ThemeToggle from "./components/ThemeToggle.vue";
import SimpleHero from "./components/SimpleHero.vue";
import ProductSection from "./components/ProductSection.vue";
import SecuritySection from "./components/SecuritySection.vue";
import WorkflowSection from "./components/WorkflowSection.vue";
import ManagementSection from "./components/ManagementSection.vue";
import ExpenseManagementSection from "./components/ExpenseManagementSection.vue";
import ComplianceSection from "./components/ComplianceSection.vue";
import CtaSection from "./components/CtaSection.vue";
import { useCanvas } from "./composables/useCanvas";

const { locale, t } = useI18n();

const navLinks = [
  { id: "product", labelKey: "nav_product" },
  { id: "security", labelKey: "nav_security" },
  { id: "workflow", labelKey: "nav_workflow" },
  { id: "management", labelKey: "nav_management" },
  { id: "cta", labelKey: "nav_contact" },
];

const scrollSections = ["product", "security", "workflow", "management", "cta"];

const langTogglePulse = ref(false);
const activeDot = ref(0);
const mobileMenuOpen = ref(false);
const showBackTop = ref(false);

const setScrollLock = (locked) => {
  const value = locked ? "hidden" : "";
  document.documentElement.style.overflow = value;
  document.body.style.overflow = value;
};

// Canvas hook
const { canvasRef, setupCanvas, cleanup: cleanupCanvas } = useCanvas();

const langToggleStyle = computed(() => ({
  "--slide": locale.value === "zh" ? "100%" : "0%",
}));

const animateLanguage = (lang) => {
  // 添加淡出效果
  const i18nElements = document.querySelectorAll(
    "[data-i18n], [data-i18n-html]"
  );
  i18nElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(4px)";
  });

  // 等待过渡完成后改变语言
  setTimeout(() => {
    locale.value = lang;

    // 改变语言后，移除内联样式以触发过渡显示
    setTimeout(() => {
      i18nElements.forEach((el) => {
        el.style.opacity = "";
        el.style.transform = "";
      });
    }, 10);
  }, 140);

  // 脉冲动画
  langTogglePulse.value = true;
  setTimeout(() => {
    langTogglePulse.value = false;
  }, 400);
};

const updateDocumentLang = (lang) => {
  document.documentElement.lang = lang;
};

let observer;

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
  showBackTop.value = window.scrollY > 200;
};

const setupScrollDots = () => {
  window.addEventListener("scroll", updateDots);
  updateDots();
};

const scrollToSection = (id) => {
  const target = document.getElementById(id);
  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  mobileMenuOpen.value = false; // 关闭移动菜单
  setScrollLock(false);
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
  setScrollLock(mobileMenuOpen.value);
};

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
  setScrollLock(false);
};

watch(locale, (lang) => {
  updateDocumentLang(lang);
});

onMounted(() => {
  updateDocumentLang(locale.value);
  setupCanvas();
  setupTilts();
  setupReveal();
  setupScrollDots();
});

onBeforeUnmount(() => {
  cleanupCanvas();
  window.removeEventListener("scroll", updateDots);
  if (observer) observer.disconnect();
  setScrollLock(false);
});
</script>

<template>
  <div>
    <canvas ref="canvasRef" id="backdrop"></canvas>
    <div class="grain"></div>

    <ThemeToggle />

    <div class="page">
      <header class="nav">
        <button
          class="hamburger"
          :class="{ active: mobileMenuOpen }"
          @click="toggleMobileMenu"
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

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
              <a
                href="#"
                @click.prevent="scrollToSection(link.id)"
                :data-i18n="link.labelKey"
                >{{ t(link.labelKey) }}</a
              >
            </li>
          </ul>
        </nav>
        <div class="nav-actions">
          <button
            class="lang-icon-btn"
            @click="animateLanguage(locale === 'zh' ? 'en' : 'zh')"
            :aria-label="`Switch to ${locale === 'zh' ? 'English' : '简体中文'}`"
            :title="`Switch to ${locale === 'zh' ? 'English' : '简体中文'}`"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/>
              <path d="M3 12h18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
              <path d="M12 3a15.3 15.3 0 0 1 4 9 15.3 15.3 0 0 1-4 9 15.3 15.3 0 0 1-4-9 15.3 15.3 0 0 1 4-9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
      </header>

      <!-- 移动端侧边栏 -->
      <div
        class="mobile-overlay"
        :class="{ active: mobileMenuOpen }"
        @click="closeMobileMenu"
      ></div>
      <div class="mobile-sidebar" :class="{ open: mobileMenuOpen }">
        <nav>
          <ul>
            <li v-for="link in navLinks" :key="link.id">
              <a
                href="#"
                @click.prevent="scrollToSection(link.id)"
                :data-i18n="link.labelKey"
                >{{ t(link.labelKey) }}</a
              >
            </li>
          </ul>
        </nav>
        <div class="mobile-sidebar-actions">
          <a class="btn ghost" href="#" data-i18n="nav_login">{{
            t("nav_login")
          }}</a>
          <a class="btn" href="#" data-i18n="nav_signup">{{
            t("nav_signup")
          }}</a>
        </div>
      </div>

      <SimpleHero />

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

      <button
        v-if="showBackTop"
        class="back-to-top"
        aria-label="Back to top"
        @click="scrollToTop"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 5l-7 7h4v7h6v-7h4z" />
        </svg>
      </button>

      <div class="glow-line"></div>

      <ProductSection />

      <SecuritySection />

      <WorkflowSection />

      <ManagementSection />

      <CtaSection />

      <footer>
        <div data-i18n="footer_text">{{ t("footer_text") }}</div>
        <div
          style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center"
        >
          <a
            href="#"
            style="color: var(--text-2); text-decoration: none"
            data-i18n="footer_status"
            >{{ t("footer_status") }}</a
          >
          <a
            href="#"
            style="color: var(--text-2); text-decoration: none"
            data-i18n="footer_docs"
            >{{ t("footer_docs") }}</a
          >
          <a
            href="#"
            style="color: var(--text-2); text-decoration: none"
            data-i18n="footer_careers"
            >{{ t("footer_careers") }}</a
          >
          <span
            style="color: var(--muted); font-size: 12px"
            data-i18n="footer_copyright"
            >{{ t("footer_copyright") }}</span
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
