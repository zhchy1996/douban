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
                $('.search-bar').css('display', 'block');
                
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
//获取数据
var urlVal = window.location.search;
var odata = null;
$.ajax({
            type: "get",
            url: "https://api.douban.com/v2/music/search" + "?q=" + urlVal ,
            dataType: "jsonp",
            data:{
                count:"15"
            },
            success: function (data) {
                odata = data;
                var len = data.count;
                for(var i = 0; i < len; i++) {
                    var oDiv1 = $('<div>'),
                        oA1 = $('<a>'),
                        oImg = $('<img>'),
                        oDiv2 = $('<div>'),
                        oA2 = $('<a>'),
                        oP = $('<p>'),
                        oDiv3 = $('<div>'),
                        oSpan1 = $('<span>'),
                        oSpan2 = $('<span>'),
                        oSpan3 = $('<span>');
                        oDiv1.addClass('content-item').addClass('clear');
                        oImg.attr('src', data.musics[i].image)
                        oA1.attr('href', data.musics[i].alt)
                        oA1.append(oImg)
                        oDiv1.append(oA1)
                        oDiv2.addClass('text')
                        oA2.attr('href', data.musics[i].alt)
                        oA2.html(data.musics[i].title)
                        oP.html(((data.musics[i].attrs.media) ? data.musics[i].attrs.media[0] : '') + '/' +  ((data.musics[i].attrs.publisher) ? (data.musics[i].attrs.publisher[0]): '')  + '/' + ((data.musics[i].attrs.pubdate) ? data.musics[i].attrs.pubdate[0] : '') + '/' + ((data.musics[i].attrs.version) ? data.musics[i].attrs.version[0] : '') + '/' + ((data.musics[i].attrs.singer) ? data.musics[i].attrs.singer[0] : ''))
                        // oP.html(data.musics[i].attrs.media ? data.musics[i].attrs.media[0] : '')
                        oDiv3.addClass('star')
                        oSpan1.addClass('pic')
                        oSpan2.addClass('score')
                        oSpan2.html(data.musics[i].rating.average)
                        oSpan3.addClass('pl')
                        oSpan3.html(data.musics[i].rating.numRaters)
                        oDiv2.append(oA2)
                        oDiv2.append(oP)
                        oDiv3.append(oSpan1)
                        oDiv3.append(oSpan2)
                        oDiv3.append(oSpan3)
                        oDiv2.append(oDiv3)
                        oDiv1.append(oDiv2)
                        $('.content').append(oDiv1)
            }
                
            }
        })