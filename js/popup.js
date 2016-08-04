
$(function () {
    chrome.tabs.getSelected(null, function(tab) {
      $.ajax({
        url: tab.url,
        type: "GET",
        dataType: "html",
        data: [],
        cache: false,
        success: function(html){
          current = $(html);

          dom_count = {};
          id_count = {};
          // 親を取得
          len = $(html).filter("*").length;
          dom = $(html).filter("*");
          // 子を取得
          len += $(html).find("*").length;
          dom_child = $(html).find("*");

          // 親と子をマージ
          $.merge(dom, dom_child);

          for(var i = 0; i < len; i++){
            if(!dom_count[dom[i].tagName]){
              dom_count[dom[i].tagName] = 1;
            }else{
              dom_count[dom[i].tagName] += 1;
            }

            if($(dom[i]).attr("id") === undefined){
              continue;
            }
            if(!id_count[$(dom[i]).attr("id")]){
              id_count[$(dom[i]).attr("id")] = 1;
            }else{
              id_count[$(dom[i]).attr("id")] += 1;
            }

          }

          tags = "";
          tag_ids = "";


          id_dom = "";

          // id
          if(id_count){
            id_dom = "<ul class='tbl'>";
            id_dom += "<li><div class='col1 head'>NAME</div><div class='col1 head'>COUNT</div><div class='col1 head'>MSG</div></li>";

            for(key in id_count){
//              tag_ids += "<font color='red'>" + key + " : " + id_count[key] + "</font><br>";

              msg = (id_count[key] > 1) ? "duplicate!" : "";
              id_dom += "<li><div class='col2'>" + key + "</div><div class='col2'>" + id_count[key] + "</div><div class='col2'>" + msg + "</div></li>";

            }
            id_dom += "</ul>";

          }

          // タグの数
          if(dom_count){
            for(key in dom_count){
              tags += key + " : " + dom_count[key] + "<br>";
            }
          }

//          $("#tag_ids").html(tag_ids);
          $("#tag_ids").html(id_dom);
          $("#tags").html(tags);
      
        },
        error: function(err){
          $("#message").text("ERROR");

        }

      });
    });

    $(".nav-label").click(function(){
      $(".nav-label").each( function() {
        $(this).removeClass("label-select");
      });
      $(this).addClass("label-select");
    });

});