<template>
	<div class="burger">
		<div
			ref="burgerBtn"
			class="burger__btn"
			@click="() => toggleBurger()"
		>
			<span class="bar bar_1" />
			<span class="bar bar_2" />
			<span class="bar bar_3" />
		</div>
		<menu
			ref="burgerMenu"
			class="burger__menu"
		>
			<li
				v-for="route in routes"
				:key="route.name"
			>
				<RouterLink
					:to="route.path"
					@click="() => closeBurger()"
				>
					{{ route.name !== undefined ? route.name : route.path ?? "Route" }}
				</RouterLink>
			</li>
		</menu>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const burgerBtn = ref<HTMLElement | null>(null);
const burgerMenu = ref<HTMLElement | null>(null);

let burgerOpened = false;

const routes = computed(() => router.options.routes.filter(route => route.path !== "/"));

const toggleBurger = () => burgerOpened ? closeBurger() : openBurger();

const openBurger = () => {
	burgerBtn.value?.classList.add("open");
	setTimeout(() => addEventListener("click", closeBurgerIfClickingOff), 0);
	burgerOpened = true;
};

const closeBurger = () => {
	burgerBtn.value?.classList.remove("open");
	removeEventListener("click", closeBurgerIfClickingOff);
	burgerOpened = false;
};

const closeBurgerIfClickingOff = (ev: MouseEvent) => {
	const target = ev.target as HTMLElement;
	if (burgerMenu.value?.contains(target) === true)
		return;
	closeBurger();
};

</script>

<style scoped src="./BurgerMenu.scss" />