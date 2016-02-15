<?php


/**
 * +n - добавляется в список n единиц препарата
 * n - добавляется в список n единиц препарата. Если в списке уже есть такой препарат в
 * кол-ве N < n, то кол-во увеличивается до n. Если в списке уже есть такой препарат в
 * кол-ве N >= n, то ничего не происходит.
 */


return array(
    1 => array( // kit id
        array(
            'title' => 'Кому нужна аптечка?',
            'controls' => array(
                array(
                    'id' => 'who-adults',
                ),
                array(
                    'id' => 'who-children',
                ),
            )
        ),
        array(
            'title' => 'Проблемы с кожей',
            'children' => array(
                array(
                    'title' => 'Сухость',
                    'controls' => array(
                        array(
                            'id' => 'dry-children',
                        ),
                        array(
                            'id' => 'dry-mother',
                        ),
                    )
                ),
                array(
                    'title' => 'Раздражение',
                    'controls' => array(
                        array(
                            'id' => 'irritated-children',
                        ),
                        array(
                            'id' => 'irritated-mother',
                        ),
                    )
                ),
                array(
                    'title' => 'Необходим постоянный уход',
                    'controls' => array(
                        array(
                            'id' => 'care-children',
                        ),
                        array(
                            'id' => 'care-mother',
                        ),
                    )
                ),
                array(
                    'title' => 'Грибок стопы',
                    'controls' => array(
                        array(
                            'id' => 'mushroom-children',
                        ),
                        array(
                            'id' => 'mushroom-mother',
                        ),
                    )
                ),
                array(
                    'title' => 'Аллергия',
                    'controls' => array(
                        array(
                            'id' => 'allergic-children',
                        ),
                        array(
                            'id' => 'allergic-mother',
                        ),
                    )
                ),
                array(
                    'title' => 'Чувствительность к солнцу',
                    'controls' => array(
                        array(
                            'id' => 'sun-senc-children',
                        ),
                        array(
                            'id' => 'sun-senc-mother',
                        ),
                    )
                ),
                array(
                    'title' => 'Обилие родимых пятен',
                    'controls' => array(
                        array(
                            'id' => 'freckles-children',
                        ),
                        array(
                            'id' => 'freckles-mother',
                        ),
                    )
                ),
                array(
                    'title' => 'Нагноение ран',
                    'controls' => array(
                        array(
                            'id' => 'wounds-children',
                        ),
                        array(
                            'id' => 'wounds-mother',
                        ),
                    )
                ),
            )
        ),
        array(
            'title' => 'Частое пребывание на солнце',
            'controls' => array(
                array(
                    'id' => 'sun-children',
                ),
                array(
                    'id' => 'sun-mother',
                ),
            )
        )
    ),
    2 => array( // kit id
        array(
            'title' => 'Кому нужна аптечка?',
            'controls' => array(
                array(
                    'id' => 'who-2-adults',
                ),
                array(
                    'id' => 'who-2-pensioners',
                ),
            )
        ),
//        array(
//            'title' => 'Проблемы с сердцем',
//            'controls' => array(
//                array(
//                    'id' => 'heart-before-2',
//                ),
//                array(
//                    'id' => 'heart-after-2',
//                ),
//            )
//        ),
        array(
            'title' => 'До двух дня',
            'controls' => array(
                array(
                    'id' => 'who-2-adults-before-two',
                ),
                array(
                    'id' => 'who-2-pensioners-before-two',
                ),
            )
        ),
        array(
            'title' => 'После двух дня',
            'controls' => array(
                array(
                    'id' => 'who-2-adults-after-two',
                ),
                array(
                    'id' => 'who-2-pensioners-after-two',
                ),
            )
        ),
    ),
    6 => array( // беременная и младенец
        array(
            'title' => 'Кому нужна аптечка?',
            'controls' => array(
                array(
                    'id' => 'pc-main-child',
                ),
                array(
                    'id' => 'pc-main-mother',
                ),
            )
        ),
        array(
            'title' => 'Проблемы с кожей',
            'children' => array(
                array(
                    'title' => 'Сухость',
                    'controls' => array(
                        array(
                            'id' => 'pc-dry-child',
                        ),
                        array(
                            'id' => 'pc-dry-mother',
                        ),
                    )
                ),
            )
        ),
    )
);