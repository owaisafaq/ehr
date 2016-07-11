<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <title>TODO supply a title</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <style>
            .col-xs-1, .col-sm-1, .col-md-1, .col-lg-1, .col-xs-2, .col-sm-2, .col-md-2, .col-lg-2, .col-xs-3, .col-sm-3, .col-md-3, .col-lg-3, .col-xs-4, .col-sm-4, .col-md-4, .col-lg-4, .col-xs-5, .col-sm-5, .col-md-5, .col-lg-5, .col-xs-6, .col-sm-6, .col-md-6, .col-lg-6, .col-xs-7, .col-sm-7, .col-md-7, .col-lg-7, .col-xs-8, .col-sm-8, .col-md-8, .col-lg-8, .col-xs-9, .col-sm-9, .col-md-9, .col-lg-9, .col-xs-10, .col-sm-10, .col-md-10, .col-lg-10, .col-xs-11, .col-sm-11, .col-md-11, .col-lg-11, .col-xs-12, .col-sm-12, .col-md-12, .col-lg-12{
                position: relative;
                min-height: 1px;
                padding-left: 12px;
                padding-right: 12px;
                float:left;
            }
            .col-lg-12 {
                width: 100%;
            }
            .col-lg-2 {
                width: 16.666666666666664%;
            }
            .col-lg-3 {
                width: 25%;
            }
            col-lg-9 {
                width: 75%;
            }
            .col-lg-6 {
                width: 50%;
            }
            .col-lg-10 {
                width: 83.33333333333334%;
            }
            .pull-left {
                float: left !important;
            }
            .patient_summary_2 {
                float: left;
                width: 100%;
            }
            .label-style-con {
                background: #fff;
            }
            .hospital-pop-date {
                margin-top: 35px;
            }
            .txt-style-5 {
                color: #939598;
                font-size: 12px;
            }
            .pull-right {
                float: right !important;
            }
            .patient_summary_2 .patient_summary {
                padding: 20px 30px;
            }
            .patient_summary_2 .row{border-left: none;border-right: none;border-top: none !important;border-bottom: 1px solid #ebebeb;
            display:inline-block;padding: 20px 0;margin:0;  }
            .row{margin-right:-12px;margin-left:-12px;}
            .patient_summary_2 .patient_summary .row:first-child, .patient_summary_2 .patient_summary .row:last-child {
                background: #fbfbfb;
                padding: 20px 10px;
                border: none !important;
                display: inline-flex;
                width: 100%;
            }
            .text-center {
                text-align: center;
            }
            .patient_summary_2 .patient_summary label {
                font-size: 14px;
                color: #1a1a1a;
                text-transform: capitalize;
                height: 22px;
                width: 236px;
                margin: 0;
                line-height: 28px;
                font-family: 'sgui-bold';
                font-weight: 700    ;
            }
            .clear{clear:both;}
            .patient_summary_2 .patient_summary label.label-style-2 {
                font-size: 24px;
                color: #003d51;
                width: 100%;
                text-transform: capitalize;
                margin: 12px 0;
                line-height: 28px;
                font-family: 'sgui-bold';
            }
            .patient_summary_2 .patient_summary label.txt-style-4 {
                font-size: 13px;
                color: #666666;
                text-transform: capitalize;
                font-weight: normal;
                padding-top: 8px !important;
                height: 22px;
                line-height: 14px;
                margin: 0;
            }

            .no-padding {
                padding: 0 !important;
            }
            .patient_summary .row > div {
                margin-bottom: 0;
            }
            .patient_summary_2 .patient_summary .col-lg-9 {
                margin-bottom: 0px !important;
            }
            .patient_summary_2 label.col-lg-12 {
                width: 100%;
            }
            .margin-bottom-xl {
                margin-bottom: 10px !important;
            }
            .patient_summary_2 .patient_summary .row:last-child {
                background: #fbfbfb;
                border: none !important;
                height: 40px;
                padding: 5px 0;
                margin-top: 210px;
            }
            .patient_summary_2 .patient_summary .row:last-child > div:first-child {
                padding-left: 0;
            }
            .container{width:90%;display:block;padding:0px 50px;margin:0 auto;}

        </style>
    </head>

    <body>
        <div class="container">
            <div class="col-lg-12">
                <?php //print_r($data); ?>
                <div class="patient_summary_2 label-style-con">
                    <div class="col-lg-12 margin-bottom-xxl">
                        <h2 class="pull-left">Hospital Logo</h2>
                        <h2 class="pull-right txt-style-5 hospital-pop-date"><?php echo date('Y-m-d'); ?></h2>
                    </div>
                    <div class="patient_summary col-lg-12">
<!--                        <div class="row">-->
<!--                            <div class="col-lg-2 text-center">-->
<!--                                <img src="../assets/img/profile_pic.jpg" alt=""/>                                -->
<!--                            </div>-->
<!--                            <div class="col-lg-10">-->
<!--                                <div class="col-lg-12">-->
<!--                                    <label class="label-style-2">Elton John</label>-->
<!--                                </div>-->
<!--                                <div class="col-lg-3">-->
<!--                                    <label>patient id</label>-->
<!--                                </div>-->
<!--                                <div class="col-lg-3">-->
<!--                                    <label class="txt-style-4">90189191</label>-->
<!--                                </div>-->
<!---->
<!--                                <div class="col-lg-3">-->
<!--                                    <label>age</label>-->
<!--                                </div>-->
<!--                                <div class="col-lg-3">-->
<!--                                    <label class="txt-style-4">35</label>-->
<!--                                </div>-->
<!---->
<!--                                <div class="col-lg-3">-->
<!--                                    <label>Gender</label>-->
<!--                                </div>-->
<!--                                <div class="col-lg-3">-->
<!--                                    <label class="txt-style-4">Male</label>-->
<!--                                </div>-->
<!--                                <div class="col-lg-3">-->
<!--                                    <label>Marital Status</label>-->
<!--                                </div>-->
<!--                                <div class="col-lg-3">-->
<!--                                    <label class="txt-style-4">Single</label>-->
<!--                                </div>-->
<!---->
<!--                                <div class="col-lg-3">-->
<!--                                    <label>date of birth</label>-->
<!--                                </div>-->
<!--                                <div class="col-lg-3">-->
<!--                                    <label class="txt-style-4">October 10 1981</label>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                        <div class="row">-->
<!--                            <div class="col-lg-12 no-padding">-->
<!--                                <div class="col-lg-3">-->
<!--                                    <label>Report Type</label>-->
<!--                                </div>-->
<!--                                <div class="col-lg-9">-->
<!--                                    <label class="txt-style-4">Discharge Letter</label>-->
<!--                                </div>-->
<!--                                <div class="col-lg-3 clear">-->
<!--                                    <label>Department of Paediatrics</label>-->
<!--                                </div>-->
<!--                                <div class="col-lg-3">-->
<!--                                    <label class="txt-style-4"><b>Direct Line</b>&nbsp;&nbsp;01942-2644170</label>-->
<!--                                </div>-->
<!--                                <div class="col-lg-3">-->
<!--                                    <label>Fax Number</label>-->
<!--                                </div>-->
<!--                                <div class="col-lg-3">-->
<!--                                    <label class="txt-style-4">01942-2644176</label>-->
<!--                                </div>-->
<!--                                <div class="col-lg-3 clear">-->
<!--                                    <label>Reciever</label>-->
<!--                                </div>-->
<!--                                <div class="col-lg-9">-->
<!--                                    <label class="txt-style-4 col-lg-12 no-padding margin-bottom-xl">Dr. Foster, The GP Practice 999 Wigan Lane, WIGAN.</label>-->
<!--                                </div>-->
<!--                                <div class="col-lg-3">-->
<!--                                    <label>Patient</label>-->
<!--                                </div>-->
<!--                                <div class="col-lg-9">-->
<!--                                    <label class="txt-style-4">The House Street ST, Wetherfield,</label>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                        <div class="row">-->
<!--                            <div class="col-lg-12 no-padding">-->
<!--                                <div class="col-lg-3">-->
<!--                                    <label>Admission Details</label>-->
<!--                                </div>-->
<!--                                <div class="col-lg-9">-->
<!--                                    <label class="txt-style-4 col-lg-12 no-padding margin-bottom-xl">2/7 ago he was admittd with croup. He came back with fever, coryzeal symptoms anscongested tonsils. He was started on peniccline.</label>-->
<!--                                </div>-->
<!--                                <div class="col-lg-3">-->
<!--                                    <label>Admission Date/ Time</label>-->
<!--                                </div>-->
<!--                                <div class="col-lg-9">-->
<!--                                    <label class="txt-style-4 col-lg-12 no-padding margin-bottom-xl">24/03/2016 from Upper Johnsone Ward, RAEI</label>-->
<!--                                </div>-->
<!--                                <div class="col-lg-3 clear">-->
<!--                                    <label>Discharge Date</label>-->
<!--                                </div>-->
<!--                                <div class="col-lg-9">-->
<!--                                    <label class="txt-style-4 col-lg-12 no-padding margin-bottom-xl">25/03/2016 from Upper Johnsone Ward, RAEI</label>-->
<!--                                </div>-->
<!--                                <div class="col-lg-3 clear">-->
<!--                                    <label>Discharge Consultant</label>-->
<!--                                </div>-->
<!--                                <div class="col-lg-9">-->
<!--                                    <label class="txt-style-4 col-lg-12 no-padding margin-bottom-xl">DR RG Levy</label>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                        </div>-->
                        <div class="row">
                            <div class="col-lg-12 no-padding">
                                    <?php /*foreach ($data as $d){ */?>
                                    <div class="col-lg-3">
                                        <label><?php /*echo $d['field']->displayName; */ ;?></label>
                                    </div>
                                    <div class="col-lg-9">
                                        <label><?php /*echo $d['value']; */?></label>
                                    </div>
                                   <!-- --><?php /*} */?>
<!--                                <div class="col-lg-3">-->
<!--                                    <label>Primary Diagnosis</label>-->
<!--                                </div>-->
<!--                                <div class="col-lg-9">-->
<!--                                    <label class="txt-style-4 col-lg-12 no-padding margin-bottom-xl">Acute upper respiratory infection</label>-->
<!--                                </div>-->
<!--                                <div class="col-lg-3 clear">-->
<!--                                    <label>Secondary Diagnosis</label>-->
<!--                                </div>-->
<!--                                <div class="col-lg-9">-->
<!--                                    <label class="txt-style-4 col-lg-12 no-padding margin-bottom-xl"></label>-->
<!--                                </div>-->
<!--                                <div class="col-lg-3 clear">-->
<!--                                    <label>Discharge Medication</label>-->
<!--                                </div>-->
<!--                                <div class="col-lg-9">-->
<!--                                    <label class="txt-style-4 col-lg-12 no-padding margin-bottom-xl">Phenoxymethylpenicillin 125mg/5ml solution 7 day(s) supoly 125m</label>-->
<!--                                </div>-->
<!--                                <div class="col-lg-3">-->
<!--                                    <label>Follow Up</label>-->
<!--                                </div>-->
<!--                                <div class="col-lg-9">-->
<!--                                    <label class="txt-style-4 col-lg-12 no-padding margin-bottom-xl">No Follow Up</label>-->
<!--                                </div>-->
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-6">
                                <label class="txt-style-4 col-lg-12">ABC Hospital, XYZ Street, LMN Bulevard, AB 5432</label>
                            </div>
                            <div class="col-lg-6">
                                <label class="txt-style-4 pull-right text-right">+1 555 555 5555</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </body>
</html>
