$.fn.editable.defaults.mode = 'inline';
$.fn.editable.defaults.disabled = true;

$('#enable').click(function() {
    $('.editable').editable('toggleDisabled');
  }); 


$(document).ready(function() {
    $('#language, #landmarks, #bio, #age').editable({
    	validate: function(value) {
    	    if($.trim(value) === '') return 'This field is required';
    	},
    });

});