<script lang="ts">
import { generateSlides } from '$lib';
import { Splide, SplideSlide } from '@splidejs/svelte-splide';
import '@splidejs/svelte-splide/css';
import { onMount } from 'svelte';

let main: Splide;
let thumbs: SplideSlide;

const slides = generateSlides();
  const options = {
    type: 'fade',
		speed: 100,
    perPage: 1,
		rewind      : true,
		autoplay: true,
		arrows: false,
		perMove   : 1,
		pagination: false,
    gap    : '1rem',
		width : 600,
		height : 600,

  }

	const thumbsOptions = {
    type        : 'slide',
    rewind      : true,
    gap         : '1rem',
    pagination  : false,
    fixedWidth  : 100,
    fixedHeight : 100,
    cover       : true,
    focus       : 'center' as const,
		trimSpace: true,
    isNavigation: true,
    updateOnMove: true,
  };

	onMount( () => {
	
    if ( main && thumbs ) {
      main.sync( thumbs.splide );
			console.log( main.splide );
    }
  } );
</script>



<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="text-center flex flex-col items-center">

		<Splide bind:this={ main }  options={options}>
			{ #each slides as slide }
					<SplideSlide>
						<img src={ slide.src } alt={ slide.alt }>
					</SplideSlide>
				{ /each }
		</Splide>

		<Splide on:click={e => { console.log( e.detail ) }} options={ thumbsOptions } bind:this={ thumbs }>
    { #each slides as slide }
      <SplideSlide data="boss">
        <img src={ slide.src } alt={ slide.alt }>
      </SplideSlide>
    { /each }
  </Splide>
	
	</div>
</div>

<style lang="postcss">
	
</style>
