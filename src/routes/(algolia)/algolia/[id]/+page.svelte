<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;

    $: ({ post } = data);

    $: console.log(post);

</script>

<h1 class="h1">{post.title}</h1>
<p class="lead">{post.excerpt}</p>
<p>{post.details.closest_date}</p>
<img src="{post.thumbnails.thumbnail2.src}" alt="" loading="eager">

