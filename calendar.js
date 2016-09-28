/**
 * Created by che on 07.04.16.
 */
//
// Нажатие по кнопке "Записаться на прием",
// проверка заполненных данных,
// отправка формы.
//
var formJS = {

    workForm : function() {

        var days,
            recordDay,
            name,
            inputName,
            inputPhone,
            phone,
            month,
            errors;

        errors = false;
        days = document.getElementById('calendar').querySelectorAll('td');
        inputName = document.querySelector('[name=name]');
        name = inputName.value;

        month = document.querySelector('.current-month').innerHTML;

        inputPhone = document.querySelector('[name=phone]');
        phone = inputPhone.value;

        for ( var i = 0; i < days.length; i++ ) {

            if ( days[i].classList.contains('current-td') ) {

                recordDay = days[i].innerHTML;
                errors = false;
                break;

            } else errors = true;

        }

        if ( !formJS.validateNotEmpty(name) ) {

            renderError();
            inputName.setAttribute('placeholder', 'Укажите ваше имя');
            errors = true;

        }

        if ( !formJS.validatePhoneNumber(phone) ) {

            renderError();
            inputPhone.setAttribute('placeholder', 'Укажите ваш телефон');
            errors = true;

        }

        if (!errors) {

            var msg = '<p>' + month + '</p>' +
                '<p>' + recordDay + '</p>' +
                '<p>' + name + '</p>' +
                '<p>' + phone + '</p>';

            var xhr = new XMLHttpRequest();

            // 2. Конфигурируем его: POST-запрос на URL 'mail.php'
            xhr.open('POST', '../mail.php', true);

            xhr.addEventListener('load', function() {
                if (xhr.status != 200) {
                    // обработать ошибку
                    alert( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
                } else {

                    successRecord();

                }
            });

            xhr.send(msg);

        }

    },

    validateNotEmpty: function(text) {
        return text.length
    },

    validatePhoneNumber: function(phoneNumber) {

        var re = /^[\d+| |\(|\)|\-|\+]+$/g;

        if (re.test(phoneNumber) && phoneNumber.length > 7) {
            return true;
        } else {
            return false;
        }
    }

};

function renderError() {

    var tooltip;

    tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.innerHTML = 'Не все данные введены';

    document.body.appendChild(tooltip);

    setTimeout(function() {

        tooltip.classList.add('hide');

    }, 2000);

}
//
// Создает календарь
//
function createCalendar(id, year, month) {
    var elem = document.getElementById(id);

    var mon = month - 1; // месяцы в JS идут от 0 до 11, а не от 1 до 12
    var d = new Date(year, mon);

    var table = '<table><tr>';

    // заполнить первый ряд от понедельника
    // и до дня, с которого начинается месяц
    // * * * | 1  2  3  4
    for (var i = 0; i < getDay(d); i++) {
        table += '<td></td>';
    }

    // ячейки календаря с датами
    while (d.getMonth() == mon) {
        table += '<td>' + d.getDate() + '</td>';

        if (getDay(d) % 7 == 6) { // вс, последний день - перевод строки
            table += '</tr><tr>';
        }

        d.setDate(d.getDate() + 1);
    }

    // добить таблицу пустыми ячейками, если нужно
    if (getDay(d) != 0) {
        for (var i = getDay(d); i < 7; i++) {
            table += '<td></td>';
        }
    }

    // закрыть таблицу
    table += '</tr></table>';

    // только одно присваивание innerHTML
    elem.innerHTML = table;
}

function getDay(date) { // получить номер дня недели, от 0(пн) до 6(вс)
    var day = date.getDay();
    if (day == 0) day = 7;
    return day - 1;
}

//
// Получить сегодняшний год и месяц и сгенерировать календарь
//
function renderMonth(m) {

    var previusMonth,
        nextMonth;

    switch (m) {

        case 1:
            previusMonth = 'декабрь';
            nextMonth = 'февраль';
            m = 'январь';
            break;

        case 2:
            previusMonth = 'январь';
            nextMonth = 'март';
            m = 'февраль';
            break;

        case 3:
            previusMonth = 'февраль';
            nextMonth = 'апрель';
            m = 'март';
            break;

        case 4:
            previusMonth = 'март';
            nextMonth = 'май';
            m = 'апрель';
            break;

        case 5:
            previusMonth = 'апрель';
            nextMonth = 'июнь';
            m = 'май';
            break;

        case 6:
            previusMonth = 'май';
            nextMonth = 'июль';
            m = 'июнь';
            break;

        case 7:
            previusMonth = 'июнь';
            nextMonth = 'август';
            m = 'июль';
            break;

        case 8:
            previusMonth = 'июль';
            nextMonth = 'сентябрь';
            m = 'август';
            break;

        case 9:
            previusMonth = 'август';
            nextMonth = 'октябрь';
            m = 'сентябрь';
            break;

        case 10:
            previusMonth = 'сентябрь';
            nextMonth = 'ноябрь';
            m = 'октябрь';
            break;

        case 11:
            previusMonth = 'октябрь';
            nextMonth = 'декабрь';
            m = 'ноябрь';
            break;

        case 12:
            previusMonth = 'ноябрь';
            nextMonth = 'январь';
            m = 'декабрь';
            break;

    }

    document.querySelector('.previus-month span').innerHTML = previusMonth;
    document.querySelector('.current-month').innerHTML = m;
    document.querySelector('.next-month span').innerHTML = nextMonth;

}

function renderCalendar(mnth) {

    var m,
        y,
        date,
        calendar;

    date = new Date();

    if ( mnth ) {

        m = mnth;

    } else m = date.getUTCMonth() + 1;

    y = date.getUTCFullYear();
    calendar = document.getElementById('calendar');

    createCalendar('calendar', y, m);
    renderMonth(m);
    styleCalendar();
    calendar.addEventListener('click', selectDay);
    document.querySelector('.previus-month').addEventListener('click', switchMonth);
    document.querySelector('.next-month').addEventListener('click', switchMonth);
    document.querySelector('.button').addEventListener('click', formJS.workForm);
}

renderCalendar();

//
// Стилизация календаря
//
function styleCalendar() {

    var td,
        currentMonth,
        divCurrentMonth,
        day,
        date;

    date = new Date();
    day = date.getDate();

    td = document.querySelector('table').querySelectorAll('td');
    currentMonth = date.getUTCMonth();
    divCurrentMonth = document.querySelector('.current-month').innerHTML;

    switch (divCurrentMonth) {
        case 'январь':
            divCurrentMonth = 0;
            break;
        case 'февраль':
            divCurrentMonth = 1;
            break;
        case 'март':
            divCurrentMonth = 2;
            break;
        case 'апрель':
            divCurrentMonth = 3;
            break;
        case 'май':
            divCurrentMonth = 4;
            break;
        case 'июнь':
            divCurrentMonth = 5;
            break;
        case 'июль':
            divCurrentMonth = 6;
            break;
        case 'август':
            divCurrentMonth = 7;
            break;
        case 'сентябрь':
            divCurrentMonth = 8;
            break;
        case 'октябрь':
            divCurrentMonth = 9;
            break;
        case 'ноябрь':
            divCurrentMonth = 10;
            break;
        case 'декабрь':
            divCurrentMonth = 11;
            break;
    }

    if ( currentMonth == divCurrentMonth ) {
        for ( var i = 0; i < td.length; i++ ) {

            var value;

            value = td[i].innerHTML;

            if ( value !== '' ) {

                td[i].classList.add('style-td');

            }

            if ( value < day && value !== '' ) {

                td[i].classList.remove('style-td');
                td[i].classList.add('color-grey');

            }

        }
    } else {
        for ( var i = 0; i < td.length; i++ ) {

            var value;

            value = td[i].innerHTML;

            if (value !== '') {

                td[i].classList.add('style-td');

            }
        }
    }

}

//
// Выбор дня. Помечаем его красным, присвоением псевдо-класса before
//
function selectDay(e) {

    var target,
        value;

    target = e.target;
    value = target.innerHTML;

    if ( value !== '' ) {

        target.classList.add('current-td');

    }

}

//
// Переключение между месяцами
//
function switchMonth(e) {

    var target,
        value,
        month;

    target = e.target;

    if ( target.tagName == 'I' ) {

        var childs;

        childs = target.parentNode.children;

        for ( var i = 0; i < childs.length; i++ ) {

            if ( childs[i].tagName == 'SPAN' ) {

                target = childs[i];

            }

        }

    }

    value = target.innerHTML;

    switch (value) {

        case 'январь':
            month = 1;
            break;

        case 'февраль':
            month = 2;
            break;

        case 'март':
            month = 3;
            break;

        case 'апрель':
            month = 4;
            break;

        case 'май':
            month = 5;
            break;

        case 'июнь':
            month = 6;
            break;

        case 'июль':
            month = 7;
            break;

        case 'август':
            month = 8;
            break;

        case 'сентябрь':
            month = 9;
            break;

        case 'октябрь':
            month = 10;
            break;

        case 'ноябрь':
            month = 11;
            break;

        case 'декабрь':
            month = 12;
            break;

    }

    renderCalendar(month);

}

function successRecord() {
    var shadowBlock,
        successDiv;

    successDiv = document.createElement('div');
    successDiv.classList.add('success-div');
    successDiv.innerHTML = "Сообщение отправлено, в ближайшее время мы свяжемся с вами";

    shadowBlock = document.querySelector('.shadowBlock');

    if ( shadowBlock ) {
        shadowBlock.remove();

        document.body.appendChild(successDiv);

        setTimeout(function () {
            successDiv.style.opacity = 0;
        },1500)
    } else {
        document.body.appendChild(successDiv);

        setTimeout(function () {
            successDiv.style.opacity = 0;
        },1500)
    }
}

