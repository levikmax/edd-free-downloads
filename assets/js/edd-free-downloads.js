/*global jQuery, document, edd_free_downloads_vars*/
/*jslint newcap: true*/
jQuery(document).ready(function ($) {
    'use strict';

    var newModal, formURL;

    if (isMobile.any) {
        $('.edd-free-download').click(function (e) {
            e.preventDefault();

            window.location.href = $(this).attr('href');
        });

        $('.edd-free-download-cancel').click(function () {
            parent.history.back();
            return false;
        });
    } else {
        newModal = new jBox('Modal', {
            attach: $('.edd-free-download'),
            content: $('#edd-free-downloads-modal'),
            width: 350,
            closeButton: edd_free_downloads_vars.close_button,
            delayClose: 2000
        });

        $('.edd-free-download').click(function (e) {
            e.preventDefault();

            var download_id = $(this).closest('form').attr('id').replace('edd_purchase_', '');
            $('input[name="edd_free_download_id"]').val(download_id);
        });

        // Select email field on click
        $('.edd-free-download').click(function (e) {
            $('input[name="edd_free_download_email"]').focus();
            $('input[name="edd_free_download_email"]').select();
        });
    }

    $('.edd-free-download-field').keypress(function (e) {
        if (e.which == 13) {
            $('.edd-free-download-submit').click();
            return false;
        }
    });

    $('.edd-free-download-submit').click(function () {
        var email, regex, has_error = 0;

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

        if (edd_free_downloads_vars.require_name) {
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


        if (edd_free_downloads_vars.user_registration) {
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
        }
    });
});
