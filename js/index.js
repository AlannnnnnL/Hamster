$(function () {
    //监听游戏规则
    $(".rules").click(function () {
        $(".rule").stop().fadeIn(100);
    });
    //监听游戏规则关闭
    $(".close").click(function () {
        $(".rule").stop().fadeOut(100);
    });
    //监听游戏开始
    $(".start").click(function () {
        $(".start").stop().fadeOut(100);
        //调用进度条方法
        progressHandler();
        //开启灰太狼动画
        startWolfAnimation();
    });
    //监听重新开始
    $(".reStart").click(function () {
        $(".mask").stop().fadeOut(100);
        //调用进度条方法
        progressHandler();
        //开启灰太狼动画
        startWolfAnimation();
        //分数归零
        $(".score").text(0);
    });

    //处理进度条方法
    function progressHandler() {
        //重置进度条宽度
        $(".progress").css({width:180});
        var timer;
        clearInterval(timer);
        //开启进度条定时器
        timer = setInterval(function () {
            //拿到当前进度条宽度
            var progressWidth = $(".progress").width();
            progressWidth -= 1;
            $(".progress").css({width:progressWidth});
            //判断进度条是否走完
            if(progressWidth <= 0){
                clearInterval(timer);
                $(".mask").stop().fadeIn(100);
                // 停止灰太狼的动画
                stopWolfAnimation();
            }
        },100);
    }

    var wolfTimer;
    //开启灰太狼动画方法
    function startWolfAnimation() {
        //定义两个数组保存所有灰太狼和小灰灰的图片
        var wolf_1=['./images/h0.png','./images/h1.png','./images/h2.png','./images/h3.png','./images/h4.png','./images/h5.png','./images/h6.png','./images/h7.png','./images/h8.png','./images/h9.png'];
        var wolf_2=['./images/x0.png','./images/x1.png','./images/x2.png','./images/x3.png','./images/x4.png','./images/x5.png','./images/x6.png','./images/x7.png','./images/x8.png','./images/x9.png'];
        //定义一个数组保存所有可能出现的位置
        var arrPos = [
            {left:"100px",top:"115px"},
            {left:"20px",top:"160px"},
            {left:"190px",top:"142px"},
            {left:"105px",top:"193px"},
            {left:"19px",top:"221px"},
            {left:"202px",top:"212px"},
            {left:"120px",top:"275px"},
            {left:"30px",top:"295px"},
            {left:"209px",top:"297px"}
        ];
        //创建一个图片
        var $wolfImg = $("<img src='' class='wolfImg' >");
        //随机获取图片位置
        var posIndex = Math.round(Math.random() * 8);
        //设置图片位置
        $wolfImg.css({
            position: "absolute",
            left: arrPos[posIndex].left,
            top: arrPos[posIndex].top,
            cursor: "pointer"
        });
        //随机获得小灰灰或者灰太狼的数组
        var wolfType = Math.round(Math.random()) == 0 ? wolf_1 : wolf_2;
        //设置图片内容
        window.wolfIndex = 0;
        window.wolfIndexEnd = 5;
        clearInterval(wolfTimer);
        wolfTimer = setInterval(function () {
            if(wolfIndex >= wolfIndexEnd){//狼显示完毕
                $wolfImg.remove();//清空此狼
                clearInterval(wolfTimer);
                startWolfAnimation();//显示下一个狼
            }
            $wolfImg.attr("src",wolfType[wolfIndex]);
            wolfIndex++;
        },200);
        //将图片添加到界面
        $(".container").append($wolfImg);
        //调用处理游戏规则的方法
        gameRules($wolfImg);
    }

    //停止灰太狼动画
    function stopWolfAnimation() {
        $(".wolfImg").remove();
        clearInterval(wolfTimer);
    }

    //游戏规则方法
    function gameRules($wolfImg) {
        $wolfImg.one("click",function () {
            window.wolfIndex = 5;
            window.wolfIndexEnd = 9;

            //获取图片当前地址
            var $src = $wolfImg.attr("src");
            var flag = $src.indexOf("h") >= 0;
            if(flag){
                //灰太狼
                $(".score").text(parseInt($(".score").text()) + 10);
            }else{
                //小灰灰
                $(".score").text(parseInt($(".score").text()) - 10);
            }
        });
    }
});