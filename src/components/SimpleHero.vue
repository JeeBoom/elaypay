<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <section class="hero-simple">
    <div class="hero-simple__content">
      <h1 class="hero-simple__title" data-i18n-html="hero_title" v-html="t('hero_title')"></h1>
      <p class="hero-simple__body" data-i18n="hero_body">{{ t('hero_body') }}</p>
      <div class="hero-simple__actions">
        <a class="btn hero-cta" href="#" data-i18n="hero_start">{{ t('hero_start') }}</a>
        <a class="btn ghost hero-cta-ghost" href="#" data-i18n="hero_security">{{ t('hero_security') }}</a>
      </div>
    </div>
  </section>
</template>
