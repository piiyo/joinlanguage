/**
 * Created by VadimMakarenko on 01.12.2016.
 * Germany, Karlsruhe.
 */
(function( $ ) {

    /***********************************Create paging and Load Content page to div*************************************/
    $.fn.xhrPagination = function(paging_data, xhr_data){

        var currentoffset = $('ul.xhr_pagination li a.active').attr('offsetdata');
        if(xhr_data.dataLP.offset == '' || xhr_data.dataLP.offset == undefined){
            xhr_data.dataLP.offset = 0;
        }else if(xhr_data.dataLP.offset == 'next'){
            var next = parseInt(paging_data.items) + parseInt(currentoffset);
            xhr_data.dataLP.offset = next;
        }else if(xhr_data.dataLP.offset == 'preview'){
            var preview = parseInt(currentoffset) - parseInt(paging_data.items);
            xhr_data.dataLP.offset = preview;
        }

        this.each(function() {
            var $this = $(this);
            //Load Content
            $.ajax({
                type: 'POST',
                url: xhr_data.url,
                cache: false,
                data: xhr_data.dataLP,
                success: function (html) {
                    console.log("Complete!");
                    $($this).html(html);
                }
            });
        });

        function isInt(value) {//check is Integer
            return !isNaN(value) && (function(x) {
                    return (x | 0) === x;
                })(parseInt(value))
        }

        //create page links
        if(isInt(paging_data.totalCount)){
            $('.xhr_pagination').remove();
            var totalNum = $(paging_data.totalCount).val();
            var pages = Math.ceil(totalNum/paging_data.items);//return to $this page.

            var offset = 0;
            var middle_off = offset + paging_data.items;
            for(var i = 0; i < pages; ++i){

                if(i === 0){
                    $(paging_data.sel).append('<ul class="xhr_pagination"><li><a id="first_page" onClick="'+paging_data.funcName+'(0)"><<</a></li>');
                    $('.xhr_pagination').append('<li><a id="preview" onClick="'+paging_data.funcName+'(\'preview\')" >Preview</a></li>');
                    $('.xhr_pagination').append('<li><a id="site'+i+'" offsetdata="0" onClick="'+paging_data.funcName+'(0)" class="active">'+(i+1)+'</a></li>');
                    if(pages <= 1 ){
                        $('.xhr_pagination').append('<li><a id="next" onClick="'+paging_data.funcName+'(\'next\')">></a></li></ul>');
                        $('.xhr_pagination').append('<li><a >>></a></li></ul>');
                    }
                }else{
                    offset = offset + middle_off;
                    if(offset == xhr_data.dataLP['offset']){
                        $('ul.xhr_pagination li a ').removeClass('active');
                        $('.xhr_pagination').append('<li><a id="site'+i+'" class="active" offsetdata="'+offset+'" onClick="'+paging_data.funcName+'('+offset+')">'+(i+1)+'</a></li>');
                    }else{
                        $('.xhr_pagination').append('<li><a id="site'+i+'" offsetdata="'+offset+'" onClick="'+paging_data.funcName+'('+offset+')">'+(i+1)+'</a></li>');
                    }
                    if(pages == (i+1) ){
                        $('.xhr_pagination').append('<li><a id="next" onClick="'+paging_data.funcName+'(\'next\')">Next</a></li></ul>');
                        $('.xhr_pagination').append('<li><a id="last_page" onClick="'+paging_data.funcName+'('+offset+')">>></a></li></ul>');
                    }
                }

            }
        }else{
            setTimeout(function() { createPagesLinks()}, 450);
            function createPagesLinks(){
                $('.xhr_pagination').remove();
                var totalNum = $(paging_data.totalCount).val();
                var pages = Math.ceil(totalNum/paging_data.items);//return to $this page.

                var offset = 0;
                var middle_off = offset + paging_data.items;
                for(var i = 0; i < pages; ++i){
                    if(i === 0){
                        $(paging_data.sel).append('<ul class="xhr_pagination"><li><a id="first_page" onClick="'+paging_data.funcName+'(0)"><<</a></li>');
                        $('.xhr_pagination').append('<li><a id="preview" onClick="'+paging_data.funcName+'(\'preview\')" >Preview</a></li>');
                        $('.xhr_pagination').append('<li><a id="site'+i+'" offsetdata="0" onClick="'+paging_data.funcName+'(0)" class="active">'+(i+1)+'</a></li>');
                        if(pages <= 1 ){
                            $('.xhr_pagination').append('<li><a id="next" onClick="'+paging_data.funcName+'(\'next\')">></a></li></ul>');
                            $('.xhr_pagination').append('<li><a >>></a></li></ul>');
                        }
                    }else{
                        offset = offset + middle_off;
                        if(offset == xhr_data.dataLP['offset']){
                            $('ul.xhr_pagination li a ').removeClass('active');
                            $('.xhr_pagination').append('<li><a id="site'+i+'" class="active" offsetdata="'+offset+'" onClick="'+paging_data.funcName+'('+offset+')">'+(i+1)+'</a></li>');
                        }else{
                            $('.xhr_pagination').append('<li><a id="site'+i+'" offsetdata="'+offset+'" onClick="'+paging_data.funcName+'('+offset+')">'+(i+1)+'</a></li>');
                        }
                        if(pages == (i+1) ){
                            $('.xhr_pagination').append('<li><a id="next" onClick="'+paging_data.funcName+'(\'next\')">Next</a></li></ul>');
                            $('.xhr_pagination').append('<li><a id="last_page" onClick="'+paging_data.funcName+'('+offset+')">>></a></li></ul>');
                        }
                    }

                }
            }
        }
    };
    /************************************************************************************************************************************************************************************************************/

    /************************************Return form data via object or urlencode string*******************************/
    $.getFormData = function(formName){
        var res = $("form[name=" + formName + "]").serializeArray();
        var recursiveEncodedData = $.param(res);
        var recursiveDecodedData = decodeURIComponent($.param(res));

        var obj = {};
        recursiveDecodedData.replace(/([^=&]+)=([^&]*)/g, function(m, key, value) {
            obj[decodeURIComponent(key)] = decodeURIComponent(value);
        });

        return obj;
    };
    /******************************************************************************************************************/

    /****************************Simple send Data and console.log true or false****************************************/
    $.simpleSendData = function(url, data){
        if (url !== false) {
            $.ajax({
                type: 'POST',
                url: url,
                cache: false,
                data: data,
                success: function () {
                    console.log("Complete!");
                }
            });
        }else {
            console.log("URL Undefined!");
        }
    };
    /******************************************************************************************************************/

    /********************************AJAX send data(or empty data) and get JSON data from server.**********************/
    $.sendDataGetJSON = function(url, data) {

        if(url !== false){
            var $items = {};
            $.ajax({
                type: 'POST',
                dataType: 'JSON',
                url: url,
                cache: false,
                data: data,
                success: function (json) {
                    $.each(json, function(key, val) {
                        $items[key] = (val);
                        //$items.push(val);
                    });
                    console.log("Complete!");
                }
            });
            return $items;
        }else{
            console.log("URL Undefined!");
        }
    };
    /******************************************************************************************************************/

    /*********************************AJAX Send Data from From and load Page.******************************************/
    $.fn.sendFromDataloadPage = function(formName, url){
        var action;
        this.each(function() {
            var $this = $(this);

            if(url !== false){
                action = url;
            }else{
                action = $("form[name=" + formName + "]").attr('action');
            }
            if (formName !== false && action !== false) {
                var res = $("form[name=" + formName + "]").serializeArray();
                var recursiveEncodedData = $.param(res);
                var recursiveDecodedData = decodeURIComponent($.param(res));
                var method = $("form[name=" + formName + "]").attr('method');

                $.ajax({
                    type: method,
                    url: action,
                    cache: false,
                    data: recursiveEncodedData,
                    success: function (data) {
                        $($this).html(data);
                        console.log("Complete!");
                    }
                });

            } else {
                console.log('Error! FormName OR URL is empty!');
            }
        });
    };
    /******************************************************************************************************************/

    /*********************************AJAX Load Page with data or with empty data**************************************/
    $.fn.sendloadPage = function(url, data){
        this.each(function() {
            var $this = $(this);

            if(url !== false){
                if(data !== false){
                    $($this).load(url,data);
                }else{
                    $($this).load(url);
                }
            }else{
                console.log("URL Undefined!");
                return "URL Undefined!";
            }
        });
    };
    /******************************************************************************************************************/

})(jQuery);