(function () {
  //Active Menu
  $('#menu-movil').on('click', function () {
    $('.header__menu-desktop').toggleClass('active');
  });

  //Mostrar telefono en el circulo fixed
  $('.phone-fixed__circle').on('mouseenter click', function () {
    $('.phone-fixed__phone').addClass('active');
  });
  $('.phone-fixed').on('mouseleave', function () {
    $('.phone-fixed__phone').removeClass('active');
  });

  //Efecto de caja
  let boxBanner = $('.banner-page__principal-content');
  boxBanner.animate({
    width: '575px',
    height: '30px'
  }, 'slow');
  boxBanner.animate({
    height: '175px',
  }, "slow");
  setTimeout(function () {
    boxBanner.children().animate({
      opacity: 1
    }, 1000)
  }, 1000);


  //Acordeon Mas Info
  let showTrabajo = $('.trabaja__contenido');
  $('.trabaja__cont-botones .btn-gris').each(function (i, e) {
    $(this).on('click', function () {
      let showActive = $('.trabaja__contenido.active').removeClass('active')
      showTrabajo[i].classList.add('active');
    })
  })

  //Arcordeon Postula
  $('.trabaja__cont-botones .btn-amarillo').each(function (i, e) {
    $(this).on('click', function () {
      $(document.body).addClass('modal-body');
      $('.modal').addClass('active');
    })
  })
  $('.cerrar-modal').on('click', function () {
    $('.modal').removeClass('active');
    $(document.body).removeClass('modal-body');
  })
  $('.postula').on('click', function (e) {
    e.preventDefault();
  })


  //Servicios tab__list
  let contentList = $('.servicios-content').children();
  let tabList = $('.tab__list').find('.tab__text');

  tabList.each(function (i, e) {
    $(this).on('click', function () {
      $('.tab__text.active').removeClass('active');
      tabList[i].classList.add('active');

      $('.servicios-content').find('.svs.active').removeClass('active');
      contentList[i].classList.add('active');
    })
  })

  //Modal Politicas
  $('.open-modal-politicas').on('click', function () {
    $(document.body).addClass('modal-body');
    $('.modal').addClass('active');
  })







})();
