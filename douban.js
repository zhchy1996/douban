function navSearch () {
        var $inp = $(".music-input input");
        var $inpVal = null;
        $('body').click(function () {
            $('.search-bar').css('display', 'none');
        })
        // $inp.focus(function () {
        //     $('.search-bar').css('display', 'block');
        // })
        $inp.keyup(function () {
            $inpVal = this.value;
            console.log($inpVal);
            $.ajax({
            type: "get",
            url: "https://api.douban.com/v2/music/search" + "?q=" + $inpVal ,
            dataType: "jsonp",
            data:{
                count:"7"
            },
            success: function (data) {
                console.log(data)
                var oUl = $('.search-bar ul');
                oUl.html('');
                var flag = document.createDocumentFragment();
                $('.search-bar').css('display', 'block' );
                
                for(var i =0; i < data.count; i++){
                    $('.search-bar').css('display', 'block')
                    var oLi = $('<li/>');
                    var oA = $('<a/>');
                    oA.attr('href', '#');
                    var oImg = $('<img/>');
                    oImg.attr('src', data.musics[i].image)
                    var oDiv = $('<div/>');
                    oDiv.addClass('text');
                    var oP1 = $('<p/>');
                    var oSpan1 = $('<span/>');
                    oSpan1.html(data.musics[i].title);
                    if(data.musics[i].alt_title){
                        var oSpan2 = $('<span/>');
                        oSpan2.html('其他名称：' + data.musics[i].alt_title);
                    }
                    
                    var oP2 = $('<p/>');
                    oP2.html('表演者：' + data.musics[i].author[0].name);
                    oP1.append(oSpan1);
                    oP1.append(oSpan2);
                    oDiv.append(oP1);
                    oDiv.append(oP2);
                    oA.append(oImg);
                    oA.append(oDiv);
                    oLi.append(oA);
                    oUl.append(oLi);
                }
                //搜索跳转
                var searchBtn = $('.music-btn');
                searchBtn.click(function() {
                    window.location.href="搜索.html" + '?' + $inpVal;
                })
            }

        })
        })
        
    
    
}
navSearch();

lunbo();

// 歌手部分tab
function aristTab() {
    var $tab = $('.arist-tab');
    var $div = $('.arist');
    $tab.click(function () {
        $tab.removeClass('active');
        $(this).addClass('active');
        $div.removeClass('active');
        $div.eq($(this).index()).addClass('active');
    })
}
aristTab();


// 歌手选中部分
function aristHover () {
    var $btn = $('.player-round-btn-bg');
    $btn.mousemove(function () {
        $(this).addClass('hover');
    })
     $btn.mouseleave(function () {
        $(this).removeClass('hover');
    })
}
aristHover();

//编辑推荐滚动
function editorMove () {
    var $lBtn = $('.editor .button .left');
    var $rBtn = $('.editor .button .right');
    $lBtn.click(function () {
       starNBMove($('.editor-list .list')[0], {'left':'0'})
    })
    $rBtn.click(function () {
       starNBMove($('.editor-list .list')[0], {'left':'-585'})
    })
}
editorMove ()

//选项卡
function chooseItem (item, content) {
    item.children('li').click(function () {
        item.children('li').removeClass('active');
        
        $(this).addClass('active');
        var index = $(this).index();
        
        if(content.children('div')[0]) {
            content.children('div').removeClass('active');
            content.children('div').eq(index).addClass('active');
            
        }else if(content.children('ul')) {
            content.children('ul').removeClass('active');
            content.children('ul').eq(index).addClass('active');

        }
        if(content.children('ul')) {}
    })
}
chooseItem ($('.new-albums .section-titles') , $('.new-albums .content'))
chooseItem ($('.jinqi .section-titles') , $('.jinqi .content'))
chooseItem ($('.selection-title') , $('.hot-songs'))