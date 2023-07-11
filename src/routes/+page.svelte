<script lang="ts">
 import { getContext } from 'svelte';
import { generateSlides } from '$lib';
import { Splide, SplideSlide } from '@splidejs/svelte-splide';
import '@splidejs/svelte-splide/css';
import { onMount } from 'svelte';


// Retrieve user store from context
const nowShowing = getContext('nowShowing');

//console.log($nowShowing)

let main: Splide;
let thumbs: SplideSlide;

const options = {
    type: 'fade',
    speed: 300,
    perPage: 1,
    perMove: 1,
    arrows: false,
    perMove: 1,
    pagination: false,
    gap: '1rem',
    width: 920,
    height: 920,
    pauseOnHover: false,
}

const thumbsOptions = {
    type: 'loop',
    perMove: 1,
    autoplay: true,
    interval: 10000,
    rewind: false,
    gap: '1rem',
    pagination: false,
    width: 920,
    fixedWidth: 172,
    fixedHeight: 172,
    cover: true,
    focus: 'center',
    trimSpace: true,
    isNavigation: true,
    updateOnMove: true,
    pauseOnHover: false,
};

onMount(() => {
    if (main && thumbs) {
        main.sync(thumbs.splide);
        console.log(main.splide);
    }
});

</script>


<div class="container h-full mx-auto flex justify-center items-start">
	<div class="flex flex-col gap-y-12 items-center">

	<Splide bind:this={ main } options={options}>
			{ #each $nowShowing as slide }
					<SplideSlide>
						<img src={ slide.tileImageCloudinary[0].secure_url } alt={ slide.name }>
					</SplideSlide>
				{ /each }
		</Splide>

		<Splide on:click={e => { console.log( e.detail ) }} options={ thumbsOptions } bind:this={ thumbs }>
    {#each $nowShowing as slide }
      <SplideSlide data="boss">
        <img src={slide.tileImageCloudinary[0].secure_url } alt={ slide.name }>
      </SplideSlide>
    { /each }
  </Splide>

	


	
	</div>
</div>

<style lang="postcss">
	
</style>
