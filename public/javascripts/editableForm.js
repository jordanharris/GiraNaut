$.fn.editable.defaults.mode = 'inline';
$.fn.editable.defaults.disabled = true;

$('#enable').click(function() {
    $('.editable').editable('toggleDisabled');
  }); 


$(document).ready(function() {
    $('#language, #interests, #bio, #specialties').editable({
    	validate: function(value) {
    	    if($.trim(value) === '') return 'This field is required';
    	}
    });
    $('#age').editable({
    	combodate:{
    		minYear: 1940,
    		maxYear: 1997
    	},
    	validate: function(value) {
    	    if($.trim(value) === '') return 'This field is required';
    	}
    })


});