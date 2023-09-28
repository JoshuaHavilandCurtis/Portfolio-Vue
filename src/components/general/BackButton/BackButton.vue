<template>
	<button
		class="back-btn"
		aria-label="Go back"
		@click="goBack()"
	>
		<FontAwesomeIcon icon="fa-solid fa-arrow-left" />
	</button>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => {
	const path = router.currentRoute.value.path;
	const slicedPath = path.slice(0, path.lastIndexOf("/"));
	const newPath = slicedPath !== "" ? slicedPath : "/";
	void router.push(newPath);
};

</script>

<style scoped src="./BackButton.scss" />