<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <title>Sonnovita</title>
        <style>
            .section { background-color: #37312d; color: #fff; margin: auto; max-width: 100%; text-align: center; width: 480px; }
            .btn { background-color: #55504c; border-radius: 999px; box-sizing: border-box; color: #fff; display: inline-block; font-size: 18px; padding: 18px 24px; text-decoration: none; }
        </style>
    </head>
    <body>
    <?php
        require 'class.phpmailer.php';
        //Create a new PHPMailer instance
        $mail = new PHPMailer();
        $mail->IsHTML(true);
        $mail->setFrom('matt@copperplank.com','Sonnovita');
        $mail->addAddress($_REQUEST['email'], $_REQUEST['index']);
        $mail->addAddress('jacob@dopplercreative.com','Sonnovita Custom Color Palette');
        $mail->Subject = 'Sonnovita Custom Color Solution';
        $message = 
            '<html>'.
                '<head>'.
                    '<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>'.
                    '<style>'.
                        'p { color: #fff; }'.
                        '.section { background-color: #37312d; color: #fff; margin: auto; max-width: 100%; padding: 24px; text-align: center; width: 480px; }'.
                        '.btn { background-color: #55504c; border-radius: 999px; box-sizing: border-box; color: #fff; display: inline-block; font-size: 18px; padding: 18px 24px; text-decoration: none; }'.
                    '</style>'.
                '</head>'.
                '<div class="section">'.
                    '<p><strong>Customer:</strong> '.$_REQUEST['name'].'</p>'.
                    '<p><strong>Firm Name:</strong> '.$_REQUEST['firm'].'</p>'.
                    '<p><strong>Project Name:</strong> '.$_REQUEST['project'].'</p>'.
                    '<p><strong>Phone Number:</strong> '.$_REQUEST['phone'].'</p>'.
                    '<p><strong>Your custom color palette:</strong> </p>'.
                    '<a class="btn" href="'.$_REQUEST['index'].'">'.$_REQUEST['index'].'</a>'.
                '</div>'.
                '<head>'.
            '<html>';
        $mail->msgHTML($message);
        $mail->AltBody = 'Unique custom palette: '+$_REQUEST['index'];

        //send the message, check for errors
        if (!$mail->send()) {
            echo "Mailer Error: " . $mail->ErrorInfo;
        } 
        else {
            echo 
            '<script>
                window.location = "../'.$_REQUEST['index'].'";
                alert("Your unique color was successfully delivered! Check your email for additional details!");
            </script>';
        }
    ?>
    </body>
</html>
