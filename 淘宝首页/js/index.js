(function () {

    document.myReady(function () {
        //初始化dropdown
        dropdownInit();

        //logo旋转
        logoRotate();

        //搜索框内容初始
        searchInit();

        // 轮播图初始化
        carouselInit();

        //初始化tab栏
        tabs();

        //模态框初始化
        modalInit()
    })

    //dropdown初始化
    function dropdownInit() {

        var drops = document.getElementsByClassName("dropdown-menu");
        for (var i = 0; i < drops.length; i++) {

            cao.EventUtil.addEvent(drops[i], "mouseover", function (e) {
                var lis = this.children;

                var target = cao.EventUtil.getTarget(e);
                if (target == this) {
                    return;
                }
                for (var j = 0; j < lis.length; j++) {
                    if (target == lis[j].children[0]) {
                        return;
                    }
                    lis[j].className = "";
                }
                target.className = "on";
            });
        }
    }

    //logo旋转
    function logoRotate() {
        var logo = document.getElementsByClassName("logo-wrap")[0];
        var deg = 0;

        setInterval(function () {
            logo.style.transform = "rotateY(" + deg + "deg)";
            deg = (deg + 15) % 360;
        }, 100)
    }

    //搜索框初始化
    function searchInit() {
        var shops = document.getElementsByClassName("shop-select")[0];
        var sInput = document.getElementsByClassName("search-input")[0];
        var plh = document.getElementById("plh")

        //店铺选择
        cao.EventUtil.addEvent(shops, "mouseover", function (e) {
            var lis = this.children;

            var target = cao.EventUtil.getTarget(e);
            if (target == this) {
                return;
            }
            for (var j = 0; j < lis.length; j++) {
                if (target == lis[j].children[0]) {
                    return;
                }
                lis[j].className = "";
            }
            target.className = "current";
        });

        //placeholder
        cao.EventUtil.addEvent(sInput, "focus", function () {
            plh.style.display = "none";
        })
        cao.EventUtil.addEvent(sInput, "blur", function () {
            if (sInput.value == "")
                plh.style.display = "block";
        })


    }

    //轮播图初始化
    function carouselInit() {
        var carousel = document.getElementsByClassName("carousel")[0];
        var cIndicators = document.getElementsByClassName("carousel-indicators")[0];
        var cInner = document.getElementsByClassName("carousel-inner")[0];
        var prevBtn = document.getElementsByClassName("prev")[0];
        var nextBtn = document.getElementsByClassName("next")[0];
        //滑动一个单位的长度
        var sWidth = carousel.offsetWidth;

        var index = 0;

        //下一页
        cao.EventUtil.addEvent(nextBtn, "click", function () {
            beforeIndex = index;
            afterIndex = (beforeIndex + 1) % 5;
            nextPage(beforeIndex, afterIndex);
            index = afterIndex;
        })
        //上一页
        cao.EventUtil.addEvent(prevBtn, "click", function () {
            beforeIndex = index;
            afterIndex = (5 + (beforeIndex - 1)) % 5;
            nextPage(beforeIndex, afterIndex);
            index = afterIndex;
        })
        //轮播图指示器
        cao.EventUtil.addEvent(cIndicators, "click", function (e) {
            var target = cao.EventUtil.getTarget(e);
            if (target == this) {
                return;
            }
            var clickIndex = target.getAttribute("myIndex");
            beforeIndex = index;
            afterIndex = clickIndex;
            nextPage(beforeIndex, afterIndex);
            index = afterIndex;
        })

        // 自动轮播
        var carouselTimer;
        autoSlide();
        cao.EventUtil.addEvent(carousel, "mouseenter", function () {
            clearInterval(carouselTimer);
            prevBtn.style.display = "block";
            nextBtn.style.display = "block";
        })
        cao.EventUtil.addEvent(carousel, "mouseleave", function () {
            autoSlide();
            prevBtn.style.display = "none";
            nextBtn.style.display = "none";

        })




        /**
         *
         * @description 从当前下标翻页到下一指定下标
         * @param {number} beforeIndex - 前一个轮播图的下标
         * @param {number} afterIndex - 下一个轮播图的下标
         */
        function nextPage(beforeIndex, afterIndex) {
            cIndicators.children[beforeIndex].className = "";
            beforeLeft = -beforeIndex * sWidth;
            afterLeft = -afterIndex * sWidth;
            cIndicators.children[afterIndex].className = "active";
            slideAnimate(beforeLeft, afterLeft, cInner, 1000)
        }

        //自动轮播
        function autoSlide() {
            carouselTimer = setInterval(function () {
                beforeIndex = index;
                afterIndex = (beforeIndex + 1) % 5;
                nextPage(beforeIndex, afterIndex);
                index = afterIndex;
            }, 3000)
        }
    }
    /**
     *
     * @description 滑动动画
     * @param {number} beforeLeft - 初始位置
     * @param {number} afterLeft - 最终位置
     * @param {HTMLElement} element - 滑动的dom对象
     * @param {number} duration - 持续的时间
     */
    function slideAnimate(beforeLeft, afterLeft, element, duration) {
        //移动距离
        var s = afterLeft - beforeLeft;
        // 移动的速度
        var v = s / duration;

        var start = Date.now();
        var animateTimer = setInterval(function () {
            var now = Date.now();
            //经过的时间
            var t = now - start;
            //经过的距离
            var s1 = v * t;
            element.style.left = beforeLeft + s1 + "px"
            if (t >= duration) {
                clearInterval(animateTimer);
                element.style.left = afterLeft + "px"
            }
        }, 1000 / 60)
    }

    //tab初始化

    function tabs() {
        var progTab = document.getElementsByClassName("program-tab")[0];
        var lis = progTab.children;
        var index = 0;

        lisEvent();

        function lisEvent() {
            for (var i = 0; i < lis.length; i++) {
                lis[i].index = i;
                cao.EventUtil.addEvent(lis[i], "click", function (e) {
                    lis[index].className = "";
                    this.className = "active";
                    index = this.index;
                })
            }
        }
    }


    //模态框初始化
    function modalInit() {
        var modalBtn = document.getElementsByClassName("modal-toggle")[0];
        var modalBG = document.getElementsByClassName("modal")[0];
        var modalContent = document.getElementsByClassName("modal-content")[0];
        var closeBtn = document.getElementsByClassName("close")[0];

        var modal = {
            //显示模态框
            show: function () {
                modalBG.style.display = "block";
                document.body.style.overflow = "hidden";
            },
            //关闭模态框
            close: function () {
                modalBG.style.display = "none";
                document.body.style.overflow = "auto";
            }
        }
        // 弹出按钮绑定事件
        cao.EventUtil.addEvent(modalBtn, "click", modal.show)
        // 对话框背景绑定点击消失事件
        cao.EventUtil.addEvent(modalBG, "click", modal.close)
        //防止点击对话框内容出现事件冒泡
        cao.EventUtil.addEvent(modalContent, "click", function (e) {
            cao.EventUtil.stopPropagation(e)
        })
        //右上角X退出
        cao.EventUtil.addEvent(closeBtn, "click", modal.close)
    }
}())