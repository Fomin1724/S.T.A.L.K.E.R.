/* =========================================================

   ☢ STALKER — ЗОНА

   3D FPS — версия с оружием

========================================================= */

if (typeof THREE === "undefined") {

    document.body.innerHTML = `

        <div style="color:white;background:#080b09;

        width:100vw;height:100vh;display:flex;

        align-items:center;justify-content:center;

        font-family:Arial;text-align:center">

            <div>

                <h2>☢ THREE.JS НЕ НАЙДЕН</h2>

                <p>Проверь файл three.min.js</p>

            </div>

        </div>`;

    throw new Error("THREE.js not found");

}

/* =========================================================

   СЦЕНА

========================================================= */

const scene = new THREE.Scene();

scene.background =

    new THREE.Color(0x111713);

scene.fog =

    new THREE.FogExp2(

        0x111713,

        0.018

    );

/* =========================================================

   КАМЕРА

========================================================= */

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

/* =========================================================

   RENDERER

========================================================= */

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

renderer.shadowMap.enabled = true;

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

        1.1

    );

scene.add(

    ambient

);

const moon =

    new THREE.DirectionalLight(

        0x9aa8b0,

        0.7

    );

moon.position.set(

    -30,

    50,

    20

);

moon.castShadow = true;

scene.add(

    moon

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

ground.receiveShadow = true;

scene.add(

    ground

);

/* =========================================================

   МАТЕРИАЛ

========================================================= */

function mat(color) {

    return new THREE.MeshStandardMaterial({

        color: color,

        roughness: 1

    });

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

            mat(0x393128)

        );

    trunk.position.y =

        1.25;

    trunk.castShadow = true;

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

            mat(0x28352c)

        );

    leaves.position.y =

        3.1;

    leaves.castShadow = true;

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

            mat(0x314034)

        );

    leaves2.position.y =

        4.5;

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

    scene.add(

        tree

    );

}

/* =========================================================

   ЛЕС

========================================================= */

for (

    let i = 0;

    i < 110;

    i++

) {

    const x =

        (Math.random() - 0.5)

        * 180;

    const z =

        -Math.random()

        * 180;

    if (

        Math.abs(x) < 23 &&

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

function createRock(

    x,

    z,

    scale

) {

    const rock =

        new THREE.Mesh(

            new THREE.DodecahedronGeometry(

                0.5

            ),

            mat(0x46483f)

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

    rock.castShadow = true;

    scene.add(

        rock

    );

}

for (

    let i = 0;

    i < 55;

    i++

) {

    createRock(

        (Math.random() - 0.5) * 150,

        -Math.random() * 170,

        0.3 +

        Math.random() * 0.7

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

        mat(0x4a493f)

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

   ЛАГЕРЬ

========================================================= */

const camp =

    new THREE.Group();

camp.position.set(

    0,

    0,

    -45

);

scene.add(

    camp

);

/* =========================================================

   КОСТЁР

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

            mat(0x493427)

        );

    log.rotation.z =

        Math.PI / 2;

    log.rotation.y =

        i * Math.PI / 3;

    log.position.y =

        0.15;

    camp.add(

        log

    );

}

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

camp.add(

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

   NPC

========================================================= */

const npcs = [];

function createStalker(

    x,

    z,

    guitarist = false

) {

    const stalker =

        new THREE.Group();

    const body =

        new THREE.Mesh(

            new THREE.CylinderGeometry(

                0.35,

                0.42,

                1.35,

                8

            ),

            mat(

                guitarist

                    ? 0x4a4638

                    : 0x30372f

            )

        );

    body.position.y =

        1.15;

    stalker.add(

        body

    );

    const head =

        new THREE.Mesh(

            new THREE.SphereGeometry(

                0.3,

                10,

                8

            ),

            mat(0x90745c)

        );

    head.position.y =

        2;

    stalker.add(

        head

    );

    const hood =

        new THREE.Mesh(

            new THREE.SphereGeometry(

                0.35,

                10,

                8

            ),

            mat(0x202720)

        );

    hood.scale.y =

        0.75;

    hood.position.y =

        2.08;

    stalker.add(

        hood

    );

    const backpack =

        new THREE.Mesh(

            new THREE.BoxGeometry(

                0.55,

                0.75,

                0.25

            ),

            mat(0x252d27)

        );

    backpack.position.set(

        0,

        1.25,

        -0.4

    );

    stalker.add(

        backpack

    );

    /* =====================================================

       ОРУЖИЕ NPC

    ===================================================== */

    if (!guitarist) {

        const gun =

            new THREE.Mesh(

                new THREE.BoxGeometry(

                    0.12,

                    0.12,

                    1.4

                ),

                mat(0x161916)

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

        const bodyGuitar =

            new THREE.Mesh(

                new THREE.SphereGeometry(

                    0.42,

                    12,

                    8

                ),

                mat(0x75462d)

            );

        bodyGuitar.scale.set(

            0.8,

            1,

            0.3

        );

        guitar.add(

            bodyGuitar

        );

        const neck =

            new THREE.Mesh(

                new THREE.BoxGeometry(

                    0.12,

                    0.12,

                    1.3

                ),

                mat(0x4c3023)

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

            mat(0x44483e)

        );

    body.position.y =

        1.15;

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

            mat(0x363b33)

        );

    cabin.position.set(

        0.6,

        2,

        0

    );

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

                    mat(0x151714)

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

const tent =

    new THREE.Mesh(

        new THREE.ConeGeometry(

            2.1,

            3,

            3

        ),

        mat(0x343c32)

    );

tent.position.set(

    -13,

    1.5,

    -50

);

tent.rotation.y =

    Math.PI / 2;

scene.add(

    tent

);

/* =========================================================

   ДОЖДЬ

========================================================= */

const rainCount =

    700;

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

        Math.random() * 60;

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

   ☢ ОРУЖИЕ ИГРОКА

========================================================= */

const weapon =

    new THREE.Group();

/* корпус */

const weaponBody =

    new THREE.Mesh(

        new THREE.BoxGeometry(

            0.28,

            0.22,

            1.45

        ),

        mat(0x20231f)

    );

weaponBody.position.set(

    0,

    0,

    0

);

weapon.add(

    weaponBody

);

/* ствол */

const barrel =

    new THREE.Mesh(

        new THREE.CylinderGeometry(

            0.055,

            0.055,

            1.2,

            8

        ),

        mat(0x111310)

    );

barrel.rotation.x =

    Math.PI / 2;

barrel.position.set(

    0,

    0.02,

    -1.15

);

weapon.add(

    barrel

);

/* рукоятка */

const grip =

    new THREE.Mesh(

        new THREE.BoxGeometry(

            0.18,

            0.55,

            0.2

        ),

        mat(0x29251f)

    );

grip.position.set(

    0,

    -0.35,

    0.25

);

grip.rotation.x =

    -0.15;

weapon.add(

    grip

);

/* магазин */

const magazine =

    new THREE.Mesh(

        new THREE.BoxGeometry(

            0.2,

            0.55,

            0.35

        ),

        mat(0x1b1d1a)

    );

magazine.position.set(

    0,

    -0.28,

    -0.1

);

magazine.rotation.x =

    -0.15;

weapon.add(

    magazine

);

/* положение оружия */

weapon.position.set(

    0.48,

    -0.45,

    -0.85

);

weapon.rotation.set(

    -0.03,

    -0.03,

    0

);

camera.add(

    weapon

);

scene.add(

    camera

);

/* =========================================================

   ВСПЫШКА ВЫСТРЕЛА

========================================================= */

const muzzleFlash =

    new THREE.Mesh(

        new THREE.ConeGeometry(

            0.18,

            0.55,

            8

        ),

        new THREE.MeshBasicMaterial({

            color: 0xffd36a

        })

    );

muzzleFlash.rotation.x =

    -Math.PI / 2;

muzzleFlash.position.set(

    0.48,

    -0.43,

    -2.15

);

muzzleFlash.visible =

    false;

camera.add(

    muzzleFlash

);

/* =========================================================

   ПУЛЯ

========================================================= */

const bullets = [];

function shoot() {

    if (

        ammo <= 0

    ) {

        showMessage(

            "ПУСТО. Нажми R для перезарядки."

        );

        return;

    }

    ammo--;

    updateAmmo();

    /* вспышка */

    muzzleFlash.visible =

        true;

    clearTimeout(

        window.flashTimer

    );

    window.flashTimer =

        setTimeout(

            () => {

                muzzleFlash.visible =

                    false;

            },

            55

        );

    /* создаём пулю */

    const bullet =

        new THREE.Mesh(

            new THREE.SphereGeometry(

                0.035,

                6,

                6

            ),

            new THREE.MeshBasicMaterial({

                color: 0xffd36a

            })

        );

    const direction =

        new THREE.Vector3(

            0,

            0,

            -1

        );

    direction.applyQuaternion(

        camera.quaternion

    );

    bullet.position.copy(

        camera.position

    );

    bullet.userData.velocity =

        direction.multiplyScalar(

            45

        );

    bullet.userData.life =

        2;

    scene.add(

        bullet

    );

    bullets.push(

        bullet

    );

    /* отдача */

    weapon.position.z =

        -0.75;

    weapon.rotation.x =

        -0.08;

}

/* =========================================================

   ПЕРЕЗАРЯДКА

========================================================= */

let reloading =

    false;

function reload() {

    if (

        reloading ||

        ammo === maxAmmo

    )

        return;

    reloading =

        true;

    showMessage(

        "ПЕРЕЗАРЯДКА..."

    );

    setTimeout(

        () => {

            ammo =

                maxAmmo;

            reloading =

                false;

            updateAmmo();

            showMessage(

                "МАГАЗИН ПОЛОН"

            );

        },

        1200

    );

}

/* =========================================================

   ПАТРОНЫ

========================================================= */

let maxAmmo =

    30;

let ammo =

    30;

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

    text-shadow:0 2px 6px #000;

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

        font-size:10px;

        opacity:.65;

        letter-spacing:1px;

    ">

        КОРДОН

    </span>`;

title.style.cssText = `

    position:absolute;

    left:18px;

    top:18px;

    font-size:14px;

    line-height:1.6;

`;

hud.appendChild(

    title

);

/* =========================================================

   ПАТРОНЫ

========================================================= */

const ammoHud =

    document.createElement(

        "div"

    );

ammoHud.style.cssText = `

    position:absolute;

    right:20px;

    bottom:20px;

    font-size:18px;

    letter-spacing:2px;

`;

hud.appendChild(

    ammoHud

);

function updateAmmo() {

    ammoHud.innerHTML =

        `<span style="font-size:28px">${ammo}</span>

        <span style="opacity:.45"> / ${maxAmmo}</span>

        <div style="

            font-size:9px;

            letter-spacing:1px;

            opacity:.6;

            margin-top:2px;

        ">

            5.45×39

        </div>`;

}

updateAmmo();

/* =========================================================

   ЗДОРОВЬЕ

========================================================= */

const health =

    document.createElement(

        "div"

    );

health.textContent =

    "❤️ 100%";

health.style.cssText = `

    position:absolute;

    left:18px;

    bottom:20px;

    font-size:12px;

`;

hud.appendChild(

    health

);

/* =========================================================

   ПРИЦЕЛ

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

   СООБЩЕНИЯ

========================================================= */

const message =

    document.createElement(

        "div"

    );

message.style.cssText = `

    position:absolute;

    left:50%;

    top:58%;

    transform:translateX(-50%);

    padding:8px 14px;

    background:rgba(5,8,6,.8);

    border:1px solid rgba(200,210,190,.2);

    font-size:12px;

    display:none;

`;

hud.appendChild(

    message

);

function showMessage(

    text

) {

    message.textContent =

        text;

    message.style.display =

        "block";

    clearTimeout(

        window.messageTimer

    );

    window.messageTimer =

        setTimeout(

            () => {

                message.style.display =

                    "none";

            },

            1800

        );

}

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

`;

hud.appendChild(

    map

);

const mapPlayer =

    document.createElement(

        "div"

    );

mapPlayer.style.cssText = `

    position:absolute;

    width:7px;

    height:7px;

    border-radius:50%;

    background:white;

    box-shadow:0 0 7px white;

`;

map.appendChild(

    mapPlayer

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

    background:rgba(5,8,6,.9);

    border:1px solid rgba(200,210,190,.25);

    color:#d0d5c9;

    font-size:13px;

    text-align:center;

    display:none;

    z-index:30;

`;

document.body.appendChild(

    dialogue

);

/* =========================================================

   КНОПКА СТРЕЛЬБЫ

========================================================= */

const shootButton =

    document.createElement(

        "button"

    );

shootButton.textContent =

    "●";

shootButton.style.cssText = `

    position:fixed;

    right:25px;

    bottom:105px;

    width:70px;

    height:70px;

    border-radius:50%;

    border:1px solid rgba(220,220,210,.35);

    background:rgba(80,25,15,.55);

    color:#ddd;

    font-size:24px;

    z-index:40;

    touch-action:none;

`;

document.body.appendChild(

    shootButton

);

shootButton.addEventListener(

    "pointerdown",

    e => {

        e.preventDefault();

        shoot();

    }

);

/* =========================================================

   КНОПКА ПЕРЕЗАРЯДКИ

========================================================= */

const reloadButton =

    document.createElement(

        "button"

    );

reloadButton.textContent =

    "R";

reloadButton.style.cssText = `

    position:fixed;

    right:30px;

    bottom:35px;

    width:50px;

    height:50px;

    border-radius:50%;

    border:1px solid rgba(210,220,200,.3);

    background:rgba(10,14,11,.75);

    color:#ddd;

    z-index:40;

`;

document.body.appendChild(

    reloadButton

);

reloadButton.addEventListener(

    "click",

    reload

);

/* =========================================================

   ДЖОЙСТИК

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

        x - centerX;

    let dy =

        y - centerY;

    const max =

        35;

    const distance =

        Math.sqrt(

            dx * dx +

            dy * dy

        );

    if (

        distance > max

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

        ) {

            joystickMove(

                e.clientX,

                e.clientY

            );

        }

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

   УПРАВЛЕНИЕ КЛАВИАТУРОЙ

========================================================= */

const keys = {

    forward:false,

    backward:false,

    left:false,

    right:false

};

window.addEventListener(

    "keydown",

    e => {

        if (

            e.code === "KeyW"

        )

            keys.forward = true;

        if (

            e.code === "KeyS"

        )

            keys.backward = true;

        if (

            e.code === "KeyA"

        )

            keys.left = true;

        if (

            e.code === "KeyD"

        )

            keys.right = true;

        if (

            e.code === "Space"

        )

            shoot();

        if (

            e.code === "KeyR"

        )

            reload();

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

            e.code === "KeyW"

        )

            keys.forward = false;

        if (

            e.code === "KeyS"

        )

            keys.backward = false;

        if (

            e.code === "KeyA"

        )

            keys.left = false;

        if (

            e.code === "KeyD"

        )

            keys.right = false;

    }

);

/* =========================================================

   ОБЗОР

========================================================= */

let yaw = 0;

let pitch = 0;

let dragging = false;

let lastMouseX = 0;

let lastMouseY = 0;

renderer.domElement.addEventListener(

    "pointerdown",

    e => {

        if (

            e.pointerType === "mouse"

        ) {

            dragging = true;

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

        dragging = false;

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

            dx * 0.0025;

        pitch -=

            dy * 0.0025;

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

   ДИАЛОГ NPC

========================================================= */

function talkToNearest() {

    let nearest =

        null;

    let distanceBest =

        3.5;

    npcs.forEach(

        npc => {

            const d =

                camera.position.distanceTo(

                    npc.position

                );

            if (

                d <

                distanceBest

            ) {

                nearest =

                    npc;

                distanceBest =

                    d;

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

            "🎸 Гитарист: «Садись к костру, сталкер. В Зоне ночью лучше не ходить одному.»";

    }

    else {

        dialogue.textContent =

            "🧑 Сталкер: «Держи оружие наготове. За Кордоном сегодня неспокойно.»";

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

   ДВИЖЕНИЕ

========================================================= */

const clock =

    new THREE.Clock();

function updatePlayer(

    delta

) {

    let forward = 0;

    let side = 0;

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

    forward +=

        -joyY;

    side +=

        joyX;

    const length =

        Math.sqrt(

            forward * forward +

            side * side

        );

    if (

        length > 1

    ) {

        forward /= length;

        side /= length;

    }

    const speed =

        5 * delta;

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

   ПУЛИ

========================================================= */

function updateBullets(

    delta

) {

    for (

        let i = bullets.length - 1;

        i >= 0;

        i--

    ) {

        const bullet =

            bullets[i];

        bullet.position.add(

            bullet.userData.velocity

                .clone()

                .multiplyScalar(delta)

        );

        bullet.userData.life -=

            delta;

        if (

            bullet.userData.life <= 0

        ) {

            scene.remove(

                bullet

            );

            bullets.splice(

                i,

                1

            );

        }

    }

}

/* =========================================================

   АТМОСФЕРА

========================================================= */

function updateAtmosphere(

    time

) {

    flame.scale.x =

        1 +

        Math.sin(

            time * 8

        ) * 0.12;

    flame.scale.y =

        1 +

        Math.sin(

            time * 10

        ) * 0.15;

    flame.rotation.y =

        time * 2;

    fireLight.intensity =

        2.1 +

        Math.sin(

            time * 9

        ) * 0.35;

    /*

       Возврат оружия

       после отдачи

    */

    weapon.position.z =

        THREE.MathUtils.lerp(

            weapon.position.z,

            -0.85,

            0.18

        );

    weapon.rotation.x =

        THREE.MathUtils.lerp(

            weapon.rotation.x,

            -0.03,

            0.18

        );

    /*

       Гитара

    */

    npcs.forEach(

        npc => {

            if (

                npc.userData.guitar

            ) {

                npc.userData.guitar.rotation.z =

                    Math.sin(

                        time * 2

                    ) * 0.04;

            }

        }

    );

    /*

       Дождь

    */

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

   КАРТА

========================================================= */

function updateMap() {

    const x =

        60 +

        camera.position.x *

        0.45;

    const y =

        60 +

        (camera.position.z + 45)

        * 0.35;

    mapPlayer.style.left =

        Math.max(

            3,

            Math.min(

                113,

                x

            )

        ) +

        "px";

    mapPlayer.style.top =

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

    updateBullets(

        delta

    );

    updateAtmosphere(

        time

    );

    updateMap();

    renderer.render(

        scene,

        camera

    );

}

/* =========================================================

   START

========================================================= */

console.log(

    "☢ STALKER — ЗОНА"

);

console.log(

    "🔫 Оружие готово"

);

console.log(

    "🔥 Костёр готов"

);

console.log(

    "🎸 Лагерь готов"

);

console.log(

    "🌧️ Дождь готов"

);

gameLoop();
