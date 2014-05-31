<script type="text/x-handlebars">
  
    <ul class="ui inverted menu">
        {{#link-to 'index' tagName="li" class="item"}}Home{{/link-to}}
        {{#link-to 'register' tagName="li" class="item"}}Sign Up{{/link-to}}
        {{#link-to 'login' tagName="li" class="item"}}Log In{{/link-to}}
        {{#link-to 'items' tagName="li" class="item"}}Items{{/link-to}}
        {{#link-to 'account' tagName="li" class="item"}}Account{{/link-to}}
    </ul>

    {{outlet}}
</script>