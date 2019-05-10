// Create a closure
(function(){
    // Your base, I'm in it!
    var originalAddClassMethod = jQuery.fn.addClass;

    jQuery.fn.addClass = function(){
        // Execute the original method.
        var result = originalAddClassMethod.apply( this, arguments );

        // trigger a custom event
        jQuery(this).trigger('activeAdded');

        // return the original result
        return result;
    }
})();

// Create a closure
(function(){
    // Your base, I'm in it!
    var originalRemoveClassMethod = jQuery.fn.removeClass;

    jQuery.fn.removeClass = function(){
        // Execute the original method.
        var result = originalRemoveClassMethod.apply( this, arguments );

        // trigger a custom event
        jQuery(this).trigger('activeRemoved');

        // return the original result
        return result;
    }
})();

// document ready function
$(function(){
  for (let index = 1; index < 5; index++) {
    $("#steps-activator-" + index).bind('activeAdded', function(){ 
      $("#steps-item-" + index).addClass("active-step");
    });
    $("#steps-activator-" + index).bind('activeRemoved', function(){ 
      $("#steps-item-" + index).removeClass("active-step");
    });
  }
});