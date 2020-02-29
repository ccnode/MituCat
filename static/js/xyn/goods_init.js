// 分页数据列表
function g_directory(page){ 
    var size=10;  
    $.ajax(
        {
            type : "get",
            dataType : "json",
            url : "/g_directory?page="+page+"&size="+size,
            success: function(data){
                if(!(data.status == "200")){
                    alert("ErrorCode : "+data.status)
                    return;
                }     
                var con = "";
                var is_success = "";   
                //生成列表(首先清除列表与页码原有数据)  
                $("#directory").empty()
                $("#pageNum").empty()
                $.each(data.data, function(index, item){
                    if(item[2]==1){
                        is_success="成功"
                    }
                    else{
                        is_success="失败"
                    };
                    con += "<li><a href='/g_history/"+item[0]+"'>"+item[1]+"["+is_success+"]"+"["+item[3]+"]"+"</a></li><br>";
                     });
                     $("#directory").append(con); 
                //调用页码方法
                g_pageNum(data,page);
            },
            error:function(){
                alert("error")
            }
        }
    )
};
//页码
function g_pageNum(data,page){
    //生成页码
    var totalPage = data.totalPage;
    var pageNum = "";
    //上一页
    if(page!=1){
        pageNum +="<li class=''><a onclick='g_directory("+(page-1)+")'><<</a></li>";
    }
    //中间页
    //只显示7页，本页显示在中间
    if(totalPage>7){
        if(page>3&&page<totalPage-2){
            for(var i=page-3;i<=page+3;i++){
                if(i == page){
                    pageNum +="<li class='current'><span>"+i+"</span></li>";
                }
                else{
                    pageNum +="<li class=''><a onclick='g_directory("+i+")'>"+i+"</a></li>";
                };   
            }; 
        }
        else{
            //不符合则是最开始7页或最后7页
            if(page<7){
                for(var i=1;i<=7;i++){
                    if(i == page){
                        pageNum +="<li class='current'><span>"+i+"</span></li>";
                    }
                    else{
                        pageNum +="<li class=''><a onclick='g_directory("+i+")'>"+i+"</a></li>";
                    };   
                };
            }
            else{
                for(var i=totalPage-7;i<=totalPage;i++){
                    if(i == page){
                        pageNum +="<li class='current'><span>"+i+"</span></li>";
                    }
                    else{
                        pageNum +="<li class=''><a onclick='g_directory("+i+")'>"+i+"</a></li>";
                    };   
                };
            }  
        }
    }
    else{
        for(var i=1;i<=totalPage;i++){
            if(i == page){
                pageNum +="<li class='current'><span>"+i+"</span></li>";
            }
            else{
                pageNum +="<li class=''><a onclick='g_directory("+i+")'>"+i+"</a></li>";
            };   
        };
    }    
    //下一页
    if(page!=totalPage){
        pageNum +="<li class=''><a onclick='g_directory("+(page+1)+")'>>></a></li>";
    }
    //生成总页数
    pageNum +="<li class='' ><strong style='color:red; text-align:center;line-height:32.8px'>&nbsp;共"+totalPage+"页</strong></li>";
    $("#pageNum").append(pageNum)
};
//页面加载就调用一次
g_directory(1);

//按钮点击新建分析
// $("getnew").click(function(){
//     $("title-article").text("<h1>新建分析</h1>")
//     alert("110")
//
// });

function getnew(){

    $("#second-level").html("新建商品分析")
    $("#title").html("新建分析")
    $("#getnew").remove()
    $("#pageNum").remove()
    var con = "<div><input type='text' name='s' class='form-control' id='goods_query_text' placeholder='请输入京东商品链接~' autocomplete='off'></div>" +
        " <div style='text-align:center;float:right;margin-right:30%;margin-top:10px'><input button id='goods_query' class='btn btn-danger btn-gal' value='分析' type='button' ></div>"
    $("#main").html(con)
};