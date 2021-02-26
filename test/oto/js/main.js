$(function() {
if($.cookie('user') == 'on'){
   $('.paimerblock form').html('<p class="konec">Срок действия акции истек</p>');
   $('.uznat').css('display', 'none');
   $('#taimer').countdown({until: 0,}); 
}else{
  $('#taimer').countdown({until: +899, onTick: highlightLast5, onExpiry: liftOff});  
    function liftOff() { 
      $('.paimerblock form').html('<p class="konec">Срок действия акции истек</p>');
      $.cookie('user', 'on');
    }   
  function highlightLast5(periods) { 
      if ($.countdown.periodsToSeconds(periods) === 5) { 
          $(this).addClass('highlight'); 
      } 
  } 
}
$('.uznat').click(function() { 
    $('.fxodit, p.uznatafter').css('display', 'block');
    $('.uznat').css('display', 'none');
});
$('img.close').click(function() { 
    $('.fxodit, .tranks').css('display', 'none');
});
$('#phone').inputmask({"mask": "+7 (999) 999-9999"}); 
	   $(function () {
                $("#form").submit(function (e){ 
                e.preventDefault();
                    var form_data = $(this).serialize(); //собираем все данные из формы
                    $.ajax({
                        type: "POST", //Метод отправки
                        url: "input.php", //путь до php файла отправителя
                        data: form_data,
                        success: function (res) {
                          location.href = '/oto/thy';
                        }
                    });
                });
            });
});
