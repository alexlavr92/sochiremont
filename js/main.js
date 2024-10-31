'use strict'



let docWidth = document.body.clientWidth

// Функционал блокировки скрола при открытии модального окна
const BlockScroll = {
    open: function () {
        setTimeout(function () {

            if (!document.body.hasAttribute('data-body-scroll-fix')) {
                let scrollPosition = window.pageYOffset || document.documentElement.scrollTop; // Получаем позицию прокрутки

                document.body.setAttribute('data-body-scroll-fix', scrollPosition); // Cтавим атрибут со значением прокрутки
                document.body.style.overflow = 'hidden';
                document.body.style.position = 'fixed';
                document.body.style.top = '-' + scrollPosition + 'px';
                document.body.style.left = '0';
                document.body.style.right = '0';
                if ($('body').height() < $(window).height()) {
                    document.body.style.bottom = '0';
                }

            }
        }, 10);
    },
    close: function () {
        setTimeout(function () {
            if (document.body.hasAttribute('data-body-scroll-fix')) {

                let scrollPosition = document.body.getAttribute('data-body-scroll-fix'); // Получаем позицию прокрутки из атрибута

                document.body.removeAttribute('data-body-scroll-fix'); // Удаляем атрибут
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.left = '';
                document.body.style.right = '';
                window.scroll(0, scrollPosition); // Прокручиваем на полученное из атрибута значение
            }
        }, 10)
    }
}
// ------------------------------------


jQuery(document).ready(function ($) {



    // Инициализация плагина анимации
    AOS.init({
        once: true,
    });
    // ------------------------------------

    // Инициализация плагина параллакс
    var rellax = new Rellax('.rellax');

    // Функционал работы Header 
    const InitHeader = {
        defaultsOptions: {
            headerWrapper: $('header'),
            headerOuter: $('.header-outer'),
            headerHamburger: $('.header-hamburger'),
            windowWidth: document.body.clientWidth,
            lastScrollTop: 0,
            headerMob: $('.header-mob'),
            topSocials: $('.top-socials')
        },
        init: function () {
            // console.log($(this.HeaderBurger))
            this.events()
            // this.checkMargin()
            // this.checkAdaptive(this.defaultsOptions.windowWidth)
            // this.checkSticky($(window).scrollTop(), this.defaultsOptions.headerWrapper)

        },
        checkAdaptive: function (windowWidth) {
            // console.log(windowWidth)
            const headerWrapper = this.defaultsOptions.headerWrapper

            if (windowWidth < 1200) {
                if (headerWrapper.hasClass('show'))
                    BlockScroll.open()
                // console.log('jr')
                // if ()
                this.defaultsOptions.topSocials.prependTo('.header-inner')
                const headerMob = this.defaultsOptions.headerMob
                if (!this.defaultsOptions.headerMob.find('.header-nav').length) {
                    const HeaderNav = this.defaultsOptions.headerOuter.find('.header-nav')
                    HeaderNav.prependTo(headerMob.find('.header-mob-inner'))
                }
                if (!this.defaultsOptions.headerMob.find('.link-request').length) {
                    const HeaderRequest = this.defaultsOptions.headerOuter.find('.link-request')
                    HeaderRequest.appendTo(headerMob.find('.header-mob-inner'))
                }
            }
            else {
                BlockScroll.close()
                this.defaultsOptions.headerWrapper.removeClass('show')
                this.defaultsOptions.headerMob.hide()
                this.defaultsOptions.topSocials.prependTo('.top-section-content .new-container')

                const headerDesc = this.defaultsOptions.headerOuter
                if (this.defaultsOptions.headerMob.find('.header-nav').length) {
                    const HeaderNav = this.defaultsOptions.headerMob.find('.header-nav')
                    HeaderNav.prependTo(headerDesc.find('.header-inner'))
                }
                if (this.defaultsOptions.headerMob.find('.link-request').length) {
                    const HeaderRequest = this.defaultsOptions.headerMob.find('.link-request')
                    HeaderRequest.insertBefore(headerDesc.find('.header-inner .header-socials'))
                }
            }
        },
        checkSticky: function (scrollTop, headerOuter) {
            // const headerOuter = headerWrapper.find('.header-top'),
            //     headerTopHeight = headerTop.innerHeight()
            scrollTop > headerOuter.innerHeight()
                ? this.defaultsOptions.headerWrapper.addClass('sticky')
                : this.defaultsOptions.headerWrapper.removeClass('sticky')
        },
        events: function () {
            const $thisObj = this,
                options = this.defaultsOptions
            // console.log(options.windowWidth)
            this.checkAdaptive(options.windowWidth)

            let scrollTop = $(window).scrollTop();
            $thisObj.checkSticky(scrollTop, options.headerOuter)
            $(window).on('scroll', function () {
                scrollTop = $(window).scrollTop();
                // if (options.windowWidth < 1200) { }
                // else {
                if (!$('.jquery-modal').length && !$('header.show').length)
                    $thisObj.checkSticky(scrollTop, options.headerOuter)
                // }
            })
            $(window).on('resize', function () {
                if (options.windowWidth != document.body.clientWidth) {
                    // console.log(options.windowWidth)
                    options.windowWidth = document.body.clientWidth
                    // console.log(options.windowWidth)
                    // $thisObj.checkMargin()
                    $thisObj.checkAdaptive(options.windowWidth)
                }

            })

            options.headerHamburger.on('click', function (e) {
                e.preventDefault()
                options.headerMob.slideDown({
                    start: function () {
                        options.headerWrapper.addClass('show')
                        BlockScroll.open()
                    }
                })
            })
            options.headerMob.find('.header-close').on('click', function (e) {
                console.log('click')
                e.preventDefault()
                options.headerMob.slideUp({
                    start: function () {
                        BlockScroll.close()
                        options.headerWrapper.removeClass('show')
                    }
                })
            })
        }
    }


    if ($('header').length) {
        InitHeader.init()
    }
    // ------------------------------------


    // Инициализация слайдера в топе главной страницы
    const InitTopSlider = {
        defaultsOptions: {
            sliderWrapper: $('.top-section-slider--wrapper')
        },
        init: function (options) {
            var options = $.extend(this.defaultsOptions, options)
            const sliderContainer = options.sliderWrapper.find('.top-section-slider'),
                PrevArrow = options.sliderWrapper.find('.slider-arrow.--prev'),
                NextArrow = options.sliderWrapper.find('.slider-arrow.--next'),
                sliderPagination = options.sliderWrapper.find('.slider-pagination')

            let swiper = new Swiper(sliderContainer, {
                slidesPerView: 1,
                spaceBetween: 10,
                speed: 1000,
                lazy: true,
                watchOverflow: true,
                watchSlidesVisibility: true,
                touchReleaseOnEdges: true,
                loop: true,
                grabCursor: true,
                effect: 'fade',
                fadeEffect: {
                    crossFade: true
                },
                pagination: {
                    el: sliderPagination,
                    type: "custom",
                    renderCustom: function (swiper, current, total) {
                        // return current + ' of ' + total;
                        current = current < 10
                            ? '0' + current
                            : current
                        total = total < 10
                            ? '0' + total
                            : total
                        return '<span class="current">' + current + '</span>' +
                            ' <span class="divider">/</span> ' +
                            '<span class="all">' + total + '</span>';
                    }
                },

                navigation: {
                    nextEl: NextArrow,
                    prevEl: PrevArrow,
                },
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                },
            })
        }
    }

    if ($('.top-section-slider--wrapper .top-section-slider').length) {
        InitTopSlider.init()
    }
    // ------------------------------------


    // Инициализация слайдера в наши преимущества
    const InitAdvSlider = {
        defaultsOptions: {
            sliderWrapper: $('.our-advantages--inner')
        },
        init: function (options) {
            var options = $.extend(this.defaultsOptions, options)
            const sliderContainer = options.sliderWrapper.find('.our-advantages-slider'),
                PrevArrow = options.sliderWrapper.find('.slider-arrow.--prev'),
                NextArrow = options.sliderWrapper.find('.slider-arrow.--next'),
                sliderPagination = options.sliderWrapper.find('.slider-pagination')

            let swiper = new Swiper(sliderContainer, {
                slidesPerView: 1,
                spaceBetween: 10,
                speed: 1000,
                lazy: true,
                watchOverflow: true,
                watchSlidesVisibility: true,
                touchReleaseOnEdges: true,
                loop: true,
                grabCursor: true,
                /* effect: 'fade',
                fadeEffect: {
                    crossFade: true
                }, */
                pagination: {
                    el: sliderPagination,
                    type: "custom",
                    renderCustom: function (swiper, current, total) {
                        // return current + ' of ' + total;
                        current = current < 10
                            ? '0' + current
                            : current
                        total = total < 10
                            ? '0' + total
                            : total
                        return '<span class="current">' + current + '</span>' +
                            ' <span class="divider">/</span> ' +
                            '<span class="all">' + total + '</span>';
                    }
                },
                // on: {
                //     init: function () {
                //         this.update()
                //     },
                // },
                navigation: {
                    nextEl: NextArrow,
                    prevEl: PrevArrow,
                },
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                },
                breakpoints: {
                    1199: {
                        spaceBetween: 40,
                    },
                    767: {
                        spaceBetween: 15,
                        // autoHeight: true,
                    },
                },
            })
        }
    }

    if ($('.our-advantages--inner .our-advantages-slider').length) {
        InitAdvSlider.init()
    }
    // ------------------------------------


    // Инициализация счётчиков
    const CounterInit = {
        defaultsOptions: {
            countWrapper: $('.counter-items'),
            windowHeight: $(window).height(),
            CountInited: false,
        },
        init: function (options) {
            var options = $.extend(this.defaultsOptions, options)
            // console.log(options)
            // let CountInited = false
            this.events(options)
        },
        events: function (options) {
            let CounterFunction = function (options) {
                // console.log('options')
                // console.log($(options.countWrapper))
                let CounterItems = options.countWrapper.find('.counter-item')
                CounterItems.each(function () {
                    if (!$(this).hasClass('inited')) {
                        $(this)
                            .prop("Counter", 0)
                            .animate(
                                {
                                    Counter: parseInt($(this).find('.counter-number > span').text()),
                                },
                                {
                                    duration: 4000,
                                    easing: "swing",
                                    step: function (now) {
                                        now = Number(Math.ceil(now)).toLocaleString('en');
                                        $(this).find('.counter-number > span').text(now);
                                    },
                                }
                            ).addClass('inited');
                    }
                })
                return true
            }

            let scroll = $(window).scrollTop();
            const CountOffset = options.countWrapper.offset().top
            if ((scroll + options.windowHeight >= CountOffset && options.countWrapper != undefined && options.CountInited != true)) {
                options.CountInited = CounterFunction(options)
            }
            // console.log(options.countWrapper)

            $(window).scroll(function () {
                scroll = $(window).scrollTop();
                if ((scroll + options.windowHeight >= CountOffset && options.countWrapper != undefined && options.CountInited != true)) {
                    options.CountInited = CounterFunction(options)
                }
            })
        }
    }

    if ($('.counter-items').length) {
        CounterInit.init({
            countWrapper: $('.counter-items')
        })
    }
    //------------------------------------

    // Инициализация бибилиотеки валидности номера телефона //
    function InitMaskPhone() {
        if ($(".input-phone").length > 0) {
            $(".input-phone").inputmask({
                mask: "+7 999 999 99 99",
            });
        }
    }
    //----------------------//
    InitMaskPhone();

    function InitMaskName() {
        if ($('.input-name').length > 0) {
            $(".input-name").inputmask({
                mask: "z{*} ",
                showMaskOnHover: false,
                // greedy: false,
                definitions: {
                    'z': {
                        validator: "[A-Za-zА-Яа-яЁё\u0020\-]",
                    }
                }
            });
        }
    }
    InitMaskName()

    let ValidateEmail = function (email) {
        // console.log(email.value)
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(email.val()) == false) {
            return false
        }
        else return true
    }
    // Инициадизация отправки формы
    const Forms = {
        defaultsOptions: {
            FormsElems: $('.inline-form')
        },
        submit: function (options) {
            var options = $.extend(this.defaultsOptions, options)
            // console.log(options)
            options.FormsElems.on('submit', function (e) {
                e.preventDefault()
                let EditInputWrapper = function (input, invalidText) {
                    if (!input.closest('.default-input-wrapper.invalid').length) {
                        var ItemInputWrapper = input.closest('.default-input-wrapper')
                        ItemInputWrapper.addClass('invalid')
                        if (invalidText) {
                            var InvalidText = "<span class='invalid-text'>" + invalidText + "</span>"
                            $(InvalidText).appendTo(ItemInputWrapper)
                        }
                    }
                }

                // console.log('submit')
                let $this = $(this),
                    InvalidCount = 0,
                    AllRequiredInputs = $this.find('.input-required .input-default')
                // console.log(AllRequiredInputs)

                $.each(AllRequiredInputs, function (i, input) {
                    // console.log(input)
                    if ($(input).val() == '') {
                        EditInputWrapper($(input), 'Заполните обязательное поле')
                        InvalidCount += 1
                    }
                    else {
                        if ($(input).hasClass('input-phone') && !$(input).inputmask("isComplete")) {
                            EditInputWrapper($(input), 'Введите корректный номер')
                            InvalidCount += 1
                        }
                        if ($(input).hasClass('input-mail') && !ValidateEmail($(input))) {
                            EditInputWrapper($(input), 'Введите корректный email')
                            InvalidCount += 1
                        }
                    }
                })

                const FormConfInput = $this.find('.input-checkbox-default')
                if (FormConfInput.prop('checked') == false) {
                    const ItemInputWrapper = FormConfInput.closest('.default-input-wrapper')
                    ItemInputWrapper.addClass('invalid')
                    InvalidCount += 1
                }

                if (InvalidCount == 0) {
                    const formData = new FormData()
                    $.each(AllRequiredInputs, function () {
                        let $thisVal = this.value
                        if (this.getAttribute('name') == 'input-phone') {
                            $thisVal = $thisVal.replace(/\s+/g, '')
                        }
                        formData.append(this.getAttribute('name'), $thisVal)
                    })
                    formData.append('form-type', $this.attr('data-type'))
                    for (let [name, value] of formData) {
                        console.log(`${name} = ${value}`)
                        // alert(`${name} = ${value}`); // key1=value1, потом key2=value2
                    }

                    // Ajax-запрос тут можно написать


                    const RequestSuccess = $this.siblings('.request-success-wrapper'),
                        $thisFormHeight = $this.innerHeight()
                    RequestSuccess.fadeIn({
                        start: function () {
                            if (docWidth < 1200)
                                window.scrollTo(0, ($this.closest('.inline-request').offset().top - $('.header-outer').innerHeight()))
                            $this.hide().remove()
                            $(this).css({
                                'height': $thisFormHeight + 'px',
                            })
                        },
                        /*   complete: function () {
                              console.log($this.offset().top)
  
                          } */
                    })
                }
                // e.preventDefault()
            })
            this.events(options.FormsElems)
        },
        events: function (forms) {
            // Функционал изменения input
            forms.on('input change', '.input-default, input[type="checkbox"]', function (e) {
                var $this = $(this),
                    $thisInputWrapper = $this.closest('.default-input-wrapper')
                $thisInputWrapper.find('.invalid-text').remove()
                $thisInputWrapper.removeClass('invalid')

                $this.val() != ''
                    ? $this.addClass('active')
                    : $this.removeClass('active')
            })
        }
    }

    if ($('.inline-form').length) {
        Forms.submit()
    }
    //------------------------------------



    let InitDataPicker = function () {
        let DataPickerElems = []

        var DataPickers = $('body').find('.input-data-picker'),
            mobileView = false
        if (docWidth < 1200) mobileView = true


        $.each(DataPickers, function (index, datapicker) {
            $(datapicker).attr('id', '').attr('data-picker', '')
            $(datapicker).removeAttr('value date')
            $(datapicker).attr('id', 'datapicker-' + (index + 1) + '').attr('data-picker', '' + (index + 1) + '')
            // let ParentContainer = 
            DataPickerElems[index] = new AirDatepicker('#datapicker-' + (index + 1) + '', {
                // isMobile: mobileView,
                autoClose: true,
                // showOtherMonths: false,
                // showEvent: '',
                // inline: true,
                // visible: true,
                // selectOtherMonths: false,
                toggleSelected: false,
                container: this.parentNode,
                // selectedDates: [new Date()],
                minDate: [new Date()],
                // inline: true,
                // visible: true,
                // dateFormat: 'd MMMM yyyy',
                dateFormat(date) {
                    // console.log(date);
                    return date.toLocaleString('ru', {
                        year: 'numeric',
                        month: '2-digit',
                        day: 'numeric'
                    });
                },
                // onShow(isFinished) {

                // },
                onRenderCell({ date, cellType }) {
                    // console.log('finish')
                },
                onShow() {
                    if (!$(datapicker).hasClass('active'))
                        $(datapicker).addClass('active')
                },
                onHide() {
                    if ($(datapicker).hasClass('active') && $(datapicker).attr('value') == undefined)
                        $(datapicker).removeClass('active')
                },
                onSelect({ date, formattedDate, datepicker }) {
                    // console.log(date, formattedDate, datepicker)
                    if (formattedDate) {
                        $(datapicker).attr('value', formattedDate).attr('date', date)
                        $(datepicker.$el).trigger('change')
                        if (!$(datapicker).hasClass('active'))
                            $(datapicker).addClass('active')
                    }
                    else {
                        $(datapicker).removeAttr('value date')
                    }

                }
                // onSelect({ date, formattedDate, datepicker }) {
                // console.log(date, formattedDate, datepicker)
                // const DateHeading = $('.events-right .heading')
                // if (DateHeading != undefined) {
                //     DateHeading.text('События ' + formattedDate)

                //     const EventsItems = DateHeading.closest('.events-section').find('.events-items')

                //     EventsItems.hide({
                //         duration: 0,
                //         //тут можно ajax запрос написать на изменение списка новостей
                //     }).fadeIn()
                // }
                // const
                // if (formattedDate) {
                //     $(datapicker).attr('value', formattedDate).attr('date', date)
                //     $(datepicker.$el).trigger('change')
                //     AddServiceTimes($(datapicker))
                // }
                // else {
                //     $(datapicker).removeAttr('value date')
                // }

                // }
            })
        })

    }
    //----------------------//

    InitDataPicker()


    // Инициализация custom-select
    const InitSelect2 = {
        defaultsOptions: {
            selects: $('.custom-select')
        },
        init: function (options) {
            var options = $.extend(this.defaultsOptions, options)
            // console.log(options)
            $.each(options.selects, function () {
                const $this = $(this)
                $this.select2({
                    minimumResultsForSearch: Infinity,
                    theme: "custom-select",
                    language: "ru",
                    width: 'style',
                });


            })
            this.events(options)
        },
        events: function (options) {
            options.selects.on("change", function (e) {
                // console.log($(this).prop("selectedIndex"))
                if ($(this).prop("selectedIndex") != 0)
                    $(this).siblings('.select2').addClass('select2-selected')
            });
            // console.log(options)
        }
    }

    if ($('.custom-select').length) {
        InitSelect2.init({
            selects: $('.custom-select')
        })
    }
    //------------------------------------


    // Обработчик события при наведении на карточку прайса
    const priceItem = $('.price-item')
    priceItem.mouseenter(function (e) {
        if (docWidth >= 1200) {
            e.preventDefault()
            const $this = $(this)
            $this.addClass('hover')
            $this.siblings().addClass('not-hover')
        }
    }).mouseleave(function (e) {
        if (docWidth >= 1200) {
            e.preventDefault()
            const $this = $(this)
            priceItem.removeClass('hover not-hover')
        }
    })
    //------------------------------------




    // Инициализация галерии
    const Gallery = {
        optionsDefault: {
            GalleryWrapper: $('.lightgallery-wrapper')
        },
        init: function (options) {
            var options = $.extend(this.defaultsOptions, options)
            /* LightGallery */
            // console.log(options)
            const lighgalleryItems = options.GalleryWrapper.find('.lightgallery-item')
            let gallery = options.GalleryWrapper.lightGallery({
                selector: lighgalleryItems,
                share: false,
                videojs: false,
                autoplayFirstVideo: false,
                download: false,
                thumbnail: false,
            });
            // console.log(gallery)
        },
        events: function (eventElement) {
            var options = $.extend(this.defaultsOptions, options)
            options.GalleryWrapper.refresh()

            // console.log(eventElement)
            // let OpenGallery = function (elem) {
            //     elem.find('.lightgallery-item:first-child').trigger('click')
            // }
            // if (eventElement.closest('.catalog-slide').length) {
            //     OpenGallery(eventElement.closest('.catalog-slide'))
            // }
            // if (eventElement.closest('.review-photos').length) {
            //     OpenGallery(eventElement.closest('.review-photos'))
            // }
            // LightGalleryElem.find('.lightgallery-item:first-child').trigger('click')
        }
    }
    //----------------------//
    if ($('.lightgallery-wrapper').length) {
        $.each($('.lightgallery-wrapper'), function () {
            Gallery.init({
                GalleryWrapper: $(this)
            })
        })
    }


    // Инициализация слайдера в наши преимущества
    const InitProjectSlider = {
        defaultsOptions: {
            sliderWrapper: $('.project-slider-wrapper')
        },
        init: function (options) {
            // console.log(this.swiper)
            var options = $.extend(this.defaultsOptions, options)
            const sliderContainer = options.sliderWrapper.find('.project-slider-container'),
                PrevArrow = options.sliderWrapper.find('.slider-arrow.--prev'),
                NextArrow = options.sliderWrapper.find('.slider-arrow.--next'),
                sliderPagination = options.sliderWrapper.find('.slider-pagination')
            // let swiper
            if (!sliderContainer.hasClass('swiper-container-initialized')) {
                this.swiper = new Swiper(sliderContainer, {
                    slidesPerView: 1,
                    spaceBetween: 10,
                    speed: 1000,
                    lazy: true,
                    watchOverflow: true,
                    watchSlidesVisibility: true,
                    touchReleaseOnEdges: true,
                    // observer: true,
                    // observeParents: true,
                    // observeSlideChildren: true,
                    loop: true,
                    grabCursor: true,
                    /* effect: 'fade',
                    fadeEffect: {
                        crossFade: true
                    }, */
                    on: {
                        init: function () {
                            const $this = this
                            setTimeout(function () {
                                $this.update()
                            }, 200);
                        },
                        // resize: function () {
                        //     const $this = this
                        //     setTimeout(function () {
                        //         $this.update()
                        //     }, 10);
                        // }
                    },
                    pagination: {
                        el: sliderPagination,
                        type: "custom",
                        renderCustom: function (swiper, current, total) {
                            // return current + ' of ' + total;
                            current = current < 10
                                ? '0' + current
                                : current
                            total = total < 10
                                ? '0' + total
                                : total
                            return '<span class="current">' + current + '</span>' +
                                ' <span class="divider">/</span> ' +
                                '<span class="all">' + total + '</span>';
                        }
                    },
                    navigation: {
                        nextEl: NextArrow,
                        prevEl: PrevArrow,
                    },
                    autoplay: {
                        delay: 5000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    },
                    breakpoints: {
                        1199: {
                            spaceBetween: 30,
                        },
                        1199: {
                            spaceBetween: 15,
                        },
                    },
                })
            }
        }
    }

    // if ($('.project-slider-wrapper').length) {
    //     InitProjectSlider.init()
    // }
    // ------------------------------------


    // const projectsJsonLink = '/json/projects.json';


    // инициализация модальных окон
    const ModalElem = {
        defaultsOption: {
            modalHash: '',
            projectsJsonLink: './json/projects.json',
        },
        init: function (options) {
            this.modalElem = $('#' + options.modalHash + '')
            const modalElem = this.modalElem
            this.defaultsOption.ProjectName = modalElem.find('.project-name')
            this.defaultsOption.ProjectValues = modalElem.find('.projects-values')
            this.defaultsOption.ProjectAddress = modalElem.find('.project-address')
            this.defaultsOption.ProjectDescript = modalElem.find('.project-descript')
            this.defaultsOption.ProjectTopImg = modalElem.find('.project-about .lightgallery-item')
            this.defaultsOption.ProjectSchema = modalElem.find('.project-schema .img-wrapper')
            this.defaultsOption.ProjectInclude = modalElem.find('.project-include')
            this.defaultsOption.ProjectView = modalElem.find('.project-view a')
            this.defaultsOption.ProjectSlider = modalElem.find('.project-slider-wrapper')
            // console.log(this.defaultsOption)
            var options = $.extend(this.defaultsOption, options)


            // console.log('init modal')


            this.events(modalElem, options)

        },
        recordJsonContent: function (currentContentModal) {
            this.currentContentModal = currentContentModal
        },
        writeProjectContent: function () {
            // console.log(this.currentContentModal)

            const currentContentModal = this.currentContentModal
            let options = this.defaultsOption
            // console.log(options)
            options.ProjectName.html(currentContentModal.project_name)
            options.ProjectName.attr('data-before', currentContentModal.project_type)

            currentContentModal.project_values.forEach(function (element, index) {
                // console.log(options.ProjectValues.find('.project-value:nth-child(' + (index + 1) + ') > span:first-child'))
                options.ProjectValues.find('.project-value:nth-child(' + (index + 1) + ') > span:first-child').text(element)
            });
            options.ProjectAddress.html(currentContentModal.project_address)
            options.ProjectDescript.html(currentContentModal.project_descript)
            options.ProjectTopImg.attr('href', currentContentModal.project_imgTop)
            options.ProjectTopImg.children('img').attr('src', currentContentModal.project_imgTop)
            options.ProjectInclude.html(currentContentModal.project_include)
            options.ProjectView.attr('href', currentContentModal.project_view)
            options.ProjectSchema.find('img').attr('src', currentContentModal.project_schema)

            const ProjectSwiperContainer = options.ProjectSlider.find('.project-slider-container')
            let ProjectSwiperWrapper = '<div class="swiper-wrapper lightgallery-wrapper"></div>'
            let ProjectSlides = ''
            currentContentModal.project_slides.forEach(function (element, index) {
                // console.log(element)
                let ProjectSlideContent =
                    '<div class="swiper-slide">' +
                    '<div class="project-slide flex-block">' +
                    '<div class="project-left">' +
                    '<a href="' + element.images[0][0] + '" class="img-wrapper lightgallery-item">' +
                    '<div data-background="' + element.images[0][0] + '" class="swiper-lazy swiper-lazy-desctop">' +
                    '<div class="swiper-lazy-preloader"></div>' +
                    '</div>' +
                    '<div data-background="' + element.images[0][1] + '" class="swiper-lazy swiper-lazy-mobile">' +
                    '<div class="swiper-lazy-preloader"></div>' +
                    '</div>' +
                    // '<picture>' +
                    // '<source media="(min-width: 1200px)" srcset="' + element.images[0][0] + '">' +
                    // '<img data-src="' + element.images[0][1] + '" class="swiper-lazy" alt="">' +
                    // '</picture>' +
                    // '<div class="swiper-lazy-preloader"></div>' +
                    '</a>' +
                    '</div>' +
                    '<div class="project-right flex-block">' +
                    '<div class="gallery-text" data-before="галерея">' + element.text + '</div>' +
                    '<a href="' + element.images[1][0] + '" class="img-wrapper lightgallery-item">' +
                    '<div data-background="' + element.images[1][0] + '" class="swiper-lazy swiper-lazy-desctop">' +
                    '<div class="swiper-lazy-preloader"></div>' +
                    '</div>' +
                    '<div data-background="' + element.images[1][1] + '" class="swiper-lazy swiper-lazy-mobile">' +
                    '<div class="swiper-lazy-preloader"></div>' +
                    '</div>' +
                    // '<picture>' +
                    // '<source media="(min-width: 1200px)" srcset="' + element.images[1][0] + '">' +
                    // '<img data-src="' + element.images[1][1] + '" class="swiper-lazy" alt="">' +
                    // '</picture>' +
                    //'<div class="swiper-lazy-preloader"></div>' +
                    '</a>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                ProjectSlides = ProjectSlides + ProjectSlideContent

            })
            $(ProjectSwiperWrapper).appendTo(ProjectSwiperContainer)
            ProjectSwiperContainer.find('.swiper-wrapper').html(ProjectSlides)
            ProjectSwiperWrapper = ProjectSwiperContainer.find('.swiper-wrapper')
            // ProjectSwiperContainer.html(ProjectSlides).addClass('lightgallery-wrapper')
            Gallery.init({
                GalleryWrapper: ProjectSwiperWrapper
            })
            this.initModal()
            if (InitProjectSlider.swiper != undefined)
                InitProjectSlider.swiper.update()
            // console.log(ProjectSlides)
        },
        initModal: function () {
            let click_close = true;
            this.modalElem.modal({
                fadeDuration: 150,
                closeExisting: false, // новое 11.07.2022
                closeClass: "close-custom",
                closeText: '<span class="visually-hidden">Закрыть</span>',
                clickClose: click_close, // новое 28.11.2022
            });
        },
        events: function (modalElem, options) {
            // console.log(options)
            // console.log(this)
            const $thisObj = this
            // console.log(options.modalHash)

            const ProjectId = options.targetElem.attr('data-id')
            //console.log(ProjectId)
            //let currentProjectContents
            // console.log()
            $.ajax({
                url: options.projectsJsonLink,
                // type: "POST",
                /*   cache: false, */
                dataType: 'json',
                success: function (response) {
                    const data = $.parseJSON(JSON.stringify(response))
                    $.each(data, function () {
                        const $this = $(this)
                        if ($this[0].id == ProjectId)
                            $thisObj.recordJsonContent($this[0].contents)
                    })
                    $thisObj.writeProjectContent()
                },
                error: function (request, status, error) {
                    // console.log(request.status)
                    errorShow(request.status)
                },
                statusCode: {
                    200: function () {
                        /*  console.log($(this)) */
                    },
                    404: function () { // выполнить функцию если код ответа HTTP 404
                        let Status = '404'
                        errorShow(Status)
                    },
                    403: function () { // выполнить функцию если код ответа HTTP 403
                        let Status = '403'
                        errorShow(Status)
                    },
                    408: function () { // превышено время
                        let Status = '408'
                        errorShow(Status)
                    },
                    504: function () { // превышено время
                        alert("доступ запрещен");
                        let Status = '504'
                        errorShow(Status)
                    }
                }
            });
            $('body').on('modal:open', modalElem, function (event, modal) {
                InitProjectSlider.init()
                // console.log(modal.$elm)
                BlockScroll.open();
            })
            $('body').on('modal:close', modalElem, function (event, modal) {
                BlockScroll.close();
                // modal.$elm.find('.project-slider-wrapper .project-slider-container').remove()
                if (InitProjectSlider.swiper != undefined)
                    InitProjectSlider.swiper.destroy()
                // modal.$elm.find('.project-slider-wrapper .slider-pagination').html('')
                modal.$elm.find('.project-slider-wrapper .lightgallery-wrapper').remove()
            })
        }
    }


    $('.modal-open').on('click', function (e) {
        e.preventDefault()
        const $this = $(this),
            thisHash = $this.attr('data-modal')
        // console.log(thisHash)
        ModalElem.init({
            targetElem: $this,
            modalHash: thisHash
        })
        return false;
    })
    //------------------------------------

    // Установка верхнего подчеркивание я заголовков
    function AddStripeTopHeading($this) {
        let firstWord = $this.text().split(' ')[0],
            notfirstWord = $this.text().split(' ').slice(1).join(' ')
        // console.log(firstWord, notfirstWord)

        $this.text(' ' + notfirstWord)
        firstWord = '<span>' + firstWord + '</span> '
        $(firstWord).prependTo($this)
    }

    if ($('.heading').length) {
        const AllHeading = $('section:not(.top-section) .heading')
        // console.log(AllHeading)
        $.each(AllHeading, function () {
            const $this = $(this)
            // console.log($this)
            AddStripeTopHeading($this)
        })

        const ModalHeading = $('.modal').find('.inline-form-wrapper .heading')
        AddStripeTopHeading(ModalHeading)

    }
    //------------------------------------

    $('.accordeon-title').on('click', function (e) {
        const $this = $(this),
            accordeonContent = $this.next('.accorderdeon-content')
        $this.closest('.accordeon-wrapper').toggleClass('open')
        accordeonContent.slideToggle()
    })



    $("body").on("click", ".btn-animate", function (e) {
        e.preventDefault();
        // console.log('click')
        let header_offset = 0,
            $thisHash = $(this.hash),
            $thisHashOffset,
            $duration = 1000,
            BodyScroll
        // console.log($thisHash, $thisHashOffset)
        if (docWidth > 1200) {
            header_offset = $('.header-outer').innerHeight();
            // console.log(header_offset)
        } else {
            if ($('header.show').length) {
                BodyScroll = parseInt($('body').attr('data-body-scroll-fix'))
                $('.header-mob .header-close').trigger('click')
            }

            header_offset = $('.header-outer').innerHeight();

        }
        // console.log(header_offset)
        $thisHashOffset = $thisHash.offset().top
        let $scrollTop = $thisHashOffset - header_offset
        if (BodyScroll != 0 && BodyScroll != undefined) {
            $scrollTop = $scrollTop + BodyScroll
        }
        console.log($scrollTop)

        $("html, body")
            .stop()
            .animate(
                {
                    scrollTop: $scrollTop,
                },
                {
                    duration: $duration, // продолжительность анимации
                    easing: "linear", // скорость анимации
                    queue: false // не ставим в очередь
                }
            );
        // e.preventDefault();
        return false;
    });

    $(window).on("scroll", function (e) {
        var $window = $(window),
            scrollTop = $window.scrollTop();
        // console.log(scrollTop)
        scrollTop > $('.top-section').innerHeight()
            ? $('.btn-up').addClass('show')
            : $('.btn-up').removeClass('show')
    });


    const FilesInit = {
        defaultOptions: {
            dataTransfer: new DataTransfer(),
            fileInput: $('.files-input-wrapper input[type="file"]'),
            maxSizeDoc: 8,
        },
        init: function (options) {
            var options = $.extend(this.defaultOptions, options)
            this.events(options)
        },
        events: function (options) {
            const $files_list = options.fileInput.closest('.files-input-wrapper').find('.input-file-list')
            options.fileInput.on('change', function () {
                const $this = $(this)
                // $files_list = $this.closest('.files-input-wrapper').find('.input-file-list')
                $files_list.empty();

                for (var i = 0; i < this.files.length; i++) {
                    let file = this.files.item(i);

                    if ((file.size / 1024 / 1024) < options.maxSizeDoc && file.type.match(/(.png)|(.jpeg)|(.pdf)|(.jpg)$/i)) {
                        options.dataTransfer.items.add(file);
                        // console.log((file.size / 1024 / 1024))
                        let reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onloadend = function () {
                            let new_file_input = '<div class="input-file-list-item">' +
                                // '<img class="input-file-list-img" src="' + reader.result + '">' +
                                '<span class="input-file-list-name">' + file.name + '</span>' +
                                '<a href="javascript: void(0)" class="input-file-list-remove">x</a>' +
                                '</div>';
                            $files_list.append(new_file_input);
                            BrifingForm.defaultsOptions.BrifingOptions.find('[data-option="file-object"]').html(file.name)
                        }
                        $this.addClass('active')
                    }
                    else {
                        let text
                        if ((file.size / 1024 / 1024) > 5) {
                            text = "<span class='invalid-text'>Размер файла не должен быть больше " + options.maxSizeDoc + " Мб</span>"
                        }
                        if (!file.type.match(/(.png)|(.jpeg)|(.pdf)|(.jpg)$/i)) {
                            text = "<span class='invalid-text'>Загрузите файл в одном из форматов: png, jpeg, pdf, jpg</span>"
                        }
                        $files_list.append(text)
                    }

                };
                this.files = options.dataTransfer.files;
                // console.log(this.files)
            })

            $files_list.on('click', '.input-file-list-remove', function () {
                // console.log($files_list)
                const target = $(this),
                    dt = options.dataTransfer
                // console.log(dt.files)
                let name = $(target).prev().text();
                let input = $(target).closest('.files-input-wrapper').find('input[type=file]');
                $(target).closest('.input-file-list-item').remove();
                for (let i = 0; i < dt.items.length; i++) {
                    if (name === dt.items[i].getAsFile().name) {
                        dt.items.remove(i);
                    }
                }
                // console.log(dt.files)
                input[0].files = dt.files;
                input.removeClass('active')
                const BrifingFileOption = BrifingForm.defaultsOptions.BrifingOptions.find('[data-option="file-object"]')
                BrifingFileOption.html(BrifingFileOption.attr('data-text'))
                // console.log(options.fileInput[0].files)
            })
        }
    }
    FilesInit.init()



    // Инициадизация отправки формы
    const BrifingForm = {
        defaultsOptions: {
            BrifingWrapper: $('.brifing-wrapper'),
            FormElem: $('.brifing-form'),
            BrifingOptions: $('.brifing-objects-options')
        },
        defaultStep: 1,
        allStep: 3,
        oneStepWidth: function () {
            const oneStepWidth = 100 / this.allStep
            return oneStepWidth
        },
        stepSwitcher: function (state) {
            state == 'next'
                ? this.defaultStep = this.defaultStep + 1
                : this.defaultStep = this.defaultStep - 1

            this.defaultStep == this.allStep
                ? this.btnSubmit.text('Отправить анкету')
                : this.btnSubmit.text('Далее')

            let options = this.defaultsOptions
            options.FormElem.find('.brifing-form-step.active').removeClass('active')
            options.FormElem.find('.brifing-form-step:nth-child(' + this.defaultStep + ')').addClass('active').hide().fadeIn()

            window.scrollTo(0, (options.BrifingWrapper.closest('.brifing').offset().top - $('.header-outer').innerHeight()))

            if (this.defaultStep != 1) {
                const btnBack = '<a href="javascript: void(0)" class="btn btn-contur">Назад</a>'
                const FormBtnWrapper = options.FormElem.find('.btns-wrapper')
                if (!options.FormElem.find('.btn.btn-contur').length)
                    $(btnBack).prependTo(FormBtnWrapper)
            }
            else {
                options.FormElem.find('.btn.btn-contur').remove()
            }

            const BrifSwitcher = options.BrifingWrapper.find('.brifing-switcher'),
                BrifWidthSwitcher = BrifSwitcher.find('.width-swither-inner'),
                BrifTextSwitcher = BrifSwitcher.find('.text-switcher .current')

            BrifTextSwitcher.text(this.defaultStep)
            BrifWidthSwitcher.css({
                'width': this.oneStepWidth() * this.defaultStep + '%'
            })
        },
        submit: function (options) {
            const $obj = this
            var options = $.extend(this.defaultsOptions, options)
            this.btnSubmit = options.FormElem.find('button.btn')
            // console.log(options)
            options.FormElem.on('submit', function (e) {
                e.preventDefault()
                let EditInputWrapper = function (input, invalidText) {
                    if (!input.closest('.default-input-wrapper.invalid').length) {
                        var ItemInputWrapper = input.closest('.default-input-wrapper')
                        ItemInputWrapper.addClass('invalid')
                        if (invalidText) {
                            var InvalidText = "<span class='invalid-text'>" + invalidText + "</span>"
                            $(InvalidText).appendTo(ItemInputWrapper)
                        }
                    }
                }

                // console.log('submit')
                let $this = $(this),
                    InvalidCount = 0,
                    AllRequiredInputs = $this.find('.brifing-form-step.active .input-required input'),
                    SelectTypeProject = $this.find('.brifing-form-step.active .input-required select')
                // console.log(AllRequiredInputs)

                $.each(AllRequiredInputs, function (i, input) {

                    if ($(input).attr('type') == 'text' && $(input).attr('readonly') != 'readonly') {
                        // console.log($(input))
                        if ($(input).val() == '') {
                            EditInputWrapper($(input), 'Заполните обязательное поле')
                            InvalidCount += 1
                        }
                        else {
                            if ($(input).hasClass('input-phone') && !$(input).inputmask("isComplete")) {
                                EditInputWrapper($(input), 'Введите корректный номер')
                                InvalidCount += 1
                            }
                            if ($(input).hasClass('input-mail') && !ValidateEmail($(input))) {
                                EditInputWrapper($(input), 'Введите корректный email')
                                InvalidCount += 1
                            }
                        }
                    }
                    if ($(input).hasClass('input-data-picker') && $(input).attr('value') == undefined) {
                        EditInputWrapper($(input), 'Выберите дату')
                        InvalidCount += 1
                    }

                })
                if (SelectTypeProject.prop("selectedIndex") == 0) {
                    EditInputWrapper(SelectTypeProject, 'Выберите тип помещения')
                    InvalidCount += 1
                }
                if ($obj.defaultStep == $obj.allStep) {
                    const FormConfInput = $this.find('.input-checkbox-default')
                    if (FormConfInput.prop('checked') == false) {
                        const ItemInputWrapper = FormConfInput.closest('.default-input-wrapper')
                        ItemInputWrapper.addClass('invalid')
                        InvalidCount += 1
                    }
                }
                if (InvalidCount == 0) {
                    if ($obj.defaultStep != $obj.allStep) {
                        $obj.stepSwitcher('next')
                    }
                    else {
                        const formData = new FormData()

                        let AllFinishInputs = $this.find('input:not([type="radio"]):not([type="file"])'),
                            textarea = $this.find('textarea'),
                            FilesInput = $this.find('input[type="file"]')
                        // console.log(AllFinishInputs)
                        if (textarea.val() != '')
                            AllFinishInputs = AllFinishInputs.add(textarea)
                        $.each(AllFinishInputs, function () {
                            // console.log(this.value)
                            let $thisVal = this.value
                            if (this.getAttribute('name') == 'input-phone') {
                                $thisVal = $thisVal.replace(/\s+/g, '')
                            }
                            formData.append(this.getAttribute('name'), $thisVal)
                        })
                        let files
                        if (FilesInput.length)
                            files = FilesInput.get(0).files
                        if (files && files.length) {
                            for (var i = 0; i < files.length; i++) {
                                let file = files[i];
                                // console.log(file)
                                formData.append('files[]', file, file.name); // Добавляем каждый файл в объект FormData с его именем
                            }
                        }

                        const AllRadioInputs = $this.find('input[type="radio"]:checked')
                        if (AllRadioInputs.length) {
                            $.each(AllRadioInputs, function () {
                                // console.log(this.value)
                                let $thisVal = this.value
                                formData.append(this.getAttribute('name'), $thisVal)
                            })
                        }


                        formData.append('form-type', $this.attr('data-type'))
                        for (let [name, value] of formData) {
                            console.log(`${name} = ${value}`)
                            // alert(`${name} = ${value}`); // key1=value1, потом key2=value2
                        }
                        const RequestSuccess = $this.siblings('.request-success-wrapper'),
                            $thisFormHeight = $this.innerHeight()
                        options.BrifingWrapper.find('.brifing-switcher').addClass('hide')
                        RequestSuccess.fadeIn({
                            start: function () {
                                $this.hide().remove()
                                // if (docWidth >= 1200) {
                                $(this).css({
                                    'height': $thisFormHeight + 'px',
                                })
                                // }
                                // else {
                                //     $(this).css({
                                //         'height': '',
                                //     })
                                //     AOS.refresh()
                                // }
                            },
                            complete: function () {
                                if (docWidth < 1200) {
                                    options.BrifingWrapper.addClass('form-send')
                                }
                                window.scrollTo(0, (options.BrifingWrapper.offset().top - $('.header-outer').innerHeight()))
                            }
                        })
                    }


                    // Ajax-запрос тут можно написать



                }
                // e.preventDefault()
            })
            this.events(options.FormElem)
        },
        events: function (form) {
            // Функционал изменения input
            const $obj = this,
                objectsOptions = this.defaultsOptions.BrifingOptions
            form.on('input change', '.input-default, select, textarea, input[type="checkbox"]', function (e) {
                var $this = $(this),
                    $thisInputWrapper = $this.closest('.default-input-wrapper')
                $thisInputWrapper.find('.invalid-text').remove()
                $thisInputWrapper.removeClass('invalid')

                $this.val() != ''
                    ? $this.addClass('active')
                    : $this.removeClass('active')

                const currentObjectOtion = objectsOptions.find('.option[data-option="' + $this.attr('data-option') + '"]')
                if (currentObjectOtion.length) {
                    if ($this.val() != '') {
                        let currentObjectOtionText = $this.val()
                        if (currentObjectOtion.attr('data-option') == 'square-object')
                            currentObjectOtionText = currentObjectOtionText + ' м<sup>2</sup>'
                        currentObjectOtion.html(currentObjectOtionText)
                    }
                    else {
                        currentObjectOtion.text(currentObjectOtion.attr('data-text'))
                    }
                }
            })
            const options = this.defaultsOptions,
                BtnPrevSwitcher = options.BrifingWrapper.find('.btn-switcher.--prev'),
                BtnNextSwitcher = options.BrifingWrapper.find('.btn-switcher.--next')
            // console.log(options)
            // console.log(form.find('.btn-contur'))
            BtnPrevSwitcher.on('click', function (e) {
                e.preventDefault()
                if ($obj.defaultStep != 1) {
                    $obj.stepSwitcher('prev')
                }
                return false
            })
            BtnNextSwitcher.on('click', function (e) {
                e.preventDefault()

                if ($obj.defaultStep != $obj.allStep) {
                    options.FormElem.trigger('submit')
                }
                return false
            })
            $('body').on('click', '.brifing-form .btn-contur', function (e) {
                e.preventDefault()
                if ($obj.defaultStep != 1) {
                    $obj.stepSwitcher('prev')
                }
                return false
            })
        }
    }

    if ($('.brifing-form').length) {
        BrifingForm.submit()
    }
    //------------------------------------

}) // end ready

// console.log(projectsJson)



$(window).on('resize', function () {
    docWidth = document.body.clientWidth
    // console.log(docWidth)
})





const reviewsIframe = $("iframe")

const iframe = reviewsIframe[0],
    iframeDoc = iframe.contentWindow.document


if (iframeDoc.readyState == 'complete') {
    let paddingRight =
        docWidth >= 1200
            ? 20
            : 10
    let PaddingBigWidget = docWidth >= 1200 ? '0 15' : '0 10'
    // iframeDoc.body.style.backgroundColor = 'green';
    const iframeHead = reviewsIframe.contents().find("head"),
        iframeCSS =
            '<style>' +
            '.bigWidget{ padding: ' + PaddingBigWidget + 'px;}' +
            '.bigWidget__reviewContainer{overflow: auto; padding-right: ' + paddingRight + 'px;}' +
            '.bigWidget:before{content: none;}' +
            '</style>';
    $(iframeHead).append(iframeCSS);


}


// $(window).on('load', function () {
//     const MouseMoveInit = {
//         init: function (MouseMoveBackground) {
//             this.events(MouseMoveBackground)
//         },
//         parallax: function (event) {
//             if (docWidth > 1200) {
//                 // console.log(event)
//                 const AllParrallaxElem = this.querySelectorAll(".mousemove-item")

//                 for (var i = 0; i < AllParrallaxElem.length; i++) {

//                     var shift = AllParrallaxElem[i]

//                     const position = shift.getAttribute("value");

//                     const x = (window.innerWidth - event.pageX * position) / 90;
//                     const y = (window.innerHeight - event.pageY * position) / 90;

//                     shift.style.transform = 'translateX(' + x + 'px) translateY(' + y + 'px)';
//                 }
//             }
//         },
//         events: function (MouseMoveBackground) {
//             MouseMoveBackground.on("mousemove", this.parallax);
//         }
//     }

//     if ($('.mousemove-effect').length) {
//         MouseMoveInit.init($('.mousemove-effect'))
//     }

// })