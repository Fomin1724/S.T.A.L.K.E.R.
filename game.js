/* =========================================================

   ☢ STALKER: — 3D WEB EDITION

   ЭТАП 1 — ПЕРВАЯ 3D ЗОНА

========================================================= */

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x657064);

/* =========================================================

   ТУМАН

========================================================= */

scene.fog = new THREE.Fog(

    0x657064,

    35,

    180

);

/* =========================================================

   КАМЕРА

========================================================= */

const camera = new THREE.PerspectiveCamera(

    70,

    window.innerWidth / window.innerHeight,

    0.1,

    500

);

camera.position.set(

    0,

    1.7,

    8

);

/* =========================================================

   РЕНДЕР

========================================================= */

const renderer =

    new THREE.WebGLRenderer({

        antialias: true,

        powerPreference: "high-performance"

    });

renderer.setSize(

    window.innerWidth,

    window.innerHeight

);

renderer.setPixelRatio(

    Math.min(

        window.devicePixelRatio,

        1.5

    )

);

renderer.shadowMap.enabled = true;

renderer.shadowMap.type =

    THREE.PCFSoftShadowMap;

document

    .getElementById("game")

    .appendChild(renderer.domElement);

/* =========================================================

   ОСВЕЩЕНИЕ

========================================================= */

const ambientLight =

    new THREE.HemisphereLight(

        0x9aa58f,

        0x20251f,

        1.2

    );

scene.add(

    ambientLight

);

const moonLight =

    new THREE.DirectionalLight(

        0xb0b7a2,

        1.1

    );

moonLight.position.set(

    -40,

    70,

    20

);

moonLight.castShadow = true;

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

const groundGeometry =

    new THREE.PlaneGeometry(

        500,

        500

    );

const groundMaterial =

    new THREE.MeshStandardMaterial({

        color: 0x343b31,

        roughness: 1

    });

const ground =

    new THREE.Mesh(

        groundGeometry,

        groundMaterial

    );

ground.rotation.x =

    -Math.PI / 2;

ground.receiveShadow = true;

scene.add(

    ground

);

/* =========================================================

   ДОРОГА

========================================================= */

const roadGeometry =

    new THREE.PlaneGeometry(

        14,

        250

    );

const roadMaterial =

    new THREE.MeshStandardMaterial({

        color: 0x292c27,

        roughness: 1

    });

const road =

    new THREE.Mesh(

        roadGeometry,

        roadMaterial

    );

road.rotation.x =

    -Math.PI / 2;

road.position.y =

    0.01;

road.position.z =

    -55;

scene.add(

    road

);

/* =========================================================

   ТРАВА

========================================================= */

const grassMaterial =

    new THREE.MeshStandardMaterial({

        color: 0x414b3b,

        roughness: 1

    });

function createGrass(

    x,

    z

) {

    const geometry =

        new THREE.ConeGeometry(

            0.08,

            0.7,

            4

        );

    const grass =

        new THREE.Mesh(

            geometry,

            grassMaterial

        );

    grass.position.set(

        x,

        0.35,

        z

    );

    scene.add(

        grass

    );

}

/* =========================================================

   ДЕРЕВЬЯ

========================================================= */

function createTree(

    x,

    z,

    scale = 1

) {

    const tree =

        new THREE.Group();

    /* ствол */

    const trunkGeometry =

        new THREE.CylinderGeometry(

            0.25 * scale,

            0.38 * scale,

            4 * scale,

            7

        );

    const trunkMaterial =

        new THREE.MeshStandardMaterial({

            color: 0x3a3027

        });

    const trunk =

        new THREE.Mesh(

            trunkGeometry,

            trunkMaterial

        );

    trunk.position.y =

        2 * scale;

    trunk.castShadow = true;

    tree.add(

        trunk

    );

    /* крона */

    const crownGeometry =

        new THREE.ConeGeometry(

            2.1 * scale,

            5 * scale,

            8

        );

    const crownMaterial =

        new THREE.MeshStandardMaterial({

            color: 0x263326

        });

    const crown =

        new THREE.Mesh(

            crownGeometry,

            crownMaterial

        );

    crown.position.y =

        5 * scale;

    crown.castShadow = true;

    tree.add(

        crown

    );

    tree.position.set(

        x,

        0,

        z

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

    i < 80;

    i++

) {

    const x =

        (Math.random() - 0.5)

        * 180;

    const z =

        -Math.random()

        * 180;

    /*

       оставляем дорогу свободной

    */

    if (

        Math.abs(x) < 13

    )

        continue;

    createTree(

        x,

        z,

        0.7 +

        Math.random() * 0.7

    );

}

/* =========================================================

   ДОПОЛНИТЕЛЬНАЯ ТРАВА

========================================================= */

for (

    let i = 0;

    i < 350;

    i++

) {

    const x =

        (Math.random() - 0.5)

        * 180;

    const z =

        -Math.random()

        * 180;

    if (

        Math.abs(x) < 12

    )

        continue;

    createGrass(

        x,

        z

    );

}

/* =========================================================

   ЗАБРОШЕННЫЙ ДОМ

========================================================= */

function createHouse(

    x,

    z

) {

    const house =

        new THREE.Group();

    /* стены */

    const wallGeometry =

        new THREE.BoxGeometry(

            9,

            4.5,

            7

        );

    const wallMaterial =

        new THREE.MeshStandardMaterial({

            color: 0x625c4e,

            roughness: 1

        });

    const walls =

        new THREE.Mesh(

            wallGeometry,

            wallMaterial

        );

    walls.position.y =

        2.25;

    walls.castShadow = true;

    walls.receiveShadow = true;

    house.add(

        walls

    );

    /* крыша */

    const roofGeometry =

        new THREE.ConeGeometry(

            6.5,

            3.5,

            4

        );

    const roofMaterial =

        new THREE.MeshStandardMaterial({

            color: 0x292c28,

            roughness: 1

        });

    const roof =

        new THREE.Mesh(

            roofGeometry,

            roofMaterial

        );

    roof.rotation.y =

        Math.PI / 4;

    roof.position.y =

        6;

    roof.scale.z =

        0.7;

    roof.castShadow = true;

    house.add(

        roof

    );

    /* дверь */

    const doorGeometry =

        new THREE.BoxGeometry(

            1.3,

            2.4,

            0.15

        );

    const doorMaterial =

        new THREE.MeshStandardMaterial({

            color: 0x292722

        });

    const door =

        new THREE.Mesh(

            doorGeometry,

            doorMaterial

        );

    door.position.set(

        0,

        1.2,

        3.55

    );

    house.add(

        door

    );

    /* окно */

    const windowMaterial =

        new THREE.MeshStandardMaterial({

            color: 0x37413a,

            roughness: 0.4,

            metalness: 0.1

        });

    const windowGeometry =

        new THREE.BoxGeometry(

            1.7,

            1.4,

            0.12

        );

    const window1 =

        new THREE.Mesh(

            windowGeometry,

            windowMaterial

        );

    window1.position.set(

        -2.5,

        2.5,

        3.55

    );

    house.add(

        window1

    );

    const window2 =

        window1.clone();

    window2.position.x =

        2.5;

    house.add(

        window2

    );

    house.position.set(

        x,

        0,

        z

    );

    scene.add(

        house

    );

}

/* =========================================================

   ДЕРЕВНЯ

========================================================= */

createHouse(

    -25,

    -55

);

createHouse(

    25,

    -78

);

createHouse(

    -30,

    -105

);

createHouse(

    30,

    -125

);

/* =========================================================

   СТАРЫЙ КОЛОДЕЦ

========================================================= */

function createWell(

    x,

    z

) {

    const geometry =

        new THREE.CylinderGeometry(

            1.5,

            1.5,

            1.4,

            12

        );

    const material =

        new THREE.MeshStandardMaterial({

            color: 0x4a443a

        });

    const well =

        new THREE.Mesh(

            geometry,

            material

        );

    well.position.set(

        x,

        0.7,

        z

    );

    well.castShadow = true;

    scene.add(

        well

    );

}

createWell(

    -5,

    -60

);

/* =========================================================

   КОСТЁР

========================================================= */

function createCampfire(

    x,

    z

) {

    const fire =

        new THREE.Group();

    /* брёвна */

    for (

        let i = 0;

        i < 4;

        i++

    ) {

        const logGeometry =

            new THREE.CylinderGeometry(

                0.12,

                0.16,

                1.8,

                6

            );

        const logMaterial =

            new THREE.MeshStandardMaterial({

                color: 0x3b2920

            });

        const log =

            new THREE.Mesh(

                logGeometry,

                logMaterial

            );

        log.rotation.z =

            Math.PI / 2;

        log.rotation.y =

            i * Math.PI / 4;

        log.position.y =

            0.15;

        fire.add(

            log

        );

    }

    /* огонь */

    const flameGeometry =

        new THREE.ConeGeometry(

            0.7,

            1.8,

            8

        );

    const flameMaterial =

        new THREE.MeshBasicMaterial({

            color: 0xd87b32

        });

    const flame =

        new THREE.Mesh(

            flameGeometry,

            flameMaterial

        );

    flame.position.y =

        1.1;

    fire.add(

        flame

    );

    /* свет */

    const fireLight =

        new THREE.PointLight(

            0xff8b3d,

            3,

            15

        );

    fireLight.position.y =

        1.5;

    fire.add(

        fireLight

    );

    fire.position.set(

        x,

        0,

        z

    );

    scene.add(

        fire

    );

    return fire;

}

const campfire =

    createCampfire(

        0,

        -45

    );

/* =========================================================

   СТАЛКЕРЫ У КОСТРА

========================================================= */

function createStalker(

    x,

    z

) {

    const stalker =

        new THREE.Group();

    const bodyGeometry =

        new THREE.CylinderGeometry(

            0.35,

            0.45,

            1.4,

            7

        );

    const bodyMaterial =

        new THREE.MeshStandardMaterial({

            color: 0x3d453a

        });

    const body =

        new THREE.Mesh(

            bodyGeometry,

            bodyMaterial

        );

    body.position.y =

        1.15;

    body.castShadow = true;

    stalker.add(

        body

    );

    const headGeometry =

        new THREE.SphereGeometry(

            0.32,

            8,

            8

        );

    const headMaterial =

        new THREE.MeshStandardMaterial({

            color: 0x9b795c

        });

    const head =

        new THREE.Mesh(

            headGeometry,

            headMaterial

        );

    head.position.y =

        2.05;

    stalker.add(

        head

    );

    stalker.position.set(

        x,

        0,

        z

    );

    scene.add(

        stalker

    );

}

createStalker(

    -3,

    -43

);

createStalker(

    4,

    -47

);

createStalker(

    -5,

    -50

);

/* =========================================================

   ДОЖДЬ

========================================================= */

const rainCount =

    900;

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

        * 180;

    rainPositions[

        i * 3 + 1

    ] =

        Math.random() * 70;

    rainPositions[

        i * 3 + 2

    ] =

        (Math.random() - 0.5)

        * 180;

}

rainGeometry.setAttribute(

    "position",

    new THREE.BufferAttribute(

        rainPositions,

        3

    )

);

const rainMaterial =

    new THREE.PointsMaterial({

        color: 0xaab7b0,

        size: 0.12,

        transparent: true,

        opacity: 0.55

    });

const rain =

    new THREE.Points(

        rainGeometry,

        rainMaterial

    );

scene.add(

    rain

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

    event => {

        if (

            event.code ===

            "KeyW"

        )

            keys.forward = true;

        if (

            event.code ===

            "KeyS"

        )

            keys.backward = true;

        if (

            event.code ===

            "KeyA"

        )

            keys.left = true;

        if (

            event.code ===

            "KeyD"

        )

            keys.right = true;

    }

);

window.addEventListener(

    "keyup",

    event => {

        if (

            event.code ===

            "KeyW"

        )

            keys.forward = false;

        if (

            event.code ===

            "KeyS"

        )

            keys.backward = false;

        if (

            event.code ===

            "KeyA"

        )

            keys.left = false;

        if (

            event.code ===

            "KeyD"

        )

            keys.right = false;

    }

);

/* =========================================================

   МОБИЛЬНЫЙ ДЖОЙСТИК

========================================================= */

const joystick =

    document.getElementById(

        "joystick"

    );

const knob =

    document.getElementById(

        "joystickKnob"

    );

let joystickActive =

    false;

let joystickX =

    0;

let joystickY =

    0;

joystick.addEventListener(

    "touchstart",

    event => {

        joystickActive =

            true;

        updateJoystick(

            event.touches[0]

        );

    },

    {

        passive: false

    }

);

joystick.addEventListener(

    "touchmove",

    event => {

        if (

            !joystickActive

        )

            return;

        event.preventDefault();

        updateJoystick(

            event.touches[0]

        );

    },

    {

        passive: false

    }

);

joystick.addEventListener(

    "touchend",

    () => {

        joystickActive =

            false;

        joystickX =

            0;

        joystickY =

            0;

        knob.style.transform =

            "translate(-50%, -50%)";

    }

);

function updateJoystick(

    touch

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

        touch.clientX -

        centerX;

    let dy =

        touch.clientY -

        centerY;

    const max =

        rect.width / 2 -

        25;

    const length =

        Math.hypot(

            dx,

            dy

        );

    if (

        length > max

    ) {

        dx =

            dx / length * max;

        dy =

            dy / length * max;

    }

    joystickX =

        dx / max;

    joystickY =

        dy / max;

    knob.style.transform =

        `translate(

            calc(-50% + ${dx}px),

            calc(-50% + ${dy}px)

        )`;

}

/* =========================================================

   ПОВОРОТ КАМЕРЫ

========================================================= */

let lookActive =

    false;

let lastTouchX =

    0;

let lastTouchY =

    0;

let cameraYaw =

    0;

let cameraPitch =

    0;

renderer.domElement.addEventListener(

    "touchstart",

    event => {

        if (

            event.touches.length !== 1

        )

            return;

        const touch =

            event.touches[0];

        if (

            touch.clientX <

            window.innerWidth * 0.35

        )

            return;

        lookActive =

            true;

        lastTouchX =

            touch.clientX;

        lastTouchY =

            touch.clientY;

    },

    {

        passive: true

    }

);

renderer.domElement.addEventListener(

    "touchmove",

    event => {

        if (

            !lookActive

        )

            return;

        const touch =

            event.touches[0];

        const dx =

            touch.clientX -

            lastTouchX;

        const dy =

            touch.clientY -

            lastTouchY;

        lastTouchX =

            touch.clientX;

        lastTouchY =

            touch.clientY;

        cameraYaw -=

            dx * 0.004;

        cameraPitch -=

            dy * 0.003;

        cameraPitch =

            Math.max(

                -1.2,

                Math.min(

                    1.2,

                    cameraPitch

                )

            );

    },

    {

        passive: true

    }

);

renderer.domElement.addEventListener(

    "touchend",

    () => {

        lookActive =

            false;

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

    let sideways =

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

        sideways += 1;

    if (

        keys.left

    )

        sideways -= 1;

    forward -=

        joystickY;

    sideways +=

        joystickX;

    const speed =

        7 * delta;

    const direction =

        new THREE.Vector3();

    camera.getWorldDirection(

        direction

    );

    direction.y =

        0;

    direction.normalize();

    const right =

        new THREE.Vector3(

            direction.z,

            0,

            -direction.x

        );

    camera.position.addScaledVector(

        direction,

        forward * speed

    );

    camera.position.addScaledVector(

        right,

        sideways * speed

    );

    camera.position.y =

        1.7;

    /*

       небольшие границы Зоны

    */

    camera.position.x =

        THREE.MathUtils.clamp(

            camera.position.x,

            -90,

            90

        );

    camera.position.z =

        THREE.MathUtils.clamp(

            camera.position.z,

            -190,

            30

        );

}

/* =========================================================

   КАМЕРА

========================================================= */

function updateCamera() {

    camera.rotation.order =

        "YXZ";

    camera.rotation.y =

        cameraYaw;

    camera.rotation.x =

        cameraPitch;

}

/* =========================================================

   ДОЖДЬ

========================================================= */

function updateRain() {

    const positions =

        rainGeometry.attributes

            .position.array;

    for (

        let i = 0;

        i < rainCount;

        i++

    ) {

        positions[

            i * 3 + 1

        ] -= 0.8;

        if (

            positions[

                i * 3 + 1

            ] < 0

        ) {

            positions[

                i * 3 + 1

            ] = 70;

        }

    }

    rainGeometry.attributes

        .position.needsUpdate =

        true;

    rain.position.x =

        camera.position.x;

    rain.position.z =

        camera.position.z;

}

/* =========================================================

   КОСТЁР АНИМАЦИЯ

========================================================= */

function updateFire(

    time

) {

    const flame =

        campfire.children[4];

    if (

        flame

    ) {

        flame.scale.x =

            0.85 +

            Math.sin(

                time * 12

            ) * 0.12;

        flame.scale.z =

            0.85 +

            Math.cos(

                time * 15

            ) * 0.12;

        flame.scale.y =

            0.9 +

            Math.sin(

                time * 10

            ) * 0.12;

    }

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

   ОСНОВНОЙ ЦИКЛ

========================================================= */

function animate() {

    requestAnimationFrame(

        animate

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

    updateRain();

    updateFire(

        time

    );

    renderer.render(

        scene,

        camera

    );

}

animate();

/* =========================================================

   ЗАПУСК

========================================================= */

console.log(

    "☢ STALKER — 3D ЗОНА ЗАПУЩЕНА"

);
