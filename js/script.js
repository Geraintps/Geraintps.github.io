$(document).ready(function () {
  // $(window).bind('scroll', update);

  $('.img-parallax').each(function () {
    var img = $(this);
    var imgParent = $(this).parent();
    function parallaxImg() {
      var speed = img.data('speed');
      var imgY = imgParent.offset().top;
      var winY = $(this).scrollTop();
      var winH = $(this).height();
      var parentH = imgParent.innerHeight();


      // The next pixel to show on screen
      var winBottom = winY + winH;

      // If block is shown on screen
      if (winBottom > imgY && winY < imgY + parentH) {
        // Number of pixels shown after block appear
        var imgBottom = ((winBottom - imgY) * speed);
        // Max number of pixels until block disappear
        var imgTop = winH + parentH;
        // Porcentage between start showing until disappearing
        var imgPercent = ((imgBottom / imgTop) * 100) + (50 - (speed * 50));
      }
      img.css({
        top: imgPercent + '%',
        transform: 'translate(-50%, -' + imgPercent + '%)'
      });
    }
    $(document).on({
      scroll: function () {
        parallaxImg();
      }, ready: function () {
        parallaxImg();
      }
    });
  });

  var users = [
    { username: 'Example', fullname: 'Example User', id: 'TPC2JH3P' },
    { username: 'Test', fullname: 'Test User', id: 'JX8KANFP' },
    { username: 'Demo', fullname: 'Demo User', id: 'HBVEPHAR' }
  ];

  tinymce.init({
    selector: 'textarea#comment',
    plugins: 'link',
    setup: (editor) => {

      /* Fix for backspacing into links/tags */
      editor.on('NodeChange', function (e) {
        if (e.element.localName == 'a' && e.selectionChange == true && !editor.selection.getNode().nextSibling) {
          editor.selection.getNode().after(" ");
          editor.selection.select(editor.selection.getNode().nextSibling);
        }
      });

      const onAction = (autocompleteApi, rng, value) => {
        editor.selection.setRng(rng);
        editor.insertContent(value);
        autocompleteApi.hide();
      };

      const getMatchedChars = (pattern) => {
        return users.filter((char) => char.fullname.toLowerCase().indexOf(pattern.toLowerCase()) !== -1);
      };

      var lastChar = "";

      editor.on('input', async (e) => {
        // tinymce.activeEditor.execCommand('InsertText', false, " ");
        // tinymce.activeEditor.execCommand('Delete');
        $('#output').html(tinymce.activeEditor.getContent());
      });

      editor.ui.registry.addAutocompleter('specialchars_cardmenuitems', {
        ch: '-',
        minChars: 1,
        columns: 1,
        highlightOn: ['char_name'],
        onAction: onAction,
        fetch: (pattern) => {
          return new Promise((resolve) => {
            const results = getMatchedChars(pattern).map(char => ({
              type: 'cardmenuitem',
              value: "<a href='#" + char.id + "' target='_blank' rel='noopener' data-mce-href='#" + char.id + "' data-mce-selected='inline-boundary'>@" + char.username + "</a> ",
              label: char.fullname,
              items: [{
                type: 'cardcontainer',
                direction: 'vertical',
                items: [{
                  type: 'cardtext',
                  text: char.fullname,
                  name: 'char_name'
                },
                {
                  type: 'cardtext',
                  text: char.username,
                }
                ]
              }]
            }));
            resolve(results);
          });
        }
      });
    }
  });

  $("#btn").click(function () {
    var theContent = tinymce.activeEditor.getContent();
    $('#output').html(theContent);
    tinymce.activeEditor.execCommand('mceInsertContent', false, "@");
  });

});

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

var velocity = 0.5;

function update() {
  var pos = $(window).scrollTop();
  $('.new-paralax').each(function () {
    var $element = $(this);
    // subtract some from the height b/c of the padding
    var height = $element.height() - 18;
    $(this).css('backgroundPosition', '50% ' + Math.round((height - pos) * velocity) + 'px');
  });
};