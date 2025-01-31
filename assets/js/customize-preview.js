(function ($) {
    'use strict';
    $(document).ready(function () {
        $(document.body).on('click', '.vi-wcaio-sidebar-cart-pd-wrap .vi_wcaio_change_qty', function (e) {
            e.preventDefault();
            e.stopPropagation();
            let qty_input = $(this).closest('.vi-wcaio-sidebar-cart-pd-quantity').find('.vi_wcaio_qty');
            let val = parseInt(qty_input.val()),
                min = parseInt(qty_input.attr('min')),
                max = parseInt(qty_input.attr('max'));
            if ($(this).hasClass('vi_wcaio_plus')){
                val++;
            }else {
                val--;
            }
            if (min > val) {
                val = min;
            }
            if (val > max) {
                val = max;
            }
            qty_input.val(val);
        });
    });
    wp.customize.bind('preview-ready', function () {
        wp.customize.preview.bind('vi_wcaio_update_url', function ( url) {
            wp.customize.preview.send('vi_wcaio_update_url', url);
        });
        wp.customize.preview.bind('vi_wcaio_sc_toggle', function (action, new_effect) {
            vi_wcaio_sc_toggle(action, new_effect);
        });
        wp.customize.preview.bind('active', function () {
            $('.vi-wcaio-sidebar-cart-loading.vi-wcaio-sidebar-cart-loading-' + wp.customize('woo_cart_all_in_one_params[sc_loading]').get()).removeClass('vi-wcaio-disabled');
            if (wp.customize('woo_cart_all_in_one_params[sc_header_coupon_enable]').get()) {
                $('.vi-wcaio-sidebar-cart-header-coupon-wrap').removeClass('vi-wcaio-disabled');
            } else {
                $('.vi-wcaio-sidebar-cart-header-coupon-wrap').addClass('vi-wcaio-disabled');
            }
            //Set default of menu_cart
            if (wp.customize('woo_cart_all_in_one_params[mc_content]').get()) {
                $('.vi-wcaio-menu-cart').addClass('vi-wcaio-menu-cart-show');
            } else {
                $('.vi-wcaio-menu-cart').removeClass('vi-wcaio-menu-cart-show');
            }

            /* Since 1.1.16 */
            vi_wcaio_add_editing_boundary();
        });
    });
    wp.customize('woo_cart_all_in_one_params[sc_enable]', function (value) {
        value.bind(function (newval) {
            if (newval){
                vi_wcaio_sc_toggle('show');
            }else {
                vi_wcaio_sc_icon_may_be_toggle();
            }
        });
    });
    wp.customize('woo_cart_all_in_one_params[sc_display_type]', function (value) {
        value.bind(function (newval) {
            let wrap = $('.vi-wcaio-sidebar-cart');
            let oldval = wrap.data('type');
            wrap.removeClass('vi-wcaio-sidebar-cart-' + oldval).addClass('vi-wcaio-sidebar-cart-' + newval);
            wrap.removeClass('vi-wcaio-sidebar-cart-init');
            wrap.data('type', newval);
        });
    });
    wp.customize('woo_cart_all_in_one_params[sc_position]', function (value) {
        value.bind(function (newval) {
            let wrap = $('.vi-wcaio-sidebar-cart');
            let oldval = wrap.data('position');
            wrap.removeClass('vi-wcaio-sidebar-cart-' + oldval).addClass('vi-wcaio-sidebar-cart-' + newval);
            wrap.data('position', newval);
            wrap.data('old_position', oldval);
        });
    });
    wp.customize('woo_cart_all_in_one_params[sc_horizontal]', function (value) {
        value.bind(function (newval) {
            let sc_horizontal_mobile = parseInt(newval) > 20 ? 20 - parseInt(newval) : 0;
            let css = '\n' +
                '            .vi-wcaio-sidebar-cart.vi-wcaio-sidebar-cart-1.vi-wcaio-sidebar-cart-top_left,\n' +
                '            .vi-wcaio-sidebar-cart-icon-wrap-top_left, .vi-wcaio-sidebar-cart-icon-wrap-bottom_left,\n' +
                '            .vi-wcaio-sidebar-cart.vi-wcaio-sidebar-cart-1.vi-wcaio-sidebar-cart-bottom_left{\n' +
                '                left: ' + newval + 'px ;\n' +
                '            }\n' +
                '            .vi-wcaio-sidebar-cart.vi-wcaio-sidebar-cart-1.vi-wcaio-sidebar-cart-top_right,\n' +
                '            .vi-wcaio-sidebar-cart-icon-wrap-top_right, .vi-wcaio-sidebar-cart-icon-wrap-bottom_right,\n' +
                '            .vi-wcaio-sidebar-cart.vi-wcaio-sidebar-cart-1.vi-wcaio-sidebar-cart-bottom_right{\n' +
                '                right: ' + newval + 'px ;\n' +
                '            }\n' +
                '            @media screen and (max-width: 768px) {\n' +
                '                .vi-wcaio-sidebar-cart.vi-wcaio-sidebar-cart-1.vi-wcaio-sidebar-cart-top_left .vi-wcaio-sidebar-cart-content-wrap,\n' +
                '                .vi-wcaio-sidebar-cart.vi-wcaio-sidebar-cart-1.vi-wcaio-sidebar-cart-bottom_left .vi-wcaio-sidebar-cart-content-wrap{\n' +
                '                    left: ' + sc_horizontal_mobile + 'px  ;\n' +
                '                }\n' +
                '                .vi-wcaio-sidebar-cart.vi-wcaio-sidebar-cart-1.vi-wcaio-sidebar-cart-top_right .vi-wcaio-sidebar-cart-content-wrap,\n' +
                '                .vi-wcaio-sidebar-cart.vi-wcaio-sidebar-cart-1.vi-wcaio-sidebar-cart-bottom_right .vi-wcaio-sidebar-cart-content-wrap\n' +
                '                    right: ' + sc_horizontal_mobile + 'px  ;\n' +
                '                }\n' +
                '            }';
            $('#vi-wcaio-preview-sc_horizontal').html(css);
        });
    });
    wp.customize('woo_cart_all_in_one_params[sc_vertical]', function (value) {
        value.bind(function (newval) {
            let sc_vertical_mobile = parseInt(newval) > 20 ? 20 - parseInt(newval) : 0;
            let css = '\n' +
                '            .vi-wcaio-sidebar-cart.vi-wcaio-sidebar-cart-1.vi-wcaio-sidebar-cart-top_left,\n' +
                '            .vi-wcaio-sidebar-cart-icon-wrap-top_left, .vi-wcaio-sidebar-cart-icon-wrap-top_right,\n' +
                '            .vi-wcaio-sidebar-cart.vi-wcaio-sidebar-cart-1.vi-wcaio-sidebar-cart-top_right{\n' +
                '                top: ' + newval + 'px ;\n' +
                '            }\n' +
                '            .vi-wcaio-sidebar-cart-icon-wrap-bottom_right, .vi-wcaio-sidebar-cart-icon-wrap-bottom_left,\n' +
                '            .vi-wcaio-sidebar-cart.vi-wcaio-sidebar-cart-1.vi-wcaio-sidebar-cart-bottom_right,\n' +
                '            .vi-wcaio-sidebar-cart.vi-wcaio-sidebar-cart-1.vi-wcaio-sidebar-cart-bottom_left{\n' +
                '                bottom: ' + newval + 'px ;\n' +
                '            }\n' +
                '            @media screen and (max-width: 768px) {\n' +
                '                .vi-wcaio-sidebar-cart.vi-wcaio-sidebar-cart-1.vi-wcaio-sidebar-cart-top_left .vi-wcaio-sidebar-cart-content-wrap,\n' +
                '                .vi-wcaio-sidebar-cart.vi-wcaio-sidebar-cart-1.vi-wcaio-sidebar-cart-top_right .vi-wcaio-sidebar-cart-content-wrap{\n' +
                '                    top: ' + sc_vertical_mobile + 'px ;\n' +
                '                }\n' +
                '                .vi-wcaio-sidebar-cart.vi-wcaio-sidebar-cart-1.vi-wcaio-sidebar-cart-bottom_right .vi-wcaio-sidebar-cart-content-wrap,\n' +
                '                .vi-wcaio-sidebar-cart.vi-wcaio-sidebar-cart-1.vi-wcaio-sidebar-cart-bottom_left .vi-wcaio-sidebar-cart-content-wrap{\n' +
                '                    bottom: ' + sc_vertical_mobile + 'px ;\n' +
                '                }\n' +
                '            }';
            $('#vi-wcaio-preview-sc_vertical').html(css);
        });
    });
    wp.customize('woo_cart_all_in_one_params[sc_trigger_type]', function (value) {
        value.bind(function (newval) {
            let wrap = $('.vi-wcaio-sidebar-cart-icon-wrap');
            let oldval = wrap.data('trigger');
            wrap.removeClass('vi-wcaio-sidebar-cart-icon-wrap-mouseenter vi-wcaio-sidebar-cart-icon-wrap-mouseleave vi-wcaio-sidebar-cart-icon-wrap-' + oldval)
                .addClass('vi-wcaio-sidebar-cart-icon-wrap-' + newval);
            wrap.data('trigger', newval);
        });
    });
    wp.customize('woo_cart_all_in_one_params[sc_icon_style]', function (value) {
        value.bind(function (newval) {
            let wrap = $('.vi-wcaio-sidebar-cart-icon');
            let oldval = wrap.data('display_style');
            wrap.removeClass('vi-wcaio-sidebar-cart-icon-' + oldval).addClass('vi-wcaio-sidebar-cart-icon-' + newval);
            wrap.data('display_style', newval);
        });
    });
    wp.customize('woo_cart_all_in_one_params[sc_icon_box_shadow]', function (value) {
        value.bind(function (newval) {
            let css = '';
            if (newval) {
                css = '.vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-icon-wrap{\n' +
                    '                box-shadow: inset 0 0 2px rgba(0,0,0,0.03), 0 4px 10px rgba(0,0,0,0.17);\n' +
                    '            }';
            }
            $('#vi-wcaio-preview-sc_icon_box_shadow').html(css);
        });
    });
    wp.customize('woo_cart_all_in_one_params[sc_icon_scale]', function (value) {
        value.bind(function (newval) {
            let css ='.vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-icon-wrap {\n' +
                '                transform: scale(' + newval + ') ;\n' +
                '            }\n' +
                '            @keyframes vi-wcaio-cart-icon-slide_in_left {\n' +
                '                from {\n' +
                '                    transform: translate3d(-100%, 0, 0) scale(' + newval + ');\n' +
                '                    visibility: hidden;\n' +
                '                }\n' +
                '                to {\n' +
                '                    transform: translate3d(0, 0, 0) scale(' + newval + ');\n' +
                '                }\n' +
                '            }\n' +
                '            @keyframes vi-wcaio-cart-icon-slide_in_right {\n' +
                '                from {\n' +
                '                    transform: translate3d(100%, 0, 0) scale(' + newval + ');\n' +
                '                    visibility: hidden;\n' +
                '                }\n' +
                '                to {\n' +
                '                    transform: translate3d(0, 0, 0) scale(' + newval + ');\n' +
                '                }\n' +
                '            }';
            $('#vi-wcaio-preview-sc_icon_scale').html(css);
            let sc_icon_hover_scale =  wp.customize('woo_cart_all_in_one_params[sc_icon_hover_scale]').get();
            let css1 ='\n' +
                '            @keyframes vi-wcaio-cart-icon-mouseenter {\n' +
                '                from {\n' +
                '                    transform: translate3d(0, 0, 0) scale('+newval+');\n' +
                '                }\n' +
                '                to {\n' +
                '                    transform: translate3d(0, 0, 0) scale(' + sc_icon_hover_scale + ');\n' +
                '                }\n' +
                '            }\n' +
                '            @keyframes vi-wcaio-cart-icon-mouseleave {\n' +
                '                from {\n' +
                '                    transform: translate3d(0, 0, 0) scale(' + sc_icon_hover_scale + ');\n' +
                '                }\n' +
                '                to {\n' +
                '                    transform: translate3d(0, 0, 0) scale('+newval+');\n' +
                '                }\n' +
                '            }\n' +
                '            @keyframes vi-wcaio-cart-icon-slide_out_left {\n' +
                '                from {\n' +
                '                    transform: translate3d(0, 0, 0) scale(' + sc_icon_hover_scale + ');\n' +
                '                    visibility: visible;\n' +
                '                    opacity: 1;\n' +
                '                }\n' +
                '                to {\n' +
                '                    transform: translate3d(-100%, 0, 0) scale(' + sc_icon_hover_scale + ');\n' +
                '                    visibility: hidden;\n' +
                '                    opacity: 0;\n' +
                '                }\n' +
                '            }\n' +
                '            @keyframes vi-wcaio-cart-icon-slide_out_right {\n' +
                '                from {\n' +
                '                    transform: translate3d(0, 0, 0) scale(' + sc_icon_hover_scale + ');\n' +
                '                    visibility: visible;\n' +
                '                    opacity: 1;\n' +
                '                }\n' +
                '                to {\n' +
                '                    transform: translate3d(100%, 0, 0) scale(' + sc_icon_hover_scale + ');\n' +
                '                    visibility: hidden;\n' +
                '                    opacity: 0;\n' +
                '                }\n' +
                '            }';
            $('#vi-wcaio-preview-sc_icon_hover_scale').html(css1);
        });
    });
    wp.customize('woo_cart_all_in_one_params[sc_icon_hover_scale]', function (value) {
        value.bind(function (newval) {
            let sc_icon_scale =  wp.customize('woo_cart_all_in_one_params[sc_icon_scale]').get();
            let css ='\n' +
                '            @keyframes vi-wcaio-cart-icon-mouseenter {\n' +
                '                from {\n' +
                '                    transform: translate3d(0, 0, 0) scale('+sc_icon_scale+');\n' +
                '                }\n' +
                '                to {\n' +
                '                    transform: translate3d(0, 0, 0) scale(' + newval + ');\n' +
                '                }\n' +
                '            }\n' +
                '            @keyframes vi-wcaio-cart-icon-mouseleave {\n' +
                '                from {\n' +
                '                    transform: translate3d(0, 0, 0) scale(' + newval + ');\n' +
                '                }\n' +
                '                to {\n' +
                '                    transform: translate3d(0, 0, 0) scale('+sc_icon_scale+');\n' +
                '                }\n' +
                '            }\n' +
                '            @keyframes vi-wcaio-cart-icon-slide_out_left {\n' +
                '                from {\n' +
                '                    transform: translate3d(0, 0, 0) scale(' + newval + ');\n' +
                '                    visibility: visible;\n' +
                '                    opacity: 1;\n' +
                '                }\n' +
                '                to {\n' +
                '                    transform: translate3d(-100%, 0, 0) scale(' + newval + ');\n' +
                '                    visibility: hidden;\n' +
                '                    opacity: 0;\n' +
                '                }\n' +
                '            }\n' +
                '            @keyframes vi-wcaio-cart-icon-slide_out_right {\n' +
                '                from {\n' +
                '                    transform: translate3d(0, 0, 0) scale(' + newval + ');\n' +
                '                    visibility: visible;\n' +
                '                    opacity: 1;\n' +
                '                }\n' +
                '                to {\n' +
                '                    transform: translate3d(100%, 0, 0) scale(' + newval + ');\n' +
                '                    visibility: hidden;\n' +
                '                    opacity: 0;\n' +
                '                }\n' +
                '            }';
            $('#vi-wcaio-preview-sc_icon_hover_scale').html(css);
        });
    });
    wp.customize('woo_cart_all_in_one_params[sc_icon_default_icon]', function (value) {
        value.bind(function (newval) {
            $.ajax({
                type: 'POST',
                url: vi_wcaio_preview.ajax_url,
                data: {
                    action: 'vi_wcaio_get_class_icon',
                    icon_id: newval,
                    type: 'cart_icons',
                    vicaio_nonce: vi_wcaio_preview.nonce,
                },
                success: function (response) {
                    if (response && response.status === 'success') {
                        $('.vi-wcaio-sidebar-cart-icon i').attr('class', response.message);
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            });
        });
    });
    wp.customize('woo_cart_all_in_one_params[sc_header_title]', function (value) {
        value.bind(function (newval) {
            $('.vi-wcaio-sidebar-cart-header-title-wrap').html(newval);
        });
    });
    wp.customize('woo_cart_all_in_one_params[sc_header_coupon_enable]', function (value) {
        value.bind(function (newval) {
            if (newval) {
                $('.vi-wcaio-sidebar-cart-header-coupon-wrap').removeClass('vi-wcaio-disabled');
            } else {
                $('.vi-wcaio-sidebar-cart-header-coupon-wrap').addClass('vi-wcaio-disabled');
            }
        });
    });
    wp.customize('woo_cart_all_in_one_params[sc_footer_cart_total]', function (value) {
        value.bind(function (newval) {
            $('.vi-wcaio-sidebar-cart-footer-cart_total').addClass('vi-wcaio-disabled');
            $('.vi-wcaio-sidebar-cart-footer-cart_total.vi-wcaio-sidebar-cart-footer-' + newval).removeClass('vi-wcaio-disabled');
            $('.vi-wcaio-sidebar-cart-footer-cart_total1').each(function (k,v) {
                $(v).html($(v).parent().data('cart_total'));
            });
        });
    });
    wp.customize('woo_cart_all_in_one_params[sc_footer_cart_total_text]', function (value) {
        value.bind(function (newval) {
            $('.vi-wcaio-sidebar-cart-footer-cart_total .vi-wcaio-sidebar-cart-footer-cart_total-title').html(newval);
        });
    });
    wp.customize('woo_cart_all_in_one_params[sc_footer_button]', function (value) {
        value.bind(function (newval) {
            $('.vi-wcaio-sidebar-cart-footer-wrap .vi-wcaio-sidebar-cart-bt-nav').addClass('vi-wcaio-disabled');
            $('.vi-wcaio-sidebar-cart-footer-wrap .vi-wcaio-sidebar-cart-bt-nav-' + newval).removeClass('vi-wcaio-disabled');
        });
    });
    wp.customize('woo_cart_all_in_one_params[sc_footer_bt_cart_text]', function (value) {
        value.bind(function (newval) {
            $('.vi-wcaio-sidebar-cart-footer-wrap .vi-wcaio-sidebar-cart-bt-nav-cart').html(newval);
        });
    });
    wp.customize('woo_cart_all_in_one_params[sc_footer_bt_checkout_text]', function (value) {
        value.bind(function (newval) {
            $('.vi-wcaio-sidebar-cart-footer-wrap .vi-wcaio-sidebar-cart-bt-nav-checkout').html(newval);
        });
    });
    wp.customize('woo_cart_all_in_one_params[sc_footer_pd_plus]', function (value) {
        value.bind(function (newval) {
            let data = {
                action: 'vi_wcaio_get_sc_footer_pd_plus_html',
                vicaio_nonce: vi_wcaio_preview.nonce,
                type: newval
            };
            $('.vi-wcaio-sidebar-cart-footer-pd-wrap-wrap').html('');
            if (newval) {
                $.ajax({
                    type: 'POST',
                    dataType: "json",
                    url: vi_wcaio_preview.ajax_url,
                    data: data,
                    success: function (response) {
                        if (response && response.status === 'success') {
                            if ($('.vi-wcaio-sidebar-cart-footer-pd-wrap-wrap').length) {
                                $('.vi-wcaio-sidebar-cart-footer-pd-wrap-wrap').replaceWith(response.message);
                            }else {
                                $('.vi-wcaio-sidebar-cart-footer-message-wrap').append(response.message);
                            }
                            $('.vi-wcaio-sidebar-cart-footer-pd-wrap-wrap:not(.vi-wcaio-disabled):not(.vi-wcaio-slide-init)').each(function () {
                                $(this).find('.vi-wcaio-sidebar-cart-footer-pd-plus-title').html(wp.customize('woo_cart_all_in_one_params[sc_footer_pd_plus_title]').get());
                                vi_wcaio_sc_flexslider($(this));
                            });
                        }
                    },
                    error: function (err) {
                        console.log(err);
                    }
                });
            }
        });
    });
    wp.customize('woo_cart_all_in_one_params[sc_footer_pd_plus_title]', function (value) {
        value.bind(function (newval) {
            $('.vi-wcaio-sidebar-cart-footer-pd-wrap-wrap .vi-wcaio-sidebar-cart-footer-pd-plus-title').html(newval);
            $('.vi-wcaio-sidebar-cart').removeClass('vi-wcaio-sidebar-cart-init');
        });
    });
    wp.customize('woo_cart_all_in_one_params[sc_pd_img_box_shadow]', function (value) {
        value.bind(function (newval) {
            let css = '';
            if (newval) {
                css = '.vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-products .vi-wcaio-sidebar-cart-pd-img-wrap img{\n' +
                    '                box-shadow: 0 4px 10px rgba(0,0,0,0.07);\n' +
                    '            }';
            }
            $('#vi-wcaio-preview-sc_pd_img_box_shadow').html(css);
        });
    });
    wp.customize('woo_cart_all_in_one_params[sc_pd_price_style]', function (value) {
        value.bind(function (newval) {
            if (!$('.vi-wcaio-sidebar-cart-pd-empty').length) {
                $.ajax({
                    type: 'POST',
                    url: vi_wcaio_preview.ajax_url,
                    data: {
                        action: 'vi_wcaio_change_sc_pd_price_style',
                        vicaio_nonce: vi_wcaio_preview.nonce,
                        style: newval,
                    },
                    beforeSend: function () {
                        $('.vi-wcaio-sidebar-cart-wrap').find(' .vi-wcaio-sidebar-cart-loading-wrap').removeClass('vi-wcaio-disabled');
                    },
                    success: function (response) {
                        if (response && response.status === 'success') {
                            $('.vi-wcaio-sidebar-cart-products').html(response.message);
                        }
                    },
                    complete: function () {
                        $('.vi-wcaio-sidebar-cart-wrap').find(' .vi-wcaio-sidebar-cart-loading-wrap').addClass('vi-wcaio-disabled');
                    },
                    error: function (err) {
                        console.log(err);
                    }
                });
            }
        });
    });
    wp.customize('woo_cart_all_in_one_params[sc_pd_delete_icon]', function (value) {
        value.bind(function (newval) {
            $.ajax({
                type: 'POST',
                url: vi_wcaio_preview.ajax_url,
                data: {
                    action: 'vi_wcaio_get_class_icon',
                    icon_id: newval,
                    type: 'delete_icons',
                    vicaio_nonce: vi_wcaio_preview.nonce,
                },
                success: function (response) {
                    if (response && response.status === 'success') {
                        $('.vi-wcaio-sidebar-cart-pd-remove-wrap i').attr('class', response.message);
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            });
        });
    });
    wp.customize('woo_cart_all_in_one_params[mc_enable]', function (value) {
        value.bind(function (newval) {
            if (newval) {
                $('.vi-wcaio-menu-cart').removeClass('vi-wcaio-disabled');
            } else {
                $('.vi-wcaio-menu-cart').addClass('vi-wcaio-disabled');
            }
        });
    });
    wp.customize('woo_cart_all_in_one_params[mc_content]', function (value) {
        value.bind(function (newval) {
            if (newval) {
                $('.vi-wcaio-menu-cart').addClass('vi-wcaio-menu-cart-show');
            } else {
                $('.vi-wcaio-menu-cart').removeClass('vi-wcaio-menu-cart-show');
            }
        });
    });
    wp.customize('woo_cart_all_in_one_params[mc_icon]', function (value) {
        value.bind(function (newval) {
            $.ajax({
                type: 'POST',
                url: vi_wcaio_preview.ajax_url,
                data: {
                    action: 'vi_wcaio_get_class_icon',
                    icon_id: newval,
                    type: 'cart_icons',
                    vicaio_nonce: vi_wcaio_preview.nonce,
                },
                success: function (response) {
                    if (response && response.status === 'success') {
                        $('.vi-wcaio-menu-cart-icon i').attr('class', response.message);
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            });
        });
    });
    wp.customize('woo_cart_all_in_one_params[mc_display_style]', function (value) {
        value.bind(function (newval) {
            $.ajax({
                type: 'POST',
                url: vi_wcaio_preview.ajax_url,
                data: {
                    action: 'vi_wcaio_get_menu_cart_text',
                    display_type: newval,
                    vicaio_nonce: vi_wcaio_preview.nonce,
                    cart_total_type: wp.customize('woo_cart_all_in_one_params[mc_cart_total]').get(),
                },
                success: function (response) {
                    if (response && response.status === 'success') {
                        $('.vi-wcaio-menu-cart-text-wrap').html(response.message);
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            });
        });
    });
    wp.customize('woo_cart_all_in_one_params[mc_cart_total]', function (value) {
        value.bind(function (newval) {
            $.ajax({
                type: 'POST',
                url: vi_wcaio_preview.ajax_url,
                data: {
                    action: 'vi_wcaio_get_menu_cart_text',
                    display_type: wp.customize('woo_cart_all_in_one_params[mc_display_style]').get(),
                    cart_total_type: newval,
                    vicaio_nonce: vi_wcaio_preview.nonce,
                },
                success: function (response) {
                    if (response && response.status === 'success') {
                        $('.vi-wcaio-menu-cart-text-wrap').html(response.message);
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            });
        });
    });
    wp.customize('woo_cart_all_in_one_params[sc_trigger_style]', function (value) {
        value.bind(function (newval) {
            if ($('.vi-wcaio-sidebar-cart-content-wrap').hasClass('vi-wcaio-sidebar-cart-content-open')) {
                vi_wcaio_sc_toggle('hide');
                setTimeout(function () {
                    vi_wcaio_sc_toggle('show', newval);
                }, 1000);
            } else {
                vi_wcaio_sc_toggle('show', newval);
            }
        });
    });
    wp.customize('woo_cart_all_in_one_params[sc_loading]', function (value) {
        value.bind(function (newval) {
            vi_wcaio_sc_toggle('show', wp.customize('woo_cart_all_in_one_params[sc_trigger_style]').get());
            $('.vi-wcaio-sidebar-cart-loading').addClass('vi-wcaio-disabled');
            $('.vi-wcaio-sidebar-cart-loading.vi-wcaio-sidebar-cart-loading-' + newval).removeClass('vi-wcaio-disabled');
            $('.vi-wcaio-sidebar-cart-loading-wrap').removeClass('vi-wcaio-disabled');
            setTimeout(function () {
                $('.vi-wcaio-sidebar-cart-loading-wrap').addClass('vi-wcaio-disabled');
            }, 5000);
        });
    });
    wp.customize('woo_cart_all_in_one_params[sc_loading_color]', function (value) {
        value.bind(function (newval) {
            let css = '.vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-loading-dual_ring:after {\n' +
                '                border-color: ' + newval + '  transparent ' + newval + '  transparent;\n' +
                '            }\n' +
                '            .vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-loading-ring div{\n' +
                '                border-color: ' + newval + '  transparent transparent transparent;\n' +
                '            }\n' +
                '            .vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-loading-ripple  div{\n' +
                '                border: 4px solid ' + newval + ' ;\n' +
                '            }\n' +
                '            .vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-loading-default div,\n' +
                '            .vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-loading-animation_face_1 div,\n' +
                '            .vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-loading-animation_face_2 div,\n' +
                '            .vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-loading-roller div:after,\n' +
                '            .vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-loading-loader_balls_1 div,\n' +
                '            .vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-loading-loader_balls_2 div,\n' +
                '            .vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-loading-loader_balls_3 div,\n' +
                '            .vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-loading-spinner div:after{\n' +
                '                background: ' + newval + ' ;\n' +
                '            }';
            vi_wcaio_sc_toggle('show', wp.customize('woo_cart_all_in_one_params[sc_trigger_style]').get());
            $('#vi-wcaio-preview-sc_loading_color').html(css);
            $('.vi-wcaio-sidebar-cart-loading-wrap').removeClass('vi-wcaio-disabled');
            setTimeout(function () {
                $('.vi-wcaio-sidebar-cart-loading-wrap').addClass('vi-wcaio-disabled');
            }, 5000);
        });
    });
    wp.customize('woo_cart_all_in_one_params[custom_css]', function (value) {
        value.bind(function (newval) {
            $('#vi-wcaio-preview-custom_css').html(newval);
        });
    });
    wp.customize('woo_cart_all_in_one_params[sc_pd_qty_border_color]', function (value) {
        value.bind(function (newval) {
            let css = '';
            if (newval) {
                css = ' .vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-products .vi-wcaio-sidebar-cart-pd-desc .vi-wcaio-sidebar-cart-pd-quantity {\n' +
                    '                border: 1px solid '+newval+';\n' +
                    '            }\n' +
                    '            .vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-products .vi-wcaio-sidebar-cart-pd-desc .vi_wcaio_minus {\n' +
                    '                border-right: 1px solid '+newval+';\n' +
                    '            }\n' +
                    '            .vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-products .vi-wcaio-sidebar-cart-pd-desc .vi_wcaio_plus {\n' +
                    '                border-left: 1px solid '+newval+';\n' +
                    '            }'
            }
            $('#vi-wcaio-preview-sc_pd_qty_border_color').html(css);
        });
    });
    vi_wcaio_add_preview_control('sc_radius', '.vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-content-wrap', 'border-radius', 'px');
    vi_wcaio_add_preview_control('sc_icon_border_radius', '.vi-wcaio-sidebar-cart-icon-wrap', 'border-radius', 'px');
    vi_wcaio_add_preview_control('sc_icon_bg_color', '.vi-wcaio-sidebar-cart-icon-wrap', 'background', '');
    vi_wcaio_add_preview_control('sc_icon_color', '.vi-wcaio-sidebar-cart-icon-wrap .vi-wcaio-sidebar-cart-icon i', 'color', '');
    vi_wcaio_add_preview_control('sc_icon_count_bg_color', '.vi-wcaio-sidebar-cart-icon-wrap .vi-wcaio-sidebar-cart-count-wrap', 'background', '');
    vi_wcaio_add_preview_control('sc_icon_count_color', '.vi-wcaio-sidebar-cart-icon-wrap .vi-wcaio-sidebar-cart-count-wrap', 'color', '');
    vi_wcaio_add_preview_control('sc_icon_count_border_radius', '.vi-wcaio-sidebar-cart-icon-wrap .vi-wcaio-sidebar-cart-count-wrap', 'border-radius', 'px');
    vi_wcaio_add_preview_control('sc_header_bg_color', '.vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-header-wrap', 'background', '');
    vi_wcaio_add_preview_control('sc_header_border_style', '.vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-header-wrap', 'border-style', '');
    vi_wcaio_add_preview_control('sc_header_border_color', '.vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-header-wrap', 'border-color', '');
    vi_wcaio_add_preview_control('sc_header_title_color', '.vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-header-wrap .vi-wcaio-sidebar-cart-header-title-wrap', 'color', '');
    vi_wcaio_add_preview_control('sc_header_coupon_input_radius',
        '.vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-header-wrap .vi-wcaio-sidebar-cart-header-coupon-wrap .vi-wcaio-coupon-code',
        'border-radius', 'px');
    vi_wcaio_add_preview_control('sc_header_coupon_button_bg_color',
        '.vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-header-wrap .vi-wcaio-sidebar-cart-header-coupon-wrap button.vi-wcaio-bt-coupon-code',
        'background', '');
    vi_wcaio_add_preview_control('sc_header_coupon_button_color',
        '.vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-header-wrap .vi-wcaio-sidebar-cart-header-coupon-wrap button.vi-wcaio-bt-coupon-code',
        'color', '');
    vi_wcaio_add_preview_control('sc_header_coupon_button_bg_color_hover',
        '.vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-header-wrap .vi-wcaio-sidebar-cart-header-coupon-wrap button.vi-wcaio-bt-coupon-code:hover',
        'background', '');
    vi_wcaio_add_preview_control('sc_header_coupon_button_color_hover',
        '.vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-header-wrap .vi-wcaio-sidebar-cart-header-coupon-wrap button.vi-wcaio-bt-coupon-code:hover',
        'color', '');
    vi_wcaio_add_preview_control('sc_header_coupon_button_border_radius',
        '.vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-header-wrap .vi-wcaio-sidebar-cart-header-coupon-wrap button.vi-wcaio-bt-coupon-code',
        'border-radius', 'px');
    vi_wcaio_add_preview_control('sc_footer_bg_color', '.vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-footer-wrap', 'background', '');
    vi_wcaio_add_preview_control('sc_footer_border_type', '.vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-footer-wrap', 'border-style', '');
    vi_wcaio_add_preview_control('sc_footer_border_color', '.vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-footer-wrap', 'border-color', '');
    vi_wcaio_add_preview_control('sc_footer_cart_total_color',
        '.vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-footer-wrap .vi-wcaio-sidebar-cart-footer-cart_total > div:nth-child(1)',
        'color', '');
    vi_wcaio_add_preview_control('sc_footer_cart_total_color1',
        '.vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-footer-wrap .vi-wcaio-sidebar-cart-footer-cart_total > div:nth-child(2)',
        'color', '');
    vi_wcaio_add_preview_control('sc_footer_button_bg_color',
        '.vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-footer-wrap button.vi-wcaio-sidebar-cart-bt-nav',
        'background', '');
    vi_wcaio_add_preview_control('sc_footer_button_color',
        '.vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-footer-wrap button.vi-wcaio-sidebar-cart-bt-nav',
        'color', '');
    vi_wcaio_add_preview_control('sc_footer_button_hover_bg_color',
        '.vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-footer-wrap button.vi-wcaio-sidebar-cart-bt-nav:hover',
        'background', '');
    vi_wcaio_add_preview_control('sc_footer_button_hover_color',
        '.vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-footer-wrap button.vi-wcaio-sidebar-cart-bt-nav:hover',
        'color', '');
    vi_wcaio_add_preview_control('sc_footer_button_border_radius',
        '.vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-footer-wrap button.vi-wcaio-sidebar-cart-bt-nav',
        'border-radius', 'px');
    vi_wcaio_add_preview_control('sc_footer_bt_update_bg_color',
        '.vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-footer-wrap button.vi-wcaio-sidebar-cart-bt-update',
        'background', '');
    vi_wcaio_add_preview_control('sc_footer_bt_update_color',
        '.vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-footer-wrap button.vi-wcaio-sidebar-cart-bt-update',
        'color', '');
    vi_wcaio_add_preview_control('sc_footer_bt_update_hover_bg_color',
        '.vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-footer-wrap button.vi-wcaio-sidebar-cart-bt-update:hover',
        'background', '');
    vi_wcaio_add_preview_control('sc_footer_bt_update_hover_color',
        '.vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-footer-wrap button.vi-wcaio-sidebar-cart-bt-update:hover',
        'color', '');
    vi_wcaio_add_preview_control('sc_footer_bt_update_border_radius',
        '.vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-footer-wrap button.vi-wcaio-sidebar-cart-bt-update',
        'border-radius', 'px');
    vi_wcaio_add_preview_control('sc_footer_pd_plus_color',
        '.vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-footer-wrap .vi-wcaio-sidebar-cart-footer-pd-plus-title',
        'color', '');
    vi_wcaio_add_preview_control('sc_pd_bg_color', '.vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-products-wrap', 'background', '');
    vi_wcaio_add_preview_control('sc_pd_img_border_radius', '.vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-products .vi-wcaio-sidebar-cart-pd-img-wrap img', 'border-radius', 'px');
    vi_wcaio_add_preview_control('sc_pd_name_color',
        '.vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-products .vi-wcaio-sidebar-cart-pd-info-wrap .vi-wcaio-sidebar-cart-pd-name-wrap .vi-wcaio-sidebar-cart-pd-name, .vi-wcaio-sidebar-cart-footer-pd-name *',
        'color', '');
    vi_wcaio_add_preview_control('sc_pd_name_hover_color',
        '.vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-products .vi-wcaio-sidebar-cart-pd-info-wrap .vi-wcaio-sidebar-cart-pd-name-wrap .vi-wcaio-sidebar-cart-pd-name:hover, .vi-wcaio-sidebar-cart-footer-pd-name *:hover',
        'color', '');
    vi_wcaio_add_preview_control('sc_pd_price_color',
        '.vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-products .vi-wcaio-sidebar-cart-pd-info-wrap .vi-wcaio-sidebar-cart-pd-price *, .vi-wcaio-sidebar-cart-footer-pd-price *',
        'color', '');
    vi_wcaio_add_preview_control('sc_pd_qty_border_radius', '.vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-products .vi-wcaio-sidebar-cart-pd-desc .vi-wcaio-sidebar-cart-pd-quantity',
        'border-radius', 'px');
    vi_wcaio_add_preview_control( 'sc_pd_delete_icon_font_size',
        '.vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-products .vi-wcaio-sidebar-cart-pd-remove-wrap i:before', 'font-size', 'px' );
    vi_wcaio_add_preview_control('sc_pd_delete_icon_color', '.vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-products .vi-wcaio-sidebar-cart-pd-remove-wrap i', 'color', '');
    vi_wcaio_add_preview_control('sc_pd_delete_icon_hover_color', '.vi-wcaio-sidebar-cart .vi-wcaio-sidebar-cart-products .vi-wcaio-sidebar-cart-pd-remove-wrap i:hover', 'color', '');
    vi_wcaio_add_preview_control('mc_icon_color', '.vi-wcaio-menu-cart .vi-wcaio-menu-cart-icon i', 'color', '');
    vi_wcaio_add_preview_control('mc_icon_hover_color', '.vi-wcaio-menu-cart .vi-wcaio-menu-cart-nav-wrap:hover .vi-wcaio-menu-cart-icon i', 'color', '');
    vi_wcaio_add_preview_control('mc_color', '.vi-wcaio-menu-cart .vi-wcaio-menu-cart-text-wrap *', 'color', '');
    vi_wcaio_add_preview_control('mc_hover_color', '.vi-wcaio-menu-cart .vi-wcaio-menu-cart-nav-wrap:hover .vi-wcaio-menu-cart-text-wrap *', 'color', '');

    function vi_wcaio_add_preview_control(name, element, style, suffix = '') {
        wp.customize('woo_cart_all_in_one_params[' + name + ']', function (value) {
            value.bind(function (newval) {
                $('#vi-wcaio-preview-' + name).html(element + '{' + style + ':' + newval + suffix + '}');
            })
        })
    }

    function vi_wcaio_add_editing_boundary() {
        let customStyle = document.createElement('style');
        customStyle.innerHTML = `
        .vi-wcaio-customize-editing::before,
        .vi-wacio-customize-editing-boundary-right,
        .vi-wacio-customize-editing-boundary-bottom,
        .vi-wacio-customize-editing-boundary-left {
            content: "";
            display: block;
            top:0;
            left:0;
            position: absolute;
            background-color: #f9897b;
            opacity: 0;
        }
        
        .vi-wcaio-customize-editing::before {
            width: 100%;
            height: 1px;
        }
        
        .vi-wacio-customize-editing-boundary-right {
            width: 1px;
            height: 100%;
            left: unset;
            right:0
        }
        
        .vi-wacio-customize-editing-boundary-bottom {
            width: 100%;
            height: 1px;
            top: unset;
            bottom: 0;
        }
        
        .vi-wacio-customize-editing-boundary-left {
            width: 1px;
            height: 100%;
        }

        .vi-wcaio-customize-editing-button {
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            display: block;
            position: absolute;
            background-color: #f9897b;
            line-height: 1.5;
            border: 1px solid #fa663a;
            color: #fff;
            top: 0;
            left: 50%;
            transform: translate(-50%, 0);
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
            font-size: 12px;
            white-space: nowrap;
            padding: 0px 12px 2px;
            cursor: pointer;
            z-index: 999;
            opacity: 0;
        }
        .vi-wcaio-customize-editing-button:hover {
            opacity: 1 !important;
        }
        .vi-wcaio-customize-editing:hover::before,
        .vi-wcaio-customize-editing:hover > .vi-wcaio-customize-editing-button,
        .vi-wcaio-customize-editing:hover > div[class^="vi-wacio-customize-editing-boundary"] {
            opacity: 0.5;
        }
    `;
        $(document.head).append(customStyle);
        let editing_boxes = [
            {
                selector: '.vi-wcaio-sidebar-cart-content-wrap',
                label: 'General',
                section: 'vi_wcaio_design_sidebar_cart_general'
            },
            {
                selector: '.vi-wcaio-sidebar-cart-header-wrap',
                label: 'Header',
                section: 'vi_wcaio_design_sidebar_header'
            },
            {
                selector: '.vi-wcaio-sidebar-cart-products-wrap',
                label: 'List products',
                section: 'vi_wcaio_design_sidebar_products'
            },
            {
                selector: '.vi-wcaio-sidebar-cart-footer-wrap',
                label: 'Footer',
                section: 'vi_wcaio_design_sidebar_footer'
            },
            {
                selector: '.vi-wcaio-menu-cart',
                label: 'Menu cart',
                section: 'vi_wcaio_design_menu_cart'
            },
            {
                selector: '.vi-wcaio-sb-container',
                label: 'Sticky bar',
                section: 'vi_wcaio_design_sticky_atc'
            },
            {
                selector: '.vi-wcaio-sidebar-cart-icon-wrap',
                label: 'Icon',
                section: 'vi_wcaio_design_sidebar_cart_icon'
            },
        ]
        editing_boxes.forEach(function(el) {
            let editSection = $(el.selector);
            let editButton = $(`<div class="vi-wcaio-customize-editing-button">${el.label}</div>`);
            let boundary =   $('<div class="vi-wacio-customize-editing-boundary-right"></div><div class="vi-wacio-customize-editing-boundary-bottom"></div><div class="vi-wacio-customize-editing-boundary-left"></div>')
            editButton.on('click', function(event) {
                event.stopPropagation();
                wp.customize.preview.send('vi_wcaio_open_edit_panel',el.section);
            })
            editSection.addClass('vi-wcaio-customize-editing');
            if( editSection.css('position') === 'static' ) {
                editSection.css('position','relative');
            }
            editSection.append(editButton);
            editSection.append(boundary);
            if ( el.selector === '.vi-wcaio-sidebar-cart-content-wrap' ) {
                editButton.css({
                    left: 0,
                    transform: 'rotate(270deg) translateY(-30px)',
                    top: '45%'
                })
            }
            if (el.selector === '.vi-wcaio-sidebar-cart-icon-wrap' ) {
                editButton.css({
                    top: '-10px'
                })
            }
        });
    }
})(jQuery);
