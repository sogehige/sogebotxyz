<header id="banner" class="wrapper">
  <div class="inner">
    <h2 id="banner-title">{{ page.subtitle }}</h2>
    <div id="banner-start">
      <span id="banner-start-command">https://github.com/sogehige/sogeBot/releases</span><a id="banner-start-link" href="https://github.com/sogehige/sogeBot/releases"><i class="fa fa-download"></i></a>
    </div>
    <div id="banner-share">{{ partial('partial/share') }}</div>
  </div>
</header>
<div id="intro-news-list">
  <div class="wrapper">
    <div class="inner">
      <div id="intro-news-flex">
        {% set posts = site.posts.sort('-date'). %}
        {% for post in posts.slice('0', '4') %}
        <a href="{{ url_for(post.path) }}" class="intro-news-wrap">
          <div class="intro-news-time">{{ time_tag(post.date) }}</div>
          <div class="intro-news-title">{{ truncate(post.title, {length: 120, separator: ' '}) }}</div>
        </a>
        {% endfor %}
      </div>
    </div>
  </div>
</div>
<div id="content-wrap">
  <div class="wrapper">
    <div class="inner">
      {{ page.content }}
      <ul id="intro-cmd-wrap">
        <li class="intro-cmd-item">git clone git@github.com:sogehige/sogeBot-docker.git sogebot</li>
        <li class="intro-cmd-item">cd sogebot</li>
        <li class="intro-cmd-item">docker-compose up -d</li>
      </ul>
      <div id="intro-get-started-wrap">
        <a href="http://docs.sogebot.xyz" id="intro-get-started-link">{{ __('index.get_started') }}</a>
      </div>
    </div>
  </div>
</div>
