// https://www.tiny.cloud/docs/tinymce/6/vite-es6-npm/

/* Import TinyMCE */
import 'tinymce/tinymce.min.js';

/* Default icons are required. After that, import custom icons if applicable */
import 'tinymce/icons/default/icons.min.js';

/* Required TinyMCE components */
import 'tinymce/themes/silver/theme.min.js';
import 'tinymce/models/dom/model.min.js';

/* Import a skin (can be a custom skin instead of the default) */
import 'tinymce/skins/ui/oxide/skin.js';

/* Import plugins */
import 'tinymce/plugins/accordion'; //accordion
import 'tinymce/plugins/advlist'; //Advanced list
import 'tinymce/plugins/anchor'; //anchor
import 'tinymce/plugins/autolink'; //automatic link
// import 'tinymce/plugins/autoresize'; //The editor is highly adaptive. Note: When this plug-in is introduced in plugins, the height set in Init will be invalid.
import 'tinymce/plugins/autosave'; //Automatically save manuscripts
import 'tinymce/plugins/charmap'; //Special characters
import 'tinymce/plugins/code'; //Edit source code
import 'tinymce/plugins/emoticons';
import 'tinymce/plugins/emoticons/js/emojis';
import 'tinymce/plugins/codesample'; //code example
import 'tinymce/plugins/directionality'; //text direction
import 'tinymce/plugins/fullscreen'; //full screen
import 'tinymce/plugins/help'; //help
import 'tinymce/plugins/image'; //Insert editing picture
import 'tinymce/plugins/importcss'; //Introduce css
import 'tinymce/plugins/insertdatetime'; //Insert date time

import 'tinymce/plugins/link'; //Hyperlink
import 'tinymce/plugins/lists'; //List plugin
import 'tinymce/plugins/media'; //Media
import 'tinymce/plugins/nonbreaking'; //Insert non-breaking spaces
import 'tinymce/plugins/pagebreak'; //Insert page break
import 'tinymce/plugins/preview'; //Preview
import 'tinymce/plugins/quickbars';
import 'tinymce/plugins/save'; //Save
import 'tinymce/plugins/searchreplace'; //Find and replace
import 'tinymce/plugins/table'; //Table
import 'tinymce/plugins/visualblocks'; //Show element range
import 'tinymce/plugins/visualchars'; //Show invisible characters
import 'tinymce/plugins/wordcount'; //Count

import 'tinymce/plugins/help/js/i18n/keynav/zh_CN.js';
import 'tinymce/plugins/help/js/i18n/keynav/en.js';
