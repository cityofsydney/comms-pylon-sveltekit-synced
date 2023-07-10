<script lang="ts">
 import { getContext } from 'svelte';
import { generateSlides } from '$lib';
import { Splide, SplideSlide } from '@splidejs/svelte-splide';
import '@splidejs/svelte-splide/css';
import { onMount } from 'svelte';


// Retrieve user store from context
const events = getContext('events');

//console.log($events)

let main: Splide;
let thumbs: SplideSlide;

  const options = {
    type: 'fade',
		speed: 300,
    perPage: 1,
		rewind      : false,
		autoplay: true,
		arrows: false,
		perMove   : 1,
		pagination: false,
    gap    : '1rem',
		width : 800,
    height: 800,
  }

	const thumbsOptions = {
    type        : 'loop',
    rewind      : false,
    gap         : '1rem',
    pagination  : false,
		width : 800,
    perMove: 1,
    fixedWidth  : 180,
    fixedHeight : 180,
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


<div class="container h-full mx-auto flex justify-center items-center">
	<div class="flex flex-col items-center ">

		<Splide on:click={e => { console.log( e.detail ) }} options={ thumbsOptions } bind:this={ thumbs }>
    {#each $events as slide }
      <SplideSlide data="boss">
        <img src={ slide.src } alt={ slide.alt }>
      </SplideSlide>
    { /each }
  </Splide>

		<Splide bind:this={ main }  options={options}>
			{ #each $events as slide }
					<SplideSlide>
						<img src={ slide.src } alt={ slide.alt }>
					</SplideSlide>
				{ /each }
		</Splide>


	
	</div>
</div>

<style lang="postcss">
	
</style>
