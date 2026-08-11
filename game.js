/* =========================================================

   ☢ STALKER — ЗОНА

   3D WEB EDITION

   CLEAN GAME.JS

========================================================= */

/* =========================================================

   ПРОВЕРКА THREE.JS

========================================================= */

if (typeof THREE === "undefined") {

    document.body.innerHTML = `

        <div style="

            color:#ddd;

            background:#080b09;

            width:100vw;

            height:100vh;

            display:flex;

            align-items:center;

            justify-content:center;

            text-align:center;

            font-family:Arial;

            padding:30px;

            box-sizing:border-box;

        ">

            <div>

                <h2>☢ THREE.JS НЕ ЗАГРУЗИЛСЯ</h2>

                <p>

                    Проверь, что файл

                    <b>three.min.js</b>

                    находится рядом с

                    <b>index.html</b>.

                </p>

            </div>

        </div>

    `;

    throw new Error("THREE.js не найден");

}

/* =========================================================

   ОСНОВА

========================================================= */

const scene =

    new THREE.Scene();

scene.background =

    new THREE.Color(0x111713);

scene.fog =

    new THREE.FogExp2(

        0x111713,

        0.018

    );

const camera =

    new THREE.PerspectiveCamera(

        70,

        window.innerWidth /

        window.innerHeight,

        0.1,

        300

    );

camera.position.set(

    0,

    1.7,

    8

);

const renderer =

    new THREE.WebGLRenderer({

        antialias: true

    });

renderer.setSize(

    window.innerWidth,

    window.innerHeight

);

renderer.setPixelRatio(

    Math.min(

        window.devicePixelRatio,

        2

    )

);

renderer.shadowMap.enabled =

    true;

renderer.shadowMap.type =

    THREE.PCFSoftShadowMap;

document.body.appendChild(

    renderer.domElement

);

/* =========================================================

   СВЕТ

========================================================= */

const ambient =

    new THREE.HemisphereLight(

        0x89958a,

        0x1c211d,

        1.15

    );

scene.add(

    ambient

);

const moonLight =

    new THREE.DirectionalLight(

        0x8c9caa,

        0.75

    );

moonLight.position.set(

    -30,

    50,

    20

);

moonLight.castShadow =

    true;

moonLight.shadow.mapSize.width =

    1024;

moonLight.shadow.mapSize.height =

    1024;

scene.add(

    moonLight

);

/* =========================================================

   ЗЕМЛЯ

========================================================= */

const ground =

    new THREE.Mesh(

        new THREE.PlaneGeometry(

            240,

            240

        ),

        new THREE.MeshStandardMaterial({

            color: 0x30362f,

            roughness: 1

        })

    );

ground.rotation.x =

    -Math.PI / 2;

ground.receiveShadow =

    true;

scene.add(

    ground

);

/* =========================================================

   СЛУЧАЙНЫЙ МАТЕРИАЛ

========================================================= */

function material(

    color

) {

    return new THREE.MeshStandardMaterial({

        color: color,

        roughness: 1

    });

}

/* =========================================================

   КАМНИ

========================================================= */

function createRock(

    x,

    z,

    scale = 1

) {

    const rock =

        new THREE.Mesh(

            new THREE.DodecahedronGeometry(

                0.5,

                0

            ),

            material(

                0x46483f

            )

        );

    rock.position.set(

        x,

        0.3 * scale,

        z

    );

    rock.scale.set(

        scale * 1.2,

        scale * 0.7,

        scale

    );

    rock.rotation.set(

        Math.random(),

        Math.random(),

        Math.random()

    );

    rock.castShadow =

        true;

    rock.receiveShadow =

        true;

    scene.add(

        rock

    );

}

/* =========================================================

   ДЕРЕВО

========================================================= */

function createTree(

    x,

    z,

    scale = 1

) {

    const tree =

        new THREE.Group();

    const trunk =

        new THREE.Mesh(

            new THREE.CylinderGeometry(

                0.18,

                0.28,

                2.5,

                7

            ),

            material(

                0x393128

            )

        );

    trunk.position.y =

        1.25;

    trunk.castShadow =

        true;

    tree.add(

        trunk

    );

    const leaves =

        new THREE.Mesh(

            new THREE.ConeGeometry(

                1.25,

                3.4,

                8

            ),

            material(

                0x28352c

            )

        );

    leaves.position.y =

        3.1;

    leaves.castShadow =

        true;

    tree.add(

        leaves

    );

    const leaves2 =

        new THREE.Mesh(

            new THREE.ConeGeometry(

                0.95,

                2.5,

                8

            ),

            material(

                0x314034

            )

        );

    leaves2.position.y =

        4.5;

    leaves2.castShadow =

        true;

    tree.add(

        leaves2

    );

    tree.position.set(

        x,

        0,

        z

    );

    tree.scale.setScalar(

        scale

    );

    tree.rotation.y =

        Math.random() *

        Math.PI;

    scene.add(

        tree

    );

}

/* =========================================================

   ЛЕС

========================================================= */

for (

    let i = 0;

    i < 100;

    i++

) {

    const x =

        (Math.random() - 0.5)

        * 180;

    const z =

        -Math.random()

        * 180;

    /*

       Не ставим деревья

       прямо в лагере

    */

    if (

        Math.abs(x) < 22 &&

        z > -70 &&

        z < -25

    ) {

        continue;

    }

    createTree(

        x,

        z,

        0.8 +

        Math.random() *

        0.8

    );

}

/* =========================================================

   КАМНИ

========================================================= */

for (

    let i = 0;

    i < 60;

    i++

) {

    createRock(

        (Math.random() - 0.5)

        * 150,

        -Math.random()

        * 170,

        0.3 +

        Math.random() *

        0.7

    );

}

/* =========================================================

   ДОРОГА

========================================================= */

const road =

    new THREE.Mesh(

        new THREE.PlaneGeometry(

            7,

            180

        ),

        material(

            0x4a493f

        )

    );

road.rotation.x =

    -Math.PI / 2;

road.position.set(

    0,

    0.012,

    -70

);

scene.add(

    road

);

/* =========================================================

   ТРАВА

========================================================= */

const grassMaterial =

    material(

        0x3d4839

    );

for (

    let i = 0;

    i < 180;

    i++

) {

    const grass =

        new THREE.Mesh(

            new THREE.ConeGeometry(

                0.03,

                0.4 +

                Math.random() * 0.5,

                4

            ),

            grassMaterial

        );

    grass.position.set(

        (Math.random() - 0.5)

        * 100,

        0.2,

        -Math.random()

        * 150

    );

    scene.add(

        grass

    );

}

/* =========================================================

   КОСТЁР

========================================================= */

const fire =

    new THREE.Group();

fire.position.set(

    0,

    0,

    -45

);

scene.add(

    fire

);

/* =========================================================

   БРЁВНА

========================================================= */

for (

    let i = 0;

    i < 6;

    i++

) {

    const log =

        new THREE.Mesh(

            new THREE.CylinderGeometry(

                0.13,

                0.16,

                2.2,

                8

            ),

            material(

                0x493427

            )

        );

    log.rotation.z =

        Math.PI / 2;

    log.rotation.y =

        i *

        Math.PI /

        3;

    log.position.y =

        0.15;

    fire.add(

        log

    );

}

/* =========================================================

   ПЛАМЯ

========================================================= */

const flame =

    new THREE.Mesh(

        new THREE.ConeGeometry(

            0.75,

            1.8,

            8

        ),

        new THREE.MeshBasicMaterial({

            color: 0xff8a32

        })

    );

flame.position.y =

    1;

fire.add(

    flame

);

const fireLight =

    new THREE.PointLight(

        0xff8a32,

        2.4,

        14

    );

fireLight.position.set(

    0,

    1.5,

    -45

);

scene.add(

    fireLight

);

/* =========================================================

   СТАЛКЕР

========================================================= */

const npcs = [];

function createStalker(

    x,

    z,

    guitarist = false

) {

    const stalker =

        new THREE.Group();

    /* тело */

    const body =

        new THREE.Mesh(

            new THREE.CylinderGeometry(

                0.35,

                0.42,

                1.35,

                8

            ),

            material(

                guitarist

                    ? 0x4a4638

                    : 0x30372f

            )

        );

    body.position.y =

        1.15;

    body.castShadow =

        true;

    stalker.add(

        body

    );

    /* голова */

    const head =

        new THREE.Mesh(

            new THREE.SphereGeometry(

                0.3,

                10,

                8

            ),

            material(

                0x90745c

            )

        );

    head.position.y =

        2;

    head.castShadow =

        true;

    stalker.add(

        head

    );

    /* капюшон */

    const hood =

        new THREE.Mesh(

            new THREE.SphereGeometry(

                0.35,

                10,

                8

            ),

            material(

                0x202720

            )

        );

    hood.scale.y =

        0.75;

    hood.position.y =

        2.08;

    stalker.add(

        hood

    );

    /* рюкзак */

    const backpack =

        new THREE.Mesh(

            new THREE.BoxGeometry(

                0.55,

                0.75,

                0.25

            ),

            material(

                0x252d27

            )

        );

    backpack.position.set(

        0,

        1.25,

        -0.4

    );

    stalker.add(

        backpack

    );

    /* оружие */

    if (!guitarist) {

        const gun =

            new THREE.Mesh(

                new THREE.BoxGeometry(

                    0.12,

                    0.12,

                    1.4

                ),

                material(

                    0x161916

                )

            );

        gun.position.set(

            0.4,

            1.35,

            0.25

        );

        gun.rotation.x =

            -0.3;

        stalker.add(

            gun

        );

    }

    /* =====================================================

       ГИТАРА

    ===================================================== */

    if (guitarist) {

        const guitar =

            new THREE.Group();

        const guitarBody =

            new THREE.Mesh(

                new THREE.SphereGeometry(

                    0.42,

                    12,

                    8

                ),

                material(

                    0x75462d

                )

            );

        guitarBody.scale.set(

            0.8,

            1,

            0.3

        );

        guitar.add(

            guitarBody

        );

        const neck =

            new THREE.Mesh(

                new THREE.BoxGeometry(

                    0.12,

                    0.12,

                    1.3

                ),

                material(

                    0x4c3023

                )

            );

        neck.position.z =

            -0.75;

        guitar.add(

            neck

        );

        guitar.position.set(

            0,

            1.25,

            0.5

        );

        guitar.rotation.x =

            -0.2;

        stalker.add(

            guitar

        );

        stalker.userData.guitar =

            guitar;

    }

    stalker.position.set(

        x,

        0,

        z

    );

    stalker.userData.guitarist =

        guitarist;

    stalker.userData.name =

        guitarist

            ? "Гитарист"

            : "Сталкер";

    scene.add(

        stalker

    );

    npcs.push(

        stalker

    );

    return stalker;

}

/* =========================================================

   ЛЮДИ В ЛАГЕРЕ

========================================================= */

createStalker(

    -3.5,

    -42

);

createStalker(

    4,

    -43

);

createStalker(

    -4,

    -48

);

createStalker(

    3,

    -48,

    true

);

/* =========================================================

   СОБАКА

========================================================= */

function createDog(

    x,

    z

) {

    const dog =

        new THREE.Group();

    const body =

        new THREE.Mesh(

            new THREE.BoxGeometry(

                1.25,

                0.55,

                0.5

            ),

            material(

                0x40372d

            )

        );

    body.position.y =

        0.65;

    dog.add(

        body

    );

    const head =

        new THREE.Mesh(

            new THREE.BoxGeometry(

                0.5,

                0.5,

                0.5

            ),

            material(

                0x4a3d30

            )

        );

    head.position.set(

        0.75,

        0.8,

        0

    );

    dog.add(

        head

    );

    for (

        let i = 0;

        i < 4;

        i++

    ) {

        const leg =

            new THREE.Mesh(

                new THREE.CylinderGeometry(

                    0.07,

                    0.08,

                    0.6,

                    6

                ),

                material(

                    0x302a24

                )

            );

        leg.position.set(

            i < 2

                ? 0.4

                : -0.4,

            0.3,

            i % 2 === 0

                ? 0.15

                : -0.15

        );

        dog.add(

            leg

        );

    }

    dog.position.set(

        x,

        0,

        z

    );

    scene.add(

        dog

    );

    return dog;

}

const dog =

    createDog(

        -7,

        -46

    );

/* =========================================================

   УАЗ

========================================================= */

function createUAZ(

    x,

    z

) {

    const car =

        new THREE.Group();

    const body =

        new THREE.Mesh(

            new THREE.BoxGeometry(

                4,

                1.35,

                2

            ),

            material(

                0x44483e

            )

        );

    body.position.y =

        1.15;

    body.castShadow =

        true;

    car.add(

        body

    );

    const cabin =

        new THREE.Mesh(

            new THREE.BoxGeometry(

                1.8,

                1.4,

                1.9

            ),

            material(

                0x363b33

            )

        );

    cabin.position.set(

        0.6,

        2,

        0

    );

    cabin.castShadow =

        true;

    car.add(

        cabin

    );

    const wheels = [

        [1.3, 0.55, 1.05],

        [1.3, 0.55, -1.05],

        [-1.4, 0.55, 1.05],

        [-1.4, 0.55, -1.05]

    ];

    wheels.forEach(

        p => {

            const wheel =

                new THREE.Mesh(

                    new THREE.CylinderGeometry(

                        0.55,

                        0.55,

                        0.35,

                        12

                    ),

                    material(

                        0x151714

                    )

                );

            wheel.rotation.x =

                Math.PI / 2;

            wheel.position.set(

                p[0],

                p[1],

                p[2]

            );

            car.add(

                wheel

            );

        }

    );

    car.position.set(

        x,

        0,

        z

    );

    car.rotation.y =

        -0.3;

    scene.add(

        car

    );

}

createUAZ(

    11,

    -52

);

/* =========================================================

   ПАЛАТКА

========================================================= */

function createTent(

    x,

    z

) {

    const tent =

        new THREE.Mesh(

            new THREE.ConeGeometry(

                2.1,

                3,

                3

            ),

            material(

                0x343c32

            )

        );

    tent.position.set(

        x,

        1.5,

        z

    );

    tent.rotation.y =

        Math.PI / 2;

    tent.castShadow =

        true;

    scene.add(

        tent

    );

}

createTent(

    -13,

    -50

);

/* =========================================================

   ФОНАРИ

========================================================= */

function createLantern(

    x,

    z

) {

    const pole =

        new THREE.Mesh(

            new THREE.CylinderGeometry(

                0.05,

                0.07,

                2.4,

                7

            ),

            material(

                0x252824

            )

        );

    pole.position.set(

        x,

        1.2,

        z

    );

    scene.add(

        pole

    );

    const bulb =

        new THREE.Mesh(

            new THREE.SphereGeometry(

                0.16,

                8,

                8

            ),

            new THREE.MeshBasicMaterial({

                color: 0xffb45c

            })

        );

    bulb.position.set(

        x,

        2.35,

        z

    );

    scene.add(

        bulb

    );

    const light =

        new THREE.PointLight(

            0xffa34c,

            0.8,

            9

        );

    light.position.set(

        x,

        2.35,

        z

    );

    scene.add(

        light

    );

}

createLantern(

    -10,

    -47

);

createLantern(

    10,

    -47

);

/* =========================================================

   ДОЖДЬ

========================================================= */

const rainCount =

    650;

const rainGeometry =

    new THREE.BufferGeometry();

const rainPositions =

    new Float32Array(

        rainCount * 3

    );

for (

    let i = 0;

    i < rainCount;

    i++

) {

    rainPositions[

        i * 3

    ] =

        (Math.random() - 0.5)

        * 100;

    rainPositions[

        i * 3 + 1

    ] =

        Math.random() *

        60;

    rainPositions[

        i * 3 + 2

    ] =

        (Math.random() - 0.5)

        * 100;

}

rainGeometry.setAttribute(

    "position",

    new THREE.BufferAttribute(

        rainPositions,

        3

    )

);

const rain =

    new THREE.Points(

        rainGeometry,

        new THREE.PointsMaterial({

            color: 0x9aa7a0,

            size: 0.08,

            transparent: true,

            opacity: 0.45

        })

    );

scene.add(

    rain

);

/* =========================================================

   HUD

========================================================= */

const hud =

    document.createElement(

        "div"

    );

hud.style.cssText = `

    position:fixed;

    inset:0;

    pointer-events:none;

    z-index:20;

    color:#d0d5c9;

    font-family:Arial,sans-serif;

`;

document.body.appendChild(

    hud

);

/* =========================================================

   НАЗВАНИЕ

========================================================= */

const title =

    document.createElement(

        "div"

    );

title.innerHTML =

    `☢ ЗОНА<br>

     <span style="

        font-size:11px;

        opacity:.7;

     ">

        ЛАГЕРЬ

     </span>`;

title.style.cssText = `

    position:absolute;

    left:18px;

    top:18px;

    font-size:14px;

    line-height:1.6;

    text-shadow:0 2px 6px #000;

`;

hud.appendChild(

    title

);

/* =========================================================

   ЗДОРОВЬЕ

========================================================= */

const health =

    document.createElement(

        "div"

    );

health.textContent =

    "ЗДОРОВЬЕ  ██████████ 100%";

health.style.cssText = `

    position:absolute;

    left:18px;

    bottom:20px;

    font-size:12px;

    text-shadow:0 2px 6px #000;

`;

hud.appendChild(

    health

);

/* =========================================================

   ПЕРЕКРЕСТИЕ

========================================================= */

const crosshair =

    document.createElement(

        "div"

    );

crosshair.textContent =

    "+";

crosshair.style.cssText = `

    position:absolute;

    left:50%;

    top:50%;

    transform:translate(-50%,-50%);

    font-size:18px;

    opacity:.75;

`;

hud.appendChild(

    crosshair

);

/* =========================================================

   МИНИ-КАРТА

========================================================= */

const map =

    document.createElement(

        "div"

    );

map.style.cssText = `

    position:absolute;

    right:18px;

    top:18px;

    width:120px;

    height:120px;

    background:rgba(12,17,14,.72);

    border:1px solid rgba(210,220,200,.3);

    box-shadow:0 0 15px rgba(0,0,0,.5);

`;

hud.appendChild(

    map

);

const mapRoad =

    document.createElement(

        "div"

    );

mapRoad.style.cssText = `

    position:absolute;

    left:53px;

    top:0;

    width:14px;

    height:100%;

    background:rgba(130,120,95,.35);

`;

map.appendChild(

    mapRoad

);

const mapCamp =

    document.createElement(

        "div"

    );

mapCamp.style.cssText = `

    position:absolute;

    left:46px;

    top:46px;

    width:28px;

    height:28px;

    border-radius:50%;

    background:rgba(225,110,40,.8);

    box-shadow:0 0 12px rgba(255,120,40,.7);

`;

map.appendChild(

    mapCamp

);

const playerDot =

    document.createElement(

        "div"

    );

playerDot.style.cssText = `

    position:absolute;

    width:7px;

    height:7px;

    border-radius:50%;

    background:#fff;

    box-shadow:0 0 7px #fff;

`;

map.appendChild(

    playerDot

);

/* =========================================================

   ДИАЛОГ

========================================================= */

const dialogue =

    document.createElement(

        "div"

    );

dialogue.style.cssText = `

    position:fixed;

    left:50%;

    bottom:85px;

    transform:translateX(-50%);

    max-width:80%;

    padding:10px 15px;

    background:rgba(5,8,6,.88);

    border:1px solid rgba(200,210,190,.25);

    color:#d0d5c9;

    font-size:13px;

    line-height:1.4;

    text-align:center;

    display:none;

    z-index:30;

`;

document.body.appendChild(

    dialogue

);

/* =========================================================

   УПРАВЛЕНИЕ

========================================================= */

const keys = {

    forward: false,

    backward: false,

    left: false,

    right: false

};

window.addEventListener(

    "keydown",

    e => {

        if (

            e.code === "KeyW" ||

            e.code === "ArrowUp"

        )

            keys.forward = true;

        if (

            e.code === "KeyS" ||

            e.code === "ArrowDown"

        )

            keys.backward = true;

        if (

            e.code === "KeyA" ||

            e.code === "ArrowLeft"

        )

            keys.left = true;

        if (

            e.code === "KeyD" ||

            e.code === "ArrowRight"

        )

            keys.right = true;

        if (

            e.code === "KeyE"

        )

            talkToNearest();

    }

);

window.addEventListener(

    "keyup",

    e => {

        if (

            e.code === "KeyW" ||

            e.code === "ArrowUp"

        )

            keys.forward = false;

        if (

            e.code === "KeyS" ||

            e.code === "ArrowDown"

        )

            keys.backward = false;

        if (

            e.code === "KeyA" ||

            e.code === "ArrowLeft"

        )

            keys.left = false;

        if (

            e.code === "KeyD" ||

            e.code === "ArrowRight"

        )

            keys.right = false;

    }

);

/* =========================================================

   МОБИЛЬНЫЙ JOYSTICK

========================================================= */

const joystick =

    document.createElement(

        "div"

    );

joystick.style.cssText = `

    position:fixed;

    left:25px;

    bottom:35px;

    width:115px;

    height:115px;

    border-radius:50%;

    border:1px solid rgba(210,220,200,.25);

    background:rgba(10,14,11,.35);

    z-index:40;

    touch-action:none;

`;

document.body.appendChild(

    joystick

);

const stick =

    document.createElement(

        "div"

    );

stick.style.cssText = `

    position:absolute;

    left:35px;

    top:35px;

    width:45px;

    height:45px;

    border-radius:50%;

    background:rgba(180,190,175,.3);

    border:1px solid rgba(220,225,215,.3);

`;

joystick.appendChild(

    stick

);

let joyX = 0;

let joyY = 0;

let joyActive = false;

function joystickMove(

    x,

    y

) {

    const rect =

        joystick.getBoundingClientRect();

    const centerX =

        rect.left +

        rect.width / 2;

    const centerY =

        rect.top +

        rect.height / 2;

    let dx =

        x -

        centerX;

    let dy =

        y -

        centerY;

    const max =

        35;

    const distance =

        Math.sqrt(

            dx * dx +

            dy * dy

        );

    if (

        distance >

        max

    ) {

        dx =

            dx /

            distance *

            max;

        dy =

            dy /

            distance *

            max;

    }

    joyX =

        dx / max;

    joyY =

        dy / max;

    stick.style.transform =

        `translate(${dx}px,${dy}px)`;

}

joystick.addEventListener(

    "pointerdown",

    e => {

        joyActive =

            true;

        joystickMove(

            e.clientX,

            e.clientY

        );

        joystick.setPointerCapture(

            e.pointerId

        );

    }

);

joystick.addEventListener(

    "pointermove",

    e => {

        if (

            joyActive

        )

            joystickMove(

                e.clientX,

                e.clientY

            );

    }

);

joystick.addEventListener(

    "pointerup",

    () => {

        joyActive =

            false;

        joyX = 0;

        joyY = 0;

        stick.style.transform =

            "translate(0,0)";

    }

);

/* =========================================================

   МОБИЛЬНАЯ КНОПКА E

========================================================= */

const interact =

    document.createElement(

        "button"

    );

interact.textContent =

    "E";

interact.style.cssText = `

    position:fixed;

    right:25px;

    bottom:35px;

    width:55px;

    height:55px;

    border-radius:50%;

    border:1px solid rgba(210,220,200,.35);

    background:rgba(10,14,11,.7);

    color:#d8ddd2;

    font-size:18px;

    z-index:40;

`;

document.body.appendChild(

    interact

);

interact.addEventListener(

    "click",

    talkToNearest

);

/* =========================================================

   МЫШЬ / ОБЗОР

========================================================= */

let yaw = 0;

let pitch = 0;

let dragging =

    false;

let lastMouseX = 0;

let lastMouseY = 0;

renderer.domElement.addEventListener(

    "pointerdown",

    e => {

        if (

            e.pointerType ===

            "mouse"

        ) {

            dragging =

                true;

            lastMouseX =

                e.clientX;

            lastMouseY =

                e.clientY;

        }

    }

);

window.addEventListener(

    "pointerup",

    () => {

        dragging =

            false;

    }

);

window.addEventListener(

    "pointermove",

    e => {

        if (

            !dragging

        )

            return;

        const dx =

            e.clientX -

            lastMouseX;

        const dy =

            e.clientY -

            lastMouseY;

        lastMouseX =

            e.clientX;

        lastMouseY =

            e.clientY;

        yaw -=

            dx *

            0.0025;

        pitch -=

            dy *

            0.0025;

        pitch =

            Math.max(

                -1.3,

                Math.min(

                    1.3,

                    pitch

                )

            );

    }

);

/* =========================================================

   TOUCH-ОБЗОР

========================================================= */

let lookTouch =

    null;

window.addEventListener(

    "touchstart",

    e => {

        for (

            const touch

            of e.changedTouches

        ) {

            const x =

                touch.clientX;

            /*

               Правая часть экрана —

               обзор камеры

            */

            if (

                x >

                window.innerWidth *

                0.45

            ) {

                lookTouch =

                    touch.identifier;

            }

        }

    },

    {

        passive: true

    }

);

window.addEventListener(

    "touchmove",

    e => {

        if (

            lookTouch === null

        )

            return;

        for (

            const touch

            of e.changedTouches

        ) {

            if (

                touch.identifier !==

                lookTouch

            )

                continue;

            if (

                !window.lastTouchX

            ) {

                window.lastTouchX =

                    touch.clientX;

                window.lastTouchY =

                    touch.clientY;

                return;

            }

            const dx =

                touch.clientX -

                window.lastTouchX;

            const dy =

                touch.clientY -

                window.lastTouchY;

            window.lastTouchX =

                touch.clientX;

            window.lastTouchY =

                touch.clientY;

            yaw -=

                dx *

                0.006;

            pitch -=

                dy *

                0.006;

            pitch =

                Math.max(

                    -1.3,

                    Math.min(

                        1.3,

                        pitch

                    )

                );

        }

    },

    {

        passive: true

    }

);

window.addEventListener(

    "touchend",

    () => {

        lookTouch =

            null;

        window.lastTouchX =

            null;

        window.lastTouchY =

            null;

    },

    {

        passive: true

    }

);

/* =========================================================

   ДВИЖЕНИЕ

========================================================= */

const clock =

    new THREE.Clock();

function updatePlayer(

    delta

) {

    let forward =

        0;

    let side =

        0;

    if (

        keys.forward

    )

        forward += 1;

    if (

        keys.backward

    )

        forward -= 1;

    if (

        keys.right

    )

        side += 1;

    if (

        keys.left

    )

        side -= 1;

    /*

       Добавляем мобильный

       джойстик

    */

    forward +=

        -joyY;

    side +=

        joyX;

    const length =

        Math.sqrt(

            forward *

            forward +

            side *

            side

        );

    if (

        length > 1

    ) {

        forward /=

            length;

        side /=

            length;

    }

    const speed =

        5 *

        delta;

    const direction =

        new THREE.Vector3(

            0,

            0,

            -1

        );

    direction.applyAxisAngle(

        new THREE.Vector3(

            0,

            1,

            0

        ),

        yaw

    );

    const right =

        new THREE.Vector3(

            1,

            0,

            0

        );

    right.applyAxisAngle(

        new THREE.Vector3(

            0,

            1,

            0

        ),

        yaw

    );

    camera.position.addScaledVector(

        direction,

        forward * speed

    );

    camera.position.addScaledVector(

        right,

        side * speed

    );

    /*

       Не даём уйти

       слишком далеко

    */

    camera.position.x =

        Math.max(

            -100,

            Math.min(

                100,

                camera.position.x

            )

        );

    camera.position.z =

        Math.max(

            -180,

            Math.min(

                15,

                camera.position.z

            )

        );

    camera.position.y =

        1.7;

}

/* =========================================================

   КАМЕРА

========================================================= */

function updateCamera() {

    camera.rotation.order =

        "YXZ";

    camera.rotation.y =

        yaw;

    camera.rotation.x =

        pitch;

}

/* =========================================================

   ДИАЛОГИ

========================================================= */

function talkToNearest() {

    let nearest =

        null;

    let nearestDistance =

        3.5;

    npcs.forEach(

        npc => {

            const distance =

                camera.position.distanceTo(

                    npc.position

                );

            if (

                distance <

                nearestDistance

            ) {

                nearest =

                    npc;

                nearestDistance =

                    distance;

            }

        }

    );

    if (

        !nearest

    )

        return;

    dialogue.style.display =

        "block";

    if (

        nearest.userData.guitarist

    ) {

        dialogue.textContent =

            "🎸 Гитарист: «Садись к костру. В Зоне ночью лучше не ходить одному.»";

    }

    else {

        dialogue.textContent =

            "🧑 Сталкер: «Добро пожаловать в Зону. Держи оружие наготове.»";

    }

    clearTimeout(

        window.dialogueTimer

    );

    window.dialogueTimer =

        setTimeout(

            () => {

                dialogue.style.display =

                    "none";

            },

            5000

        );

}

/* =========================================================

   ПРОВЕРКА БЛИЗОСТИ

========================================================= */

function checkNPC() {

    let close =

        false;

    npcs.forEach(

        npc => {

            const distance =

                camera.position.distanceTo(

                    npc.position

                );

            if (

                distance <

                3.5

            )

                close =

                    true;

        }

    );

    interact.style.opacity =

        close

            ? "1"

            : "0.45";

}

/* =========================================================

   КАРТА

========================================================= */

function updateMap() {

    const x =

        60 +

        camera.position.x *

        0.45;

    const y =

        60 +

        (camera.position.z + 45) *

        0.35;

    playerDot.style.left =

        Math.max(

            3,

            Math.min(

                113,

                x

            )

        ) +

        "px";

    playerDot.style.top =

        Math.max(

            3,

            Math.min(

                113,

                y

            )

        ) +

        "px";

}

/* =========================================================

   ДОЖДЬ

========================================================= */

function updateRain() {

    const positions =

        rainGeometry

            .attributes

            .position

            .array;

    for (

        let i = 0;

        i < rainCount;

        i++

    ) {

        positions[

            i * 3 + 1

        ] -=

            0.8;

        if (

            positions[

                i * 3 + 1

            ] < 0

        ) {

            positions[

                i * 3 + 1

            ] =

                60;

        }

    }

    rainGeometry

        .attributes

        .position

        .needsUpdate =

        true;

    rain.position.x =

        camera.position.x;

    rain.position.z =

        camera.position.z;

}

/* =========================================================

   АТМОСФЕРА

========================================================= */

function updateAtmosphere(

    time

) {

    /*

       Пламя

    */

    flame.scale.x =

        1 +

        Math.sin(

            time * 8

        ) *

        0.12;

    flame.scale.y =

        1 +

        Math.sin(

            time * 10

        ) *

        0.15;

    flame.rotation.y =

        time * 2;

    /*

       Свет костра

    */

    fireLight.intensity =

        2.1 +

        Math.sin(

            time * 9

        ) *

        0.35;

    /*

       Гитарист

    */

    npcs.forEach(

        npc => {

            if (

                npc.userData.guitar

            ) {

                npc.userData.guitar.rotation.z =

                    Math.sin(

                        time * 2

                    ) *

                    0.04;

            }

        }

    );

    /*

       Собака

    */

    dog.rotation.y =

        -0.2 +

        Math.sin(

            time * 0.6

        ) *

        0.12;

    /*

       Дождь

    */

    updateRain();

}

/* =========================================================

   RESIZE

========================================================= */

window.addEventListener(

    "resize",

    () => {

        camera.aspect =

            window.innerWidth /

            window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(

            window.innerWidth,

            window.innerHeight

        );

    }

);

/* =========================================================

   ИГРОВОЙ ЦИКЛ

========================================================= */

function gameLoop() {

    requestAnimationFrame(

        gameLoop

    );

    const delta =

        Math.min(

            clock.getDelta(),

            0.05

        );

    const time =

        performance.now() /

        1000;

    updatePlayer(

        delta

    );

    updateCamera();

    updateAtmosphere(

        time

    );

    checkNPC();

    updateMap();

    renderer.render(

        scene,

        camera

    );

}

/* =========================================================

   СТАРТ

========================================================= */

console.log(

    "☢ STALKER — ЗОНА ЗАПУЩЕНА"

);

console.log(

    "🌲 Лес готов"

);

console.log(

    "🏕️ Лагерь готов"

);

console.log(

    "🔥 Костёр готов"

);

console.log(

    "🧑 Сталкеры готовы"

);

console.log(

    "🎸 Гитарист готов"

);

console.log(

    "🌧️ Дождь готов"

);

console.log(

    "🎮 Управление готово"

);

gameLoop();
