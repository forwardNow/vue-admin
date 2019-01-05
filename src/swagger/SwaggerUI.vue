<template>
  <div id="swagger-ui"></div>
</template>
<script>
  import { YAML } from 'swagger-parser';
  import SwaggerUIBundle from 'swagger-ui'
  import 'swagger-ui/dist/swagger-ui.css'

  import spec from './sys.yaml';

  // console.log(spec)
  // console.log(YAML.parse(spec))


  export default {
    mounted() {
      SwaggerUIBundle({
        spec: YAML.parse(spec),
        // url: '/swagger/sys.yaml',
        dom_id: '#swagger-ui',
        deepLinking: false,
        presets: [
          SwaggerUIBundle.presets.apis
        ],
      })
    }
  }
</script>
<style>
  code {
    padding: 2px 4px;
    border-radius: 4px;
    color: #c7254e;
    background-color: #f9f2f4;
  }
</style>