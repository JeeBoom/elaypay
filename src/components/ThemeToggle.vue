<script setup>
import { ref, computed, onMounted } from "vue";
import Switch from "./switch.vue";

const theme = ref("dark");

// const themeLabel = computed(() => (theme.value === 'dark' ? 'light' : 'dark'));

const applyTheme = (mode) => {
  theme.value = mode;
  document.documentElement.setAttribute("data-theme", mode);
};

const toggleTheme = (event) => {
  const newTheme = theme.value === "dark" ? "light" : "dark";

  // 检查浏览器是否支持 View Transitions API
  if (!document.startViewTransition) {
    applyTheme(newTheme);
    return;
  }

  // 获取点击位置
  const x = event.clientX;
  const y = event.clientY;

  // 计算从点击位置到页面最远角的距离
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );

  // 创建 View Transition
  const transition = document.startViewTransition(() => {
    applyTheme(newTheme);
  });

  // 等待 transition ready，然后应用圆形裁剪动画
  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ];

    // 新主题始终从点击位置扩散出来
    document.documentElement.animate(
      {
        clipPath: clipPath,
      },
      {
        duration: 500,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  });
};

onMounted(() => {
  // 默认使用 dark 模式
  applyTheme("dark");
});
</script>

<template>
  <span class="theme-toggle-floating">
    <Switch :checked="theme === 'dark'" @click="toggleTheme" />
  </span>
</template>
