<script type="text/x-handlebars" id="account">
    {{#if isAuthenticated}}
        <h3>Logged In</h3>
    {{else}}
        <h3>Not Logged In</h3>
    {{/if}}
        <h1>Hello {{booboo}} {{user.firstName}} {{user.lastName}}</h1>


          <div class="well">
            <pre>
                {{{json isAuthenticated}}}
            </pre>
          </div>
</script>