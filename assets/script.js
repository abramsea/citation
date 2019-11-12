'use strict';
// Remove support styling
$('#wrapper').removeClass('pt_customer-service');

$(document).ready(function () {
    var headerHeight = $('#header').length > 0 ? $('#header').height() : $('header').height();
    var html = $("html");
    var glpWrapper = $(".glp-wrapper");
    var slimmedNav = 62;
    if ($('.glp-module-nav').length) {
        var nav = $(".glp-wrapper .glp-module-nav");
        var navHeight = $(".glp-wrapper .glp-module-nav").height();
        var navPos = $(".glp-wrapper .glp-module-nav").position().top;
    }

    function sizeCheck() {
        if ($(window).width() >= 1030) {
            $("html").addClass("desktop").removeClass("tablet handheld");;
        } else if ($(window).width() <= 1030 && $(window).width() >= 701) {
            $("html").addClass("tablet").removeClass("handheld desktop");
        } else if ($(window).width() <= 700) {
            $("html").addClass("handheld").removeClass("tablet desktop");
        }
    }

    sizeCheck();


    var jQuerynavList = document.querySelector('.nav__list');
    var jQueryshadowStart = document.querySelector('.nav__shadow--start');
    var jQueryshadowEnd = document.querySelector('.nav__shadow--end');

    function handleShadowVisibility() {
        var maxScrollStartReached = jQuerynavList.scrollLeft <= 0;
        var maxScrollEndReached = jQuerynavList.scrollLeft >= jQuerynavList.scrollWidth - jQuerynavList.offsetWidth;

        toggleShadow(jQueryshadowStart, maxScrollStartReached);
        toggleShadow(jQueryshadowEnd, maxScrollEndReached);
    }

    function toggleShadow(jQueryel, maxScrollReached) {
        var shadowIsVisible = jQueryel.classList.contains('is-visible');
        var showShadow = !maxScrollReached && !shadowIsVisible;
        var hideShadow = maxScrollReached && shadowIsVisible;

        // Using requestAnimationFrame for optimal scroll performance.
        // https://stackoverflow.com/a/44779316
        if (showShadow) {
            window.requestAnimationFrame(function () {
                jQueryel.classList.add('is-visible')
            });
        } else if (hideShadow) {
            window.requestAnimationFrame(function () {
                jQueryel.classList.remove('is-visible')
            });
        }
    }

    (function ($) {
        $.fn.fixMe = function () {
            return this.each(function () {
                var $this = $(this),
                    $t_fixed;

                function init() {
                    $this.wrap('<div class="table-wrapper" />');
                    $t_fixed = $this.clone();
                    $t_fixed.find("tbody").remove().end().addClass("fixed").insertBefore($this);
                    resizeFixed();
                }

                function resizeFixed() {
                    $t_fixed.find("th").each(function (index) {
                        //console.log(index + ': ' + $this.find("th").eq(index).outerWidth());
                        $(this).css("width", $this.find("th").eq(index).outerWidth() + "px");
                    });
                }

                function scrollFixed() {
                    var offset = $(this).scrollTop(),
                        tableOffsetTop = $this.offset().top,
                        tableOffsetBottom = tableOffsetTop + $this.height() - $this.find("thead").height();
                    if (offset < tableOffsetTop || offset > tableOffsetBottom)
                        $t_fixed.hide();
                    else if (offset >= tableOffsetTop && offset <= tableOffsetBottom && $t_fixed.is(":hidden"))
                        $t_fixed.show();
                }
                if (!html.hasClass('handheld')) {
                    $(window).resize(resizeFixed);
                    $(window).scroll(scrollFixed);
                    init();
                }
            });
        };
    })(jQuery);

    handleShadowVisibility();
    jQuerynavList.addEventListener('scroll', function (e) {
        handleShadowVisibility(e)
    });

    $(document).on('mouseover', '.mod-05 svg > g', function (e) {
        var speaker = $(this).attr('data-speaker');
        $(this).closest('.mod-05').find('svg.tooltips > g[data-speaker="' + speaker + '"]').attr('class', 'selected');
    });

    $(document).on('mouseout', '.mod-05 svg > g', function (e) {
        var speaker = $(this).attr('data-speaker');
        $(this).closest('.mod-05').find('svg.tooltips > g[data-speaker="' + speaker + '"]').attr('class', '');
    });

    $(document).on('click', '.mod-05 svg > g', function (e) {

        if ($(window).width() > 480) {
            $('html,body').animate({
                scrollTop: $(".mod-06").offset().top
            });
        }

    });


    $(document).on('click', '.glp-wrapper .mod-01 .scroll-down', function () {
        var section = $(this).data("section");
        if ($(".glp-wrapper section[data-section='" + section + "']").length > 0) {
            $('html, body').animate({
                scrollTop: $(".glp-wrapper section[data-section='" + section + "']").offset().top
            }, 800);
        }
    });



    // In page navigation scroll
    if ($('.glp-module-nav').length) {
        $(document).on('click', '.glp-wrapper .glp-module-nav li', function () {
            var section = $(this).data("section");
            if ($(".glp-wrapper section[data-section='" + section + "']").length > 0) {
                $('html, body').animate({
                    scrollTop: $(".glp-wrapper section[data-section='" + section + "']").offset().top - headerHeight - slimmedNav + 2
                }, 800);
            }
        });
    }

    // Scroll events
    $(window).scroll(function () {
        var hidingtop = $('.mod-06').offset().top;
        var hidingbottom = $('.mod-06').position().top + $('.mod-06').outerHeight(true) // finding the outer height
        // console.log(hidingtop, hidingbottom);
        if ($('.glp-module-nav').length) {
            // Fix the navbar
            if (!html.hasClass('handheld')) {
                if ($(window).scrollTop() > (navPos - headerHeight)) {
                    nav.addClass('fixed').css('top', headerHeight);
                    $(".glp-wrapper section.control").css('margin-top', (navHeight + 80));
                } else {
                    nav.removeClass('fixed').css('top', '0');
                    $(".glp-wrapper section.control").css('margin-top', '0');
                }
                if ($(window).scrollTop() > hidingtop && $(window).scrollTop() < hidingbottom) {
                    nav.removeClass('fixed').css('top', '0');
                    $(".glp-wrapper section.control").css('margin-top', '0');
                }
            }

            // Set correct nav item
            $(".glp-wrapper section").each(function () {
                var section = $(this).data('section');
                if (
                    $(window).scrollTop() > ($(this).position().top - headerHeight - slimmedNav)
                ) {
                    $(".glp-wrapper .glp-module-nav li").removeClass('active');
                    $(".glp-wrapper .glp-module-nav li[data-section='" + section + "']").addClass('active');
                }
            });
        }

    }); // end of scroll

    // Video player
    if ($('ul.videos').length) {
        $(document).on('click', 'ul.videos li', function () {
            var video = $(this).data("videoid");
            var player = $(this).closest("section").find(".videowrapper");

            // Show the player div
            if (player.hasClass("hidden")) {
                player.removeClass("hidden");
            }

            if ($(this).parent().hasClass('video-single')) {
                $(this).parent().remove();
            }

            // Swap the video src
            player.find("iframe").attr("src", "//www.youtube.com/embed/" + video + "?rel=0&amp;hd=1&amp;wmode=opaque&amp;theme=light&amp;iv_load_policy=3&amp;showinfo=0&amp;autohide=1&amp;fs=0&amp;autoplay=1");

            // Scroll to the video player
            $('html, body').animate({
                scrollTop: $(".glp-module-videos .videowrapper").offset().top - headerHeight - slimmedNav + 2
            }, 800);
        });
    }

    setTimeout(function () {
        $("table#compare").fixMe();
    }, 1000);

});

$(window).load(function () {
    // Remove preloader
    $('.hol').removeClass('hol');
    $('.progress-line').remove();

});
