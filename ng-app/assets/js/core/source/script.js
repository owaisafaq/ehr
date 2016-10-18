$('.close_custom_pop').click(function () {
    $('.custom_popup').fadeOut();
})
$('.open-custom_pop').click(function () {
    $('.custom_popup').fadeIn();
})
$(document).ready(function () {
    $('.checkout_patient_tab_con > div').css('display', 'none');
    var id = $('input:radio[name="checkoutpatient"]').val();
    $('#' + id).show();
    $('body').on('click', 'input:radio[name="checkoutpatient"]', function () {
        $('.checkout_patient_tab_con > div').css('display', 'none');
        $('.checkout_patient_tab_con > div').remove('active');
        var id = $(this).val();
        $('#' + id).show().addClass('active');
    })
    $('body').on('click', '.select-speciality input[type=radio]', function () {
        if ($(this).val() == "principal")
        {
            $(this).parents('.modal').find('.show-on-principal').hide();
            $(this).parents('.modal').find('.show-on-dependant').show();
        } else {
            $(this).parents('.modal').find('.show-on-principal').show();
            $(this).parents('.modal').find('.show-on-dependant').hide();
        }
    })
    $('body').on('click', '.ulli_2 span', function () {
        $(this).siblings('input[type=text]').show();
    })
    $('body').on('click', '.file_create_con > div:not(.active),.folder_create_con > div:not(.active)', function () {
        $('.archive_buttons .edit,.archive_buttons .delete').css('display', 'inline-block')
        $('.file_create_con > div,.folder_create_con > div').removeClass('active');
        $('.file_uploads').find('input').not($(this).find('input')).attr('disabled', 'disabled');
        $('.edit').show();
        $('.download').show();
        $('.done-editing').hide();
        $(this).addClass('active');
    })

    $('body').on('click', '#archive .edit', function () {
        $('.file_uploads').find('.active').find('input').removeAttr('disabled').focus().select();
        $(this).hide();
        $(this).siblings('.done-editing').show();
//        $(this).select();
//alert("a")
    });
    $('body').on('click', '.done-editing', function () {
        $(this).hide();
        $(this).siblings('.edit').show();
        $('.file_uploads').find('.active').find('input').attr('disabled', 'disabled');
    });
    $('body').on('click', '.file-field .browse', function () {
        alert($(this).parent().siblings('input[type=file]').val());
//        $(this).siblings('.edit').show();
//        $('.file_uploads').find('.active').find('input').attr('disabled', 'disabled');
    });
    $('body').on('change', '.file-field input[type=file]', function () {
        $(".file-path").val(this.files[0].name);
    });


//    $('body').on('focus', '.file_uploads .active input', function () {
//        var value = $(this).val();
//        alert(value);
//    })
//    $('body').on('focusout', '.file_uploads .active input', function () {
//        var value = $(this).val();
//        alert(value);
//    })

    $(document).on('click', '.btn_edit_invoice', function () {
        $('.invoice_list').hide();
        $('.edit_invoice').show();
    });
    $(document).on('click', '.hide_edit_inovice', function () {
        $('.invoice_list').show();
        $('.edit_invoice').hide();
    });

    $(document).on('click', '.btn_print', function () {
        $('.foot_invoice').hide();
        window.print();

    });
    $(document).on('click', '.hide_print_inovice', function () {
        $('.invoice_list').show();
        $('.print_invoice').hide();
        $('.custom-tab').show();
    });
    $(document).on('click', '.printIdCard', function () {
        window.print();

    });
    $(document).on('click', '.hide_print_inovice', function () {
        $('.invoice_list').show();
        $('.print_invoice').hide();
        $('.custom-tab').show();
    });


    $(document).on('click', '.add_invoice_row', function () {
        $('.invoice_row').prepend('<div class="row edit_inv_row"><div class="col-lg-4"><input type="text" placeholder="" ></div><div class="col-lg-1 code_col"><input type="text" placeholder="" ></div><div class="col-lg-2"><input type="text" placeholder="" ></div><div class="col-lg-2"><input type="text" placeholder="" ></div><div class="col-lg-2 amount_col"><input type="text" placeholder="" ></div><div class="col-lg-1 btn_can_col"><span class="remove_invoice_row"><i class="fa fa-close"></i></span></div></div>');
    });

    $(document).on('click', '.remove_invoice_row', function () {
        $(this).parents('.edit_inv_row').remove();
    });

    $(document).on('click', '.remove_med', function () {
        $(this).parents('.med_row').remove();
    });

    $(document).on('click', '.open_sig', function () {
        $('#addsig').modal('show');
        $('#addmedication').modal('hide');
    });

    $(document).on('click', '.update_sig', function () {
        $('#addsig').modal('hide');
        $('#addmedication').modal('show');
    });

    $(document).on('click', '#cancelOrder2 .form-wizard-horizontal li', function () {
        $('#cancelOrder2 .form-wizard-horizontal li').removeClass('active');
        $('#cancelOrder2 .form-wizard-horizontal li').removeClass('done');
        $(this).prevAll().addClass('done');
        $(this).addClass('active');
        var index = $('#cancelOrder2 .form-wizard-horizontal li').index(this);
        var length = $('#cancelOrder2 .form-wizard-horizontal li').length;
        var width = index / (length - 1) * 100;
        $('#cancelOrder2 .form-wizard-horizontal .progress .progress-bar-primary').css('width', width + '%');
    });

});

    
            