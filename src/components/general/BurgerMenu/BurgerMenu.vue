<template>
	<div class="burger">
		<div
			ref="burgerBtnElRef"
			class="burger__btn"
			@click="toggle"
		>
			<span class="bar" />
			<span class="bar" />
			<span class="bar" />
		</div>
		<menu
			ref="burgerMenuElRef"
			class="burger__menu"
		>
			<li
				v-for="item of items"
				:key="item.label"
			>
				<RouterLink
					:to="item.href"
					@click="close"
				>
					{{ item.label }}
				</RouterLink>
			</li>
		</menu>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

defineProps<{
	items: {
		label: string;
		href: string;
	}[];
}>();

const burgerBtnElRef = ref<HTMLElement | null>(null);
const burgerMenuElRef = ref<HTMLElement | null>(null);
let opened = false;

const toggle = () => opened ? close() : open();

onMounted(() => {
	if (burgerBtnElRef.value === null)
		return;

	burgerBtnElRef.value.dataset.visible = "false";
});

const open = () => {
	if (burgerBtnElRef.value === null)
		return;
	burgerBtnElRef.value.dataset.visible = "true";
	setTimeout(() => addEventListener("click", closeWhenClickingOff), 0);
	opened = true;
};

const close = () => {
	if (burgerBtnElRef.value === null)
		return;
	burgerBtnElRef.value.dataset.visible = "false";
	removeEventListener("click", closeWhenClickingOff);
	opened = false;
};

const closeWhenClickingOff = (ev: MouseEvent) => {
	const target = ev.target as HTMLElement;
	if (burgerMenuElRef.value?.contains(target) === true)
		return;

	close();
};

</script>

<style scoped src="./BurgerMenu.scss" />