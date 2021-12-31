<template>
  <Layout>

    <ClientOnly>

      <full-page ref="fullpage" :options="options" id="fullpage">
        <div class="section">
          <div style=" width: 100vw; height:100vh; z-index: 10"></div>
          <div>
            <iframe class="start-video" :src="$page.post.main_initial_video" width="640" height="564" frameborder="0"
              allow="autoplay; fullscreen; muted"></iframe>
            <div class="recuadre-info-projecte" :style="MainTitle">
              <h1>{{$page.post.title}}.</h1>
              <p class="project-description" v-html="$page.post.description" />

            </div>
          </div>
        </div>
        <b-container class="section w-100 mw-100" v-for="(section, index) in $page.post.section" :key="index"
          fluid="xl">


          <b-row>
            <!-- MENU LATERAL -->
            <b-col cols="3" class="menu_projecte">
              <h2>Final Resoult</h2>
              <div v-for="(menusection, s) in $page.post.section" :key="s">
                <b-row class="menu-item" v-if="menusection.template.localizacio === 'final-resoult'" @click="fullpage_api.moveTo(2);">
                 <div class="amagat" :style="MainTitle"></div>
                  <h4 v-if="menusection.template.title" v-html="menusection.template.title"></h4>
                  <div class="amagatsegon" :style="MainTitle"></div>
                </b-row>
              </div>
              <h2>Process</h2>
              <div v-for="(menusection, s) in $page.post.section" :key="s">
                <b-row class="menu-item" v-if="menusection.template.localizacio === 'process'">
                 <div class="amagat" :style="MainTitle"></div>
                  <h4 v-if="menusection.template.title" v-html="menusection.template.title"></h4>
                  <div class="amagatsegon" :style="MainTitle"></div>
                </b-row>
              </div>
            </b-col>
            <!-- CONTINGUT -->
<!--  -->
            <b-col cols="9">
              <!-- si es un video -->
              <div class="video-div" v-if="section.template.visualization === 'video'">
                <iframe class="section-video" :src="section.template.video" width="640" height="564" frameborder="0"
                  allow="autoplay; fullscreen; muted"></iframe>

              </div>
              <!-- si es una galaria de fotos -->
              <b-container>
                <b-row class="gallery-div" v-if="section.template.visualization === 'gallery'">
                  <b-col cols="4" class="galeria-img-individaul" v-for="(foto, i) in section.template.galeria" :key="i">

                    <img :src="foto.src">
                  </b-col>
                </b-row>
              </b-container>
            </b-col>
          </b-row>
          </b-container>

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

          <!-- <div class="nav-fullpage">

<div v-if="section.template.localizacio === 'final-resoult'">
<h3>Final resoult</h3>
<div class="amagat" :style="MainTitle"></div>

<div v-if-else="section.template.localizacio === 'process'">
<h3>Process</h3>
       <p class="project-title" v-if="section.template.title" v-html="section.template.title"></p> 
<div class="amagat" :style="MainTitle"></div>
</div>
</div>
        </div> -->

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
        visualization
        id
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
             console.log(this.$page.post.section[1].template);
             console.log('Video'+ this.$page.post.section[0].template);

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
 .amagat{
  height: 3px;
  width: 40px;
  background-color: var(--bg-color);
  transition: ease-in-out .2s;
}
 .amagatsegon{
  height: 0px;
  width: 0px;
  background-color: var(--bg-color);
    transition: ease-in-out .2s;

}
iframe.section-video::after  {
box-shadow: 4px 4px 16px 0px rgba(0,0,0,0.25);
transform: scale(1.5);
}
/* .video-div{
  width: 100%;
  height: 100%;

} */
.gallery-div{
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: left;
  align-items: center;
  max-height: 100vh;
}
.galeria-img-individaul img{
  width: 100%;
-webkit-box-shadow: 1px 1px 12px -2px rgba(140,140,140,0.83); 
box-shadow: 1px 1px 12px -2px rgba(140,140,140,0.83);
border-radius: 5px;
}
.galeria-img-individaul{
  margin: 10px 0px;
 
}
.menu-item{
  align-items: center;

}
.menu-item h4{
  width: auto !important;
  opacity: 0;
  /* transition: ease-in-out .2s; */
}
.menu-item:hover > h4{
  opacity: 1;
}
.menu-item:hover{
 cursor: pointer;
}
.menu-item:hover > .amagat{
 width: 60px;
}
.menu-item:hover > .amagatsegon{
 width: 30px;
 height: 3px;
}
.menu_projecte{
  display: flex;
  flex-direction: column;
 justify-content: center;
}
.player .vp-target {
  border: solid red !important;
}

</style>
