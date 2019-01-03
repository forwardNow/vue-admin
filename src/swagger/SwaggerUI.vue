<template>
  <div id="swagger-ui"></div>
</template>
<script>
  import SwaggerUIBundle from 'swagger-ui'
  import 'swagger-ui/dist/swagger-ui.css'

  export default {
    mounted() {
      SwaggerUIBundle({
        url: '/swagger/sys.yaml',
        dom_id: '#swagger-ui',
        deepLinking: false,
        presets: [
          SwaggerUIBundle.presets.apis
        ],
        plugins: [
          SwaggerUIBundle.plugins.DownloadUrl
        ]
      })
    }
  }
</script>