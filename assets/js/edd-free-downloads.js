/*global jQuery, document, edd_free_downloads_vars*/
/*jslint newcap: true*/

(function( isMobile ) {
    jQuery(document).ready(function ($) {
        'use strict';

        var newModal, formURL;

        if ($('input[name="edd_options[price_id][]"]').length > 0) {
        	var value, classes, buttonPrefix, buttonSuffix, href;

            classes = $('.edd_purchase_submit_wrapper').find('a.edd-add-to-cart').attr('class');
            classes = classes.replace('edd-add-to-cart', '');

            if (isMobile.any) {
                href = edd_free_downloads_vars.mobile_url;
            } else {
                href = '#edd-free-download-modal';
            }

            if (edd_free_downloads_vars.has_ajax === true) {
                buttonPrefix = '<button class="edd-free-downloads-variable edd-free-download ' + classes + '" href="' + href + '"><span>';
                buttonSuffix = '</span></button>';
            } else {
                buttonPrefix = '<input type="submit" class="edd-free-downloads-variable edd-free-download ' + classes + '" name="edd_purchase_download" value="';
                buttonSuffix = '" href="' + href + '" />';
            }

            $('.edd_purchase_submit_wrapper').after(buttonPrefix + edd_free_downloads_vars.download_label + buttonSuffix);

            $('input[name="edd_options[price_id][]"]').each(function (i) {
                value = $('input[name="edd_options[price_id][]"]:checked').attr('data-price');

                if (value == '0.00') {
                    $('.edd_purchase_submit_wrapper').css('display', 'none');
                    $('.edd-free-downloads-variable').css('display', 'inline-block');
                } else {
                    $('.edd_purchase_submit_wrapper').css('display', 'inline-block');
                    $('.edd-free-downloads-variable').css('display', 'none');
                }
            });

            $('body').on('change', 'input[name="edd_options[price_id][]"]', function (e) {
                value = $('input[name="edd_options[price_id][]"]:checked').attr('data-price');

                if (value == '0.00') {
                    $('.edd_purchase_submit_wrapper').css('display', 'none');
                    $('.edd-free-downloads-variable').css('display', 'inline-block');
                } else {
                    $('.edd_purchase_submit_wrapper').css('display', 'inline-block');
                    $('.edd-free-downloads-variable').css('display', 'none');
                }
            });

            $('body').on('click', '.edd-free-downloads-variable', function (e) {
            	e.preventDefault();
            });
        }

        if (isMobile.any) {
            $('body').on('click', '.edd-free-download', function (e) {
                e.preventDefault();

                // Select email field on click
                $('input[name="edd_free_download_email"]').focus();
                $('input[name="edd_free_download_email"]').select();

                window.location.href = $(this).attr('href');
            });

            $('body').on('click', '.edd-free-download-cancel', function () {
                parent.history.back();
                return false;
            });
        } else {
            newModal = new jBox('Modal', {
                attach: $('.edd-free-download'),
                content: $('#edd-free-downloads-modal'),
                width: 350,
                delayClose: 3000,
                closeButton: edd_free_downloads_vars.close_button
            });

            $('body').on('click', '.edd-free-download', function (e) {
                e.preventDefault();

                // Select email field on click
                $('input[name="edd_free_download_email"]').focus();
                $('input[name="edd_free_download_email"]').select();

                var download_id = $(this).closest('form').attr('id').replace('edd_purchase_', '');
                $('input[name="edd_free_download_id"]').val(download_id);

                if ($('input[name="edd_options[price_id][]"]').length > 0) {
                	var price_id = $('input[name="edd_options[price_id][]"]:checked').val();
                	$('input[name="edd_free_download_price_id"]').val(price_id);
                }
            });
        }

        $('body').on('keypress', '.edd-free-download-field', function (e) {
            if (e.which == 13) {
                $('.edd-free-download-submit').click();
                return false;
            }
        });

        $('body').on('click', '.edd-free-download-submit', function (e) {
            var email, regex, has_error = 0;

            // Disable the submit button
            $('.edd-free-download-submit').attr('disabled', 'disabled');

            email = $('input[name="edd_free_download_email"]');
            regex = /^((([A-Za-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([A-Za-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([A-Za-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([A-Za-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([A-Za-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([A-Za-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([A-Za-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([A-Za-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([A-Za-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([A-Za-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/;

            if (email.val() === '') {
                $('#edd-free-download-error-email-required').css('display', 'block');

                has_error++;
            } else {
                $('#edd-free-download-error-email-required').css('display', 'none');

                if (!regex.test(email.val())) {
                    $('#edd-free-download-error-email-invalid').css('display', 'block');

                    has_error++;
                } else {
                    $('#edd-free-download-error-email-invalid').css('display', 'none');
                }
            }

            if (edd_free_downloads_vars.require_name === 'true') {
                var fname, lname;

                fname = $('input[name="edd_free_download_fname"]');
                lname = $('input[name="edd_free_download_lname"]');

                if (fname.val() === '') {
                    $('#edd-free-download-error-fname-required').css('display', 'block');

                    has_error++;
                } else {
                    $('#edd-free-download-error-fname-required').css('display', 'none');
                }

                if (lname.val() === '') {
                    $('#edd-free-download-error-lname-required').css('display', 'block');

                    has_error++;
                } else {
                    $('#edd-free-download-error-lname-required').css('display', 'none');
                }
            }


            if (edd_free_downloads_vars.user_registration === 'true') {
                var username, password, password2;

                username = $('input[name="edd_free_download_username"]');
                password = $('input[name="edd_free_download_pass"]');
                password2 = $('input[name="edd_free_download_pass2"]');

                if (username.val() === '') {
                    $('#edd-free-download-error-username-required').css('display', 'block');

                    has_error++;
                } else {
                    $('#edd-free-download-error-username-required').css('display', 'none');
                }

                if (password.val() === '') {
                    $('#edd-free-download-error-password-required').css('display', 'block');

                    has_error++;
                } else {
                    $('#edd-free-download-error-password-required').css('display', 'none');
                }

                if (password2.val() === '') {
                    $('#edd-free-download-error-password2-required').css('display', 'block');

                    has_error++;
                } else {
                    $('#edd-free-download-error-password2-required').css('display', 'none');
                }

                if (password.val() !== '' && password2.val() !== '') {
                    if (password.val() !== password2.val()) {
                        $('#edd-free-download-error-password-unmatch').css('display', 'block');

                        has_error++;
                    } else {
                        $('#edd-free-download-error-password-unmatch').css('display', 'none');
                    }
                }
            }

            if (has_error === 0) {
                $('#edd_free_download_form').submit();
                $('.edd-free-download-submit span').html(edd_free_downloads_vars.download_loading);
                $('.edd-free-download-submit span').append('<i class="edd-icon-spinner edd-icon-spin"></i>');
                $('.edd-free-download-submit').attr('disabled', 'disabled');
                newModal.close();
            } else {
                $('.edd-free-download-errors').css('display', 'block');
                $('.edd-free-download-submit').removeAttr('disabled');
                e.preventDefault();
            }
        });
    });
})( isMobile );