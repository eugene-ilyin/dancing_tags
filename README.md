Dancing tags cloud is a jQuery plugin that allow create cloud with dancing tags.

It can be usually for tags, or other elements which you want to highlight.

It's very easy use it

1. Create container. For example: <div class="container" style="width: 300px;"></div>

2. Provide list of tags and call function dancing_tags_cloud from jQuery object:

```
jQuery(function($) {
    var tags = [
        {html : '<a href="https://plus.google.com" target="_blank" style="color: white;">Google+</a>', color : '#d34836'},
        {html : '<span style="color: white;">Facebook</span>', color : '#3b5998'},
        {html : '<span style="color: white;">LinkedIn</span>', color : '#007bb6'},
        {html : '<span style="color: white;">Instagram</span>', color : '#517fa4'},
        {html : '<span style="color: white;">Vkontakte</span>', color : '#45668e'},
        {html : '<a href="https://twitter.com" target="_blank" style="color: white;">Twitter</a>', color : '#00aced'},
        {html : '<span style="color: white;">Foursquare</span>', color : '#0072b1'},
        {html : 'Default color example'},
        {html : '<a href="https://youtube.com" target="_blank" style="color: white;">Youtube</a>', color : '#bb0000'},
        {html : '<span style="color: white;">Pinterest</span>', color : '#cb2027'},
        {html : '<span style="color: white;">Quora</span>', color : '#a82400'},
        {html : '<span style="color: white;">Vine</span>', color : '#00bf8f'}
    ];

    $('.container').dancing_tags_cloud(tags, 200);
});
```

You can specify html content and background color for tag. Also you can specify speed of moving tags.
Html is required attribute, but you can skip color.