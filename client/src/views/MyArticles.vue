<template>
  <div class="container">
    <div class="container">
      <div v-if="articles.length === 0" class="centered-item">
        <img style="border: none; max-width: 400px" class="has-margin-t-2" :src='image' title='' />
        <div class="t-standard has-margin-t-2">No articles.</div>
      </div>
      <Article v-for="article in articles" :key="article._id" class="columns" :article="article"></Article>
    </div>
  </div>
</template>

<script>
import axios from '../../helpers/axios'
import Article from '../components/Article'
import FeaturedArticle from '../components/FeaturedArticle'

export default {
  name: 'Articles',
  components: {
    Article,
    FeaturedArticle
  },
  props: {
    isDark: Boolean
  },
  data () {
    return {
      articles: [],
      image: ''
    }
  },
  methods: {
    getArticles () {
      console.log('get articles')
      const loadingComponent = this.$buefy.loading.open()
      axios.get(`/articles?user=${localStorage.getItem('_id')}`, {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data)
          loadingComponent.close()
          this.articles = data
        })
        .catch(err => {
          loadingComponent.close()
          this.$emit('alert', err)
        })
    }
  },
  created () {
    this.getArticles()
    if(this.isDark) {
      this.image = 'https://svgshare.com/i/G4Q.svg'
    } else {
      this.image = 'https://svgshare.com/i/G4a.svg'
    }
  },
  watch: {
    isDark () {
      if(this.isDark) {
        this.image = 'https://svgshare.com/i/G4Q.svg'
      } else {
        this.image = 'https://svgshare.com/i/G4a.svg'
      }
    }
  }
}
</script>

<style scoped>
.container {
  width: 70% !important;
  margin-top: 20px;
}
.title {
  font-size: 23px;
}
img {
  border-left: solid 3px var(--primary-color);
}
@media only screen and (max-width: 600px) {
  .container {
    width: 90% !important;
  }
}
</style>