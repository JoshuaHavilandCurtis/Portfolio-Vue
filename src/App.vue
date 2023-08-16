<template>
	<Home />
	<Panel
		:visible="panelVisible"
		:close-fn="closePanel"
	>
		<RouterView />
	</Panel>
</template>

<script setup lang="ts">
import Home from "@/views/Home/Home.vue";
import Panel from "@/components/general/Panel/Panel.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const panelVisible = ref(false);

const openPanel = () => {
	if (panelVisible.value)
		return;

	panelVisible.value = true;
	document.body.style.overflow = "hidden";
};

const closePanel = () => {
	if (!panelVisible.value)
		return;

	panelVisible.value = false;
	document.body.style.overflow = "";
	void router.push("/");
};

/**
 * Determine if the user is on the Home page.
 */
const onSubPage = computed(() => router.currentRoute.value.path !== "/");

const checkPanel = (onSubPage: boolean) => {
	if (onSubPage) {
		openPanel();
	} else {
		closePanel();
	}
};

watch(onSubPage, () => checkPanel(onSubPage.value));
onMounted(() => checkPanel(onSubPage.value));

</script>

<style lang="scss">
@import "@/scss/main";
</style>