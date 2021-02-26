<?php
session_start();

use \AmoCRM\Handler;
use \AmoCRM\Request;
use \AmoCRM\Lead;
use \AmoCRM\Contact;
use \AmoCRM\Note;
use \AmoCRM\Task;

require('vendor/autoload.php');

$name = htmlspecialchars($_POST['userName'], ENT_NOQUOTES, 'UTF-8');
$phone = htmlspecialchars($_POST['userPhone'], ENT_NOQUOTES, 'UTF-8');
$email = htmlspecialchars($_POST['userEmail'],ENT_NOQUOTES,'UTF-8');



$leadName = $name.'.Кухня.САЙТОТО2';
$tags = 'САЙТОТО2';    


//utm
$referer = $_SERVER['HTTP_REFERER'];
$arr = explode('?',$referer);
$arr = explode('&',$arr[1]);
$utm = array();
foreach($arr as $k=>$v)
{
 if (preg_match('/utm/i',$v))
 {
     $arr2 = explode('=', $v);
     $utm[$arr2[0]] = $arr2[1];
 }
}

$roistatData = array(
    'roistat' => isset($_COOKIE['roistat_visit']) ? $_COOKIE['roistat_visit'] : 'nocookie',
    'key'     => 'YTFlM2NhYjg0ZDViZTMyNDQ5YWNlMjJmMjQ2MjEwMGY6MTYyNjQ5', // Ключ для интеграции с CRM, указывается в настройках интеграции с CRM.
    'title'   => $leadName, // Название сделки
    'comment' => '', // Комментарий к сделке
    'name'    => $name, // Имя клиента
    'email'   => $email, // Email клиента
    'phone'   => $phone, // Номер телефона клиента
    'order_creation_method' => '', // Способ создания сделки (необязательный параметр). Укажите то значение, которое затем должно отображаться в аналитике в группировке "Способ создания заявки"
    'is_need_callback' => '0', // После создания в Roistat заявки, Roistat инициирует обратный звонок на номер клиента, если значение параметра равно 1 и в Ловце лидов включен индикатор обратного звонка.
    'callback_phone' => '<Номер для переопределения>', // Переопределяет номер, указанный в настройках обратного звонка.
    'sync'    => '0', // 
    'is_need_check_order_in_processing' => '1', // Включение проверки заявок на дубли
    'is_need_check_order_in_processing_append' => '1', // Если создана дублирующая заявка, в нее будет добавлен комментарий об этом
    
    'fields'  => array(
    // Массив дополнительных полей. Если дополнительные поля не нужны, оставьте массив пустым.
    // Примеры дополнительных полей смотрите в таблице ниже.
    // Помимо массива fields, который используется для сделки, есть еще массив client_fields, который используется для установки полей контакта.
    //"charset" => "Windows-1251", // Сервер преобразует значения полей из указанной кодировки в UTF-8.
    
      'tags' => $tags,
      '268103' => $utm['utm_source'],
      '268107' => $utm['utm_campaign'],
      '268105' => $utm['utm_medium'],
      '268109' => $utm['utm_content'],
      '268111' => $utm['utm_term'],
    
    ),
);
  
  
file_get_contents("https://cloud.roistat.com/api/proxy/1.0/leads/add?" . http_build_query($roistatData));





/*$subdomain = 'subDomain'; //Наш аккаунт - поддомен
$user = array(
    'USER_LOGIN' => 'userLogin', //Ваш логин (электронная почта)
    'USER_HASH' => 'userAPIHash' //Хэш для доступа к API (смотрите в профиле пользователя)
);
$phoneFieldId = '169815'; //ID поля "Телефон" в amocrm
$emailFieldId = '169817'; //ID поля "Email" в amocrm
$responsibleId = '2614519'; //ID Ответственного сотрудника в amocrm

$dealName = 'ТЕСТ INTERVOLGA'; //Название создаваемой сделки
$dealStatusID = '20476129'; //ID статуса сделки
$dealSale = '1'; //Сумма сделки
$dealTags = 'test';  //Теги для сделки
$contactTags = 'test'; //Теги для контакта

/**
 * Если мы успешно авторизовались, то ищем существующий контакт с email из формы.
 * Если контакт существует, создается новая сделка, контакт привязывается помимо своих сделок в новую
 * Если контакта не существует, просто создается новый контакт с данными из формы.
 */
/*if (authorize($user, $link) > 0) {
    $contactInfo = findContact($subdomain, $email);
    $idContact = $contactInfo['idContact'];
    if ($idContact != null) {
        $idDeal[] = addDeal($dealName, $dealStatusID, $dealSale, $responsibleId, $dealTags, $subdomain);
        if ($idDeal != null) {
            if (!empty($contactInfo['idLeads'])) {
                foreach ($contactInfo['idLeads'] as $idLeads) {
                    $idDeal[] = $idLeads;
                }
            }
            echo $idDeal;
            editContact($idContact, $idDeal, $subdomain);
        }
    } else {
        addContact($name,$responsibleId,$phoneFieldId,$phone,$emailFieldId,$email, $subdomain, $contactTags);
    }
}*/

header('Location: index.php');

/**Функуция авторизации скрипта на amocrm.
 * @param $user {array} - массив с логином пользователя и hash api ключем
 * @param $subdomain {string} - поддомен, по которому имеем доступ к amocrm
 * @return int - Если авторизовались = 1, если нет = -1.
 */
function authorize($user, $subdomain)
{
    $link = 'https://' . $subdomain . '.amocrm.ru/private/api/auth.php?type=json';
    $curl = curl_init(); #Сохраняем дескриптор сеанса cURL
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_USERAGENT, 'amoCRM-API-client/1.0');
    curl_setopt($curl, CURLOPT_URL, $link);
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'POST');
    curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($user));
    curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
    curl_setopt($curl, CURLOPT_HEADER, false);
    curl_setopt($curl, CURLOPT_COOKIEFILE, __DIR__ . '/cookie.txt');
    curl_setopt($curl, CURLOPT_COOKIEJAR, __DIR__ . '/cookie.txt');
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);
    $out = curl_exec($curl);
    $code = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    curl_close($curl);
    $code = (int)$code;
    $errors = array(
        301 => 'Moved permanently',
        400 => 'Bad request',
        401 => 'Unauthorized',
        403 => 'Forbidden',
        404 => 'Not found',
        500 => 'Internal server error',
        502 => 'Bad gateway',
        503 => 'Service unavailable'
    );
    try {
        if ($code != 200 && $code != 204)
            throw new Exception(isset($errors[$code]) ? $errors[$code] : 'Undescribed error', $code);
    } catch (Exception $E) {
        die('Ошибка: ' . $E->getMessage() . PHP_EOL . 'Код ошибки: ' . $E->getCode());
    }
    $Response = json_decode($out, true);
    $Response = $Response['response'];
    if (isset($Response['auth']))
    {
        return 1;
    }
    return -1;
}


/**
 * Функция изменения существующего контакта - привязывает контакта к сделке
 * @param $idContact {number} - ID контакта
 * @param $idDeal {number} - ID сделки
 * @param $subdomain {string} - поддомен для доступа к amocrm
 * @return int - id измененного пользователя.
 */
function editContact($idContact, $idDeal, $subdomain)
{

    $contacts['update'] = array(
        array(
            'id' => $idContact,
            'updated_at' => time(),
            'leads_id' => $idDeal,
        )
    );

    $link = 'https://' . $subdomain . '.amocrm.ru/api/v2/contacts';

    $curl = curl_init();
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_USERAGENT, 'amoCRM-API-client/1.0');
    curl_setopt($curl, CURLOPT_URL, $link);
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'POST');
    curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($contacts));
    curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
    curl_setopt($curl, CURLOPT_HEADER, false);
    curl_setopt($curl, CURLOPT_COOKIEFILE, __DIR__ . '/cookie.txt');
    curl_setopt($curl, CURLOPT_COOKIEJAR, __DIR__ . '/cookie.txt');
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);
    $out = curl_exec($curl);
    $code = curl_getinfo($curl, CURLINFO_HTTP_CODE);

    $code = (int)$code;
    $errors = array(
        301 => 'Moved permanently',
        400 => 'Bad request',
        401 => 'Unauthorized',
        403 => 'Forbidden',
        404 => 'Not found',
        500 => 'Internal server error',
        502 => 'Bad gateway',
        503 => 'Service unavailable'
    );
    try {
        if ($code != 200 && $code != 204) {
            throw new Exception(isset($errors[$code]) ? $errors[$code] : 'Undescribed error', $code);
        }
    } catch (Exception $E) {
        die('Ошибка: ' . $E->getMessage() . PHP_EOL . 'Код ошибки: ' . $E->getCode());
    }
    $Response = json_decode($out, true);
    $Response = $Response['_embedded']['items'][0]['id'];
    return $Response;
}

/**
 * Функция поиска существующего контакта
 * @param $subdomain {string} - поддомен для доступа к amocrm
 * @param $email {string} - email пользователя
 * @return array - массив с id пользователя и со списком сделок, к которым он привязан
 */
function findContact($subdomain, $email)
{
    $link = 'https://' . $subdomain . '.amocrm.ru/api/v2/contacts/?query=' . $email;
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_USERAGENT, 'amoCRM-API-client/1.0');
    curl_setopt($curl, CURLOPT_URL, $link);
    curl_setopt($curl, CURLOPT_HEADER, false);
    curl_setopt($curl, CURLOPT_COOKIEFILE, __DIR__ . '/cookie.txt');
    curl_setopt($curl, CURLOPT_COOKIEJAR, __DIR__ . '/cookie.txt');
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);
    $out = curl_exec($curl);
    $code = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    curl_close($curl);
    $code = (int)$code;
    $errors = array(
        301 => 'Moved permanently',
        400 => 'Bad request',
        401 => 'Unauthorized',
        403 => 'Forbidden',
        404 => 'Not found',
        500 => 'Internal server error',
        502 => 'Bad gateway',
        503 => 'Service unavailable'
    );
    try {
        if ($code != 200 && $code != 204) {
            throw new Exception(isset($errors[$code]) ? $errors[$code] : 'Undescribed error', $code);
        }
    } catch (Exception $E) {
        die('Ошибка: ' . $E->getMessage() . PHP_EOL . 'Код ошибки: ' . $E->getCode());
    }

    $Response = json_decode($out, true);
    $Response = $Response['_embedded']['items'][0];
    $Response['idContact'] = $Response['id'];
    $Response['idLeads'] = $Response['leads']['id'];
    return $Response;
}


/**
 * Функция добавления нового контакта. Привязывается мобильный телефон и рабочий Email.
 * @param $name {string} - имя пользователя
 * @param $responsibleId {number} - ID ответственного и создателя
 * @param $phoneFieldId {number} - ID кастомного поля "Телефон"
 * @param $phone {string} - телефон пользователя
 * @param $emailFieldId {number} - ID кастомного поля "Email"
 * @param $email {string} - email пользователя
 * @param $subdomain {string} - поддомен для доступа к amocrm
 * @return int - ID добавленного пользователя
 */
function addContact($name,$responsibleId,$phoneFieldId,$phone,$emailFieldId,$email, $subdomain, $contactTags)
{
    $contacts['add'] = array(
        array(
            'name' => $name,
            'responsible_user_id' => $responsibleId,
            'created_by' => $responsibleId,
            'created_at' => time(),
            'tags' => $contactTags, //Теги
            'custom_fields' => array(
                array(
                    'id' => "$phoneFieldId",
                    'values' => array(
                        array(
                            'value' => "$phone",
                            'enum' => "MOB"
                        )
                    )
                ),
                array(
                    'id' => $emailFieldId,
                    'values' => array(
                        array(
                            'value' => $email,
                            'enum' => "WORK"
                        )
                    )
                ),
            ),
        )
    );
    $link = '';
    $link .= 'https://' . $subdomain . '.amocrm.ru/api/v2/contacts';

    $curl = curl_init();
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_USERAGENT, 'amoCRM-API-client/1.0');
    curl_setopt($curl, CURLOPT_URL, $link);
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'POST');
    curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($contacts));
    curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
    curl_setopt($curl, CURLOPT_HEADER, false);
    curl_setopt($curl, CURLOPT_COOKIEFILE, __DIR__ . '/cookie.txt');
    curl_setopt($curl, CURLOPT_COOKIEJAR, __DIR__ . '/cookie.txt');
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);
    $out = curl_exec($curl);
    $code = curl_getinfo($curl, CURLINFO_HTTP_CODE);

    $code = (int)$code;
    $errors = array(
        301 => 'Moved permanently',
        400 => 'Bad request',
        401 => 'Unauthorized',
        403 => 'Forbidden',
        404 => 'Not found',
        500 => 'Internal server error',
        502 => 'Bad gateway',
        503 => 'Service unavailable'
    );
    try {
        if ($code != 200 && $code != 204) {
            throw new Exception(isset($errors[$code]) ? $errors[$code] : 'Undescribed error', $code);
        }
    } catch (Exception $E) {
        die('Ошибка: ' . $E->getMessage() . PHP_EOL . 'Код ошибки: ' . $E->getCode());
    }

    $Response = json_decode($out, true);
    $Response = $Response['_embedded']['items'][0]['id'];
    return $Response;
}

/**Функция создания новой сделки
 * @param $subdomain
 * @param $responsibleId
 * @return mixed
 */
function addDeal($dealName, $dealStatusID, $dealSale, $responsibleId, $dealTags, $subdomain)
{
    $leads['add'] = array(
        array(
            'name' => $dealName,
            'created_at' => time(),
            'status_id' => $dealStatusID,
            'sale' => $dealSale,
            'responsible_user_id' => $responsibleId,
            'tags' => $dealTags
        ),
    );

    $link = 'https://' . $subdomain . '.amocrm.ru/api/v2/leads';
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_USERAGENT, 'amoCRM-API-client/1.0');
    curl_setopt($curl, CURLOPT_URL, $link);
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'POST');
    curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($leads));
    curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
    curl_setopt($curl, CURLOPT_HEADER, false);
    curl_setopt($curl, CURLOPT_COOKIEFILE, __DIR__ . '/cookie.txt');
    curl_setopt($curl, CURLOPT_COOKIEJAR, __DIR__ . '/cookie.txt');
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);
    $out = curl_exec($curl);
    $code = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    $code = (int)$code;
    $errors = array(
        301 => 'Moved permanently',
        400 => 'Bad request',
        401 => 'Unauthorized',
        403 => 'Forbidden',
        404 => 'Not found',
        500 => 'Internal server error',
        502 => 'Bad gateway',
        503 => 'Service unavailable'
    );
    try {
        if ($code != 200 && $code != 204) {
            throw new Exception(isset($errors[$code]) ? $errors[$code] : 'Undescribed error', $code);
        }
    } catch (Exception $E) {
        die('Ошибка: ' . $E->getMessage() . PHP_EOL . 'Код ошибки: ' . $E->getCode());
    }
    $Response = json_decode($out, true);
    $Response = $Response['_embedded']['items'][0]['id'];
    return $Response;
}