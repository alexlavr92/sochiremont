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
            lastScrollTop: 0
        },
        init: function () {
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
            }
            else {
                BlockScroll.close()
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
                options = $thisObj.defaultsOptions
            // console.log(options.windowWidth)
            let scrollTop = $(window).scrollTop();
            $thisObj.checkSticky(scrollTop, options.headerOuter)
            $(window).on('scroll', function () {
                scrollTop = $(window).scrollTop();
                if (options.windowWidth < 1200) { }
                else {
                    if (!$('.jquery-modal').length)
                        $thisObj.checkSticky(scrollTop, options.headerOuter)
                }
            })
            $(window).on('resize', function () {
                if (options.windowWidth != document.body.clientWidth) {
                    // console.log(options.windowWidth)
                    options.windowWidth = document.body.clientWidth
                    // console.log(options.windowWidth)
                    // $thisObj.checkMargin()
                    // $thisObj.checkAdaptive(options.windowWidth)
                }

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
                let ValidateEmail = function (email) {
                    // console.log(email.value)
                    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                    if (reg.test(email.val()) == false) {
                        return false
                    }
                    else return true
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
                            $this.hide().remove()
                            $(this).css({
                                'height': $thisFormHeight + 'px',
                            })
                        },
                    })
                }
                // e.preventDefault()
            })
            this.events(options.FormsElems)
        },
        events: function (forms) {
            // Функционал изменения input
            forms.on('input change', '.input-default', function (e) {
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

        var DataPickers = $('body').find('.air-datepicker-custom'),
            mobileView = false
        if (docWidth < 1200) mobileView = true


        $.each(DataPickers, function (index, datapicker) {
            $(datapicker).attr('id', '').attr('data-picker', '')
            $(datapicker).removeAttr('value date')
            $(datapicker).attr('id', 'datapicker-' + (index + 1) + '').attr('data-picker', '' + (index + 1) + '')
            DataPickerElems[index] = new AirDatepicker('#datapicker-' + (index + 1) + '', {
                // isMobile: mobileView,
                autoClose: true,
                // showOtherMonths: false,
                showEvent: '',
                // inline: true,
                // selectOtherMonths: false,
                toggleSelected: false,
                selectedDates: [new Date()],
                // minDate: MinDate(),
                inline: true,
                visible: true,
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
                    console.log('finish')
                },
                onSelect({ date, formattedDate, datepicker }) {
                    console.log(date, formattedDate, datepicker)
                    const DateHeading = $('.events-right .heading')
                    if (DateHeading != undefined) {
                        DateHeading.text('События ' + formattedDate)

                        const EventsItems = DateHeading.closest('.events-section').find('.events-items')

                        EventsItems.hide({
                            duration: 0,
                            //тут можно ajax запрос написать на изменение списка новостей
                        }).fadeIn()
                    }
                    // const
                    // if (formattedDate) {
                    //     $(datapicker).attr('value', formattedDate).attr('date', date)
                    //     $(datepicker.$el).trigger('change')
                    //     AddServiceTimes($(datapicker))
                    // }
                    // else {
                    //     $(datapicker).removeAttr('value date')
                    // }

                }
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
                if ($this.hasClass('custom-select-search')) {
                    $this.select2({
                        minimumResultsForSearch: 0,
                        // debug: true,
                        // closeOnSelect: false,
                        theme: "custom-select select-search",
                        language: {
                            inputTooShort: function () {
                                return "Выберите больше опций...";
                            },
                            noResults: function () {
                                return "Ничего не найдено";
                            },
                            searching: function () {
                                return "Поиск...";
                            },
                            removeAllItems: function () {
                                return "Удалить всё";
                            },
                        },
                    });
                }
                else {
                    $this.select2({
                        minimumResultsForSearch: Infinity,
                        theme: "custom-select",
                        language: "ru",
                        width: 'style',
                    });
                }

            })
            // this.events(options.selects)
        },
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
                        // init: function () {
                        //     const $this = this
                        //     setTimeout(function () {
                        //         $this.update()
                        //     }, 10);
                        // },
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
            const modalElem = $('#' + options.modalHash + '')
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
            let click_close = true;

            // console.log('init modal')
            modalElem.modal({
                fadeDuration: 150,
                closeExisting: false, // новое 11.07.2022
                closeClass: "close-custom",
                closeText: '<span class="visually-hidden">Закрыть</span>',
                clickClose: click_close, // новое 28.11.2022
            });

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
            if (InitProjectSlider.swiper != undefined)
                InitProjectSlider.swiper.update()
            // console.log(ProjectSlides)
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
                    console.log(request.status)
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
        console.log('click')
        let header_offset = 0,
            $thisHash = $(this.hash),
            $thisHashOffset = $thisHash.offset().top,
            $duration = 1000
        console.log($thisHash, $thisHashOffset)
        if (docWidth > 1200) {
            header_offset = $('.header-outer').innerHeight();
            // console.log(header_offset)
        } else {
            $('header.sticky').length || $(window).scrollTop()
                ? header_offset = $('.header-outer').innerHeight()
                : header_offset = 0;

        }
        console.log(header_offset)
        let $scrollTop = $thisHashOffset - header_offset
        // console.log($scrollTop)

        $("html, body")
            .stop()
            .animate(
                {
                    scrollTop: $scrollTop,
                },
                {
                    duration: $duration, // продолжительность анимации
                    easing: "linear", // скорость анимации
                    complete: function () { // callback
                        if (docWidth >= 1200) {
                            const ScrollHeight = ($thisHash.offset().top - $('header').innerHeight()) - $scrollTop
                            // console.log(ScrollHeight)
                            if (ScrollHeight > 1) {
                                const NewDuration = ScrollHeight * $duration / $(window).scrollTop()
                                // console.log(ScrollHeight, NewDuration, $(window).scrollTop(), $thisHash.offset().top)
                                $('html, body').stop().animate({
                                    scrollTop: $thisHash.offset().top - $('header').innerHeight()
                                }, NewDuration)
                            }
                        }
                    },
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
    // iframeDoc.body.style.backgroundColor = 'green';
    const iframeHead = reviewsIframe.contents().find("head"),
        iframeCSS =
            '<style>' +
            '.bigWidget{ padding: 0 15px;}' +
            '.bigWidget__reviewContainer{overflow: auto; padding-right: 20px;}' +
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