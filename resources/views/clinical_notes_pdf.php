<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>EHR - Report</title>
        <style type="text/css">
            body {
                margin: 0px;
                padding: 0px;
                font-size: 17px;
                font-family: Arial, Helvetica, sans-serif;
                background-color:#fff;
                color:#000;
            }
            table {
                border-collapse: collapse;
                margin: 0px auto;
                border: 0px;
            }
            h1,h2,h3,h4,h5,h6{
                margin: 0;
            }
            a, a:focus, a:active, a:hover, a:visited, a:link {
                color: #fe5151;
                text-decoration: none;
            }
            .btn-red {
                background: #fe5151;
                text-align: center;
                display: inline-block;
                color: #fff !important;
                text-decoration: none;
                border-radius: 35px;
                letter-spacing: 2px;
                font-size:24px !important;
                letter-spacing:1px;
                padding: 22px 50px;
                line-height: 24px;
                font-weight:bold;
            }
            .img-responsove {
                width: 100%;
            }
            .color-red{
                color: #ff4650;
            }
            .txt-style1{
                font-size: 20px !important;
                color: #212121;
                line-height: 29px;
            }
            p{
                color: #5f7c8d;
                font-size: 20px !important;
                margin: 0px;
                line-height: 26px;
            }
            .vacancies_con{
                margin-top: 30px;
            }

            .h2-style{
                font-size:30px !important; color:#212121; margin:0px; font-weight:normal; margin: 30px 0;
            }
            .img-cont
            {
                display: inline-block;
                float: left;
                width: 100px;
                height: 100px;
                border: 4px solid #d8d8d8;
                margin-right: 16px;
                border-radius: 50%;
                overflow: hidden;
                min-width: 100px;
                min-height: 100px;
            }
            .img-cont img
            {
                width: 100%;
                height: auto;
                line-height: 0;
                margin: 0;
                border-radius: 0;
            }
            .user-detail
            {
                display: inline-block;
                text-align: left;
            }
            .shuffle-img-cont
            {
                column-count: 3;
                -moz-column-count: 3;
                -ms-column-count: 3;
                -o-column-count: 3;
                -webkit-column-count: 3;
                column-fill: balance;
                -moz-column-fill: balance;
                -ms-column-fill: balance;
                -o-column-fill: balance;
                -webkit-column-fill: balance;
                column-gap: 20px;
                -moz-column-gap: 10px;
                -ms-column-gap: 10px;
                -o-column-gap: 10px;
                -webkit-column-gap: 10;
                padding: 30px 0px 40px 0px;
                width: 100%;
                margin: auto;
            }

            .shuffle-img-cont img
            {
                display: inline-block;
                border: 1px solid #d8d8d8;
                border-radius: 5px;
                -webkit-column-break-inside: avoid;
                -moz-column-break-inside: avoid;
                column-break-inside: avoid;
                display: inline-block;
                padding: 0;
                margin-bottom: 20px;
                width: 100%;
            }

        </style>
    </head>

    <body>
        <div style="background: #fff;width: 715px;margin: 0 auto;">

            <table style="width: 100%;padding: 20px;background-color: #464c61;">
                <tr>
                    <td>
                        <h3 style="color: #fff;">Order Reports Sign Off</h3>
                    </td>
                </tr>
            </table>
            <div style="background-color:#f9fafd;padding:20px;width:100%;box-sizing:border-box;">

                <table border="0"  style="width:100%;background-color:#fff;padding:40px;border-collapse:separate;">
                    <tr>
                        <td>
                            <table style="width:100%;border-bottom:1px solid #ebebeb;border-collapse: separate;padding-bottom: 15px;"  class="wrap header">
                                <tbody>
                                    <tr>
                                        <td colspan="1" align="right">
                                            <!--<h1 style="font-size:24px;color:#1a1a1a;display:inline-block;float:left;">Hospital Logo</h1>-->
                                            <img src="<?php echo $hospital->hospital_image; ?>" height="70px" width="90px">
                                        </td>
                                        <td colspan="1" align="center">
                                            <h4 style="font-size:18px;color:#999999;display:inline-block;margin-left:10px;float:left;line-height:40px;"><?php echo $hospital->name; ?></h4>
                                        </td>

                                        <td style="line-height:20px;" colspan="1">
                                            <table align="right">
                                                <tr>
                                                    <td align="right">
                                                        <span style="display:block;font-size:12px;color:#b8b8b8;">+<?php echo $hospital->phone;?></span>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td align="right">
                                                        <span style="display:block;font-size:12px;color:#b8b8b8;"><?php echo $hospital->website;?></span>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td align="right">
                                                        <span style="display:block;font-size:12px;color:#b8b8b8;"><?php echo $hospital->address ;?><?php echo '<br>'; echo $hospital->city;?> </span>
                                                    </td>
                                                </tr>
                                            </table>

                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <table style="margin:0;width: 589px;">
                                <tbody>
                                    <tr>
                                        <td colspan="4" style="padding:15px 0;">
                                            <h4 style="color:#000;font-size:14px;text-transform:uppercase;">Document Type: Consultation Note/Clinical Note</h4>
                                        </td>
                                    </tr>
                                    <tr style="border:1px solid #ebebeb;padding:10px 20px;">
                                        <td style="padding: 10px;">
                                            <h5 style="font-size: 12px;color:#1a1a1a;display:inline-block;align:left;">Consultant</h5>
                                        </td>

                                        <td style="border-right:1px solid #ebebeb;">
                                            <span style="font-size:12px;color:#333333;align:right;">Dr Troy Larson</span>
                                        </td>

                                        <td style="padding: 10px;">
                                            <h5 style="font-size: 12px;color:#1a1a1a;display:inline-block;align:left;">Specialty</h5>
                                        </td>

                                        <td style="border-right:1px solid #ebebeb;">
                                            <span style="font-size:12px;color:#333333;align:right;">Dental</span>
                                        </td>

                                        <td style="padding: 10px;">
                                            <h5 style="font-size: 12px;color:#1a1a1a;display:inline-block;align:left;">Date:</h5>
                                        </td>

                                        <td style="border-right:1px solid #ebebeb;">
                                            <span style="font-size:12px;color:#333333;align:right;">24 April 2016</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <table style="border-collapse: separate;width: 100%;margin-top: 20px;background-color: #fbfbfb;padding: 20px">

                                <tbody>
                                    <tr>
                                        <td rowspan="4">
                                            <img style="max-width: 120px; max-height: 120px; padding-right: 15px;" src="<?php echo $patient->patient_image; ?>">
                                        </td>

                                        <td>
                                            <h4 style="font-size:18px;color:#1a1a1a;text-align:left;"><?php echo $patient->patient_name; ?></h4>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span style="color:#1a1a1a;font-size:12px;font-weight:600;">Patient ID</span>
                                        </td>

                                        <td>
                                            <span style="color:#1a1a1a;font-size:12px;"><?php echo $patient->id; ?></span>
                                        </td>

                                        <td>
                                            <span style="color:#1a1a1a;font-size:12px;font-weight:600;">Age</span>
                                        </td>

                                        <td>
                                            <span style="color:#1a1a1a;font-size:12px;"><?php echo $patient->age; ?></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span style="color:#1a1a1a;font-size:12px;font-weight:600;">Gender</span>
                                        </td>

                                        <td>
                                            <span style="color:#1a1a1a;font-size:12px;"><?php echo $patient->gender; ?></span>
                                        </td>

                                        <td>
                                            <span style="color:#1a1a1a;font-size:12px;font-weight:600;">Marital Status</span>
                                        </td>

                                        <td>
                                            <span style="color:#1a1a1a;font-size:12px;"><?php echo $patient->marital_status; ?></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span style="color:#1a1a1a;font-size:12px;font-weight:600;">Date of Birth</span>
                                        </td>

                                        <td>
                                            <span style="color:#1a1a1a;font-size:12px;"><?php echo $patient->date_of_birth?></span>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table style="width:100%;box-sizing:border-box"  class="wrap header">

                                <?php for ($i=0;$i<=3;$i++) { ?>
                                    <tr>
                                        <td style="padding-bottom:20px;">
                                            <h4 style="font-size:12px;color:#1a1a1a;font-weight:bold;"><?php echo $data[$i]['field']->displayName; ?></h4>
                                        </td>
                                    </tr>

                                    <?php if ($data[$i]['field']->displayName == 'Diagnosis') { ?>
                                        <?php if (!empty($diagnosis)) { ?>

                                            <?php foreach ($diagnosis as $diagnose) { ?>

                                                <tr>
                                                    <td style="padding-bottom:20px;">
                                                        <p style="font-size:12px !important;color:#333333;line-height:18px !important;">
                                                            <?php echo $diagnose['diagnosis']; ?>
                                                        </p>
                                                    </td>
                                                </tr>
                                            <?php }

                                        } ?>

                                    <?php } ?>


                                    <tr>
                                        <td style="padding-bottom:20px;">
                                            <p style="<?php if ($data[$i]['field']->displayName == 'Diagnosis') { ?> display: none; <?php } ?>font-size:12px !important;color:#333333;line-height:18px !important;">
                                                <?php echo $data[$i]['value']; ?>
                                            </p>
                                        </td>
                                    </tr>


                                <?php } ?>

                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <table style="width:100%;box-sizing:border-box" class="wrap header">

                                <?php for ($i=4; $i <= count($data); $i++) { ?>
                                    <tr>
                                        <td style="padding-bottom:20px;">
                                            <h4 style="font-size:12px;color:#1a1a1a;font-weight:bold;"><?php echo $data[$i]['field']->displayName; ?></h4>
                                        </td>
                                    </tr>

                                    <?php if ($data[$i]['field']->displayName == 'Diagnosis') { ?>
                                        <?php if (!empty($diagnosis)) { ?>

                                            <?php foreach ($diagnosis as $diagnose) { ?>

                                                <tr>
                                                    <td style="padding-bottom:20px;">
                                                        <p style="font-size:12px !important;color:#333333;line-height:18px !important;">
                                                            <?php echo $diagnose['diagnosis']; ?>
                                                        </p>
                                                    </td>
                                                </tr>
                                            <?php }

                                        } ?>

                                    <?php } ?>


                                    <tr>
                                        <td style="padding-bottom:20px;">
                                            <p style="<?php if ($data[$i]['field']->displayName == 'Diagnosis') { ?> display: none; <?php } ?>font-size:12px !important;color:#333333;line-height:18px !important;">
                                                <?php echo $data[$i]['value']; ?>
                                            </p>
                                        </td>
                                    </tr>


                                <?php } ?>

                            </table>
                        </td>
                    </tr>


                    <tr>
                        </td>
                            <table style="width:100%;box-sizing:border-box;" class="wrap header">


                                <tr>
                                    <td style="padding-bottom:10px;">
                                        <span style="font-size:12px;color:#1a1a1a;font-weight:bold;">
                                           Immunizations
                                        </span>
                                    </td>
                                </tr>

                                <tr>
                                    <td style="padding-bottom:20px;">
                                        <ul style="font-size:12px;color:#1a1a1a;padding:0 16px;margin:0;">
                                            <?php foreach ($immunizations as $immunization) { ?>
                                                <li><?php echo $immunization->name; ?></li>
                                            <?php } ?>
                                        </ul>
                                    </td>
                                </tr>


                                <tr>
                                    <td style="padding-bottom:20px;">
                                        <h4 style="font-size:12px;color:#1a1a1a;font-weight:bold;">Family History</h4>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding-bottom:20px;">
                                        <?php foreach ($family_history as $history) { ?>
                                        <p style="font-size:12px !important;color:#333333;line-height:18px !important;"><?php echo $history->name; ?></p>
                                        <?php } ?>
                                    </td>
                                </tr>


                                <tr>
                                    <td style="padding-bottom:10px;">
                                        <span style="font-size:12px;color:#1a1a1a;font-weight:bold;">
                                            Active Problems
                                        </span>
                                    </td>
                                </tr>

                                <tr>
                                    <td style="padding-bottom:20px;">
                                        <ul style="font-size:12px;color:#1a1a1a;padding:0 16px;margin: 0;">
                                            <?php foreach ($active_problems as $problems) { ?>
                                                <li><?php echo $problems->name; ?></li>
                                            <?php } ?>
                                        </ul>
                                    </td>
                                </tr>

                            </table>
                        </td>
                    </tr>


                    <!--owais do your code here-->
                    <tr>
                        <td>
                            <table style="width: 100%;">
                                <thead>
                                <tr>
                                    <th style="padding: 10px; text-align: left; background: #ebebeb; font-size: 12px; color: #1a1a1a; font-weight: bold;">
                                        Order ID:
                                    </th>
                                    <th style="padding: 10px; text-align: left; background: #ebebeb; font-size: 12px; color: #1a1a1a; font-weight: bold;">
                                        lab
                                    </th>
                                    <th style="padding: 10px; text-align: left; background: #ebebeb; font-size: 12px; color: #1a1a1a; font-weight: bold;">
                                        Ordered By
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <?php foreach ($orders as $order) { ?>
                                    <tr style="border:1px solid #ebebeb;">
                                        <td style="padding: 10px; border-right:1px solid #ebebeb; color: #666666; background: #f9f9f9; font-size: 13px; color: #666666;"><?php echo $order->id; ?></td>
                                        <td style="padding: 10px; border-right:1px solid #ebebeb; color: #666666; background: #f9f9f9; font-size: 13px; color: #666666;"><?php echo $order->lab_name; ?></td>
                                        <td style="padding: 10px; color: #666666; background: #f9f9f9; font-size: 13px; color: #666666;">
                                            Dr James
                                        </td>
                                    </tr>
                                <?php } ?>
                                </tbody>
                            </table>
                        </td>
                    </tr>

                </table>
            </div>
        </div>
    </body>
</html>
