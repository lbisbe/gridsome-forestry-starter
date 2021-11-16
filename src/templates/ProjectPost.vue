<template>
  <Layout>
   <ClientOnly>
      <full-page ref="fullpage" :options="options" id="fullpage">
        <div class="info-projecte">First section ...</div>
        <div class="section">Second section ...</div>
      </full-page>
    </ClientOnly>
    <div class="project">

      <div class="container">
 <!-- <ClientOnly>
      <full-page ref="fullpage" :options="options" id="fullpage">
        <div class="section">First section ...</div>
        <div class="section">Second section ...</div>
      </full-page>
    </ClientOnly> -->
        <div class="project-header">
          <h1 class="project-title" v-html="$page.post.title" />
              <p class="project-description" v-html="$page.post.description" />

               <div class="sections" v-for="(section, index) in $page.post.section" :key="index">
            <p class="project-title" v-if="section.template.video" v-html="section.template.video" />
            
            </div>

          <!-- <h1 class="project-title" v-html="$page.post.section.template.video" /> -->

              <!-- <img v-bind:src="$page.post.section.template"> -->
          <!-- <div class="project-info">
<a :href="$page.post.section"  v-html="$page.post.section" ></a>

             <div class="categories-container">
              <div class="categories">
                <span class="label">Categories</span>
                <span 
                  class="category"
                  v-for="(category, index) in $page.post.categories" 
                  :key="index"
                  v-text="category"
                />
              </div>
            </div>

            <div class="year-container">
              <span class="label">Year</span>
              <div v-html="$page.post.date"/>
            </div>
          </div>
        </div>

        <div v-html="$page.post.content" class="content" /> 

      </div>-->

    </div> 
      </div>
    </div>
  </Layout>
</template>

<page-query>
query ProjectPost ($path: String!) {
  post: projectPost (path: $path) {
    title
    date (format: "YYYY")
    content
    categories
    project_bg_color
    project_fg_color
    description
    section {
      template {
        title
        galeria
        video
      }
    }
  }
}
</page-query>

<script>


//import 'fullpage.js/vendors/scrolloverflow' // Optional. When using scrollOverflow:true
//import './fullpage.scrollHorizontally.min' // Optional. When using fullpage extensions
// import VueFullPage from 'vue-fullpage.js'
// Vue.use(VueFullPage);
export default  {
   ready () {
    $(document).ready(function ($) {
	$('#fullpage').fullpage({
		//options here
		autoScrolling:true,
		scrollHorizontally: true
	});    })
  },
  metaInfo () {
    return {
       options: {
        navigation: true,       
      },
      title: this.$page.post.title,
      bodyAttrs: {
        style: `background-color: ${this.$page.post.project_bg_color ? this.$page.post.project_bg_color : 'var(--color-base)'}; color: ${this.$page.post.project_fg_color ? this.$page.post.project_fg_color : 'var(--color-contrast)'}`
      }
    }
  },
   beforeMount(){
             console.log(this.$page.post.section[0].template.video);

   }
}

</script>

<style scoped>
.project-header {
  padding: 20vh 0 4rem 0;
}
.project-title {
  font-size: 4rem;
  margin: 0 0 4rem 0;
  padding: 0;
}
.project-info {
  display: flex;
  flex-wrap: wrap;
  font-size: 0.8rem;
}
.project-info > div {
  margin-right: 4rem;
}
.project-info > div:last-of-type {
  margin: 0;
}
.category:after {
  content: ', '
}
.category:last-of-type:after {
  content: '';
}
</style>
