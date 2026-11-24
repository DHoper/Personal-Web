<script setup lang="ts">
import BootIntro from './components/BootIntro.vue'
import CustomCursor from './components/CustomCursor.vue'
import SiteNav from './components/SiteNav.vue'
import BannerSection from './components/BannerSection.vue'
import MarqueeBand from './components/MarqueeBand.vue'
import AboutSection from './components/AboutSection.vue'
import StrengthsSection from './components/StrengthsSection.vue'
import ExperienceLog from './components/ExperienceLog.vue'
import ProjectSlider from './components/ProjectSlider.vue'
import SkillsBoard from './components/SkillsBoard.vue'
import InfoAccordion from './components/InfoAccordion.vue'
import ContactSection from './components/ContactSection.vue'
</script>

<template>
  <BootIntro />
  <CustomCursor />
  <SiteNav />
  <main>
    <BannerSection />
    <MarqueeBand tone="accent" :items="['Full-stack', 'Back-end', 'System Integration', 'DevOps × AI']" />
    <AboutSection />
    <StrengthsSection />
    <ExperienceLog />
    <ProjectSlider />
    <SkillsBoard />
    <InfoAccordion />
    <MarqueeBand tone="ink" reverse :items="['Open to work', 'Let\'s talk', 'Taichung / Remote']" />
    <ContactSection />
  </main>
</template>
