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
            $('.show-on-principal').hide();
            $('.show-on-dependant').show();
        }
        else {
            $('.show-on-principal').show();
            $('.show-on-dependant').hide();
        }
    })
    $('body').on('click', '.ulli_2 span', function () {
        $(this).siblings('input[type=text]').show();
    })
    $('body').on('click', '.chip i', function () {
        $(this).parent('.chip').fadeOut(function () {
            $(this).remove();
        })

    })
})
