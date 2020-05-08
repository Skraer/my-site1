<?php
$recepient = "example@gmail.com";       //почта, на которую будут приходить заявки
$sitename = "";     // здесь название сайта заголовка email сообщения

$name = trim($_POST["name"]);
$phone = trim($_POST["tel"]);
$date = date("d.m.Y H:i:s");
$message = 
"Имя: $name 
\nТелефон: $phone
\nДата и время заявки: $date";

$pagetitle = "Новая заявка с сайта \"$sitename\"";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");