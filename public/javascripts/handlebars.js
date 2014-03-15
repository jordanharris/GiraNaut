<script id="#guideBioCard" type="text/x-handlebars-template")
  <div class="row">
    <div class="guideInnerCard col-md-12">
      <div class="guideBioImage">
        <img src={{picture}}>
      </div>
      <h2>{{name}}</h2>
      <div class="scrolling">
        <p><span>Age:</span> {{age}}</p>
        <p><span>Languages:</span> {{language}}</p>
        <p><span>Favorite City Landmarks:</span> {{landmarks}}</p>
        <p><span>Bio:</span> {{bio}}</p>
      </div>  
      <button class="btn btn-info guideChatButton" id={{userid}} >Chat With Guide</button>
    </div>
  </div>
</script>    
