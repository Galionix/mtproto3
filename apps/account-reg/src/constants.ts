// getNumber error responses
/*
WRONG_MAX_PRICE:$min - указанная максимальная цена меньше допустимой

$min - минимальная допустимая цена

BAD_ACTION - некорректное действие

BAD_SERVICE - некорректное наименование сервиса

BAD_KEY - неверный API-ключ

ERROR_SQL - ошибка SQL-сервера

BANNED:'YYYY-m-d H-i-s' - время на которое аккаунт заблокирован

WRONG_EXCEPTION_PHONE - некорректные исключающие префиксы

NO_BALANCE_FORWARD - недостаточно средств для покупки переадресации

CHANNELS_LIMIT - аккаунт заблокирован
*/
export const getNumberErrorResponses = [
  "WRONG_MAX_PRICE",
  "BAD_ACTION",
  "BAD_SERVICE",
  "BAD_KEY",
  "ERROR_SQL",
  "BANNED",
  "WRONG_EXCEPTION_PHONE",
  "NO_BALANCE_FORWARD",
  "CHANNELS_LIMIT",
  "NO_NUMBERS",
  "NO_BALANCE",
];

// in minutes
export const max_old_activation_time = 5;
// we pick closest to maximum price
export const sms_activate_base_price = 80;

export const sms_activate_max_price = 150;
export const try_number = "14348261679";
