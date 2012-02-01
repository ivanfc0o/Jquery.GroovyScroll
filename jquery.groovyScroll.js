(function($){
  // Name
  // ---------------------------------|
  // ---------------------------------|
  var name = "groovyScroll";
       // Change speed
       $[name] = function(o,v){ if(o=="speed"){ window.groovys_speed = v||50; } else { return false; }}
       $.fn[name] = function(data){
         var data = data||{};
         var width = data.width||false;
         var height = data.height||false;
         var type_ = data.type||0;
             window.groovys_speed = data.speed||50;
           // Functions
          // ---------------------------------|
         // ----------------------------------|
         var fns = {
           // Add scroll buttons
          // ---------------------------------|
         // ----------------------------------|
            addButtons: function(options){
              var options = options||false;
              var div = $("#"+options.id);
              var div_around = document.createElement("div");
                  div_around.id = "around_"+options.id; div_around = $(div_around);
              // Fix elements position
              var extendsCss = {
                    width: div.css("width"), 
                    height: div.css("height"),
                    position: div.css("position"),
                    float: div.css("float"),
                    top: div.css("top"),
                    right: div.css("right"),
                    left: div.css("left"),
                    bottom: div.css("bottom")
                  }; div_around.css(extendsCss); div.wrap(div_around);
              var data = {
                up: { "data-div": options.id,"data-direction": "up" },
                down: { "data-div": options.id,"data-direction": "down" }
              };
              var up = document.createElement('a'); up = $(up);
                  up.text("Up").attr(data.up).addClass("groovys_btn_up");
              var down = document.createElement('a'); down = $(down);
                  down.text("Down").attr(data.down).addClass("groovys_btn_down");
              switch (options.type) {
                case 1:
                    div.after(down);
                    div.before(up); break;
                case 2:
                    div.after(up);
                    div.after(down); break;
                default:
                    div.before(up);
                    div.before(down);
              }
                return {up: up, down: down};
            },
           // Scroll up
          // ---------------------------------|
         // ----------------------------------|
            move: function(){
              var _this = $(this);
              var fly = function(id){ return $("#"+id); };
              var info = {div: _this.data("div"), dir: _this.data("direction")}
              var div_data = { scroll: fly(info.div).scrollTop() };
              var speed = window.groovys_speed;
                  switch (info.dir){
                    case "down":
                      fly(info.div).animate({scrollTop: div_data.scroll+speed});
                      break;
                    default:
                      fly(info.div).animate({scrollTop: div_data.scroll-speed});
                  }
            }
         }
         // Plugin
         this.each(function(){
               if(width){ $(this).css("width", width); }
               if(height){ $(this).css("height", height); }
               var css = {"overflow":"hidden"};
               $(this).css(css);
           var div_id = $(this).attr("id")||"temp_groovyScroll"+Math.floor(Math.random()*69);
               $(this).attr("id",div_id);
               $(this).scrollTop(1);
               if($(this).scrollTop()==0){return false; } else { $(this).scrollTop(10); }
           var btns = fns.addButtons({id:div_id, type:type_});
               btns.up.on("click", fns.move);
               btns.down.on("click", fns.move);
             });
       };
})(jQuery)