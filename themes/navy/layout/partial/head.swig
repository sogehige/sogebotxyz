<head prefix="og: http://ogp.me/ns#">
  <meta charset="utf-8">
  <title>{% if page.title %}{{ page.title }} | {% endif %}{{ config.title }}</title>
  <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- Canonical links -->
  <link rel="canonical" href="{{ url }}">
  <!-- Alternative links -->
  {% if page.layout == 'page' or page.layout == 'index' %}
    {% for lang in site.data.languages %}
      <link rel="alternative" hreflang="{{ loop.key }}" href="{{ canonical_url(loop.key) }}">
    {% endfor %}
  {% endif %}
  <!-- Icon -->
  <link rel="icon" type="image/png" href="{{ url_for('icon/favicon-32x32.png') }}">
  <!-- CSS -->
  <!-- build:css build/css/navy.css -->
  {{ css('css/navy') }}
  <!-- endbuild -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/typeface-lato@0.0.75/index.min.css">
  <!-- RSS -->
  {{ feed_tag('atom.xml') }}
  <!-- Open Graph -->
  {{ open_graph({
    image: 'images/sogebot_large.png',
    fb_admins: config.fb_admins,
    twitter_site: config.twitter
  }) }}
  <!-- Google Analytics -->
  {{ partial('google_analytics') }}
  <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
  <script>
     (adsbygoogle = window.adsbygoogle || []).push({
          google_ad_client: "ca-pub-6482217598104186",
          enable_page_level_ads: true
     });
  </script>
  <style>
    {{fa_css()}}
  </style>
  <script src="https://use.fontawesome.com/releases/v5.12.1/js/all.js" data-auto-replace-svg="nest"></script>
</head>
