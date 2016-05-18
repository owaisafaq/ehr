$('.close_custom_pop').click(function () {
    $('.custom_popup').fadeOut();
})
$('.open-custom_pop').click(function () {
    $('.custom_popup').fadeIn();
})
$(document).ready(function () {
    $('.select-date').datepicker({autoclose: true, todayHighlight: true});
    $('.checkout_patient_tab_con > div').css('display', 'none');
    var id = $('input:radio[name="checkoutpatient"]').val();
    $('#' + id).show();
    $('input:radio[name="checkoutpatient"]').click(function () {
        $('.checkout_patient_tab_con > div').css('display', 'none');
        var id = $(this).val();
        $('#' + id).show();
    })
})
