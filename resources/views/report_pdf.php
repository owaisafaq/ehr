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
                                        <td colspan="1" align="right">
                                            <!--<h1 style="font-size:24px;color:#1a1a1a;display:inline-block;float:left;">Hospital Logo</h1>-->
                                            <img src="<?php echo $hospital->hospital_image; ?>" height="70px" width="90px">
                                        </td>
                                        <td style="line-height:20px;" colspan="1">
                                            <table align="right">
                                                <tr>
                                                    <td align="right">
                                                        <span style="display:block;font-size:12px;color:#939598;"><?php echo $hospital->address ;?><?php echo '<br>'; echo $hospital->city;?></span>
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
                                            <img style="max-width: 120px; max-height: 120px; padding-right: 15px" src="<?php echo $patient->patient_image; ?>" />
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
<!--                    <tr>
                        <td style="padding-top: 30px; padding-bottom: 30px; border-bottom: 1px solid #ebebeb;">
                            <table style="width: 100%;">
                                <tr>
                                    <td style="font-size: 13px;color:#1a1a1a; width: 30%; padding-bottom: 15px; font-weight: bold;">Report Type</td>
                                    <td style="font-size: 13px;color:#666666; width: 70%; padding-bottom: 15px;">Discharge Letter</td>
                                </tr>
                                <tr>
                                    <td style="font-size: 13px;color:#1a1a1a; width: 30%; padding-bottom: 15px; font-weight: bold; line-height: 20px;">Department of<br />Paediatrics</td>
                                    <td style="font-size: 13px;color:#666666; width: 70%; padding-bottom: 15px;"><b>Direct Line</b>&nbsp;01942-2644170 &nbsp;&nbsp;&nbsp;<b>Fax Number</b>&nbsp;01942-2644176</td>
                                </tr>
                                <tr>
                                    <td style="font-size: 13px;color:#1a1a1a; width: 30%; padding-bottom: 15px; font-weight: bold;">Reciever</td>
                                    <td style="font-size: 13px;color:#666666; width: 70%; padding-bottom: 15px;">Dr. Foster, The GP Practice 999 Wigan Lane, WIGAN. </td>
                                </tr>
                                <tr>
                                    <td style="font-size: 13px;color:#1a1a1a; width: 30%; padding-bottom: 15px; font-weight: bold;">Patient</td>
                                    <td style="font-size: 13px;color:#666666; width: 70%; padding-bottom: 15px;">The House Street ST, Wetherfield,</td>
                                </tr>
                            </table>
                    </tr>

                    <tr>
                        <td style="padding-top: 30px; padding-bottom: 30px; border-bottom: 1px solid #ebebeb;">
                            <table style="width: 100%;">
                                <tr>
                                    <td style="font-size: 13px;color:#1a1a1a; width: 30%; padding-bottom: 15px; font-weight: bold;">Admission Details</td>
                                    <td style="font-size: 13px;color:#666666; width: 70%; padding-bottom: 15px; line-height: 20px;">2/7 ago he was admittd with croup. He came back with fever, coryzeal symptoms ans congested tonsils. He was started on peniccline.</td>
                                </tr>
                                <tr>
                                    <td style="font-size: 13px;color:#1a1a1a; width: 30%; padding-bottom: 15px; font-weight: bold;">Admission Date/ Time</td>
                                    <td style="font-size: 13px;color:#666666; width: 70%; padding-bottom: 15px;">24/03/2016 from Upper Johnsone Ward, RAEI</td>
                                </tr>
                                <tr>
                                    <td style="font-size: 13px;color:#1a1a1a; width: 30%; padding-bottom: 15px; font-weight: bold;">Discharge Date</td>
                                    <td style="font-size: 13px;color:#666666; width: 70%; padding-bottom: 15px;">25/03/2016 from Upper Johnsone Ward, RAEI</td>
                                </tr>
                                <tr>
                                    <td style="font-size: 13px;color:#1a1a1a; width: 30%; padding-bottom: 15px; font-weight: bold;">Discharge Consultant</td>
                                    <td style="font-size: 13px;color:#666666; width: 70%; padding-bottom: 15px;">DR RG Levy</td>
                                </tr>
                            </table>
                    </tr>-->

                    <tr>
                        <td style="padding-top: 30px; padding-bottom: 30px; border-bottom: 1px solid #ebebeb;">
                            <table style="width: 100%;">
                                <?php foreach ($data as $d){ ?>
                                <tr>
                                    <td style="font-size: 13px;color:#1a1a1a; width: 30%; padding-bottom: 15px; font-weight: bold;"><?php echo $d['field']->displayName;?></td>
                                    <td style="font-size: 13px;color:#666666; width: 70%; padding-bottom: 15px;"><?php echo $d['value']; ?></td>
                                </tr>
                                <?php } ?>
                            </table>
                    </tr>

                </table>

            </div>

        </div>
    </body>
</html>