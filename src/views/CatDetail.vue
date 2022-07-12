<template>
  <div id="cat-detail" class="container">
    <b-card title="" header-tag="header" footer-tag="footer" no-body>
      <template #header>
        <b-button :to="`/cats`" variant="primary">
          Back
        </b-button>
      </template>

      <img src="https://cdn2.thecatapi.com/images/xnzzM6MBI.jpg" alt="" class="card-img">

      <div class="card-body">
        <h4>Abyssinian</h4>
        <h5>Origin: Egypt</h5>
        <h6>Active, Energetic, Independent, Intelligent, Gentle</h6>
        <p>The Abyssinian is easy to care for, and a joy to have in your home. They’re affectionate cats and love both
          people and other animals.</p>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  setup(props) {},
}
</script>

<style scoped>
#cat-detail {
  padding: 20px 0;
}
</style>