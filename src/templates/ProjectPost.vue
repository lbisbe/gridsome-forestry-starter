<template>
  <Layout>
   <ClientOnly>
      <full-page ref="fullpage" :options="options" id="fullpage">
        <div class="section">
        <div style=" width: 100vw; height:100vh; z-index: 10"></div>
       <div> 
<iframe  class="start-video" :src="$page.post.main_initial_video" width="640" height="564" frameborder="0" allow="autoplay; fullscreen; muted" ></iframe>
<div class="recuadre-info-projecte" :style="MainTitle">
  <h1>{{$page.post.title}}.</h1>
                <p class="project-description" v-html="$page.post.description" />

</div>
        </div>
        </div>
        <div class="section">

<div class="nav-fullpage" v-for="(section, index) in $page.post.section" :key="index">

<div v-if="section.template.localizacio === 'final-resoult'">
<h3>Final resoult</h3>
      <!-- <p class="project-title" v-if="section.template.title" v-html="section.template.title"></p> -->
<div class="amagat" :style="MainTitle"></div>

<div v-if-else="section.template.localizacio === 'process'">
<h3>Process</h3>
      <!-- <p class="project-title" v-if="section.template.title" v-html="section.template.title"></p> -->
<div class="amagat" :style="MainTitle"></div>
</div>
</div>
        </div>
        </div>
      </full-page>
    </ClientOnly>
    <div class="project">

      <div class="container">

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
    main_initial_video
    project_fg_color
    description
    section {
      template {
        title
        galeria
        video
        localizacio
      }
    }
  
  }
}
</page-query>

<script>


export default  {
computed: {
    MainTitle() {
      return {
        '--bg-color': this.$page.post.project_bg_color,
      }
    }
  },
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
        style: `color: ${this.$page.post.project_fg_color ? this.$page.post.project_fg_color : 'var(--color-contrast)'}`
      }
    }
  },
   beforeMount(){
             console.log(this.$page.post.section[1].template.localizacio);
             console.log('Video'+ this.$page.post.project_fg_color);

   }

}
           

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400&display=swap');
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
.section{
  height: 100vh !important;
}
.fp-tableCell{
  height: 100vh !important;
}
.start-video{
position: absolute;
filter: blur(5px);
top: 0;
width: 100vw;
height: 100vh;
transform: scale(1.05);
/* z-index: -2; */
}

.recuadre-info-projecte{
width: 40vw;
  background-color: var(--bg-color);
  border-radius: 30px;
  position: absolute;
  bottom: 5%;
  left: 5%;
  padding: 20px 50px;
}

.recuadre-info-projecte h1{
  color: white;
  font-family: 'Cantata One';
  font-size: 100pt;
  margin: 20px;
}
.recuadre-info-projecte p{
  color: white;
  font-family: 'Lato';
  font-size: 10pt;
  padding: 0px;
  margin: 20px;
}
.nav-fullpage .amagat{
  height: 3px;
  width: 30px;
  background-color: var(--bg-color);
}
</style>
