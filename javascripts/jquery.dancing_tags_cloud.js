/**
 * Dancing tags cloud is a jQuery plugin that allow create cloud with dancing tags.
 *
 * @name Dancing tags cloud
 * @version 0.5
 * @requires jQuery and jQuery.ui
 * @author Eugene Ilyin
 *
 */
(function ($) {

  dancing_tags_cloud = {

    speed : 200,
    tags : [],

    getRand : function(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },

    move : function() {
      jQuery(dancing_tags_cloud.tags).each(function () {
        var $elem = jQuery(this['elem']);
        var ml = this['left'] + dancing_tags_cloud.getRand(-3, 3);
        var mt = this['top'] + dancing_tags_cloud.getRand(-3, 3);

        $elem.animate({
          'left': ml + 'px',
          'top': mt + 'px'
        }, {
          complete: dancing_tags_cloud.move,
          duration: dancing_tags_cloud.speed,
          easing: 'easeOutSine'
        });
      });
    }
  }

  $.fn.dancing_tags_cloud = function(tags, speed) {
    if (speed) {
      dancing_tags_cloud.speed = speed;
    }
    var $container = $(this);
    var containerWidth = $container.innerWidth();
    var container_position = $container.offset();

    var topIndent = 20;
    var bottomIndent = 20;
    var leftIndent = 20;
    var tagMaxHeight = 0;

    var raw_tags = [];
    var html_tags = [{tags : [], width : leftIndent}];
    var j = 0;

    // Appending raw tags.
    for (i = 0; i < tags.length; i++) {
      var background = tags[i]['color'] != undefined ? 'style="background-color: ' + tags[i]['color'] +  ';"' : '';
      var tag = '<div class="dancing-tag"' + background + '>' + tags[i].html + ' </div>';
      raw_tags[i] = {elem : jQuery(tag).appendTo($container)};
    }

    // Process tags.
    for (i = 0; i < raw_tags.length; i++) {
      var $elem = jQuery(raw_tags[i]['elem']);
      var cur_width = $elem.outerWidth();

      var tagLeft = container_position.left + leftIndent;
      var tagTop = container_position.top + topIndent;

      // Filling array with tags.
      html_tags[j]['tags'][html_tags[j]['tags'].length] = {
        elem : $elem,
        top : tagTop,
        left : tagLeft
      };
      html_tags[j]['width'] += $elem.outerWidth() + Math.floor($elem.outerWidth() / 5);

      // Increase left indent for next tags
      leftIndent += cur_width + Math.floor(cur_width / 5);

      // Check place for the next tag.
      var next_tag_width = (raw_tags[i + 1] != undefined) ? jQuery(raw_tags[i + 1]['elem']).width() : 0;
      var required_place = Math.floor(next_tag_width / 5) + next_tag_width + Math.floor(next_tag_width / 5);
      // Next row.
      if (leftIndent > (containerWidth - required_place)) {
        // Reset left indent.
        leftIndent = 10;
        // Increase top indent.
        topIndent += Math.floor($elem.outerHeight() * 1.5);
        tagMaxHeight = 0;

        // New row in tags array.
        j++;
        html_tags[j] = {tags : [], width : leftIndent};
      }

      // Calculate max tag height in the last row, for specify container height.
      tagMaxHeight = $elem.height() > tagMaxHeight ? $elem.outerHeight() : tagMaxHeight;
    }

    // Justify tags on the center.
    var final_tags = [];
    for (j = 0; j < html_tags.length; j++) {
      var free = containerWidth - html_tags[j]['width'];
      if (free > 2) {
        var free = Math.floor(free / 2);
        for (i = 0; i < html_tags[j]['tags'].length; i++) {
          var k = final_tags.length;
          final_tags[k] = html_tags[j]['tags'][i];
          final_tags[k]['left'] += free;
          // Set initial position.
          final_tags[k]['elem'].offset({top : final_tags[k]['top'], left : final_tags[k]['left']});
        }
      }
    }

    $container.css('min-height', topIndent + tagMaxHeight + bottomIndent + 'px');

    dancing_tags_cloud.tags = final_tags;

    dancing_tags_cloud.move();
  }
})(jQuery);
