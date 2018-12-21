<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <title>Sonnovita</title>
    </head>
    <body>
    <?php
        //initialize mailer object
        require 'class.phpmailer.php';

        //parse url into image src urls
        $url = $_REQUEST['url'];
        $url_array = parse_url($url);
        $img_url = $url_array['scheme'].'://'.$url_array['host'].'/img/textures';
        parse_str($url_array['query'], $query);

        //Create a new PHPMailer instance
        $mail = new PHPMailer();
        $mail->IsHTML(true);
        $mail->setFrom('matt@copperplank.com','Sonnovita');
        //$mail->addAddress('matt@copperplank.com');
        $mail->addAddress($_REQUEST['email']);
        $mail->Subject = 'Sonnovita Custom Color #'.getdate()[0];
        $message = 
            '<html>'.
                '<head>'.
                    '<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>'.
                    '<style>'.
                        'p { color: #fff; }'.
                        '.section { background-color: #37312d; box-sizing: border-box; color: #fff; margin: auto; max-width: 100%; padding: 64px; text-align: center; width: 480px; }'.
                        '.btn { background-color: #55504c; border-radius: 999px; box-sizing: border-box; color: #fff !important; display: inline-block; font-size: 18px; padding: 18px 24px; text-decoration: none; }'.
                        '.grid { display: flex; max-width: 240px; margin: auto; padding: 12px 0 24px; }'.
                        '.texture { display: inline-block; width: 48px; height: 48px; background-size: cover; background-position: center; }'.
                    '</style>'.
                '</head>'.
                '<div class="section">'.
                    '<p>Thank you for using the Sonnovita color editor. Your custom color scheme is linked below.</p>'.
                    '<div class="grid">'.
                        '<img class="texture" src="'.$img_url.'/panels/'.$query['panel-a'].'.jpg" width="64px" height="64px" />'.
                        '<img class="texture" src="'.$img_url.'/panels/'.$query['panel-b'].'.jpg" width="64px" height="64px" />'.
                        '<img class="texture" src="'.$img_url.'/couches/'.$query['couch'].'.jpg" width="64px" height="64px" />'.
                        '<img class="texture" src="'.$img_url.'/cabinets/'.$query['cabinet'].'.jpg" width="64px" height="64px" />'.
                        '<img class="texture" src="'.$img_url.'/headboards/'.$query['headboard'].'.jpg" width="64px" height="64px" />'.
                    '</div>'.
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
                alert("Success! Your email will arrive shortly");
            </script>';
        }
    ?>
    </body>
</html>
