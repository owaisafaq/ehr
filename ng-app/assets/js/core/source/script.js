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
    $('input:radio[name="checkoutpatient"]').click(function () {
        $('.checkout_patient_tab_con > div').css('display', 'none');
        var id = $(this).val();
        $('#' + id).show();
    })
    $('body').on('click', '.select-speciality input[type=radio]', function () {
        if ($(this).val() == "principal")
        {
            console.log($(this))
            $(this).parents('.select-speciality').siblings('.show-on-principal').hide();
            $(this).parents('.select-speciality').siblings('.show-on-dependant').show();
        }
        else {
            $(this).parents('.select-speciality').siblings('.show-on-principal').show();
            $(this).parents('.select-speciality').siblings('.show-on-dependant').hide();
        }
    })
    $('body').on('click', '.ulli_2 span', function () {
        $(this).siblings('input[type=text]').show();
    })
    $('body').on('click', '.file_create_con > div:not(.active),.folder_create_con > div:not(.active)', function () {
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


//    $('body').on('focus', '.file_uploads .active input', function () {
//        var value = $(this).val();
//        alert(value);
//    })
//    $('body').on('focusout', '.file_uploads .active input', function () {
//        var value = $(this).val();
//        alert(value);
//    })
})