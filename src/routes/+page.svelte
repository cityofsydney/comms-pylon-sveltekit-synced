<script lang="ts">
 import { getContext } from 'svelte';
import { generateSlides } from '$lib';
import { Splide, SplideSlide } from '@splidejs/svelte-splide';
import '@splidejs/svelte-splide/css';
//import '@splidejs/svelte-splide/css/sea-green';
import { onMount } from 'svelte';

import QRCode from 'qrcode';


const generateQR = slug => {
  let whatsOnUrl =
          `https://whatson.cityofsydney.nsw.gov.au/events/${slug}?utm_medium=outdoor&utm_source=qms-touch&utm_campaign=whatson`;

  // With promises
  QRCode.toDataURL('I am a pony!')
    .then(url => {
      console.log(url)
        return `<img src="${url}" alt loading="lazy" />` 
    })
    .catch(err => {
      console.error(err)
    })

}

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
					<SplideSlide class="rounded relative">
          <div class="w-full h-[50%] block absolute left-0 top-0 bg-gradient-to-t from-transparent to-black" />
          <div class="absolute top-0 p-12 w-full flex flex-col">
            <h1 class="text-white font-heading text-6xl leading-tight mb-5">{slide.name}</h1>
            ---
           <img src="{QRCode.toDataURL('I am a pony!', function (err, url) {return url})}" />
            ---

          </div>
						<img src={ slide.tileImageCloudinary[0].secure_url } alt={ slide.name } class="object-cover" >
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
