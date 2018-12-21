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
        $mail->addAddress($_REQUEST['email']);
        $mail->addAddress('jacob@dopplercreative.com','Sonnovita Custom Color Palette');
        $mail->Subject = 'Sonnovita Custom Color Solution';
        $message = 
            '<html>'.
                '<head>'.
                    '<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>'.
                    '<style>'.
                        'p { color: #fff; }'.
                        '.section { background-color: #37312d; color: #fff; margin: auto; max-width: 100%; padding: 128px 24px; text-align: center; width: 480px; }'.
                        '.btn { background-color: #55504c; border-radius: 999px; box-sizing: border-box; color: #fff !important; display: inline-block; font-size: 18px; padding: 18px 24px; text-decoration: none; }'.
                    '</style>'.
                '</head>'.
                '<div class="section">'.
                    '<p><strong>Customer:</strong> '.$_REQUEST['name'].'</p>'.
                    '<p><strong>Phone Number:</strong> '.$_REQUEST['phone'].'</p>'.
                    '<p><strong>Email:</strong> '.$_REQUEST['email'].'</p>'.
                    '<a class="btn" href="'.$_REQUEST['url'].'">View Scheme</a>'.
                '</div>'.
                '<head>'.
            '<html>';
        $mail->msgHTML($message);
        $mail->AltBody = 'Unique custom palette: '+$_REQUEST['url'];

        //send the message, check for errors
        if (!$mail->send()) {
            echo "Mailer Error: " . $mail->ErrorInfo;
        } 
        else {
            echo 
            '<script>
                window.location = "'.$_REQUEST['url'].'";
                alert("Your unique color was successfully delivered! Check your email for additional details!");
            </script>';
        }
    ?>
    </body>
</html>
