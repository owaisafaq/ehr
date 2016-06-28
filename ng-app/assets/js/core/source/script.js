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
    $('body').on('click','input:radio[name="checkoutpatient"]', function () {
        $('.checkout_patient_tab_con > div').css('display', 'none');
        $('.checkout_patient_tab_con > div').removeClass('active');
        var id = $(this).val();
        $('#' + id).show().addClass('active');
    })
    $('body').on('click', '.select-speciality input[type=radio]', function () {
        if ($(this).val() == "principal")
        {
            $(this).parents('.select-speciality').siblings('.show-on-principal').hide();
            $(this).parents('.select-speciality').siblings('.show-on-dependant').show();
        } else {
            $(this).parents('.select-speciality').siblings('.show-on-principal').show();
            $(this).parents('.select-speciality').siblings('.show-on-dependant').hide();
        }
    })
    $('body').on('click', '.ulli_2 span', function () {
        $(this).siblings('input[type=text]').show();
    })
    $('body').on('click', '.file_create_con > div:not(.active),.folder_create_con > div:not(.active)', function () {
        $('.archive_buttons .edit,.archive_buttons .delete').css('display','inline-block')
        $('.file_create_con > div,.folder_create_con > div').removeClass('active');
        $('.file_uploads').find('input').not($(this).find('input')).attr('disabled', 'disabled');
        $('.edit').show();
        $('.done-editing').hide();
        $(this).addClass('active');
    })

    $('body').on('click', '#archive .edit', function () {
        $('.file_uploads').find('.active').find('input').removeAttr('disabled').focus().select();
        $(this).hide();
        $(this).siblings('.done-editing').show();
//        $(this).select();
//alert("a")
    })
    $('body').on('click', '.done-editing', function () {
        $(this).hide();
        $(this).siblings('.edit').show();
        $('.file_uploads').find('.active').find('input').attr('disabled', 'disabled');
    })
    $('body').on('click', '.file-field .browse', function () {
        alert($(this).parent().siblings('input[type=file]').val());
//        $(this).siblings('.edit').show();
//        $('.file_uploads').find('.active').find('input').attr('disabled', 'disabled');
    })
    $('body').on('change', '.file-field input[type=file]', function () {
        $(".file-path").val(this.files[0].name);
    })


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
    
    $(document).on('click', '.add_invoice_row', function () {
        $('.invoice_row').prepend('<div class="row edit_inv_row"><div class="col-lg-4"><input type="text" placeholder="" ></div><div class="col-lg-1 code_col"><input type="text" placeholder="" ></div><div class="col-lg-2"><input type="text" placeholder="" ></div><div class="col-lg-2"><input type="text" placeholder="" ></div><div class="col-lg-2 amount_col"><input type="text" placeholder="" ></div><div class="col-lg-1 btn_can_col"><span class="remove_invoice_row"><i class="fa fa-close"></i></span></div></div>');
    });

    $(document).on('click', '.remove_invoice_row', function () {
        $(this).parents('.edit_inv_row').remove();
    });
});
