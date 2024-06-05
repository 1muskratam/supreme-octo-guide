<?php
$db = mysqli_connect('localhost', 'root', '', 'dance');
if ($db == null) {
    echo "Вы не подключились";
}
$table = mysqli_query($db, "SELECT * FROM `users`");
$table = mysqli_fetch_all($table);
$free = mysqli_query($db, "SELECT * FROM `freeLesson`");
$free = mysqli_fetch_all($free);?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>BALLET STUDIO</title>
    <link rel="stylesheet" href="styles/main.css?v=25" />
    <link rel="icon" href="img/Vector.png" />
  </head>

  <body>
    <div id="wrapper">
      <div class="kruglyash position-left-top"></div>
      <div id="header">
        <div class="logo">
          <h2>Ballet Studio</h2>
        </div>
        <div class="right-logo">
          <div class="right-elems"><a href="#about">О нас</a></div>
          <div class="right-elems"><a href="#classes">Классы</a></div>
          <div class="right-elems"><a href="#teachers">Преподователи</a></div>
          <div class="right-elems"><a href="#price">Прайс</a></div>
          <div class="right-elems"><a href="#free">Контакты</a></div>
        </div>
        <div onclick="ShowModal('modal2')" class="knopochka">
        <svg fill="#ffffff"    xml:space="preserve" stroke="#ffffff">
  <g id="SVGRepo_iconCarrier"> <g> <g> <g> 
                <path d="M20,5H4C3.4,5,3,4.6,3,4s0.4-1,1-1h16c0.6,0,1,0.4,1,1S20.6,5,20,5z"></path> </g> </g> <g> <g> <path d="M20,21H4c-0.6,0-1-0.4-1-1s0.4-1,1-1h16c0.6,0,1,0.4,1,1S20.6,21,20,21z"></path> </g> </g> <g> <g> 
                    <path d="M20,13H4c-0.6,0-1-0.4-1-1s0.4-1,1-1h16c0.6,0,1,0.4,1,1S20.6,13,20,13z"></path> </g> </g> </g> </g></svg>
        </div>
      </div>
      <div class="banner margin">
        <div class="banner-flex">
          <div class="banner-img">
            <div class="banner-txt-parent">
              <div>BALLET</div>
              <div class="banner-txt">STUDIO</div>
            </div>
            <img src="img/ballet.png" alt="" />
          </div>
        </div>
        <div class="banner-txt-bottom">
          “ ТАНЕЦ - ЭТО ПОЭЗИЯ НОГ ”,<br />
          <img class="line" src="img/Line.png" alt="" /> ДЖОН ДРАЙДЕН
        </div>

      </div>
        <div id="about" class="margin">
            <div class="border-box">
                <img src="img/ballerina" alt="">
                <div class="border-box" id="rotate"></div>
            </div>
            <div class="about-right">
                <div class="mini-kruglyash"></div>
                <h1>О НАС</h1>
                <div class="about-right-txt">
                    Балет - это вид сценического искусства, спектакль,
                    содержание которого воплощено в музыкальных и
                    хореографических образах. Классический балетный спектакль
                    основан на определенном сюжете, драматургической идее и либретто.
                    <div class="about-flex margin">
                        <div class="about-flex-txt">4
                            <p>Профессиональные тренеры</p>
                        </div>
                        <div class="about-flex-txt">4
                            <p>Разные классы</p>
                        </div>
                    </div>
                    <div class="about-flex margin">
                        <div class="about-flex-txt">1
                            <p>Бесплатный урок</p>
                        </div>
                        <div class="about-flex-txt">100+
                            <p>Довольные клиенты</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="classes" class="margin">
            <h1>КЛАССЫ</h1>
            <div class="mini-kruglyash-left"></div>
            <div class="classes-flex">
                <div class="classes-img"><img src="img/ballet-group.png" alt=""></div>
                <div class="classes-txt">
                    <h2>Классические балеты для взрослых </h2>
                    <p>Балетные школы. – это своего рода танцевальные студии, где
                        учат ярким, грациозным и благородным действиям. Чтобы научиться балету,
                        должно быть желание достигать целей и уверенность в
                        собственных целях. Балет - древнее искусство с загадочным
                        прошлым.</p>
                    <p>Балет - это не пачка и пуанты, это, прежде всего,
                        колоссальный труд и последовательное изучение
                        движений классического танца. </p>
                    <p> Ребенок 6-7 лет физически не в состоянии станцевать
                        вариацию из балета.</p>
                </div>
            </div>
        </div>
        <div id="teachers" class="margin">
            <div class="mini-kruglyash-right"></div>
            <div class="teachers-flex-row">
                <h1>УЧИТЕЛЯ</h1>
            </div>
            <div class="teachers-flex-1">
                <div class="teachers-flex margin">
                    <div class="obertka">
                        <div class="teachers-img"><img src="img/instructor-1.png" alt=""></div>
                        <div class="teachers-txt">
                            <h2>Сэм</h2>
                        </div>
                        <div class="teachers-txt">
                            <p>Преподаватель балета для взрослых</p>
                        </div>
                    </div>
                    <div class="obertka">
                        <div class="teachers-img"><img src="img/emma.png" alt=""></div>
                        <div class="teachers-txt">
                            <h2>Эмма</h2>
                        </div>
                        <div class="teachers-txt">
                            <p>Преподаватель балета для детей</p>
                        </div>
                    </div>
                </div>
                <div class="teachers-flex margin">
                    <div class="obertka">
                        <div class="teachers-img"><img src="img/cristian.png" alt=""></div>
                        <div class="teachers-txt">
                            <h2>Кристьян</h2>
                        </div>
                        <div class="teachers-txt">
                            <p>Современный учитель</p>
                        </div>
                    </div>
                    <div class="obertka">
                        <div class="teachers-img"><img src="img/Jessica.png" alt=""></div>
                        <div class="teachers-txt">
                            <h2>Джесика</h2>
                        </div>
                        <div class="teachers-txt">
                            <p>Преподаватель балета для взрослых</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="price" class="margin">
        <div class="mini-kruglyash-left"></div>
        <h1>ПРАЙС</h1>
    
        <div class="price-block" onclick="ShowModal('modal1')">
          <div class="price-txt">
            <h2>АДАЖИО</h2>
            <p>Срок действия 30 дней</p>
          </div>
          <div class="price-dollars"><span>35000тг</span></div>
        </div>
        <div class="price-block" onclick="ShowModal('modal1')">
          <div class="price-txt">
            <h2>АЛЛЕГРО</h2>
            <p>Срок действия 60 дней</p>
          </div>
          <div class="price-dollars"><span>60000тг</span></div>
        </div>
        <div class="price-block" onclick="ShowModal('modal1')">
          <div class="price-txt">
            <h2>ГРАЦИЯ</h2>
            <p>Срок действия 90 дней</p>
          </div>
          <div class="price-dollars"><span>88000тг</span></div>
        </div>
        <div class="price-block" onclick="ShowModal('modal1')">
          <div class="price-txt">
            <h2>БРИЗ</h2>
            <p>Срок действия 120 дней</p>
          </div>
          <div class="price-dollars"><span>176000тг</span></div>
        </div>
      </div>
        <div class="schedule margin">
        <div class="mini-kruglyash-right"></div>
        <div class="teachers-flex-row">
          <h1>ГРАФИК</h1>
        </div>
        <div class="margin">
          <div>
            <div class="schedule-h">
              <h1>понедельник</h1>
            </div>
            <div class="schedule-flex">
              <div class="flex-box">
                <h1>
                  Класс <br />
                  Эммы
                </h1>
                <div class="row-flex margin-mini">
                  <h2>10:00</h2>
                  <div class="border-b-parent">
                    <div class="border-txt">120min</div>
                    <div class="border-b"></div>
                  </div>
                </div>
              </div>
              <div class="flex-box">
                <h1>
                  Класс <br />
                  Сэма
                </h1>
                <div class="row-flex margin-mini">
                  <h2>13:00</h2>
                  <div class="border-b-parent">
                    <div class="border-txt">90min</div>
                    <div class="border-b"></div>
                  </div>
                </div>
              </div>
              <div class="flex-box">
                <h1>
                  Класс<br />
                  Кристьяна
                </h1>
                <div class="row-flex margin-mini">
                  <h2>16:00</h2>
                  <div class="border-b-parent">
                    <div class="border-txt">120min</div>
                    <div class="border-b"></div>
                  </div>
                </div>
              </div>
              <div class="flex-box">
                <h1>
                  Класс <br />
                  Джесики
                </h1>
                <div class="row-flex margin-mini">
                  <h2>18:00</h2>
                  <div class="border-b-parent">
                    <div class="border-txt">90min</div>
                    <div class="border-b"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="margin-mini">
            <div class="schedule-h">
              <h1>Среда</h1>
            </div>
            
            <div class="schedule-flex">
              <div class="flex-box">
                <h1>
                  Класс <br />
                  Кристьяна
                </h1>
                <div class="row-flex margin-mini">
                  <h2>10:00</h2>
                  <div class="border-b-parent">
                    <div class="border-txt">120min</div>
                    <div class="border-b"></div>
                  </div>
                </div>
              </div>
              <div class="flex-box">
                <h1>
                  Класс <br />
                  Джесики
                </h1>
                <div class="row-flex margin-mini">
                  <h2>13:00</h2>
                  <div class="border-b-parent">
                    <div class="border-txt">90min</div>
                    <div class="border-b"></div>
                  </div>
                </div>
              </div>
              <div class="flex-box">
                <h1>
                  Класс <br />
                  Сэма
                </h1>
                <div class="row-flex margin-mini">
                  <h2>16:00</h2>
                  <div class="border-b-parent">
                    <div class="border-txt">120min</div>
                    <div class="border-b"></div>
                  </div>
                </div>
              </div>
              <div class="flex-box">
                <h1>
                  Класс <br />
                  Эммы
                </h1>
                <div class="row-flex margin-mini">
                  <h2>18:00</h2>
                  <div class="border-b-parent">
                    <div class="border-txt">90min</div>
                    <div class="border-b"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="margin-mini">
            <div class="schedule-h">
              <h1>Пятница</h1>
            </div>
            <div class="schedule-flex">
              <div class="flex-box">
                <h1>
                  Класс <br />
                  Эммы
                </h1>
                <div class="row-flex margin-mini">
                  <h2>10:00</h2>
                  <div class="border-b-parent">
                    <div class="border-txt">120min</div>
                    <div class="border-b"></div>
                  </div>
                </div>
              </div>
              <div class="flex-box">
                <h1>
                  Класс <br />
                  Сема
                </h1>
                <div class="row-flex margin-mini">
                  <h2>13:00</h2>
                  <div class="border-b-parent">
                    <div class="border-txt">90min</div>
                    <div class="border-b"></div>
                  </div>
                </div>
              </div>
              <div class="flex-box">
                <h1>
                  Класс <br />
                  Кристьяна
                </h1>
                <div class="row-flex margin-mini">
                  <h2>16:00</h2>
                  <div class="border-b-parent">
                    <div class="border-txt">120min</div>
                    <div class="border-b"></div>
                  </div>
                </div>
              </div>
              <div class="flex-box">
                <h1>
                  Класс <br />
                  Джесики
                </h1>
                <div class="row-flex margin-mini">
                  <h2>18:00</h2>
                  <div class="border-b-parent">
                    <div class="border-txt">90min</div>
                    <div class="border-b"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        <div id="free" class="margin">
            <div class="free-flex">
                <div class="border-box">
                    <img src="img/ballerina-2.png" alt="">
                    <div class="border-box" id="rotate"></div>
                </div>
                <div class="free-title">
                    <div class="mini-kruglyash-left"></div>
                    <h1>БЕСПЛАТНЫЙ</h1>
                    <h2>УРОК</h2>
                    <div class="free-txt">Оставьте заявку и получите приглашение
                        на бесплатное первое занятие</div>
                    <form action="crud/free.php" method="POST">
                        <div class="free-input">
                            <div><input type="text" placeholder="Name" name="name"></div>
                            <div><input type="tel" placeholder="Phone number" name="number"></div>
                        </div>
                        <div class="free-inline">
                            <input type="submit" value="ОТПРАВИТЬ" onclick="Message('Данные были отправлены администратору')">
                            <img class="arrow" src="img/Arrow.png" alt="">
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div id="footer" class="margin">
            <div class="footer-obertka">
                <div class="flex-elems">
                    <h1>КОНТАКТЫ</h1>
                </div>
                <div class="flex-elems">
                    <div class="elems-obertka">
                        <p>8 (777) 098-56-43</p>
                        <p>balletstudio@gmail.com</p>
                    </div>
                </div>
                <div class="flex-elems">
                    <div class="elems-obertka">
                        <p>050002 Prospect Abaya <br> Baitursynova 14/a</p>
                        <div class="flex-icon">
                            <a href=""><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3" />
                                </svg></a>
                            <a href=""><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.264 8.264 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07c0 1.22.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28" />
                                </svg></a>
                            <a href=""><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                    <g fill="none">
                                        <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                                        <path fill="currentColor" d="M12 4c.855 0 1.732.022 2.582.058l1.004.048l.961.057l.9.061l.822.064a3.802 3.802 0 0 1 3.494 3.423l.04.425l.075.91c.07.943.122 1.971.122 2.954c0 .983-.052 2.011-.122 2.954l-.075.91c-.013.146-.026.287-.04.425a3.802 3.802 0 0 1-3.495 3.423l-.82.063l-.9.062l-.962.057l-1.004.048A61.59 61.59 0 0 1 12 20a61.59 61.59 0 0 1-2.582-.058l-1.004-.048l-.961-.057l-.9-.062l-.822-.063a3.802 3.802 0 0 1-3.494-3.423l-.04-.425l-.075-.91A40.662 40.662 0 0 1 2 12c0-.983.052-2.011.122-2.954l.075-.91c.013-.146.026-.287.04-.425A3.802 3.802 0 0 1 5.73 4.288l.821-.064l.9-.061l.962-.057l1.004-.048A61.676 61.676 0 0 1 12 4m0 2c-.825 0-1.674.022-2.5.056l-.978.047l-.939.055l-.882.06l-.808.063a1.802 1.802 0 0 0-1.666 1.623C4.11 9.113 4 10.618 4 12c0 1.382.11 2.887.227 4.096c.085.872.777 1.55 1.666 1.623l.808.062l.882.06l.939.056l.978.047c.826.034 1.675.056 2.5.056s1.674-.022 2.5-.056l.978-.047l.939-.055l.882-.06l.808-.063a1.802 1.802 0 0 0 1.666-1.623C19.89 14.887 20 13.382 20 12c0-1.382-.11-2.887-.227-4.096a1.802 1.802 0 0 0-1.666-1.623l-.808-.062l-.882-.06l-.939-.056l-.978-.047A60.693 60.693 0 0 0 12 6m-2 3.575a.6.6 0 0 1 .819-.559l.081.04l4.2 2.424a.6.6 0 0 1 .085.98l-.085.06l-4.2 2.425a.6.6 0 0 1-.894-.43l-.006-.09z" />
                                    </g>
                                </svg></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="modal1" class="modal-wrapper">
        <div class="modal">
            <div class="modal-right">
                <h1>Запишитесь <span>на занятие</span></h1>
                <div class="right-input">
                    <form method="POST" action="crud/loader.php" name="bruh">
                        <input type="text" placeholder="Full name" name="name">
                        <input type="tel" placeholder="Phone number" name="number">
                        <input type="text" placeholder="Email" name="email">
                        <div class="select">
                            <select name="price" method="POST">
                                <!--Supplement an id here instead of using 'name'-->
                                <option>Абонемент</option>
                                <option>Адажио</option>
                                <option>Аллегро</option>
                                <option>Грация</option>
                                <option>Бриз</option>
                            </select>
                        </div>
                        <div class="select">
                            <select name="teacher" method="POST">
                                <!--Supplement an id here instead of using 'name'-->
                                <option>Преподователи</option>
                                <option>Сэм</option>
                                <option>Эмма</option>
                                <option>Кристьян</option>
                                <option>Джесика</option>
                            </select>
                        </div>
                        
                        <div class="right-link">
                            <input onclick="Message('Ваши данные отправлены администратору')" class="last-link" type="submit" value="Отправьте свое заявление">
                        </div>
                    </form>
                    <div class="right-link">
                        <div class="close" onclick="HideModal('modal1')">Закрыть</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <a href="#header">
        <div class="yakor"><img src="img/arro.png" alt=""></div>
    </a>
    <div id="modal2" class="header-zhmih-navigation">
        <div class="krestick-position">
            <div onclick="HideModal('modal2')" class="krestick">×</div>
        </div>
        <div onclick="HideModal('modal2')" class="right-elems"><a href="#about">About</a></div>
        <div onclick="HideModal('modal2')" class="right-elems"><a href="#classes">Classes</a></div>
        <div onclick="HideModal('modal2')" class="right-elems"><a href="#teachers">Teachers</a></div>
        <div onclick="HideModal('modal2')" class="right-elems"><a href="#price">Price</a></div>
        <div onclick="HideModal('modal2')" class="right-elems"><a href="#free">Contact</a></div>
    </div>
    <script src="js/main.js"></script>
</body>

</html>