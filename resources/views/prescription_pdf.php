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
            .txt-style1{
                font-size: 20px !important;
                color: #212121;
                line-height: 29px;
            }
            p{
                margin: 0px;
            }
        </style>
    </head>
    <body>
        <div style="background: #fff;width: 715px;margin: 0 auto;">
            <table style="border-collapse: separate;width: 100%;box-sizing: border-box;padding: 20px;display: block;background-color: #464c61;">
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
                            <table style="width:100%;border-collapse: separate;">
                                <tbody>
                                    <tr>
                                        <td colspan="1" align="left">
                                            <!--<h1 style="font-size:24px;color:#1a1a1a;display:inline-block;float:left;">Hospital Logo</h1>-->
                                            <img src="<?php echo $hospital->hospital_image; ?>">
                                        </td>
                                        <td style="line-height:20px;" colspan="1">
                                            <table align="right" style="width: 100%;">
                                                <tr>
                                                    <td align="right">
                                                        <span style="display:block;font-size:12px;color:#939598; text-align: right;"><?php echo $hospital->address ;?><?php echo '<br>'; echo $hospital->city;?></span>
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
                            <table style="border-collapse: separate;width: 100%;margin-top: 20px;background-color: #fbfbfb;padding: 20px;box-sizing: border-box;">
                                <tbody>
                                    <tr>
                                        <td rowspan="4">
                                            <img style="max-width: 120px; max-height: 120px; padding-right: 15px;" src="<?php echo $patient->patient_image; ?>" />
                                        </td>

                                        <td>
                                            <h4 style="font-size:20px;color:#1a1a1a;text-align:left;"><?php echo $patient->patient_name?></h4>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span style="color:#1a1a1a;font-size:13px;font-weight:600;">Patient ID</span>
                                        </td>

                                        <td>
                                            <span style="color:#666666;font-size:13px;"><?php echo $patient->id?></span>
                                        </td>

                                        <td>
                                            <span style="color:#1a1a1a;font-size:13px;font-weight:600;">Age</span>
                                        </td>

                                        <td>
                                            <span style="color:#666666;font-size:13px;"><?php echo $patient->age?></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span style="color:#1a1a1a;font-size:13px;font-weight:600;">Gender</span>
                                        </td>

                                        <td>
                                            <span style="color:#666666;font-size:13px;"><?php echo $patient->gender?></span>
                                        </td>

                                        <td>
                                            <span style="color:#1a1a1a;font-size:13px;font-weight:600;">Marital Status</span>
                                        </td>

                                        <td>
                                            <span style="color:#666666;font-size:13px;"><?php echo $patient->marital_status?></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span style="color:#1a1a1a;font-size:13px;font-weight:600;">Date of Birth</span>
                                        </td>

                                        <td>
                                            <span style="color:#666666;font-size:13px;"><?php echo $patient->date_of_birth?></span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
              <tr>
                        <td>
                            <table style="width: 100%;">
                                <thead>
                                    <tr>
                                        <th style="padding: 10px; text-align: left; background: #ebebeb; font-size: 12px; color: #1a1a1a; font-weight: bold;">Medication</th>
                                        <th style="padding: 10px; text-align: left; background: #ebebeb; font-size: 12px; color: #1a1a1a; font-weight: bold;">Sig</th>
                                        <th style="padding: 10px; text-align: left; background: #ebebeb; font-size: 12px; color: #1a1a1a; font-weight: bold;">Dispence</th>
                                    </tr>
                                </thead>
                                <tbody>

                                <?php foreach($medication as $medications){?>

                                    <tr style="border:1px solid #ebebeb;">
                                        <td style="padding: 10px; border-right:1px solid #ebebeb; color: #666666; background: #f9f9f9; font-size: 13px; color: #666666;"><?php echo $medications->medication?></td>
                                        <td style="padding: 10px; border-right:1px solid #ebebeb; color: #666666; background: #f9f9f9; font-size: 13px; color: #666666;"><?php echo $medications->sig ?></td>
                                        <td style="padding: 10px; color: #666666; background: #f9f9f9; font-size: 13px; color: #666666;"><?php echo $medications->dispense ?></td>
                                    </tr>
                                <?php }?>

                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 30px 0 5px;">
                            <h3 style="font-size: 13px;color: #1a1a1a;">Note</h3>
                        </td>
                        </tr>
                    <tr>
                        <td style="padding-bottom: 30px; border-bottom: 1px solid #ebebeb;">
                            <p style="font-size: 13px; line-height: 20px; color: #999999;"><?php echo $prescription_notes->note_for_pharmacy?></p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-top: 30px;">
                            <span style="font-size: 13px; color: #666666;">Prescribed By</span>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-bottom: 30px;">
                            <h2 style="font-size: 18px; color: #1a1a1a;">Dr Marco Rubio</h2>
                        </td>
                    </tr>
                </table>

            </div>

        </div>
    </body>
</html>