/*
adapted from jquery ui example

SwingJS[1] options include:

    id          id to report
    n           number of visible fields
    readonly    no input focus; no editing
    actionListener  function to call on ENTER or select as f(id, this, "selected" or "enterPressed",  this.value)

SwingJS[2] ensure caret is not left in box after selection if readOnly

SwingJS[3] do not remove entered value if invalid

SwingJS[4] match only starting points using regex '^'

SwingJS[5] Tooltips removed
         
SwingJS[6] ENTER action accepted for any value


 */


	(function( $ ) {

  
		$.widget( "custom.swingjs_combobox", {
			_create: function() {

// SwingJS[1]
            
      this.n  = this.options.n || (this.options.n = 5);
      this.readOnly = this.options.readOnly;
      this.actionListener = this.options.actionListener || null;
      
      this.id = this.options.id || "<noid>";      
            
            
				this.wrapper = $( "<div>" )
          .insertAfter( this.element )
          .addClass( "custom-swingjs_combobox" );
     
                    
				this.element.hide();
				this._createAutocomplete();
				this._createShowAllButton();
			},

			_createAutocomplete: function() {
				var selected = this.element.children( ":selected" ),
					value = selected.val() ? selected.text() : "";

        var self = this;
        
				this.input = $( "<input>" )
					.appendTo( this.wrapper )
					.val( value )
					.attr( "title", "" )
					.addClass( "custom-swingjs_combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left" )
					.autocomplete({
						delay: 0,
						minLength: 0,
						source: $.proxy( this, "_source" )
					})
          .keypress(function(event){
// SwingJS[6]          
            if(event.which == 13 && self.actionListener) {
              self.input.data("autocomplete").widget().hide();
              self.actionListener(self.id, self, "enterPressed", self.input.val());
              
            }
          });

//SwingJS[1]

        if (this.readOnly)
          this.input.attr("readOnly",true);
          
        this.input.data("autocomplete").widget().css({height:(this.n*1.67) + "em"})
        
//SwingJS[5]

  //					.tooltip({
	//					tooltipClass: "ui-state-highlight"
  //			})

        var al = this.actionListener
        
				this._on( this.input, {
					autocompleteselect: function( event, ui ) {
						ui.item.option.selected = true;
						this._trigger( "select", event, {
							item: ui.item.option
						});

// SwingJS[1]
            if (al) {
              al(self.id, self, "selected", ui.item.option.text);
            }
      
// SwingJS[2]
						if (this.readOnly) 
              this.input.blur()
            
					},

// SwingJS[2]
          focus: function(){if (this.readOnly){this.input.blur()}},
					autocompletechange: "_removeIfInvalid"
				});
			},

			_createShowAllButton: function() {
				var input = this.input,
					wasOpen = false;

				this.btn = $( "<a>" )
					.attr( "tabIndex", -1 )
					.attr( "title", "Show All Items" )
//					.tooltip()
					.appendTo( this.wrapper )
					.button({
						icons: {
							primary: "ui-icon-triangle-1-s"
						},
						text: false
					})
					.removeClass( "ui-corner-all" )
					.addClass( "custom-swingjs_combobox-toggle ui-corner-right" )
					.mousedown(function() {
						wasOpen = input.autocomplete( "widget" ).is( ":visible" );
					})
					.click(function() {
              input.focus();

						// Close if already visible
						if ( wasOpen ) {
							return;
						}

						// Pass empty string as value to search for, displaying all results
						input.autocomplete( "search", "" );
					});
			},

			_source: function( request, response ) {

// SwingJS[4] 
				var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex(request.term), "i" );
				response( this.element.children( "option" ).map(function() {
					var text = $( this ).text();
					if ( this.value && ( !request.term || matcher.test(text) ) )
						return {
							label: text,
							value: text,
							option: this
						};
				}) );
			},

			_removeIfInvalid: function( event, ui ) {

          
// SwingJS[3]

				// Selected an item, nothing to do
				if ( ui.item ) {
					return;
				}

				// Search for a match (case-insensitive)
				var value = this.input.val(),
					valueLowerCase = value.toLowerCase(),
					valid = false;
				this.element.children( "option" ).each(function() {
					if ( $( this ).text().toLowerCase() === valueLowerCase ) {
						this.selected = valid = true;
						return false;
					}
				});

				// Found a match, nothing to do
				if ( valid ) {
					return;
				}

          
// SwingJS[3]
/*
				// Remove invalid value
				this.input
					.val( "" );
					.attr( "title", value + " didn't match any item" )
					.tooltip( "open" );

				this.element.val( "" );

				this._delay(function() {
					this.input.tooltip( "close" ).attr( "title", "" );
				}, 2500 );
        
				this.input.autocomplete( "instance" ).term = "";
*/
			},
			_destroy: function() {
				this.wrapper.remove();
				this.element.show();
			}
		});
	})( jQuery );
